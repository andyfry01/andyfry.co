---
layout: post
title: "Map from Scratch"
permalink: /map-from-scratch
author_profile: true
read_time: true
comments: true
share: true
related: true
description: "A dialog between two people who don't know how JavaScript's Array.map function works, so they decide to build it from scratch, one piece at a time!"
prism-centering: false
---
<link rel="stylesheet" href="/public/css/prism(3).css">

<p>
"You know what I still don't understand?"
</p>

<p>
"What?"
</p>

<p>
"Array.map. For loops were heady enough, I had a tough time getting that concept into my head in the first place.
And now a bunch of pedantic FP nerds on the internet keep telling me to drop the for loops and start mapping and reducing. But I don't get it! I wanna stick with my for loops." 
</p>

<p>
"Those same nerds have implored me to start using map and reduce too, but I don't really get it either &#x2026;"
</p>

<p>
"&#x2026; wanna try building it from scratch?"
</p>

<p>
"What?"
</p>

<p>
"Wanna try building map from scratch? I did a bunch of DIY projects with my dad growing up, and seeing a thing being built from basic pieces up to the final product really changed my perspective on a lot of things. Stairs, fences, walls, cabinets &#x2026; I understood a bunch of things much more clearly once I built one myself."
</p>

<p>
"Interesting idea. So &#x2026; um, where do we start?"
</p>

<p>
"Maybe with the return value?"
</p>

<p>
"Seems sensible. No matter what, we're returning an array at the end, so &#x2026; let's write a function that returns an array."
</p>

*CODE:*

<pre class="higlight language-js" tabindex="0"><code class="language-js"> 
const map =  () => {
    return []
}

return map()

 </code></pre>

*RESULT:* 

<pre class="higlight language-js" tabindex="0"><code class="language-js"> []
 </code></pre>

<p>
"What next?"
</p>

<p>
"Not much use returning just an empty array. Eventually this should return our transformed array."
</p>

<p>
"But let's take things slow, maybe as a first step, we could just return the input array." 
</p>

<p>
"Alright, this seems kinda dumb, but let's do it."
</p>

*CODE:*
<pre class="higlight language-js" tabindex="0"><code class="language-js"> const map = (arr) => {
    return arr 
}

return map(["what", "a", "dumb", "function"])

 </code></pre>

*RESULT:* 

<pre class="higlight language-js" tabindex="0"><code class="language-js"> [ 'what', 'a', 'dumb', 'function' ]
 </code></pre>

<p>
"Cute demo code."
</p>

<p>
"I know, right? Let's see &#x2026; we're also going to need a callback function at some point down the line, so if we're going through the weird song and dance of putting the pieces in place like this, then that's the next step."
</p>

<p>
"Allow me." 
</p>

*CODE:*
<pre class="higlight language-js" tabindex="0"><code class="language-js"> const map = (arr, callback) => {
    return [arr, callback()]
}

return map(["demo", "array"], () => "stubby the string returner")

 </code></pre>

*RESULT:* 

<pre class="higlight language-js" tabindex="0"><code class="language-js"> [ [ 'demo', 'array' ], 'stubby the string returner' ]
 </code></pre>

<p>
"Yeah! Now you're getting it! Why not act silly when you feel silly." 
</p>

<p>
"But now we have to cross another mental hurdle &#x2026; we've got our input array, and we've got our callback, and now we actually have to do something with them."
</p>

<p>
"Hmmm &#x2026; a puzzler indeed. Well, maybe the callback function can just take in and spit the input array straight back out."
</p>

*CODE:*
<pre class="higlight language-js" tabindex="0"><code class="language-js"> const map = (arr, callback) => {
    return callback(arr)
}

return map(["demo", "array"], (arr) => arr)

 </code></pre>

*RESULT:* 

<pre class="higlight language-js" tabindex="0"><code class="language-js"> [ 'demo', 'array' ]
 </code></pre>

<p>
"Alright, this is looking a little better."
</p>

<p>
"But still not quite right, the callback doesn't work on the array itself, it works on each element in the array."
</p>

<p>
"You know what, to hell with it. I'm just putting a for loop in there. It's all iteration right? Why not iterate with a tool we already know how to use."
</p>

<p>
"Yeah, maybe you're right. Just for loop through the thing, push the results into the array, and then return the array."
</p>

*CODE:*
<pre class="higlight language-js" tabindex="0"><code class="language-js"> const map = (arr, callback) => {
  const result = []

  for (let i = 0; i < arr.length; i ++) {
    result.push(callback(arr[i]))
  }

  return result
}

return map(["demo", "array"], x => x.toUpperCase())

 </code></pre>

*RESULT:* 

<pre class="higlight language-js" tabindex="0"><code class="language-js"> [ 'DEMO', 'ARRAY' ]
 </code></pre>

<p>
"Wait. We just did it!"
</p>

<p>
"Really?"
</p>

<p>
"Yeah, you get identical output to the real map now:" 
</p>

*CODE:*
<pre class="higlight language-js" tabindex="0"><code class="language-js"> return ["demo", "array"].map(x => x.toUpperCase())
 </code></pre>
 
*RESULT:* 

<pre class="higlight language-js" tabindex="0"><code class="language-js"> [ 'DEMO', 'ARRAY' ]
 </code></pre>

<p>
"Alright, I guess we just did it right? Same input, same callback, same return value. This is the map function."
</p>

<p>
"This is leaving me somehow more confused than when we started. What's the point of map? You can see it for yourself, all we wrote was a wrapper around a for loop. If you can get the same result from a for loop, then why does map exist at all?" 
</p>

<p>
"Well, I guess we only had to 'configure' the for loop once, if that makes sense. If you look at the native map function, we never had to tell it where to start iterating, where to stop, how much to increment the iteration by, where to PUT the result of the iteration code. We just gave it a list of stuff and a callback to perform on every item in that list, and it did it's thing."
</p>

<p>
"Interesting, so you could say it's like a batteries-included looping tool. It already knows the basics of what you're trying to do, so you don't have to do all that setup code yourself."
</p>

<p>
"Yeah, that's a way to put it. I dunno if I quite understand where to use it now, but I definitely understand what it is a lot better."
</p>

<p>
"Me too!"
</p>

<script src="/public/js/prism.js"></script>
