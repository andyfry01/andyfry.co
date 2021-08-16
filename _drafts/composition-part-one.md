---
layout: post
title: Code Composition, Part One. Compose yourself!
permalink: /composition-part-one/
author_profile: true
read_time: true
comments: true
share: true
related: true
---
<link rel="stylesheet" href="/public/css/prism.css">

## The idea of composition 

Composition is a term that gets thrown around a lot in programming circles: 

- "Composition over inheritance!"
- "Decompose complicated problems into sets of smaller problems!" 
- "Monolith bad! Modularity good!"

But what is it? Basically, it's writing code in the style of Lego bricks. What you're building might be a house, a car, or a spaceship, and what you've got is a set of standardized, interchangeable pieces to build it with. Some of those pieces might be unique (like a laser cannon or a flag on top of a castle), but the vast majority of them are interchangeable. Could be a yellow block, could be a red block, maybe you want to use one of those double-length ones instead of two smaller ones, doesn't matter: you'll have your desired shape at the end no matter what. 

Not only that, but you can easily swap out bricks with other bricks even after you've built the whole structure! 

This tidy analogy sounds nice doesn't it? I think most of us strive in some way to program like this, but when was the last time you reached into the guts of your code, pulled something out, and replaced it with something entirely new? If we're talking about Legos, we're already done once we snap that new piece into place. 

If we're talking about most codebases, you've probably just pulled on a thread that will unravel the whole sweater. 

Maybe you've got the time and budget to address the bugs, plug the holes in the dike, and replace that old crappy thing with a better thing. But more likely than not, you've had to make the agonizing, pragmatic choice of just leaving the old crappy thing in there. Hell, I had to do it just yesterday. 

Code composition helps us to avoid these nasty sweater unravelings. And yet, the concept is just esoteric enough to leave you scratching your head when it comes to actually applying it to your real, everyday programming tasks. Programming with Lego pieces sounds awesome, so why is it so tricky to actually pull off? 

Most of us only encounter compositional programming styles after we've already been programming for a while. Our brains are usually wired to write [imperative-style code](https://en.wikipedia.org/wiki/Imperative_programming), and it's hard to bridge the gap over to a compositional style. 

It looks weird, it feels weird, it's uncomfortable. This makes it a hard sell to someone who already knows how to program, and tough to learn besides. 

But if you've built apps with React, you likely write in a compositional style all the time without even realizing it! Let's take our first steps into the pool, check out a simple set of React components, and examine specifically where composition is occurring within the example.

## React component composition

Well, actually, let's start with what composition ISN'T and then work backwards from there. Say we want to build a shopping list, and we need to have both ordered and unordered lists. Here's something which might look familiar, and which doesn't use many compositional techniques:  

```jsx
import React from "react";
import ReactDOM from 'react-dom';

const things = ["Milk", "Eggs", "Cheese"];

const UnorderedList = props => {
  const listItems = props.items.map(listItem => <li>{listItem}</li>);

  return <ul>{listItems}</ul>;
};

const OrderedList = props => {
  const listItems = props.items.map(listItem => <li>{listItem}</li>);

  return <ol>{listItems}</ol>;
};

const Example = () => {
  return (
    <>
      <UnorderedList items={things} />
      <OrderedList items={things} />
    </>
  );
};

ReactDOM.render(<Example />, document.getElementById('root'));
```

It does what we need it to do. If I never had to touch this code again in my whole life, I'd call it done. But things could get sticky fast if you have to maintain or update this in the long-term.

I can see two problems that affect quality and which aren't very compositional: duplicated code, and unneccessary wrapper code. 

### Duplicated code
There's duplicated code for building the lists for instance, which doubles the overhead maintenance. Say we wanted to make all of the list items bold, or add checkboxes to them. We'd have to do that in two places, both `UnorderedList` and `OrderedList`. 

Not only that, but we have two separate components just for the different list types, when they only differ in the type of list they render. 

Composing components together allows you to avoid these kinds of patterns. We'll refactor this code later to show you exactly how a compositional approach can improve things, but let's look at the next problem first:

### Unneccessary wrapper code
Remember what I said earlier? React components are just functions. That applies not *just* to the components *we* write ...

```jsx
// This:
const DivGrimace = () => <div>😬</div>

// Is actually this:
const DivGrimace = () => React.createElement("div", null, "😬")
```

.. but ALSO to the *baked in components* that we use via JSX. They look like their HTML equivalents, but *they* are functions too! [^2]

```jsx
// This: 
<ol>
  <li>World's shortest Todo list</li>
</ol>

// Becomes this: 
React.createElement("ol", 
                    null, 
                    React.createElement("li", 
                                        null, 
                                        "World's shortest Todo list"))

// ... Imagine writing a whole app like that.
```

So why wrap the "`ol` function," whose sole purpose is to add an `ol` element to the DOM, with another function at all? We don't cook with the papery exterior of an onion do we? What we're really interested in is what's *inside*. A compositional style encourages you to avoid adding unnecessary wrapper code.

## What's really the issue?

Those problems of duplication and wrapper code all revolve around the idea of things being locked away. The concept of "what's inside" lies at the heart of composing components together. 

What should be inside a component? What should be outside a component? And how do we take the innards out in a way that leaves us less confused and more flexible? That last question is the most important in my opinion. A good programming technique makes your code more accessible, easier to work with, and more amenable to future changes. 

First, let's have a look at just one of those components from the previous example: 

```jsx
const OrderedList = props => {
  const listItems = props.items.map(listItem => <li>{listItem}</li>);

  return <ol>{listItems}</ol>;
};
```

If you look closely, you can see that almost the entire implementation for this list is locked away inside the component. All the little pieces that come together to make this thing are enclosed within `OrderedList`'s shiny braces. The list type, the map function which produces the list items, even the *name* that you have to give to the list: `props.items`. This component does absolutely everything for you. The only part of the equation that it *can't* know beforehand is the list: you supply that yourself. As a consequence, that's the only part of the equation that *you can control*. 

Or better stated: it's the only part that you can control without altering the `OrderedList` component itself. 

### The problem with boxes

You can think of these kinds of components like magic boxes. Or maybe they're like a perfectly good iPhone with an old battery. Or an overbearing coworker. Magic boxes, magic consumer products, and micromanagers are huge bottlenecks to progress. Every time you need to get something done, and especially that something is small, you're forced to put in an outsized amount of effort to just get the thing did.

What's in that magic box? No way to tell from the outside, you have to open it up to see. 

Want to swap out the battery in the iPhone? Good chance you're gonna break the phone by prying open the glued-shut casing. 

Need to make a slide deck for the presentation tomorrow? Well, toss it on the pile and put your feet up, your coworker has to do absolutely everything themselves and won't delegate anything to you. 

What we want to do is wrest back control from these "magic box" components. Granted, a component has to do *something* useful at the end of the day. Why write it in the first place? They should be useful enough to deliver value, but not so "useful" that you have to contort in uncomfortable ways to get anything done. 

## Unlock the box

So! How do we free the contents of the box? How do we use composition to make these brittle, single-use components more flexible and easier to change from the outside? How about like this: 

```jsx
import React from "react";
import ReactDOM from 'react-dom';

const things = ["Milk", "Eggs", "Cheese"];

// xs, as in: "multiple things called X"
const aListOf = xs => xs.map(x => <li>{x}</li>);

const Example = () => {
  return (
    <>
      <ol>{aListOf(things)}</ol>
      <ul>{aListOf(things)}</ul>
    </>
  );
};

ReactDOM.render(<Example />, document.getElementById('root'));
```

Let's look at each piece of this individually: 

The first thing is to take the list builder function outside of the container. You don't need the implementation to be locked away inside the magic box, you can just as well build it on the outside and pass it in as a prop to `<ul>` or `<ol>`[^3]:

```jsx
const aListOf = xs => xs.map(x => <li>{x}</li>);
```

On top of  that, we've removed the wrapper function entirely. Instead of enclosing the concept of a `ul` or an `ol` in an unneeded container, why not just use the pre-built function you've got already?

```jsx
<ol>{aListOf(things)}</ol>
```

Much better! We have less code in general, and what remains is:

- **more flexible**: if you need to make changes, you can work on each instance of a list individually instead of mucking around in some big übercomponent.
- **more essential**: the code is a closer, plainer description of the problem being solved. You don't need to peel away layers of code to get to the heart of the thing. It's all plainly visible from the outside.

It all creates more room to breathe. And we're gonna need the room too: now we need *some* of the lists to contain links, and *some* to be plain list items. This requires a hairy, monolithic change in the first version of our code:

```jsx
import React from "react";
import ReactDOM from 'react-dom';

// The list is now a list of objects with "text" and "link" properties. 
const things = [
	{text: "Milk", link: "www.milk.com"}, 
	{text: "Eggs", link: "www.eggs.com"}, 
	{text: "Cheese", link: "www.cheese.com"}];

const UnorderedList = props => {
  // We need two things here: a prop which turns on our new link feature, and conditional logic for rendering a list with and without links. 
  // It's a small thing now, but after a few rounds of this kind of customization and tweaking, you'll end up with some seriously hairy code
  const listItems = props.hasLinks 
    ? props.items.map(listItem => <li>{listItem.text}</li>)
    : props.items.map(listItem => <li><a href={listItem.link}>{listItem.text}</a></li>);

  return <ul>{listItems}</ul>;
};

const OrderedList = props => {
  // Not only that, but we have to double up the code between two different components! It's the exact same stuff!
  const listItems = props.hasLinks 
    ? props.items.map(listItem => <li>{listItem.text}</li>)
    : props.items.map(listItem => <li><a href={listItem.link}>{listItem.text}</a></li>);

  return <ol>{listItems}</ol>;
};

const Example = () => {
  return (
    <>
      <UnorderedList items={things} hasLinks={true} />
      <OrderedList items={things} />
    </>
  );
};

ReactDOM.render(<Example />, document.getElementById('root'));
```

By contrast, we need just a couple compositional touches to solve the task with our new code:

```jsx
import React from "react";
import ReactDOM from 'react-dom';

// Same as before, the list is now a list of objects with "text" and "link" properties
const things = [
	{text: "Milk", link: "www.milk.com"}, 
	{text: "Eggs", link: "www.eggs.com"}, 
	{text: "Cheese", link: "www.cheese.com"}];

// Our old list-maker function from before
const aListOf = xs => xs.map(x => <li>{x}</li>);
                             
// One new function, which wraps our list items in an anchor tag first!
const linksOf = xs => xs.map(x => <a href={x.link}>{x.text}</a>);

const Example = () => {
  // Most significantly: we didn't need to add any new props to anything. No new concepts to fit into our heads, no ever-expanding list of props, no duplication. Just a single new function call and a quick "unwrapping" of the text property from our new object-based list of things.
  const itemsWithLinks = aListOf(linksOf(things));
  const normalItems = aListOf(things.map(x => x.text));

  return (
    <>
      <ol>{itemsWithLinks}</ol>
      <ol>{normalItems}</ol>
    </>
  );
};

ReactDOM.render(<Example />, document.getElementById('root'));
```

Pretty cool right? The same thing with less work and more control from the outside. I'd call that a big win!

## In summary

This article touched on code composition from the perspective of React. React has the model of component composition at its core, and the things that those compositions produce – DOM elements – are easy to relate to. We're not producing esoteric things like objects or arrays[^4]; we're producing links and lists and images. You can inspect it with the browser. What your code produces is (usually) visual and plain to see, and that makes it very relatable.

The easiest way to add composition techniques to a component is taking what's on the inside and putting it on the outside. Code that's locked away on the inside of a component is hard to change from the outside, and creates friction when requirements change. Code that's "built" or "assembled" on the outside, on the other hand, is easier to customize after the fact. This makes your code more robust, easier to maintain, and easier to understand. 

## What's next?

There's more to life than React and the DOM! How do we apply these techniques to vanilla JavaScript? Not only that, but I didn't _really_ show you every facet of the composition diamond either. There's more to it than "take stuff from the inside and put it on the outside," and it can solve different kinds of problems than the what we've seen so far. 

In the next article, we'll focus on code composition with vanilla JavaScript, and we'll get a little closer to the heart of what composition is. If you understood how to do composition in a React context, but haven't tried it for non-React code, then you'll be pleasantly surprised at how much easier this makes your vanilla JS programming! 

Even if you didn't grok everything fully, that's ok. Seeing things from many different angles makes it easier to form connections between concepts and bridge the gap to new understanding. Maybe the above examples will become more clear to you after we explore the fundamentals more closely in the following article. 

And hey, even if you already know this stuff backwards and forwards, you might still learn something new :) 

See you then!

[^2]: Haven't seen React.createElement before? Check out the [React documentation](https://reactjs.org/docs/react-without-jsx.html) for a nice explanation of what it is 👍
[^3]: This concept is known as "layers of indirection" if you'd like to read more about it: [https://lispcast.com/is-your-layer-of-indirection-actually-useful/](https://lispcast.com/is-your-layer-of-indirection-actually-useful/)
[^4]: Calm down nerds, I know on some level that this actually _is_ what we're building. Indulge me in the argument for a moment.

<script src="/public/js/prism.js"></script>