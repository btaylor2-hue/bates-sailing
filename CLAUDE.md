# Bates Sailing website: notes for Claude

This repo is the Bates Sailing team website, live at https://btaylor2-hue.github.io/bates-sailing/. It is plain HTML, CSS and JS with no build step. `README.md` explains which file holds what.

## Who edits it

Team members who don't write code. They ask for changes in plain English ("change the practice time", "add a sailor to the roster"). Make the change for them, explain what you did in plain words, and avoid code jargon. Don't ask them to edit files or run commands themselves.

## Before every change

Several people edit this site. Run `git pull` first so you start from the latest version.

## Publishing

- GitHub Pages publishes the `main` branch. Anything pushed to `main` goes live about a minute later.
- Publish only when the person asks to ("publish it", "put it live"). Otherwise, make the change and ask whether to publish.
- To publish: commit to `main` and `git push`. Don't leave the change on a separate branch or an unmerged pull request: nothing goes live until it's on `main`. If the session can only push to a branch, open a pull request and merge it into `main`, then say so.
- After pushing, wait about a minute and load the live site to confirm the change is there. Tell the person it's live, or what went wrong.

## Checking changes

- Before publishing, check the change at phone width (about 375px) and laptop width (about 1280px). Most visitors are on phones.
- To preview locally, run `python3 -m http.server 8080` in this folder and open http://localhost:8080.

## Rules

- After changing `css/styles.css` or `js/main.js`, bump the `?v=` value on the stylesheet and script links in every HTML page (use today's date, e.g. `?v=20261118`) so browsers load the new file.
- Photos: put web-sized JPEGs in `assets/img/` (about 1200px on the long side; 2400px for full-width banners). Never commit full-size camera originals.
- Never add a `CNAME` file or set a custom domain unless the person has bought that domain and its DNS already points at GitHub Pages. A custom domain without working DNS takes the whole site offline.
- Keep the Bates colors (garnet `#881124`, black, grays, white) and the Montserrat font.
- This file and `README.md` are visible on the public site, so don't put private details in them.
