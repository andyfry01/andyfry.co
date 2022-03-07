---
layout: post
title: "Code Review How To: Organization"
permalink: /code-review-how-to-organization
author_profile: true
read_time: true
comments: true
share: true
related: true
description: "Part one in a three-part series where we explore the art and science of performing code reviews. We start out looking at the how's and why's of code organization in this article: with broad concepts for organizing code and a real code review where we demonstrate those concepts."
prism-centering: false
header:
  large_image: /public/img/code-review-how-to/organization.jpg
  og_image: /public/img/code-review-how-to/organization-social.jpg
---
<link rel="stylesheet" href="/public/css/prism(3).css">

<img src="/public/img/code-review-how-to/organization.jpg" alt="Title graphic, background of ones and zeroes with 'Code Review How To: Organization' overlayed on top">
<a class="text-sm text-center block"  href="https://www.freepik.com/vectors/technology">Technology vector created by starline - www.freepik.com</a>

Welcome to Code Review How To! This is a three-part series where we take a look at the art and science of performing code reviews. 

In this series, we'll look at some JavaScript code examples pulled from a few very cool blog posts and Codepens. We'll examine the code through three different lenses:

- [Code organization](/code-review-how-to-organization)
- [Clarity and simplicity](/code-review-how-to-clarity-simplicity)
- [Brevity and repetition](/code-review-how-to-brevity-repetition)

There are a lot of ways you can review and critique code: performance, security, idiomaticity, the list goes on. In my own practice, I like to focus on _readability_, that elusive white deer in the forest which makes code easy to understand at a glance without getting all tangled up in the specifics. 

Code that's easier to read is easier to write, and easier to change and adapt to new needs as they arise. My grand ambition in reviewing code is to bring it just a little closer to the Golden Dream of programmers everywhere: code that says what it means, is easy to modify, and holds no surprises.

What constitutes "easier to read" is, of course, largely up to interpretation. I said "art and science" in that first paragraph because the craft of programming is in many ways still in its infancy, and much of what we do is driven by taste and convention rather than by "hard universal truths" that other professions like mechanical engineering enjoy. There are some things in the programming world which can be said to be "true" in that engineering sense, but much else is still theory. 

There are a few things, however, which look like proto-truths to me. Things like immutability, functional style, and some basic tenets of organization and reuse, which I think can be applied to great effect in many different contexts. If you're down to hear my perspective on the matter, I'd love to bring you along with me as we explore these concepts.

## Today's topic
Today's theme is *organization*. But why organize code at all? Depending on the language, there are a few hard and fast rules of organization that you must follow as you write: 
- in JavaScript, you can't reference a variable defined with `const` or `let` before it's been defined
- in Haskell, you can't call a function without first defining its type signature
- in Java, everything must flow from some function call executed in the `main` function of your app.

Beyond those language-imposed rules, how you organize your code is, uh, kinda up to you man. You can put anything anywhere, and as long as it colors inside the lines it'll run. This kind of "externally imposed organization" is not the kind of organization I'm talking about. For the purposes of this exercise, I'm going to define code organization this way:

> Code organization is the grouping of like concepts together within a program to aid the comprehension of a human reader. 

Once upon a time, the organization of code was not something you did to make it easier to understand: if anything, the organization of code was something undertaken to make it run, *period*. Back in the Elder Days, when the world was young and the sun shone more brightly, you had to write, read, and debug a program exclusively in the order of its execution. 

In other words, we didn't have the multitude of human-readable layers of abstraction sitting between the programmer and the bare metal of the machine like we do today: you had to think like the computer and express yourself to the computer in computerish terms. Ones and zeroes instead of words and ideas. Since those days, the grand ambition of the programming world has been to invent languages, tools and techniques which enable us to think and express ourselves in human-ish terms. 

It's hard to fully appreciate the mind-bending implications of these developments if you haven't lived to watch the transition unfold yourself – hard to fully comprehend that you can write your code and execute in two completely different ways, and that this was once not possible. 

To get a taste of what programming was like *before* the development of human-ish symbolic programming languages, here's a description of the process that NASA engineers would go through while developing and debugging the (literally) hard-wired Saturn V computer:

<div class="videoWrapper" style="--aspect-ratio: 3 / 4;">
    <iframe class="mx-auto" width="560" height="315" src="https://www.youtube-nocookie.com/embed/dI-JW2UIAG0?start=361" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

It's at once fascinating and horrifying, isn't it? Utterly heroic in scope, and yet the thought of debugging telemetry data by hand – of burning up untold hours of human life on a task which can be performed in minutes with our modern tools – gives me a cold feeling in my stomach. 

So! Let's take advantage of our modern-day blessings and take a look at some techniques which will make our code more organized and easier to understand. 

### Broad themes

How to organize code for readability is huge question. It's one of those things that's more art than science. Something driven by tastes and convention more than empirical rules. My techniques for reviewing and improving code organization fall into a few broad themes:

1. Strategic white space. The purposeful separation ideas with newlines and spaces can be immensely communicative. Compare this:

    ```js
    const first = "Hello";const second="world";console.log(first," ",second)
    // -> Hello world
    ```

    with this: 

    ```js
    const first = "Hello";
    const second = "world";
    console.log(first, " ", second) // -> Hello world
    ```

    and this: 

    ```js
    const first = "Hello";
    const second = "world";

    console.log(first, " ", second) // -> Hello world
    ```

    The first was an obviously bad example. The second is acceptable. But in the third example, the simple addition of a newline has delineated what we're working with and the actions that we're performing on those things. Which segues nicely into our second theme:

2. Actions, calculations, and data. You can find all kinds of esoteric and intimidating concepts in dusty corners of the functional programming paradigm, but some of the most useful ideas that FP has to offer are some of the most obvious and intuitive. In FP, we can broadly break apart any program into three big conceptual chunks:
- __Data__. this is what your program has to work with. It could be user input, rows from a database, constant variables, even hard-coded strings. This is the *Urstoff* that a program is made of. The raw ingredients of our stew.
- __Calculations__ are the ways in which you combine data together into new forms. Going back to our food analogy, a function of `carrots`, `onions` and `celery` to `mirepoix` is a calculation. In programming terms, calculations could be literal calculations like `1 + 1 = 2`, but any function which takes data in and returns new transformed data is also a calculation. A SQL `join` would be a calculation that takes two tables in a database and renders them in one view. A `map` function which transforms a list of coordinates into points on a map could be another calculation. A string template literal which turns two variables into a single string is also a calculation: 
    
    ```js
    const first = "Hello";
    const second = "world";

    `${first} ${second}` // -> Hello world
    ```

    - Finally, there are __actions__. Actions are the "effectful" things that your program does. If calculations are pure operations on immutable data – where running the same calculation produces the same result no matter what – then actions are all the things we do where repeated calls to the same function can or even should produce different output. You can't delete the same database entry twice, a `fetch` of a data resource might fail due to a network connection, and while you can make the same delicious stew from the same ingredients, you're not gonna enjoy a hot, savory bowl on a sweltering summer day the same way you do on a cold winter evening.

## Original code and example

The code we're working with is an "Interactive Dot" Codepen by [Prayush S](https://codepen.io/prayushS). You can find the original pen [here](https://codepen.io/prayushS/pen/DKXboP?editors=1010), although I've also got the running code down below. 

Check out the code, play around with the example a bit. I like to pick one dot and use the force field to make it fly around way faster than the other dots.

<style>
 @media (max-width: 576px) {
	.go89676631.go697426381 {
	  width: 100% !important;
	  max-height: 80vh;
	}
	.go89676631 {
      width: 100% !important;
	  height: 50vh;
	}
	.go1514008979 div {
      overflow: scroll !important;
	}
 }
 @media (min-width: 577px) {
 
    .go3030795041 {
        max-height: 90vh;
        min-height: auto;
    }
    .go1671171827 {
        max-height: 90vh;
    }
    .go3984977353 {
        overflow: scroll;
        max-height: 90vh;
    }
    .go1514008979 > div {
        overflow: scroll !important;
   } 
 }
   .playground {
     font-size: 16px;
   } @media (max-width: 576px) {
	.go89676631.go697426381 {
	  width: 100% !important;
	  max-height: 80vh;
	}
	.go89676631 {
      width: 100% !important;
	  height: 50vh;
	}
	.go1514008979 div {
      overflow: scroll !important;
	}
 }
 @media (min-width: 577px) {
 
    .go3030795041 {
        max-height: 90vh;
        min-height: auto;
    }
    .go1671171827 {
        max-height: 90vh;
    }
    .go3984977353 {
        overflow: scroll;
        max-height: 90vh;
    }
    .go1514008979 > div {
        overflow: scroll !important;
   } 
 }
   .playground {
     font-size: 16px;
   }

</style>


<div style="margin:1em calc(50% - 50vw);" class="not-prose" id="dots-original"></div>


## Review

Altogether, it's a great little concept, but reading the code itself is tricky. You can see some of the organizational concepts I mentioned above being applied already, but the clean separation of actions, calculations, and data into discrete buckets is incomplete at best. 

So, with our mission in mind, let's do a code review! A few comments will fall outside the scope of organization, but all are intended to take this very cool code and make it more readable.

<style>
  .js-resolvable-timeline-thread-container, comment-holder js-line-comments {
    width: 100%; 
  }
  .comment-holder {
	max-width: 100% !important;
  }
  /*
  .blob-code-inner {
    font-size: 15px !important; 
  }
  */
  .text-normal strong a {
	visibility: visible !important;
  }
  .comment-body ul, js-comment-body ul {
	list-style: square !important;
  }
</style>

<div class="not-prose">
{% include /code_reviews/dots-pr.html %}
</div>

## Refactored code and example

Now that we've finished the review, let's implement the suggested changes and see what things look like. As an exercise in good digital citizenship, I've also made some accessibility-related changes which didn't make it into the review. Refactoring for organization, however, made these big changes much easier to implement than it would have been in the original version of the code. Focusing on readability makes code inherently easier to change down the line!

<div style="margin:1em calc(50% - 50vw);" class="not-prose" id="dots-improved"></div>

## Conclusion

Thanks for reading! In summary, we: 
- Defined what code organization is: the grouping of like concepts together within a program to aid the comprehension of a human reader. 
- Did some musing on why you'd want to organize your code at all, and a little historical analysis of how code has been written and organized
- Introduced some key concepts for improving code organization: whitespace, and the separation of code into the buckets of actions, calculations, and data
- Took a look at a real code example, performed a review of it, and refactored the code based on the review. 

The idea of "actions, calculations, and data" was a big revelation for me when I first learned it. If you'd like to dive in deeper on the topic, here are some resources: 
- [Grokking Simplicity](https://www.manning.com/books/grokking-simplicity) by Eric Normand, a fantastic educator 
- [What is the superpower of functional programmers](https://lispcast.com/what-is-the-primary-superpower-of-functional-programmers/), which does a broad overview of actions, calculations, and data.
- ["What is an action"](https://lispcast.com/what-is-an-action/) on LispCast 
- ["What is a calculation"](https://lispcast.com/what-is-a-calculation/) on LispCast

Until next time

\- Andy


<script type="module" src="/public/js/code_reviews/index-dots.js"></script>
<script src="/public/js/prism.js"></script>
