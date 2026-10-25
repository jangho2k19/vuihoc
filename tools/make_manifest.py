import os

CACHE_DIR = "audio_cache"
MANIFEST_FILE = os.path.join("js", "audio_manifest.js")

files = [os.path.splitext(f)[0] for f in os.listdir(CACHE_DIR) if f.endswith(".mp3")]
files.sort()

with open(MANIFEST_FILE, "w", encoding="utf-8") as fp:
    fp.write("// Audio Cache Manifest for GitHub Pages\n")
    fp.write("window.AUDIO_CACHE_MANIFEST = new Set([\n")
    for h in files:
        fp.write(f'  "{h}",\n')
    fp.write("]);\n")

print(f"Wrote {len(files)} hashes to {MANIFEST_FILE}")
