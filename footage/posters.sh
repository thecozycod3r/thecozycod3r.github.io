#!/bin/bash
# After render.mjs / capture.mjs: turn each 3840-wide still into the two sizes
# the site uses (a 1920 poster and a 640 thumbnail for the hand of cards), and
# make sure every clip has its `-sm` copy.
set -e
cd "$(dirname "$0")/../public/media"
for f in posters/*.jpg; do
  n=$(basename "$f" .jpg)
  case "$n" in *-sm) continue;; esac
  w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
  ffmpeg -v error -y -i "$f" -vf "scale=640:-2:flags=lanczos" -q:v 4 "posters/$n-sm.jpg"
  if [ "$w" -gt 1920 ]; then
    ffmpeg -v error -y -i "$f" -vf "scale=1920:-2:flags=lanczos" -q:v 3 "posters/$n.tmp.jpg" && mv "posters/$n.tmp.jpg" "$f"
  fi
done
for v in *.mp4; do
  n=$(basename "$v" .mp4)
  case "$n" in *-sm) continue;; esac
  [ -f "$n-sm.mp4" ] || cp "$v" "$n-sm.mp4"
done
ls -la posters | awk '{print $5, $9}'
