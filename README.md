# Samasth's stuff

## Edit

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/editor/editor.html in Chrome or Edge, write, then click **Save posts.json**. The first time, save over `site/posts.json`.

Preview at http://localhost:8000/site/

## Publish

```bash
git add .
git commit -m "New post"
git push
```

GitHub Pages publishes the `site/` folder automatically about a minute after you push.

Live at https://samnayak1.github.io/samasth-blog/
