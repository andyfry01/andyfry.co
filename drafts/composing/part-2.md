# Part two: vanilla function composition

If you could follow along with the previous post, congratulations! You understand function composition. Or at least you understand function composition as viewed through the lens of React. But what was going on that whole time, really? We put a couple lego bricks together in the manner prescribed to us by the React docs, but what's going on beneath the framework to make this possible? 

There is WAY more to function composition than just assembling React components, and there is WAY more to be gained from function composition than is apparent from the picture of composition that React gives us. You get a very specific vision of it with React: function composition as a means to create and modify the DOM. 

There's more to life than the DOM though, how do we bridge the gap and apply composition to more general programming tasks?

Once you get there, you realize that composition is a powerful tool. Once I understood it, I felt instantly elevated above the inscrutable labyrinth of day-to-day programming drudgery. Before, I felt like every problem was right up against my nose, and that I was just writing the same old bespoke code for the same old problems. Feeling like there's some kind of pattern behind it all, but unable to push the problems away so I could see the patterns within them.[^3] 

Composition can give you wings to rise above all of that. Just don't fly too close to the sun 😉.

## Vanilla JS Composition Techniques

All that being said, let's start down the road to learning how to do vanilla JS function composition. We'll take the same approach as before. In this article, we'll start with a code example that doesn't use composition, and highlight some specific problems that happen when code isn't composable. 

### Part one: back to school

It always has to be basic math with these things, doesn't it? 

```js
const add = (x, y) => x + y

add(10, 5);  // -> 15
```

Nothing too surprising going on there, right? Just a function that takes two arguments and adds them together.

And ... uh, there's a problem with this? How could you possibly improve on this code? Why would you do it differently? 

If you're feeling a little skeptical at this point, I could hardly blame you. Basic math is the most universal, relatable tool we have to explain a lot of programming concepts, but the scale of a basic math example is so small as to seem ridiculous. 

Indulge me for a moment and trust that we can solve many bigger, hairier problems with the techniques that we'll employ on this contrived and silly example. To discover those techniques, let's start by asking a few weird questions of this adder function:

### Weird question 1: what if we have to add the same number to a lot of different numbers?

What if we have a big pile of fives that we have to add to a big pile of other numbers? Easy! We just call it with that same number over and over again right? 

```js
const add = (x, y) => x + y

add(5, 5)  // -> 10
add(5, 12) // -> 17 
add(5, 4)  // -> 8
add(5, 18) // -> wait a minute ... 5 + 4 isn't 8!
add(5, 6)  // -> 11
```

This works, but as all dutiful programmers know, this code is not very [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Imagine if all of this code was split between different modules, or if we had a set of 1000 numbers to add to five instead of just a handful. It would be really tedious to change later down the road. Modern IDE tooling makes it easy-ish to refactor this stuff, and therefore makes it easy to write this kind of code without incurring a very high productivity penalty.

But as Ben Kenobi might put it: we have elegant weapons from a more civilized age to solve these kinds of problems. You might be able to refactor this stuff with IDE tools, but no tool can save you from the mental efforts of just _reading_ all of that repetitious code. 

More on that later, on to our second weird question:

### Weird question 2: what if we want to add a bunch of numbers together, one after the other?

This is a twist on the previous example. All of those numbers we were trying to derive were one-offs, being added up into separate unrelated sums, but NOW we need to add a bunch of different numbers to the SAME number:

```js
// We need to add this
28

// To these these: 
[6, 42, 12]

// Using only this
const add = (x, y) => x + y
```

And now we walk the tortuous path that this `add` API has laid for us. Here's one awful way to do it:

```js
const thirtyFour = add(28, 6)
const seventySix = add(thirtyFour, 42)
const eightyEight = add(seventySix, 12)
```

I bet you've encountered less silly but equally annoying examples of this in your day-to-day work. Real-world math gives us a simple, terse method to solve the problem: `28 + 6 + 42 + 12 = 88`. But real-world programming languages often don't have easy ways to make equivalent "sequential calculations" on things that aren't numbers. Or even if they do, they aren't among the common practices of the language. 

And so we save everything in variables, and we rapidly discover one of the reasons why this is true:

> There are only two hard things in Computer Science: cache invalidation and naming things.
> \- Phil Karlton

*Why* is it hard to name things? You run out of good names really quickly! Especially when you don't have techniques to stem the endless flood of things-that-need-naming. 

Now for the third and final weird question for today:

### Weird question 3: what if we don't know one of the numbers beforehand?

Well ... uh, let's find out:

```js
const add = (x, y) => x + y;

// Fair enough
add(5, anotherNumber) // -> ReferenceError: anotherNumber is not defined

// Makes sense
add(5, undefined) // -> NaN

// Wat 
add(5, null) // -> 5 

// ... let's just ignore that last one ok?
```

In the tidy domain of pure math, of course, this doesn't happen. You either know all of the information up front, or you've got the means within your equations to fill in the blanks for what you don't know yet [^ 3]. In this uncomfortable, non-deterministic dreamscape that we call reality, we're constantly lacking and seeking all kinds of information:

- "How much time has elapsed since that thing happened?" 
- "Which user is logged in right now?" 
- "Is my API server even running?" 

So we need a way to account for information that we don't know yet. 

Things get interesting if you look at the problem from the other end: what if we DO know one of the numbers beforehand? What about the definitive, baked-in stuff that doesn't change. What if we focus on that? This is stuff like: 

- "How high can the player jump in this game?"
- "How long should we wait until trying that API call again?"
- "What is the airspeed of an unladen swallow?"

Now that's interesting information. It's easier for us to focus on what we DON'T yet know if we definitively bake in all of the things that we DO know beforehand and WON'T change during the lifetime of a program. This is an important consideration: if you can clearly express what won't change, you can spend more time focusing on what will. 

### Solving these problems without function composition [^ 4].

Now that we've explored the sticky edges and shortcomings of our adder function, how do we change it? How do we turn it into a better, more refined tool? Well, as with most journeys, there's an awkward middle part before you get to your destination.

Of course, we've been able to solve all of those issues from the previous section this whole time. There are some obvious beginner-level techniques waiting in the wings. Even still, they all have their downsides. By exploring those downsides, we'll discover a little piece of the function composition solution to these problems.

#### Beginner solution 1: adding many numbers to the same number

How do you do this without repeating code? With loops of course!

```js
const add = (x, y) => x + y

const numbers = [5, 12, 4, 18, 16]
const addedNumbers = []

numbers.forEach(num => addedNumbers.push(add(5, num)))
// -> [10, 17, 9, 23, 21]
```

But loops and especially array pushes introduce a new problem: **mutability**. Simply put: you're changing that `addedNumbers` array each time you loop through `numbers`. The seemingly innocent act of changing the value of a variable can create massive headaches down the line. If you don't believe me, consider that [there are](https://elm-lang.org) [entire](https://clojure.org/) [languages](https://www.rust-lang.org/) which revolve around the idea of immutability, and [most of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) [the latest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) [language features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) of JavaScript are immutable in nature. 

Mutability is impossible to completely avoid. All programs change *something*: a row in a database, a pixel on a screen, the number of rounds in your blaster pistol. A completely immutable program would be nothing but a peaceful, silent statement of facts. There are domains of human activity that are content with such changeless things, but commercial software development ain't one of them.

Even still, mutability is good to avoid when you can. And you can!

#### Beginner solution 2: adding numbers to each other sequentially

You could do the "save every computation in a variable" thing demonstrated above, but saving absolutely everything in a variable has drawbacks. It rapidly drains your [namespace](https://en.wikipedia.org/wiki/Namespace) of all of its simple and expressive words. It's like [slash-and-burn farming](https://en.wikipedia.org/wiki/Slash-and-burn): cheap and easy in the short term, but utterly ruinous in the long term. 

Thankfully, we have the Matroyshka doll technique! This relies on passing functions *directly to other functions*. Functions are [first-class citizens](https://en.wikipedia.org/wiki/First-class_citizen) in JS, which means they can be passed as arguments, just like variables:

```js
const add = (x, y) => x + y

// It works one level deep: 
add(1, add(2, 3)) // -> 6

// Or many levels deep:
add(28, add(6, add(42, 12))) // -> 88
```

This is fine in limited contexts. I do it all the time. But I'm sure you can see the limitations right away. What if we had ten numbers instead of four? 

```js
const add = (x, y) => x + y;

add(2, add(3, add(5, add(7, add(11, add(13, add(17, add(19, add(23, 29)))))))))
// -> 129
```

No justification needed for how awful this is. No IDE could save you from *this*.

And yet, you may be surprised to hear that this very pattern is *exactly* what function composition ultimately boils down to! 

But how? Read on.

#### Beginner solution 3: adding a known number to another unknown number

How about we wrap it in a function? Functions exist for this kind of thing after all: their very purpose is to give us a framework for supplying as-yet-unknown information to a set of computations enclosed within the function itself: 

```js
// What is "it"? We don't know yet ...
const epicFunction = it => console.log(it, " (yeah yeah yeah)")

// ... but we do now:
epicFunction("You want it all but you can't have it") 
// -> You want it all but you can't have it (yeah yeah yeah)"
epicFunction("It's in your face but you can't grab it") 
// -> "It's in your face but you can't grab it (yeah yeah yeah)"
```

And so it goes with our beloved adder machine:

```js
const add = (x, y) => x + y

// Our as yet unknown value ...
const addToFive = x => add(5, x)

// Is now here!
addToFive(5);  // -> 10
addToFive(12); // -> 17 
addToFive(4);  // -> 9
```

So what's the problem here? It's subtle, and just about impossible to see or describe without finally revealing this damn function composition thing I keep alluding to.

## In summary

In this article, we trudged through the awkward middle phase of our composition journey. The benefits of code composition are hard to appreciate without understanding the problems that code composition solves. I hope now that you have a better understanding of the issues we're trying to overcome, and that you're looking forward to the techniques which we will employ to solve them!

Next week, we'll take each of these three problems – calling functions that have both **unique** and **non-unique** arguments, performing **sequential function calls** on a single value, and better representing the information that we **do know** so we can focus on the information that we **don't know** – and apply some of the React-specific composition techniques we saw in part one to these more generic problems. After that, you'll not only know how to compose React components together, but you'll be able to reap the rewards of that style in your non-React code too!

See you then!

[^1]: Haven't seen React.createElement before? Check out the [React documentation](https://reactjs.org/docs/react-without-jsx.html) for a nice explanation of what it is 👍
[^2]: This concept is known as "layers of indirection" if you'd like to read more about it: https://lispcast.com/is-your-layer-of-indirection-actually-useful/
[^2]: I know, I know, that actually _is_ what we're building underneath the hood. Indulge me in the argument for a moment.
[^3]: For more on that idea, I will direct you to this wonderful MIT lecture series from Bartozs Milewski https://youtu.be/I8LbkfSSR58?t=1280
[^3]: Remember: anything passed within the braces of JSX is passed as `props.children`
[^4]: Cf. this wonderful video on the pure world of math vs. the fuzzy, wiggly world in which we actually live: https://www.youtube.com/watch?v=_ADi5JlFf1E
[^5]: Well, if you really wanted to split hairs, you could say that some of these strategies are a form of function composition, but I don't think most functional programmers would agree.

