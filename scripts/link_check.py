#!/usr/bin/env python3
import os
import sys
import urllib.request
from html.parser import HTMLParser

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if tag == 'a' and name == 'href':
                self.links.append(value)
            elif tag == 'img' and name == 'src':
                self.links.append(value)

def extract_links(path):
    parser = LinkParser()
    with open(path, 'r', encoding='utf-8') as f:
        parser.feed(f.read())
    return parser.links

def check_remote(url):
    try:
        with urllib.request.urlopen(url) as resp:
            code = resp.getcode()
            return code < 400
    except Exception:
        return False

def check_local(base, link):
    target = os.path.join(base, link)
    return os.path.exists(target)

def main(root='.'):    
    html_files = []
    for dirpath, _, filenames in os.walk(root):
        for name in filenames:
            if name.lower().endswith('.html'):
                html_files.append(os.path.join(dirpath, name))

    broken = []
    for html in html_files:
        base = os.path.dirname(html)
        for link in extract_links(html):
            if link.startswith('http://') or link.startswith('https://'):
                if not check_remote(link):
                    broken.append(f"{html}: {link}")
            elif link.startswith('mailto:') or link.startswith('#'):
                continue
            else:
                ref = link.split('#')[0]
                if not check_local(base, ref):
                    broken.append(f"{html}: {link}")

    if broken:
        print('Broken links:')
        for item in broken:
            print('  ' + item)
        sys.exit(1)
    else:
        print('No broken links found.')

if __name__ == '__main__':
    root = sys.argv[1] if len(sys.argv) > 1 else '.'
    main(root)
