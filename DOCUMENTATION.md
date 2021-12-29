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

