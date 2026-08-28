# Fui Builders — Floorplan Area Takeoff

Upload a client's floorplan (JPG / PNG / **vector PDF**), set the scale from a
printed dimension or a 900 mm door, trace rooms (or auto-detect them), and get a
demolition / hacking quote — floor area in ft²/m², wall-hacking by running metre,
fixtures by the piece, with the calculation shown and margin + GST added.

It is **one self-contained HTML file** (`index.html`). Everything runs in the
browser — nothing is uploaded to a server, and it works offline.

---

## Publish on Streamlit Community Cloud (streamlit.io)

1. Create a **new GitHub repository** and push every file in this folder:

   ```
   index.html
   streamlit_app.py
   requirements.txt
   .streamlit/config.toml
   .gitignore
   README.md
   ```

2. Go to <https://share.streamlit.io> → **Create app** → **Deploy a public app from GitHub**.
3. Pick your repo, branch `main`, **Main file path:** `streamlit_app.py`.
4. Click **Deploy**. After ~1 minute you get a URL like
   `https://<your-app>.streamlit.app`.

`streamlit_app.py` just embeds `index.html` full-window. When you update the
tool, replace `index.html`, commit, push — Streamlit redeploys automatically.

## Alternative: GitHub Pages (simpler, and better for this kind of app)

This is a static page, so you don't actually need Streamlit:

1. Push this repo to GitHub.
2. Repo → **Settings** → **Pages** → Source: **Deploy from a branch** →
   Branch: `main`, Folder: `/ (root)` → **Save**.
3. In a minute it's live at `https://<user>.github.io/<repo>/`
   (it serves `index.html` automatically).

GitHub Pages gives the tool the **full browser window** (Streamlit shows it in a
fixed-height panel). Use whichever you prefer — the tool is identical.

## Run locally

Just double-click `index.html`. Or:

```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```

---

## Notes

- **Auto-read a printed dimension (OCR)** loads a recognition engine from a CDN
  on first use, so that one feature needs internet. Everything else is offline.
- **Vector PDF** support renders the page with a small built-in interpreter.
  A few unusual PDFs may not draw fully — export the page as PNG/JPG from a PDF
  viewer and load that instead.
- Your work autosaves in the browser (IndexedDB) and is restored on reload.
  It is per-browser and never leaves the device.
