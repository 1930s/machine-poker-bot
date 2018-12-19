---
# Goal - to write a poker bot
- you got all the mechanism to run games already, all the poker logic is done by MachinePoker.
- you can focus on a poker bot. A programm able to win against others, preferably humans.

- It could be a nice experiment on renforcement learning.
- To frame the pokerbot as a genetic problem seems an obvious approach.
  - It seems a reasonable approach, We dont know if it is the best, but this may be revisited later.
  - code is available with tensorflow.js , you just have to port it to a poker-bot

- It seems like a toy
  - do you have the time to do it ?
  - seems like a distraction
---
# First Bot
- have a montecarlo simulation bot
- trivial to code

- https://ishikota.github.io/PyPokerEngine
- estimator of the strenght of your hand - montecarlo simulation
  - https://ishikota.github.io/PyPokerEngine/tutorial/estimate_card_strength/
- https://github.com/mdp/hoyle/blob/master/src/hand.coffee

---
# Using Machine Learning
- using renforcement learning + genetic algorithm seems a easy approach.
- code for tensorflow.js on genetic is available here.
  - https://github.com/aayusharora/GeneticAlgorithms
  - https://heartbeat.fritz.ai/automating-chrome-dinosaur-game-part-1-290578f13907
- code available at https://github.com/llSourcell/Modeling_Evolution_with_TensorflowJS
- code available at https://github.com/adityathebe/evolutionSimulator
- https://www.youtube.com/watch?v=HT1_BHA3ecY

---
- port to the web
  - PRO easier for you as it is more familiar, especially during development
  - CON slower as it uses only one cpu and i got 12
    - once it is working well on the web, i can always run it on node.js for speed
- what is the goal ? to write a poker bot
- possible to have remote player for async operation