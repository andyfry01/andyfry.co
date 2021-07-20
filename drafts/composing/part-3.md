### Solving these problems with function composition

What is the answer to all of this? One word: curry.

No, not that Curry. 

IMAGE OF TIM CURRY

Or that one.

IMAGE OF STEPHEN CURRY

That Curry. 

Or the technique named for him anyway. In short, currying is a method by which we can: 

- Avoid mutability
- Get the benefits of variables and sequential calculations without the drawbacks. 
- Save information within a function 

What does it look like? When it comes to JS syntax, it's a tiny but profound shuffling of characters: 

```js
// From writing it like this:
const add = (x, y) => x + y
// And calling it like this: 
const result = add(1, 2) // -> 3

// To writing it like this:
const add = x => y => x + y
// And calling it like this: 
const addOneTo = add(1)
const result = addOneTo(2) // -> 3
```

*Weird*, right? [Implicit arrow function returns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#comparing_traditional_functions_to_arrow_functions) make this kind of code nice and tidy to write, but it can be confusing to read if you're unfamiliar with currying or if you don't use arrow functions much. Here it is again written with traditional function syntax: 

```js
// Same thing with explicit return statements and the function keyword:
const add = function(x) {
  return function(y) {
    return x + y
  }
}
```

The main takeaway is that we aren't returning a value. Or at least we aren't returning one straight away. On the first function call, we are actually returning a **function**. On the "second call" of the function, we're supplying the final value, and *that* gives us our result:

```js
const add = x => y => x + y
// The first time we call add, it returns a function. 
// We're naming it "addOneTo" to remind us of what is "stored" in the function
// You might know this concept as a closure, "storing" or "saving" is an easy way to think about closures
const addOneTo = add(1)

// If we could magically unravel addOneTo, it would look like this: 
const addOneTo = y => 1 + y

// Now, the second time we call it, we're calling the final function
// This final function call produces the value 3
const result = addOneTo(2) // -> 3
```

This might seem excessive, weird, pointless, or perhaps all three. In the small, it does indeed seem silly, but let's revisit those three problems from the previous post, and explore how currying (and a related concept, piping) can help us. Again, it will enable us to write code that: 

- avoids the pitfalls of mutability
- is easier to read
- frees up variables names in our namespace

We've walked a long path so far, from its beginnings at the problems we're trying to solve, through the middle part of the easiest solutions to those problems, and we're finally ready walk the last steps and discover the compositional solutions! Let's talk about them one-by-one: 

### Composition solution 1:  adding many numbers to the same number

The first attempt of the problem looks like this:

```js
const add = (x, y) => x + y;

add(5, 5);  // -> 10
add(5, 12); // -> 17 
add(5, 4);  // -> 8
add(5, 18); // -> wait a minute ... 5 + 4 isn't 8!
add(5, 6);  // -> 11
```

The problem with this approach was that it isn't [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Lots of hard-coded 5's in there. What if we need that to be 6 some day? Or 4? Let's pretend we're talking about hundreds of function calls split between many modules and not five function calls in a single file. It would be a lot of work to change all of them.

How does currying help us with this? Remember, when you curry a function, what you're really doing is saving values within it. 

```js
const add = x => y => x + y;
const adder = add(5)
```

Now that 5 is locked away inside the `adder` function, all we need to do is supply it with the second number: 

```js
adder(5);  // -> 10
adder(12); // -> 17 
adder(4);  // -> 9
adder(18); // -> 23
adder(6);  // -> 11
```

Crucially, if we need to change that first number, we only need to update it in a *single place*: that initial function definition: 

```js
const add = x => y => x + y;
// Change it once
const adder = add(6)

// And everything else can remain as it was, but produce new output: 
adder(5);  // -> 11
adder(12); // -> 18 
adder(4);  // -> 10
adder(18); // -> 24
adder(6);  // -> 12
```

And voila! Your work is done. No error-prone find and replace, no digging through Typescript interfaces, no wacky IDE plugins. Just a bit of refinement in how we define our functions. 

### Composition solution 2: adding numbers to each other sequentially

First, a review of the problem we're trying to solve: 

```js
const add = (x, y) => x + y;

add(2, add(3, add(5, add(7, add(11, add(13, add(17, add(19, add(23, 29)))))))))
// -> 129
```

Nasty. But remember what we said previously? 

> "And yet, you may be surprised to hear that this very pattern is *exactly* what function composition ultimately boils down to! "

There's nothing fundamentally "wrong" with this so far as the computer is concerned. The problem isn't really the *technique* of nesting function calls deeply. It's the *nastiness*. The *form* of the code, not the *function*. The clothes it's wearing, not what it does.  

If we had a different way to *express* these deeply nested function calls, we'd have an easier time writing and reading the code. 

And we do! Isn't the above the same as this commonly-agreed "good way" of adding a bunch of numbers?

```js
2 + 3 + 5 + 7 + 11 + 13 + 17 + 19 + 23 + 29
```

The exact same result with half the character count. Is there a way we can dress up our nested functions in "mathier" clothes so we can make them easier to write and read? 

For that, we have to introduce one more function: `pipe`. Here it is. Don't panic: 

```js
const pipe = (...functions) => first => functions.reduceRight((x, func) => func(x), first)
```

Woah. Intense right? If you don't understand that at first glance, don't worry, it took me about a year before I *really* understood what it's actually doing. But you can use it even without understanding it. 

Until that undestanding comes, here's a written explaination of how it behaves: 

1. You pass a list of functions you want to run in a sequence, one after the other (the `...functions` argument)
2. After "loading up" the list of functions, you fire the whole thing off with a seed value (the `firstValue` argument)
3. Finally, the function runs that first value successively through all of the functions you supplied previously, ultimately delivering a final value at the end of the process (the `(x, func) => func(x)` callback in the reducer)

What does it look like in practice? Something like this: 

```js
// Remember, this function is curried now:
const add = x => y => x + y

// Instead of deeply nesting our function calls, we can pipe them instead.
// Remember, when you see `add(2)` or `add(3)`, what lies beneath the surface is this: 
/// const add(2) = (y => 2 + y)
const addEmUp = pipe(
  add(2),
	add(3),
	add(5),
  add(7),
	add(11),
	add(13),
	add(17),
	add(19),
	add(23))

// With our pipe loaded up with a sequence of calculations, all we need to do now is supply the first value to kick off the chain:
const result = addEmUp(29) // -> 129 
```

One important thing to focus on is that the result is *no different* than what we had before. Piping `29` through each of those functions, one after another, is exactly equivalent to nesting all of those uncurried `add` functions, one inside the other. 

The *form*. The form is what's changed. What `pipe` allows us to do is take syntax that is *hard* to read, write, and change, and turn it into code that is *easy* to read, write, and change. 


### Composition solution 3: adding a known number to another unknown number

First, a reminder of what we're trying to improve on: 

```js
const add = (x, y) => x + y

// Our as yet unknown value ...
const addToFive = x => add(5, x)

// Is now here!
addToFive(5)  // -> 10
addToFive(12) // -> 17 
addToFive(4)  // -> 9
```

What if I told you we had already solved it? And that currying gave us the solution for free? 

```js
// compare this uncomposed, uncurried version: 
const add = (x, y) => x + y
const addToFive = x => add(5, x)

addToFive(6) // -> 11

// to the curried and composed version:
const add = x => y => x + y
const addToFive = add(5)

addToFive(6) // -> 11
```

It might not seem like the curried version of this is doing ... well, anything of value. We get the exact same function on the other end, it's roughly the same amount of code. What's the point? 

For that, we need one new function, a currying helper. 

#### Brief diversion: currying helper

What problem does a currying helper solve? You can manually curry in JS by stringing together arrow functions, but this has some annoying limitations. There may be situations where you **do** want to call the function as though it **weren't** curried. Currying and composition are great, but not all function calls are alike. Sometimes composition is useful for expressing a complicated problem succinctly, but sometimes it just gets in the way of quick understanding. 

Sometimes you just need to add two damn numbers together: 

```js
// If you call this
const add = x => y => x + y
// Like this:
add(1, 2)
// JavaScript thinks you've tried to do something like this: 
const add = (1, 2) => y => 1 + y
// And gives you this in return: 
// y => 1 + y
```

When you call a manually curried function with "normal" function syntax, JavaScript thinks that you've supplied an "extra argument" to the first function in the chain. Seeing as the first function in the chain only one argument `x`, it grabs `1` as the first argument, ignores the number `2` entirely, and leaves you scratching your head. 

You *could* technically call the function like this: 

```js
const add = x => y => x + y
add(1)(2) // -> 3
```

But that's one step too far into the weird end of the pool. We're trying to gain expressivity, not confuse ourselves.

And so we turn to our friend `curry`, which brings us the best of both worlds: 

```js
const curry = func => {
  return innerCurry = (...args) => {
    if (args.length >= func.length) {
      return func(...args);
    }
    return (...args2) => innerCurry([...args, ...args2]);
  }
}
```

If you didn't understand that, don't worry. I don't really get it either. [There](https://github.com/lodash/lodash/blob/4.17.11/lodash.js#L10200) [are](https://github.com/dominictarr/curry/blob/master/curry.js) [many](https://github.com/ramda/ramda/blob/master/source/curry.js) libraries out there which implement some form of this function. They all work in various ways, but the only thing you really need to know is that they enable you to do this: 

```js
const adder = curry((a, b, c) => a + b + c)
// Call it any way you like: 
adder(1, 2, 3) // -> 6
adder(1)(2)(3) // -> 6

const addThreeTo = adder(3)
addThreeTo(1, 2) // -> 6
```


#### Built-in value saver

Now that we've got that out of the way, we can work on an example which will demonstrate the value of currying from the perspective of storing our known values. Here's a more involved three-argument demo function: 

```js
const namer = curry((prefix, name, suffix) => `${prefix} ${name} ${suffix}`)

// Demo invokation with all arguments: 
const myDentist = namer("Dr.", "Pasha", "DDS")
// -> Dr. Pasha DDS
```

Let's say that we have a doctor, but we don't know his name:

```js
const namer = curry((prefix, name, suffix) => `${prefix} ${name} ${suffix}`)

// No currying
const doctor = (name, suffix) => namer("Dr.", name, suffix)

// With currying: 
const doctor = namer("Dr.")

// Both functions return this string: 
doctor("Pasha", "DDS") // -> Dr. Pasha DDS
```

Lots more code to write when you've got more than a couple arguments huh? Now let's try this: we've got a couple doctors. We know their names, now we need a unique suffix for each. Some schools award you a DDS degree, but some call it a DMD.

```js
const namer = curry((prefix, name, suffix) => `${prefix} ${name} ${suffix}`)
const doctor = (name, suffix) => namer("Dr.", name, suffix)
const doctorPasha = suffix => doctor("Pasha", suffix)
const doctorStrange = suffix => doctor("Strange", suffix)

const pashaNYU = doctorPasha("DDS") // -> Dr. Pasha DDS
const strangeYale = doctorStrange("DMD") // -> Dr. Strange DMD
```

Compare this with a curried implementation: 

```js
const namer = curry((prefix, name, suffix) => `${prefix} ${name} ${suffix}`)
const doctor = namer("Dr.")
const doctorPasha = doctor("Pasha")
const doctorStrange = doctor("Strange")

const pashaNYU = doctorPasha("DDS") // -> Dr. Pasha DDS
const strangeYale = doctorStrange("DMD") // -> Dr. Strange DMD
```

With currying, the mechanism for saving values is *built in* to the function itself! Why spend all of those lines of code spinning up a brand new function for enclosing new variables when you've got one built in already? 

Not only that, but you only need to look at one function to understand the composed implementation of those functions: `namer`. The uncurried versions of `doctor`, `doctorPasha` and `doctorStrange` all implement the same API as `namer`, but what if they didn't? If they did something unique *before* calling `namer` – maybe uppercasing or lowercasing their inputs, or trimming whitespace characters from the string – you'd have to go digging through each bespoke function to discover where it was happening: 

```js
const namer = curry((prefix, name, suffix) => `${prefix} ${name} ${suffix}`)

// Whoops, doctor has uppercased the "name" argument on us unexpectedly:
const doctor = (name, suffix) => namer("Dr.", name.toUpperCase(), suffix)
const doctorPasha = suffix => doctor("Pasha", suffix)

// Hey ... this is not the string that namer's API promised me!
const pashaNYU = doctorPasha("DDS") // -> Dr. PASHA DDS
```

The curried version, on the other hand, would require you to capitalize the string *before* passing it in. Just like we said in the first article of the series: composition encourages you to take the unique qualities of your code, pull them out from within your inner functions, and state them front and center:

```js
const namer = curry((prefix, name, suffix) => `${prefix} ${name} ${suffix}`)
const doctor = namer("Dr.")
// name.toUpperCase() isn't buried in a custom function anymore, it's right there on the outside
const doctorPasha = doctor("Pasha".toUpperCase())
const doctorStrange = doctor("Strange")

const pashaNYU = doctorPasha("DDS") // -> Dr. Pasha DDS
const strangeYale = doctorStrange("DMD") // -> Dr. Strange DMD
```

Now we don't have to go digging for custom code *or* write our own closures! Nice. 

## Summary

In this chonker of an article



[^1]: Haven't seen React.createElement before? Check out the [React documentation](https://reactjs.org/docs/react-without-jsx.html) for a nice explanation of what it is 👍
[^2]: This concept is known as "layers of indirection" if you'd like to read more about it: https://lispcast.com/is-your-layer-of-indirection-actually-useful/
[^2]: I know, I know, that actually _is_ what we're building. Indulge me in the argument for a moment.
[^3]: For more on that idea, I will direct you to this wonderful MIT lecture series from Bartozs Milewski https://youtu.be/I8LbkfSSR58?t=1280
[^3]: Remember: anything passed within the braces of JSX is passed as `props.children`
[^4]: Cf. this wonderful video on the pure world of math vs. the fuzzy, wiggly world in which we actually live: https://www.youtube.com/watch?v=_ADi5JlFf1E
[^5]: Well, if you really wanted to split hairs, you could say that some of these strategies are a form of function composition, but I don't think most functional programmers would agree.