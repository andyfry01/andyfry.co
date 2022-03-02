---
layout: post
title: "Code Review How To: Clarity and Simplicity"
permalink: /code-review-how-to-clarity-simplicity
author_profile: true
read_time: true
comments: true
share: true
related: true
description: "Part three of a three part series exploring code review best practices. This post focuses on clarity and simplicity, with a focus on what exactly these concepts imply, general tools to increase simplicity and clarity in a codebase, and a review of a real piece of code for those same qualities."
header:
  large_image: /public/img/code-review-how-to/clarity-simplicity.png
  og_image: /public/img/code-review-how-to/clarity-simplicity-social.png
---
<link rel="stylesheet" href="/public/css/prism(3).css">

<img src="/public/img/code-review-how-to/clarity-simplicity.png" alt="Title graphic, background of ones and zeroes with 'Code Review How To: Clarity and Simplicity' overlayed on top">
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
An explainer for wtf this thing is. Short, with links.

## Today's topic
Today's topic is making things simple and clear. 

If you've spent any time programming at all, you know that things can get out of hand very, very quickly when it comes to code complexity. Functions which originally expressed simple, easy-to-understand bundles of operations become long and inscrutable. Your variable names get longer and weirder as you run out of words to describe things. The small beginnings of a solution to a problem quickly grow into massive and incomprehensible piles of spaghetti. 

The whole thing slowly morphs from a sunny, peaceful meadow full of beautiful flowers into a dark, scary forest of unintended consequences and bad surprises. 

It can be discouraging to watch this happen, and it can be discouraging to try to clean messy code up too. The strands of spaghetti can get really hard to untangle! But despair not dear readers, because we have tools and techniques to tame complicated and murky code! And code review time is a great opportunity to make use of those tools, so let's dive in.

## Broad themes

Defining a one-size-fits-all tool set to tackle every problem is of course impossible, but there are some general guidelines that you can consider when hacking through the underbrush:

- Break large functions into smaller functions
- Get to the point with variable names
- Use language tools to add intent and expressivity

Let's look at these individually:

### Break large functions into smaller functions

A classic symptom of complexity is a function that does too much. A function that spans hundreds of lines, with code blocks and variable names that disappear off of the right edge of the screen. A huge list of parameters. A name that bears little or no resemblance to what it actually does. You've seen it, I've seen it, we've both written stuff like this.

Many of these functions start out innocently enough, with a clear name and containing a basic and comprehensible set of tightly-related functionality, but over time things start to creep in. A few edge cases here, a couple of new requirements there, and all of a sudden you've got a huge Swiss Army blob on your hands that does everything and can't be understood. 

Cutting up these mega-functions into smaller bits can be intimidating, so start small. Forget the modules, namespaces, and capital A Architecture considerations: it can be as simple as wrapping up a piece of related functionality into a closure within your blob function. As you do this more and more, patterns will start to emerge, a sensible organization will become clear, and you can start to migrate these functions out when the time is right. 

But how small is too small? A good rule of thumb is to write functions that do "one thing." Now, that "one thing" could be as small as formatting a string and could be as big as initializing your whole app, but each function should contain one set of related functionality. As the great Ron Swanson put it:

> Dont' half-ass two things, whole-ass one thing. 

### Getting to the point with variable names
Somewhere in the desert, inscribed on an ancient tablet at the foot of a crumbling statue, is written this joke: 


> There are only two hard things in computer science: cache invalidation, naming things, and off-by-one errors. 

Another way to increase clarity is to focus on making good names for functions and variables. 

I know, I know, this is one of the most obvious things I could possibly say. The things you could know about good variable naming is a vast and deep ocean, but there are some easy tips we can fish out of it. 

One of those tips is the classic Strunk and White writing tip: omit needless words. If you overload a variable with too much context, qualifiers, and other hangers-on, you get what Kevlin Henney in the [Seven Ineffective Coding Habits of Many Programmers](https://youtu.be/ZsHMHukIlJY) calls "homeopathic naming": a watering down of meaning until there's nothing left. 

Would you rather read this: 
- `AccessViolationException`
- `EntryPointNotFoundException`
- `BadImageFormatException`

Or this: 
- `AccessViolation`
- `EntryPointNotFound`
- `BadImageFormat`

Another name for this is [Hungarian Notation](https://en.wikipedia.org/wiki/Hungarian_notation). This is a style of variable naming where you include words to indicate a variable's intention or type. Think things like `userStatusString` or `canEditBoolean`. There are [advantages](https://en.wikipedia.org/wiki/Hungarian_notation#Advantages) to this style of variable naming. Practiced in moderation, it can serve you well, but more often than not it just leads to long names which are harder to understand than they should be. 

### Using language tools to add intent and expressivity

Why do programming languages exist? If it all boils down to ones and zeroes in the end, why don't we just type those out directly and get rid of the middle man? Why do we have so much diversity in the ways that we program computers?

Well, it's possible to type out the ones and zeroes by hand, but it's way easier for us to work with human-understandable abstractions between us and the bare metal. Something that translates our very non-computerish ways of thinking into computerish terms. 

And so, if we can agree that more human-ish abstractions help us to think and understand what we're working with, then there must exist _better_ abstractions and _worse_ abstractions: symbolic representations of common operations that can be compared and ranked against each other in terms of how clearly they explain their functioning. 

One way to determine whether an abstraction is better or worse than another is whether you can tell what's going on from the outside; i.e., whether you can skim over a function and accurately imagine what it does without having to read every single line. 

It's like a book in a way. Imagine if we never transitioned from rolled-up scrolls and parchment to sheets of paper bound in books. Both scrolls and books can store the exact same information, but a book is way easier to use than a scroll, and much of that ease-of-use comes from the very format of the book itself. 

If you want to know what's inside a parchment, you've gotta take it down from the shelf, unroll it and peek inside. _Gently_ please! This thing is old as hell, and nobody's opened it in like 200 years! And then to actually read the thing, you've gotta unroll it. If it's small enough maybe you could do it in your lap, but larger and more officious scrolls need a flat surface to keep things from getting out of hand. If you're looking for information at the bottom of the scroll, I'm sorry to say it, but you've gotta unroll and re-roll the whole thing to get all the way down there. 

A book, on the other hand, has the title and the author on the front cover AND the spine, and it has summary information on the back sometimes too! You can get a great idea of what's inside based on that alone, and you didn't have to read a single page to find out. Maybe you didn't even need to take it down off of the shelf. If it IS the book you're looking for, it probably has page numbers and a table of contents at a minimum, and maybe an index, which makes it all the easier to flip to the exact point in the book that you need to go to, and easier still to flip back and forth between sections. No rolling and unrolling, just a flick of the thumb will do. 

There's a reason we don't record our important information on scrolls anymore: technology advancements and a sprinkling of printing conventions have rendered them obsolete, and have made everybody's lives a lot easier. And we can achieve similar results in our programs too. If we reach for better and more expressive abstractions, then everybody can understand each other's code faster, with just a little training in the meaning and use of those abstractions.

## Original code and example
The code we're looking at today is a tic-tac-toe game. 

The original can be found [here](https://github.com/BornaSepic/Tic-Tac-Toe). Play around with the code a little bit!

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

<div style="margin:1em calc(50% - 50vw);" class="not-prose" id="tic-tac-toe-original"></div>

## Review

There are some things that I really like about the code, which are mentioned in the review. But there are a few things which could stand to be improved, specifially about getting to the point with variable names, utilizing abstractions to aid comprehension, and general organization. Here's the reivew below: 

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
{% include /code_reviews/tic-tac-toe-html.html %}
</div>

<div class="not-prose">
{% include /code_reviews/tic-tac-toe-js.html %}
</div>
	
## Refactored code and example

And now that we've reviewed the code, let's see what those changes look like in practice: 

<div style="margin:1em calc(50% - 50vw);" class="not-prose" id="tic-tac-toe-improved"></div>

## Conclusion

Thank you for reading! In summary, we: 
- Discussed some general concepts about what makes code clear and simple to read 
- Took a look at some concrete examples of those general concepts through the Tic Tac Toe code
- Did a code review focusing on clarity and simplicity
- And finally, refactored that code so we can have a before and after look at what these concepts look like in practice. 

If you have some thoughts to add, please add a comment below or reach out to me! I'd love to hear from you.

\- Andy

<script type="module" src="/public/js/code_reviews/index-tic-tac-toe.js"></script>

<script src="/public/js/prism.js"></script>
