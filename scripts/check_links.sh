#!/usr/bin/env bash
set -euo pipefail

repo_root=$(git -C "$(dirname "$0")/.." rev-parse --show-toplevel)
cd "$repo_root"

fail=0

# find all html files
while IFS= read -r file; do
  echo "Checking $file"
  # extract href values
  while IFS= read -r href; do
    # skip empty or anchor or js links
    if [[ -z "$href" || "$href" =~ ^# || "$href" =~ ^javascript: || "$href" =~ ^mailto: || "$href" =~ ^tel: ]]; then
      continue
    fi

    if [[ "$href" =~ ^https?:// ]]; then
      status=$(curl -o /dev/null -s -w "%{http_code}" -I "$href" || echo "000")
      if [ "$status" = "404" ]; then
        echo "  [404] $href"
        fail=1
      fi
    else
      # local path
      path="$href"
      # handle absolute paths starting with /
      if [[ "$path" = /* ]]; then
        path=".$path"
      else
        path="$(dirname "$file")/$path"
      fi
      # remove query or fragment
      path="${path%%\#*}"
      path="${path%%\?*}"
      if [ ! -e "$path" ]; then
        echo "  [missing] $href"
        fail=1
      fi
    fi
  done < <(grep -oP 'href="\K[^"]+' "$file")
  echo
done < <(find . -name '*.html')

if [ $fail -eq 0 ]; then
  echo "All links resolved successfully."
else
  echo "Broken links detected."
  exit 1
fi
