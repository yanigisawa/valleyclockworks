# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The static marketing/catalog website for ValleyClockWorks.com — a one-man clock repair shop in Tell City, Indiana. There is no build server, framework, or backend. The site is plain HTML/CSS/JS based on the HTML5 UP "Forty" template. The vast majority of changes are content edits: adding, removing, or repricing clocks in the catalog.

## Common tasks

### Adding / removing / editing a clock (the most frequent task)
Clocks live as `.grid-item` blocks inside the `#clocksForSale` section of `index.html`. Each is a self-contained figure with a fancybox lightbox link:

```html
<div class="grid-item">
    <figure>
        <a href="images/SLUG.jpg" data-fancybox="main">
            <img src="images/SLUG.jpg" alt="" data-position="center center" />
            <figcaption>
                <h4>Clock Name</h4>
                <p>1 year warranty</p>   <!-- optional -->
                <p>$0.00</p>
            </figcaption>
        </a>
    </figure>
</div>
```

- Drop the clock photo into `images/` and reference the same path in both `href` and `src`.
- `data-position` controls how the image is cropped in the masonry tile (e.g. `top center`, `center center`).
- "Sold"/removed clocks are deleted outright (see git history — commits routinely add and remove individual `.grid-item` blocks). Keep the first `<div class="grid-sizer"></div>` inside `.grid` — masonry needs it.

### Editing the layout/styles
- CSS is compiled from SASS: edit files under `assets/sass/` and compile to `assets/css/main.css`. `assets/sass/main.scss` is the entry point that `@import`s `libs/`, `base/`, `components/`, `layout/`. There is no npm config — this template was built with Ruby Sass (note the committed `.sass-cache/`); use `sass assets/sass/main.scss assets/css/main.css`. **Do not hand-edit `assets/css/main.css`** — it is generated.
- `index.html` is the real site. `generic.html` and `elements.html` are leftover template demo pages.

## Deploying

```sh
./deploy.sh
```

This `rsync`s the working directory (excluding `.git`) to the production host alias `dh` (`/home/yanigisawa/valleyclockworks.com`). It deploys local files as-is — there is no CI, so compile SASS and verify `index.html` in a browser before running it. The `dh` host must be configured in your SSH config.

## Architecture notes

- The catalog grid is a client-side **masonry** layout initialized in `assets/js/main.js`; lightboxes use **fancybox** (both pulled from CDNs in the `<script>` block at the bottom of `index.html`, alongside jQuery 1.11). Because layout is JS-driven masonry over `imagesLoaded`, new clock images only reflow correctly once loaded — test in a browser, not just by reading the HTML.
- `_site/` is a stale generated copy and is gitignored; ignore it.
- Page navigation is in-page anchor scrolling (`#clocksForSale`, `#about`, `#contact`) driven by the `.page-scroll` class in `main.js`.
