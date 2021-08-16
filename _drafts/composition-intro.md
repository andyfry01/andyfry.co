---
layout: post
title: Code Composition, an Introduction. React, Through the Looking Glass. 
permalink: /composition-introduction/
author_profile: true
read_time: true
comments: true
share: true
related: true
---

*This is the intro to a five-part series on code composition in React and vanilla JS.* 

*[You can read part one here](/composition-part-one).*


## The moment I finally understood it all

Let's start with a controversial statement: **I love React**. It is often decried as the bane of the modern web. I will admit, the nuts and bolts of the React development process have laden us poor frontend developers with some brutally complicated baggage (ahem ... Webpack, Babel). But what it has given us in exchange for all of this tooling pain is quite profound. It has brought one of the most powerful, useful, universally applicable functional programming techniques into the mainstream: 

<div class="text-center my-6">
    <p class="text-2xl">Function composition</p>
</div>

I don't think I'd even heard the term "function composition" before I learned React, but it's so ingrained in the React development style that it's bound to rub off on you if you work with the library enough, which it eventually did with me. One day, after a few years and a few hundred function components, I had a mini-stroke. One of those wonderful Handel-seeing-the-face-of-God moments where I finally *understood* the React model. Finally grokked what I had been writing this whole time without even realizing it. Finally grasped the tool that undergirds the entire library:

It's all just function composition! 

Function composition cast through the mirror of the DOM, granted, but function composition all the same. Moreover, the components themselves aren't "components" at all, they're just functions themselves!

It's kind of a stupid epiphany isn't it? Of course they were functions this whole time. What else could they be? But when you *understand* that a component is a function, when you *realize* that you can call your *vanilla JS* functions like you call your React components, when you start applying the patterns of React to other parts of your codebase, it opens up some exciting new doors.

When I finally discovered function composition, it sent me off on all kinds of fascinating, fruitful paths of learning: from React, to the excellent [Ramda utility library](https://ramdajs.com/), and most recently to the mind-bending [Clojure](https://clojure.org/) and [ClojureScript](https://clojurescript.org/) languages. After walking these paths and learning more about the world of functional programming and composition, I want to bring things back to vanilla JavaScript, and put down everything I've learned on the subject into a series of accessible articles that explore the technique from many different angles.

## Goals for this series

One of the unfortunate things about functional programming is that many of the best resources and guides on the subject are very math-heavy, with a long list of scary-looking new words that you have to learn to access the ideas contained within. This is understantable given that the technique itself has its roots in math: lambda calculus, algebra, category theory, etc. Knowledge of these things is useful for gaining a deep understanding, but it's not necessary if you want to start using FP techniques and getting value from them right away.  

Even worse, many well meaning individuals have invented alternative terms for those math-heavy words in an effort to make them easier to swallow[^1]. They're less mathey, which perhaps makes them more approachable, but they've also muddied the waters for newcomers. Now you not only need to learn the *original* terms, but also the *alternative terms*, and have to keep the various sets straight when authors mix and match them. 

This makes functional programming techniques inaccessible for the non-academic, which is a tragedy! Especially when they're so immediately useful in our everyday programming tasks, and *especially* when so many of us in the frontend world are already using **the main technique** of FP when we write a React component, and we don't even realize it. 

So, the goals of this series are to make the techniques of code composition accessible and approachable through simple examples, both in a React context and a non-React context. The series has five parts:

1. In [part one](/composition-part-one), we'll get our feet wet by looking at composition through the lens of React. We'll look at components that don't compose, components that do compose, and introduce some key concepts along the way. 
2. In part two, we'll start to look at code composition more generally. We'll shift from React to vanilla JavaScript, and demonstrate some of the problems that code composition aims to solve.
3. In part three, we'll introduce some vanilla JS compositional techniques to solve the problems from part two, along with some handy utility functions which make composition easy.
4. In part four, we'll extend the basics introduced in part three. We'll apply them to a new code problem which is a bit more advanced and closer to what you work on in your day-to-day. 
5. Finally, we'll come back to React in part five, and do some cool, funky stuff with our newfound abilities to hammer the skills and concepts home.


I promise, you'll like what you learn. Let's jump in!

<p class="text-2xl mb-10"> 
    <a href="/composition-part-one">
        Next up: Composition Part One
    </a>
</p>

## Footnotes
[^1]: See also [https://xkcd.com/927/](https://xkcd.com/927/)