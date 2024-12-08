# Eleventy Project with Ghost CMS Integration

This project integrates [Eleventy](https://www.11ty.dev/) with Ghost CMS to dynamically generate a static site using posts fetched via the Ghost Content API.

## Features

- Fetches and renders posts from Ghost CMS with customizable filters and formatting.
- Includes custom collections for posts tagged as `lab` and `destination`.
- Supports Nunjucks filters for enhanced flexibility (e.g., slicing arrays).
- Automatically copies static assets (e.g., styles directory) to the output.
- Configurable directory structure for input, includes, data, and output files.

---

#Directory Structure
├── styles/              # Contains CSS files to style your site
├── _includes/           # Includes reusable Nunjucks templates
├── _data/               # Contains global data files
├── _site/               # Output directory for the built site
├── .env                 # Environment variables for API configuration
├── .eleventy.js         # Eleventy configuration file
└── package.json         # Node.js dependencies and scripts