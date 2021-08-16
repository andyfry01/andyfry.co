---
layout: post
title: Accessible Multistep Forms in React with Awesome UX – Animations
permalink: /multi-step-form-animations/
author_profile: true
read_time: true
comments: true
share: true
related: true
---
<link rel="stylesheet" href="/public/css/prism.css">


## Animations

Your typical visitor is accustomed to page loads. A fresh request for a new HTML page will clear the viewport of content, trigger a browser's loading indicators, and usually takes a moment or two to complete. These are unmistakable indicators that "something new" is occurring, and cue us to start looking out for those new somethings. 

When a SPA framework loads a new "page," this does not occur. Those hundreds or thousands of milliseconds of page loading may happen instantaneously, with none of the usual indicators that something has happened. A visitor could miss that transition, and if they do, they may start to feel confused, alienated, or frustrated. This is a bad user experience, and bad for your bottom line!

Animations can help us signal that there is new content on the page. On every "page-transition" in this very blog, I've been using the `fadeInUp` animation from [Animate.css](https://animate.style/). I like Animate.css because:

- The animations are general enough to use on many different elements.
- Like Tailwind, Animate.css has [utilities for removing unused styles](https://animate.style/#custom-builds), which cuts down on file size.
- As an accessibility bonus, the styles are all written to respect the [prefers-reduced-motion](https://animate.style/#accessibility) media query for visitors with vestibular disorders.

Be judicious in your use of animations, however. Check out the [best practices guidelines](https://animate.style/#Best_practices) in the docs for a great primer on when to use animations and when to skip them. 

<script src="/public/js/prism.js"></script>