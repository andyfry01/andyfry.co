---
layout: post
title: Accessible Multistep Forms in React with Awesome UX
permalink: /multi-step-form-intro/
author_profile: true
read_time: true
comments: true
share: true
related: true
description: "Let's get all the benefits of multistep forms, minimize the technical snags, and make our UX as good as it can be."
---

## Introduction

Multi-step forms are a common phenomenon on the web. And for good reason! They offer a lot of UX benefits: 

- A series of shorter forms can feel less overwhelming to your visitors than a long single-page form.
- By presenting a form as a series of steps, site visitors get a feeling of progression and a sense of how long the rest of the form will take to fill out.
- You can add functionality to save a visitor's progress for later, making it easier to fill out a long form in smaller sessions.
- They can lead to [higher conversions](https://www.ventureharbour.com/multi-step-lead-forms-get-300-conversions/), which is great for your bottom line.

However, multi-step forms have some technical challenges that need to be addressed to make it a pleasant and accessible experience for your visitors, especially if you're using a SPA framework like React: 

- From a tech perspective, they are more complicated to build than a single-page form. A garden variety HTML form tracks its own state, but a multi-step form in an SPA requires some kind of JS-based state tracking. 
- From a UX perspective, they need special considerations to avoid confusing or alienating your visitors. A full page load is a commonly-understood signal to visitors that something is changing, but instantaneous "snapping" from one form step to another may happen too quickly for some visitors to notice.
- From an accessibility perspective, multi-step forms are frequently inaccessible. They are often implemented as a set of JavaScript-generated DOM nodes which are swapped in and out of a container element, and not as separate HTML pages. 

These challenges are all surmountable, and the benefits are frequently worth it. I'd like to take you through my thought process when implementing forms like these, both from a technical perspective, as well as the ethical and user experience (UX) perspectives as well. These forms shouldn't simply *work*, they should *work well!*

So! Let's explore how to make an accessible multi-step form in React. There are a lot of topics to cover, and they're all broken down by chapter.  

Let's get all the benefits, minimize any technical snags, and make our UX as good as it can be.

The first stop on the journey is [your tech stack](/multi-step-form-tech-stack/). Let's get started!

## Table of contents:

This is a series of blog posts which will cover each aspect of a great multi-step form experience separately. Check back for a new post each Monday until they're all done!

- [Introduction](/multi-step-form-intro)
- [Your tech stack](/multi-step-form-tech-stack/)
- Accessibility: coming on **8/23/21**
- Animations: coming on **8/30/21**
- Persistent state: coming on **9/6/21**
- Input validation: coming on **9/13/21**
- Putting it all together: coming on **9/20/21**










