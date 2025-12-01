# DevMarks

Lightweight workspace for collecting UI ideas, design snippets, and development bookmarks. Intended as a simple, searchable collection of notes, components, and links to speed up prototyping and design review.

## Features

- Store and categorize UI ideas, snippets, and references
- Quick search and tagging
- Simple component snapshots (markup + notes)
- Export / import as Markdown

## Getting started

Prerequisites

- Node.js (optional, if using the included demo)
- Git

Clone

```bash
git clone <repo-url> devmarks
cd devmarks
```

Install (demo app)

```bash
npm install
npm start
```

Usage

- Add new items as individual Markdown files under the content/ directory
- Use tags in frontmatter for filtering, e.g.:

```md
---
title: Button variants
tags: [components, buttons, ui]
---

Markup and notes...
```

## Project structure (suggested)

- content/ — markdown items (ideas, snippets, examples)
- app/ — demo viewer / search UI
- scripts/ — build / export utilities
- README.md

## Contributing

- Keep entries short and focused
- Use descriptive titles and tags
- Open issues for feature requests or improvements
- Follow simple commit messages: feat|fix|docs: short description

## License

MIT — see LICENSE file.

## Notes

This repository is a personal playground for UI ideas. Adapt structure and tooling to your workflow.
