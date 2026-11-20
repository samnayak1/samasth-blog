#!/usr/bin/env bash
# Uploads the site/ folder to your S3 bucket.
# Usage: ./deploy.sh
set -euo pipefail

BUCKET="your-bucket-name"   # <-- change this to your bucket's name

if [ "$BUCKET" = "your-bucket-name" ]; then
  echo "Open deploy.sh and set BUCKET to your S3 bucket name first."
  exit 1
fi

cd "$(dirname "$0")"

# sync only uploads files that changed.
# --delete removes files from the bucket that you've deleted from site/.
aws s3 sync site/ "s3://$BUCKET" --delete --exclude ".gitkeep"

echo "Published! Your site URL is under S3 > $BUCKET > Properties > Static website hosting."
