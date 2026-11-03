# Bates Sailing website

Plain HTML, CSS and JS. No build step.

Live site: https://btaylor2-hue.github.io/bates-sailing/

## Publishing

This folder is the GitHub repo [btaylor2-hue/bates-sailing](https://github.com/btaylor2-hue/bates-sailing). GitHub Pages publishes the `main` branch, so anything pushed to `main` goes live about a minute later.

To preview locally before publishing:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Files

- `index.html` contains every section of the home page: About, Leadership, Schedule, Photos, Blog, Alumni and Join.
- `roster.html` is the full roster: one card per sailor, grouped by class. Headshots live in `assets/img/team/` as square 800×800 JPEGs named after the person (e.g. `harrison-nash.jpg`). Anyone without a headshot uses `assets/img/burgee.svg` with the `no-photo` class.
- `gallery.html` is the full photo gallery, linked from the button under the home page photo strip. Add a photo by copying one `<li>` line in the Recent or Past seasons list; clicking a photo opens it larger. Older-season photos live in `assets/img/gallery/`.
- `blog/*.html` holds one page per post. To add a post, copy one, then add a card to the Blog section of `index.html`.
- `css/styles.css` defines the colors and type scale as variables at the top of the file.
- `assets/img/` holds web-sized photos (originals stay in the parent folder) and `burgee.svg`.
- `assets/fonts/` holds Montserrat (variable font, SIL Open Font License).

## Still to replace (search for `PLACEHOLDER` or `SAMPLE` in the files)

1. **Alumni updates** in `index.html`: three "Alumni name" entries.
2. **Blog posts** `first-regatta-recap.html` is a sample post. The learning-to-sail and Boat Barn posts are real.
3. **Leadership photos**: the leadership cards show initials on a pennant. To use headshots instead, tell us which photo belongs to which officer.
