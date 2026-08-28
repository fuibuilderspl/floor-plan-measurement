"""
Fui Builders — Floorplan Area Takeoff
Streamlit Community Cloud wrapper.

The whole tool is a single self-contained HTML/JS page (index.html) that runs
entirely in the browser. This script just serves that page full-window inside
Streamlit so it can be deployed for free on streamlit.io.

Deploy: push this repo to GitHub, then on https://share.streamlit.io
"New app" -> pick the repo -> main file: streamlit_app.py
"""

from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="Fui Builders — Area Takeoff",
    page_icon="📐",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Strip Streamlit's chrome so the tool fills the window.
st.markdown(
    """
    <style>
      header[data-testid="stHeader"] { display: none; }
      [data-testid="stToolbar"] { display: none; }
      [data-testid="stDecoration"] { display: none; }
      #MainMenu, footer { display: none; }
      .stApp { background: #eef0ec; }
      .block-container { padding: 0 !important; max-width: 100% !important; }
      [data-testid="stAppViewContainer"] > .main { padding: 0; }
      [data-testid="stAppViewContainer"] .main .block-container { padding: 0; }
      iframe[title="streamlit_component"] { display: block; border: 0; }
    </style>
    """,
    unsafe_allow_html=True,
)

html = Path(__file__).with_name("index.html").read_text(encoding="utf-8")

# The app is designed for a tall viewport. Give the iframe a generous height;
# the user can still scroll the outer page a little if their screen is short.
components.html(html, height=1000, scrolling=True)
