#!/usr/bin/env python3
"""
seed_hosted.py — One-time migration of local NFL data to rt3hq.com
Pushes: kanban cards, meeting notes, comments (if any)

Usage:
  python3 tools/seed_hosted.py --username robert --password YOUR_PASS

Run ONCE after Railway volume is mounted at /data and DATA_DIR=/data is set.
"""
import argparse, json, sys, re
from pathlib import Path
import urllib.request, urllib.parse, urllib.error

BASE_URL   = "https://rt3hq.com"
NFL_DIR    = Path(__file__).parent.parent
KANBAN_FILE = Path(__file__).parent / "kanban-state.json"
MEETINGS_DIR = NFL_DIR / "meetings"
COMMENTS_FILE = NFL_DIR / "working/survey/nfl_review_comments.json"


def req(url, data=None, method=None, headers=None, cookie=None):
    h = {"Content-Type": "application/json"}
    if headers:
        h.update(headers)
    if cookie:
        h["Cookie"] = cookie
    body = json.dumps(data).encode() if data is not None else None
    r = urllib.request.Request(BASE_URL + url, data=body, headers=h,
                               method=method or ("POST" if body else "GET"))
    try:
        with urllib.request.urlopen(r) as resp:
            return resp.status, resp.read().decode(), dict(resp.headers)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode(), {}


def login(username, password):
    status, body, headers = req("/auth/login", {"username": username, "password": password})
    if status not in (200, 302):
        print(f"Login failed (HTTP {status}): {body[:200]}")
        sys.exit(1)
    # Extract session cookie
    set_cookie = headers.get("Set-Cookie", "")
    match = re.search(r'rt3_session=([^;]+)', set_cookie)
    if not match:
        print("Login succeeded but no session cookie found. Check credentials.")
        sys.exit(1)
    return f"rt3_session={match.group(1)}"


def parse_frontmatter(content):
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            meta_raw = parts[1].strip()
            body = parts[2].strip()
            meta = {}
            for line in meta_raw.splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    meta[k.strip()] = v.strip()
            return meta, body
    return {}, content


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--username", required=True)
    parser.add_argument("--password", required=True)
    parser.add_argument("--dry-run", action="store_true", help="Print what would be sent, don't push")
    args = parser.parse_args()

    print("Logging in to rt3hq.com...")
    cookie = login(args.username, args.password)
    print("Authenticated ✓\n")

    # ── 1. Kanban ────────────────────────────────────────────────────────────
    if KANBAN_FILE.exists():
        kanban = json.loads(KANBAN_FILE.read_text())
        print(f"Kanban: {len(kanban.get('cards', []))} cards, {len(kanban.get('people', []))} people")
        if not args.dry_run:
            status, body, _ = req("/api/nfl/kv/kanban",
                                  {"value": kanban}, cookie=cookie)
            if status == 200:
                print("  Kanban → uploaded ✓")
            else:
                print(f"  Kanban → FAILED (HTTP {status}): {body[:200]}")
        else:
            print("  [dry-run] Would POST kanban to /api/nfl/kv/kanban")
    else:
        print("Kanban: no local file found, skipping")

    print()

    # ── 2. Meetings ──────────────────────────────────────────────────────────
    if MEETINGS_DIR.exists():
        meeting_files = sorted(MEETINGS_DIR.glob("*.md"), reverse=True)
        print(f"Meetings: {len(meeting_files)} files")
        for f in meeting_files:
            content = f.read_text(encoding="utf-8")
            meta, body = parse_frontmatter(content)
            title_match = re.search(r'^#\s+(.+)', body, re.MULTILINE)
            title = title_match.group(1) if title_match else f.stem
            date = meta.get("date", f.stem[:10] if len(f.stem) >= 10 else "")
            mtype = meta.get("type", "internal")
            slug = f.stem

            payload = {
                "slug": slug,
                "title": title,
                "date": date,
                "type": mtype,
                "source": "seeded",
                "content": body,
            }
            if not args.dry_run:
                status, resp_body, _ = req("/api/nfl/rows/meetings", payload, cookie=cookie)
                if status == 200:
                    print(f"  {slug} → uploaded ✓")
                else:
                    print(f"  {slug} → FAILED (HTTP {status}): {resp_body[:100]}")
            else:
                print(f"  [dry-run] Would POST meeting: {slug} — {title[:60]}")
    else:
        print("Meetings: directory not found, skipping")

    print()

    # ── 3. Comments (only if non-empty) ─────────────────────────────────────
    if COMMENTS_FILE.exists():
        comments_data = json.loads(COMMENTS_FILE.read_text())
        nonempty = {k: v for k, v in comments_data.get("comments", {}).items()
                    if v.get("flag") or v.get("comment")}
        print(f"Comments: {len(comments_data.get('comments', {}))} total, {len(nonempty)} non-empty")
        if nonempty:
            if not args.dry_run:
                status, body, _ = req("/api/nfl/kv/comments",
                                      {"value": comments_data}, cookie=cookie)
                if status == 200:
                    print("  Comments → uploaded ✓")
                else:
                    print(f"  Comments → FAILED (HTTP {status}): {body[:200]}")
            else:
                print("  [dry-run] Would POST comments to /api/nfl/kv/comments")
        else:
            print("  All comments empty — skipping")

    print("\nDone. Open https://rt3hq.com/nfl to verify.")


if __name__ == "__main__":
    main()
