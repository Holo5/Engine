# Documentation & explanations

## Aim of the project
Use PIXI with advantages & without cons. Instanciate many graphics with an integrated assets manager who can load assets and send it to the 
graphics synchronously.

I try to recreate (from asynchronously pattern) a fully 2D engine working like a C++ engine: with a big while:
- Check entry events (keyboard, mouse, ect)
- Check several things
- Update all objects
- Draw
- Retry

_Two levels of rendering are used and both of them come from a separate worker._
- **LOW**: init graphics, calculate bounds, change texture, update hitmap.
- **HIGH**: update positions & draw it on canvas, check events.

## Graphic Workflow
There are several basic checks in the Graphic class:
- ```needInit()```
- ```needUpdate()```
- ```needPositionUpdate()```
- ```needFrameUpdate()```

### needInit()
Before considering the sprite display, we need to check several things like:
- If the Graphic class have a texture link
- If the assets manager have the texture: (if not, an entry is created in the assets manager)

Once inited, the method ``setInited(true)`` is called.

### needUpdate()
On the high rendering, we need to update all graphic's tweens. So we need to check:
- If graphic have tweens
- If tweens is not completed

After these check, we can call ``update()`` method and update all Tweens. ***The update() name is too generic for tweening, I will change that.***

### needPositionUpdate()
Object are displayed, but they move sometime: on stage dragging or because of tweens (or for some other reason, but anyway). We need to update 
positions after these checks:
- If stage's positions is changed
- If tweens need it
- If a new texture need it ?

Once these checks done, we can call the ``updatePositions(stagePosition)`` and move everything.

### needFrameUpdate()
This method is only for few objects: animated graphics. It can be called after a direction change or stage change, etc...

So we need to find a new texture and apply it. Need a better workflow and a method to set the new texture.

After texture change, we need to update bounds, etc etc

## More stuff
#### Stage
Stage is a while, powered by a worker on 2 frequency: animationRate & displayRate.

You can configure 8 FPS (for the animationRate) and 144 FPS (for the displayRate).

#### EventManager
Event manager is here for catch all events (keyboard, mouse, finger on your touchscreen, etc). It will catch stage dragging, mouse hovering, mouse 
clicking when you press the shift button for example.

#### Module system
Modules are here to extend the engine. In this case, you can add AvatarModule, MapModule, ItemModule, PetModule,...
