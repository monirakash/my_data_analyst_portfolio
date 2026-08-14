# Monir Hosen — Portfolio

A one-page portfolio site built with plain HTML, CSS, and vanilla JavaScript — no
frameworks, no build step. Styled as a "live report": a tab bar like a BI report's
page navigator, a KPI dashboard hero, and section eyebrows written like code
comments, echoing the SQL/BI work the site describes.

**Files**
```
index.html    → all page content and structure
style.css     → the whole design system (colors, type, layout)
script.js     → sliding tab indicator, scroll-spy, KPI count-up
resume.pdf    → downloadable résumé (compiled from resume.tex)
resume.tex    → LaTeX source for the résumé, kept for future edits
```

## Preview locally

No build tools needed — just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Host it free on GitHub Pages

1. **Create a repository** on GitHub — e.g. `monirakash/monirakash.github.io`
   (using this exact name gives you the site at `https://monirakash.github.io`
   with no extra path; any other repo name works too, just under
   `https://monirakash.github.io/repo-name`).

2. **Push these files to the repo:**
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/monirakash/monirakash.github.io.git
   git push -u origin main
   ```

3. **Turn on Pages:**
   - Open the repo on GitHub → **Settings** → **Pages**.
   - Under "Build and deployment", set **Source** to **Deploy from a branch**.
   - Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
   - GitHub will publish the site in a minute or two, at the URL shown on that page.

4. **Custom domain (optional):** in the same Pages settings, add your domain
   under "Custom domain" and follow GitHub's DNS instructions.

Every future `git push` to `main` redeploys the site automatically.

## Editing content

Everything is in `index.html` — text, links, and project details live directly
in the markup, so there's no data file to keep in sync. Colors and type live in
the `:root` variables at the top of `style.css` if you want to retheme later.
