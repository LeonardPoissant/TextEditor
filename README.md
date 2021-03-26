# Littera-Clip

Littera-Clipv1 was developped using the draft.js framework from facebook.
It is a rich text-editor meant to create content that you can share (eventually).

![Alt Text](https://i.gyazo.com/593fa76d80f404c48bdf07a941b9846b.gif)

---

## Motivation

-'Why make a text-editor-- Leonard ? There's plenty of better options out there...'

The idea behind this project was to fill a gap between my previous career as a screenwriter and this new journey as a web dev I set my path on... so code a text-editor of my own that will allow for content publication :) As a junior dev, it was fun to translate everything into functional components. That furthered my comprehension of React a lot.

---

## How it works

'Draft.js is a framework for building rich text editors in React, powered by an immutable model and abstracting over cross-browser differences.

Draft.js allows you to build any type of rich text input, whether you're only looking to support a few inline text styles or building a complex text editor for composing long-form articles. '

I recommend watching this very interesting introduction:
<a href="http://www.youtube.com/watch?feature=player_embedded&v=feUYwoLhE_4
" target="_blank"><img src="http://img.youtube.com/vi/feUYwoLhE_4/0.jpg" 
alt="Rich Text Editing with React" width="240" height="180" border="10" /></a>

The app is strictly FE. The EditorState, an Immutable Record that represents the entire state of a Draft editor, is saved on sessionStorage for now.

![Alt Text](https://i.gyazo.com/abd9ff74c521798b1b94336858885306.gif)

More on immutable records here : https://web.archive.org/web/20150623131347/http://facebook.github.io:80/immutable-js/docs/#/Record

Developed using React, TypeScript, draft.js and styled-components.

---

## Installation

```bash
yarn install

```

---

## FAQ

### What is to come ?

In futur iterations, I will be implementing a BE and adding more editing options.

### Is Littera-Clip mobile friendly ?

Although meant for desktop use first, it is possible to use it on mobile devices. As per the draft.js documentation, the framework is not yet fully supported on mobile, but the developers behind it are working torwards making that a reality.
