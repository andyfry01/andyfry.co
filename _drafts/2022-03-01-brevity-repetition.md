---
layout: post
title: "Code Review How To: Brevity and Repetition"
permalink: /code-review-how-to-brevity-repetition
author_profile: true
read_time: true
comments: true
share: true
related: true
description: "Code reviewing the game of pong!"
prism-centering: false
---
<link rel="stylesheet" href="/public/css/prism(3).css">

<img src="/public/img/code-review-how-to/brevity-repetition.png" alt="Title graphic, background of ones and zeroes with 'Code Review How To: Brevity and Repetition' overlayed on top">
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
Today's topic is _brevity_ and _repetition_: two closely related topics. Let's start with a brief overview of what repetition is:

### Repetition
One of the classic abbreviations you learn early on in your programming career is "DRY": "don't repeat yourself." Don't just write the same code over and over again: generalize it into reusable functions. 

And indeed, in many respects, this is good advice! If you've got a piece of code that repeats in many places in your app, then things get tricky when you have to change it. Changing one piece of repeated code means changing every instance of that repeated code. Perfectly. Every single time. Taking care not to miss a single repetition. This is easy enough with find and replace, but what if some instances of repeated code need special treatment? Like a specific variable which *this* code needs to run, or maybe a different function call in *that* code which isn't present elsewhere. In simpler scenarios, find and replace is a perfectly adequate tool, but in more nuanced scenarios it becomes a crude, indiscerning hacksaw, matching against and blowing away both the code that needs to change and the code which doesn't need to change. 

This is error prone to say the least. And tedious. And often exhausting. So to make our lives easier, we refactor repeated code into functions, abstracting many rote procedures performed at many points in an application into one tidy wrapper that holds it all. Make a change in one place, and that change will be reflected everywhere the function is called. 

Simple! Right? Well, kind of.

There's a reason that we still code this way even though we've got all kinds of wonderful tools to help us avoid repetition: abstraction is *hard*. Knowing what abstractions to apply to a given problem, recognizing commonly-occurring patterns, building in flexibility and refactorability to abstracted code: this takes experience. You've got to burn your fingers on the stove of knowledge a bunch of times before you acquire the nuanced understanding of how to wield the abstraction hammer appropriately. 

It's very much an art vs. science question - something that's hard to teach and impossible to generalize into a set of hard and fast rules. 

But generalize we must. So here is a set of fuzzy ideas about how and when to refactor and abstract: 

- If you try to turn repetitive code into a reusable function too early, then it's very easy to tie yourself into knots. When you're in the early stages of writing an app, you're an explorer. Unless you're doing some rote coding exercise that you've done a hundred times before, you don't really understand the problem you're trying to solve with your code until you've spent some time working within it and exploring the nuanced facets and edge cases that it contains. Until the edges of the problem become better defined, many of the predictions you make about the kinds of functions you'll need will be premature and inaccurate. 
- Thinking about your initial explorations as a first draft is a good way to think of the process. If you're coding blindly in the dark, you may as well hard code things, copy and paste code, and generally just hack around until things start working. Once the draft is fleshed out, the editing and refining process can begin. You can start to look for repetitions, similarities, variations on themes that can be abstracted into functions. You'll have your hard-won knowledge of the problem domain to lean on, and you can more confidently identify which code would benefit from refactoring, and which code should be left alone.
- The refinement stage is also a great opportunity to step back and think about your code. It's very easy to get wrapped up in the details when programming, which tends to wash out the big picture. If you take some time once in a while to look at the whole, then you'll start to see and appreciate a lot of little things that can be improved or done differently. 

Ultimately, repetitive code is a problem because of our limited human brains. At a small scale, repetition is a small problem. But as an app grows, the sheer volume of characters and words starts to become more and more expensive. You pay that cost with the time and mental effort you spend reading everything and cramming all of that information into your mind.

### Brevity

Brevity is a closely related topic. If reducing repetition is the art of abstracting repeated code into flexible and reusable functions, then brevity is the art of communicating the concepts that underly variable names and procedures in the shortest terms possible. The art of expressing an idea with the fewest characters possible, but no fewer. 
	
And just like repetition, brevity itself is a sword that cuts both ways: 

- At its best, brevity helps you see more at a glance: if your code is short and to the point, then you can fit more of it on your screen, and you can therefore see more of the big picture at once. 
- And yet, there is a line to draw with brevity as well. If you go too far and your code ends up too brief and terse, then it can become inscrutable. But even still, "too brief" is largely a matter of taste and experience. Would you rather read this: 

    ```js
    const f = x => x * x
    const g = x => x * -1

    const x = f(g(2)) 
    // -> 4
	```

    or this

    ```js
    const squareNumber = function(number) {
        return number * number
    }
    const numberToNegative = function(number) {
        return number * -1
    }

	const negativeTwoSquared = squareNumber(numberToNegative(2))
	// -> 4
	```

When it comes to which is "better," you could make a case for either of those examples. Which one you decide to go with is a personal matter. What are you comfortable and familiar with? What is your team comfortable and familiar with? Which one "feels" right? These are all important and valid questions when deciding where to draw the line. 


## Original code and example
The code we're looking at today is the classic game of Pong. Here's the original code below and a working example you can play ("W" and "S" control player 1, the up and down arrows control player two, press Enter to start). 

Have a look at the code, play a couple rounds of the game. We'll review the code for repetition and brevity in the next section. 

<style>
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
   .playground {
     font-size: 16px;
   }
</style>

<div style="margin:1em calc(50% - 50vw);" class="not-prose" id="pong-original"></div>

## Review

With our mission in mind, let's start in on the code review. There are a few comments outside the scope of repetition and brevity, but all of it is intended to make the code easier to read and quicker to understand. 

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
{% include /code_reviews/pong-pr.html %}
</div>


## Refactored code and example

Now that we've done the review, let's check out the code with the changes implemented:

<div style="margin:1em calc(50% - 50vw);" class="not-prose" id="pong-improved"></div>

## Conclusion

Thank you for reading! In this blog, we: 
- Defined what brevity and repetition are, along the costs of verbose and repetitive code
- Took a look at some example code, and reviewed it with the objective of making it clearer to read by making it less repetitive and verbose
- Implemented those changes for a "before and after" perspective 

Thank you for reading! Feel free to leave a comment below or to reach out to me if you have any other thoughts about anything we've covered today, I'd love to hear from you!

\- Andy

<script type="module" src="/public/js/code_reviews/index-dots.js"></script>
<script src="/public/js/prism.js"></script>

