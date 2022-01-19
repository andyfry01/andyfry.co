# Blog planning
---

## Elevator pitch concepts
---

### General code concepts
- Break big functions into small functions
    - But how small is too small? 
- Use language features to be more expressive and terse
- Know your tools (libraries, language features etc.). Right tool for right job. 
    - Ternaries cut down on long "if" logic
    - Lang features make code more idiomatic
- Send state as high as it can go. But no higher. (Einstein quote)
    - Internal state is tricky 
- Reserve your most expressive, descriptive words for important concepts
    - Don't be excessively verbose
    - But don't be too terse
    - Variable names are hints for what an argument expects
- Consistency is key
- Don't leave dead code
- Comments: sometimes helpful, sometimes confusing
    - Descriptive variable and fxn names in place of comments
    - Using comments can be a code smell: something should change
    - But sometimes they're ok if you're hacking or are short on time
- Formatting can help comprehension: organization and whitespace
- Simple data structures can cut down on repetition
    - Data structures can get complicated fast, keep them atomic and connect them via plumbing code if needed
- Save repeated strings in a variable: cheapest, most foolproof DRY there is
- If blocks to determine values of *variable arguments* that you call your functions with, not if blocks to create *variable functions calls* with hard-coded arguments
- Avoid premature defensive coding. 
 
### Library-specific concepts
- Take care of menial tasks automatically, but give people an escape hatch
    - But when you give them customization, do you *blow away* everything that's already there or *supplement* what's already there with a customization?
- Don't make components excessively restrictive
- Truthy and falsey values to cut down on excessive configuration


### Loose ideas
(note, writing these things will be easier if you have specific examples to draw on)

- PRs are a place for learning and knowledge sharing to happen. 
 [dropdown ](http://localhost:8080/design-language-react-pull-requests-3-.html))
- Early returns, use them! Early returns PHP video.
- PRs are a means of communication, use the tools at your disposal to communicate: inline comments, a PR description, PR title: these all carry context and help outsiders understand your code. 
- Be nice. If it's a team member making a PR, like hey dude ... he's on your team, be nice so the team stays cohesive. If it's an outsider making a PR into the library, then they've taken time away from their own work to contribute to your work, and you have a duty to treat their time and good faith with respect. 
- Emotional code would be good to reference: https://www.youtube.com/watch?v=uloVXmSHiSo

## Favorite ideas 
(copy+pasted from elevator pitches)
---
- Break big functions into small functions
    - But how small is too small? 
- If blocks to determine values of *variable arguments* that you call your functions with, not if blocks to create *variable functions calls* with hard-coded arguments
    - Simple data structures can cut down on repetition
    - Data structures can get complicated fast, keep them atomic and connect them via plumbing code if needed
- Avoid premature defensive coding. 
- Comments: sometimes helpful, sometimes confusing
    - Descriptive variable and fxn names in place of comments
    - Using comments can be a code smell: something should change
    - But sometimes they're ok if you're hacking or are short on time
- Take care of menial tasks automatically, but give people an escape hatch
    - But when you give them customization, do you *blow away* everything that's already there or *supplement* what's already there with a customization?
- Save repeated strings in a variable: cheapest, most foolproof DRY there is
- Reserve your most expressive, descriptive words for important concepts
    - Don't be excessively verbose
    - But don't be too terse
    - Variable names are hints for what an argument expects

## Example code ideas

## Blog topics
Grouping individual ideas into cohesive collections
---

### Blog 1
#### Broad theme 
*Make things simple and clear*

#### Specific things to address
- Break big functions into small functions
    - But how small is too small? 
- Reserve your most expressive, descriptive words for important concepts
    - Don't be excessively verbose
    - But don't be too terse
    - Variable names are hints for what an argument expects
- Don't abuse a language feature just because you can 
    - intense destructuring for nested objects
    - confusing nested ternaries
    - IIFEs for long functions
- Right tool for the right job: `let` vs `const`

#### Code example
Tic Tac Toe

#### "Improved" version notes: 
- named queried elements
- moved constants to top of file
- added game status constants (`IN_PROGRESS`, etc.)
- formatted gamestate to look like the game board
- cut down on verbose variable names (`clickedCellIndex`)
- created `endGame` fxn, moved out of `handleResultValidation`
- refactored `handleResultValidation` into functional style
    - created constants `a`/`b`/`c` in better way
    - created constants for logical conditions
    - early returns, if statements use constants instead of inline logic
- `e` for `handleCellClick` (convention)
- use `handleRestartGame` both for starting and restarting game
- no motion, no prefers-reduced-motion problesm
- tic-tac-toe squares were divs, changing them to buttons removes accessibility problems instantly

#### TBD
Make note of what you like about the original code too!

### Blog 2
#### Broad theme
*Cut down on repetition, make code shorter*

#### Specific things to address
- Save repeated strings in a variable: cheapest, most foolproof DRY there is
- Hardcoded config options vs a simple, easy to read and manipulate data structure (enum-style object)
- Use language features to cut down on custom code
    - Use default args (variables and functions)
    - Map, filter, reduce
    - `!=` trick
    - optional chaining operator 
    - but beware: https://blog.jim-nielsen.com/2022/a-web-for-all/
    - destructuring objects instead of dotting in

#### Code example
Pong

#### "Improved" version notes: 
- The players' paddles moved at different speeds in the original implementation: 0.06 vs 0.1. Intentional? One player has a huge advantage over the other! Perhaps a mistake? A mistake born out of hard coded variables.
- I like the individual `if` blocks, not tied together in a hairy rat's next of `if/else`
- Random numbers to represent concepts (`0` and `1` for `dxd` and `dyd`, representing the direction the ball is traveling in) is nice from a math perspective, but is vague to anybody reading the program. Maybe the person writing it in the moment understands these concepts, but coming at it fresh you'd have no idea what those numbers actually represent unless you sit down with the logic and read carefully. Names help us avoid these kinds of time sinks: give something a name and the person reading will be better able to discern if that thing is something they need to pay attention to or concentrate on. If everything is a jumbled pile of numbers without context, you need to understand the whole to understand its parts. 
- not perfect, but having named functions and organization improves things dramatically. 
- saving as strings: 
    - commonly referenced stuff (movement keys, game state names, ball directions refactored from numbers to words, movement intervals (mistake from before)), randomizer functions
- ES6 features to make code more readable
    - template strings
- I think because there's only one moving element, it's slow, and there's no parallax or anything going on, the motion isn't going to be an issue for accessibility

### Blog 3
#### Broad theme
*Make your libraries and APIs better*

#### Specific things to address
- Take care of menial tasks automatically, but give people an escape hatch
    - But when you give them customization, do you *blow away* everything that's already there or *supplement* what's already there with a customization?
- Send state as high as it can go. But no higher. (Einstein quote)
    - Internal state is tricky and makes things complicated for your end users
    - But including some "batteries included" tools is great (React Table is perfect example https://react-table.tanstack.com/)
- How small is too small for componentization? It depends. 

### Blog 4
#### Broad theme
*The emotion of code*
#### Specific things to address
- Kate Gregory's Emotional Code talk: https://www.youtube.com/watch?v=uloVXmSHiSo
- Avoid premature defensive coding. 
- Abusive function/variable names or comments
- Humor is ok! Long tradition of inside jokes. 
- Excessive verbosity
- Excessive configuration (what if it needs to do X? YAGNI.)
- Sticking to stupid conventions because this is the way we've always done it
- Comments: sometimes helpful, sometimes confusing
    - Descriptive variable and fxn names in place of comments
    - Using comments can be a code smell: something should change
    - But sometimes they're ok if you're hacking or are short on time


### Blog 5
#### Broad theme
*Organization*

#### Specific things to address
- Strategic whitespace
    - Newlines before return functions, variable declarations, imports/exports, categories of imports and exports
    - White space inside data structures (crammed up `{key:value,key2:value2})` vs `{key: value, key2: value2 }`)
- Variables go here, operations go here (set the stage, then act)
    - Eric Normand references
        - Grokking Simplicity https://www.manning.com/books/grokking-simplicity
        - Actions https://lispcast.com/what-is-an-action/
        - Calculations https://lispcast.com/what-is-a-calculation/
        - and Data (duh)
        - All concepts wrapped up in this video https://lispcast.com/what-is-the-primary-superpower-of-functional-programmers/?utm_campaign=meetedgar&utm_medium=social&utm_source=meetedgar.com
- Get rid of dead code and commented code.
- Ordering of arguments, properties in an object, CSS attributes. Doesn't matter what the org is, pick one and stick with it
- Specific tools for doing this automatically?
- Consistency in varaible and argument names

#### Code Example
Animated dots

#### "Improved" version notes: 
- `Dots` class was a bit confused: using it both to draw an individual dot (singluar), but also had a prototype fxn called draw dots which was used to draw all dots (multiple)
- broke up a lot of inline logic into named functions
- got rid of classes in favor of functional style
- cleaned up RAF implementation: it works, but we can make it a little more refined. No need to put it in a big messy IFFE. Give it a name, call it like a normal function with the rest of the initialization code. 
- named args for `context.arc`. Just a little bit of ES6, and all of a sudden you've got named arguments for a function that the reader may not be familiar with. No trip to the docs, less pressure in your head to understand the whole thing
- got rid of `window.onload`, not needed if following modern conventions of putting script tag at bottom of `body`
- orgainzed object props, added whitespace
- defined constants at tops of functions, whitespace between data and actions. All mutable variables represent the state of the app, and are defined as `let` vars at the top of the file. 
- We could make it a lot more functional in flavor, but the canvas API itself is quite mutable in nature, and much of the code is written in a mutable style, so tried to strike a balance between functional style and not rewriting the whole thing
- whole function was wrapped up in one big `init` function. But it was being used to basically instantiate the whole app into memory. There are discrete initialization tasks to do (grab elements from DOM, attach event handlers, run RAF polyfill) and there are portions of the code that comprise *logic*, not initialization. Separating these out makes a clearer distinction between setup/bootstrapping code and the logic that handles how things are drawn and how state is updated
- File is now longer by 50 lines, but brevity is not the only thing to focus on. Clarity is what we're striving for. Sometimes clarity comes along as a byproduct of brevity, and sometimes we create clarity by adding organization and giving groups of concepts more room to breathe. 
- Accessibility is gonna be an issue with this one. 
    - Color contrast on the dots is an issue
    - prefers-reduced-motion is an issue
        - The dots move at different speeds in different directions, big problem
        - The concept of the code itself is hard to fix in an accessible way
        - Mike suggested changing the movements to fade in/out effects. No motion at all. Can work for easily enough for mouseover, but what about click? Some kind of "wave of fade-in/fade-out effects" expanding out across all dots in the field? 
        - Good references: 
            - [Designing Safer Web Animation for Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/)
            - [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
    - Added black rings around dots for accessibility
    - Added controls for: 
        - Starting/stopping animation
        - Reducing element size (definitely improves the experience)
        - Reducing animation speed (maybe improves the experience?)
    - All wrapped up in `initAccessibilityFeatures`
    - `aria-live="polite"` for announcements about changes to these 
    - Animations default to "off". In a perfect world, we'd not surprise people with animations and possibly upset them. It's not as flashy, but it is the most responsible thing to do. We are all "temporarily abled," and millions of people have these disorders. 
        - In 2001-2004, the incidence of a disorder in individuals 40 and older was 35.4% ([link](https://www.vestibular.today/blog/vestibular-dysfunction-prevalence-in-the-us)).
        - The world population is getting on average older all the time. 
        - Lifetime adult prevalance of vertigo is 7.4% ([link](https://www.ncbi.nlm.nih.gov/labs/pmc/articles/PMC4069154/))

#### TBD

## Blog format
- Intro, short explainer on what this is 
- Brief overview of topic
- "Bad" code example and demo
- Brief interlude 
- PR comment demo, with comments and threads
- Refactored "good" code example
- Summary