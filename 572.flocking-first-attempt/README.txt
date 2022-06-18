A Pen created at CodePen.io. You can find this one at https://codepen.io/perbyhring/pen/WWroOv.

 My first attempt at implementing flocking-principles.
The rules in this thing:
- Every particle wants to travel to a destination
- When the particle reaches it’s destination it picks a random new destination
- If a particle is close to another it is subtly attracted to it
- If a particle is very close to another, it tries to avoid collision
- If a particle is very close to another, it also some times copies the other particle’s destination, or randomly picks a new destination