A Pen created at CodePen.io. You can find this one at https://codepen.io/seto89/pen/moyWRw.

 In my last installment, while I was trying to work on a counter to find the index of the focused checkbox, I realized how complicated things were getting as I had to constantly mix and match counters to increment with the  `counter-increment` property. Basically, I learned pretty late that there was no way to increment things on their own with what I was doing.

That's not to say this pen I created is less complex, it kind of is in its own way. But the purpose of this pen was for me to find a way to increment each counter on its own, which turned out to be successful. 

Here's how this pen works. I used pug to generate a series of `.checkbox`es. Each `.checkbox` has a number of `.counter`s (`.checked`, `.unchecked`, `.focused`, `.hovered`, `.first-checked`, `.first-unchecked`, `.second-checked`, `.second-unchecked`) sitting directly next to it but absolutely positioned offscreen.

While the `.counter`s do contribute to me writing some weird rulesets that I don't know how to make any less complex (see CSS editor), they do manage to accomplish what I had set out to do and that is to separate each counter and not have me do some careful mixing and matching when setting up `counter-increment`.

Because of this, I was able to add five more counters than I would've been able to in the previous installment, and possibly many more if I had kept going.
- seto89