# Changelog

## [18.0.0] (melonJS 2) - _2024-06-xx_

### Added
- Chore: new GitHub Workflow for running the tests (@hornta)
- Chore: new GitHub Workflow for doc generation and publishing (@hornta)
- Color: Color constructor now also accepts another Color object as paramater
- Renderer: new `backgroundColor` property allowing to change the color when clearing the background between frames

### Fixed
- CanvasRenderTarget: fix arguments passed to `convertToBlob()` (@hornta)
- TypeScript: fix missing `OffscreenCanvas` argument type for the TextureAtlas constructor
- Video: fix implicit global reference to HTMLVideoElement

### Changed
- Chore: replaced rollup by esbuild for the build process (@hornta)
- Chore: replaced webdoc with typedoc (@hornta)
- Chore: replaced mocha and puppeteer with vitest (@hornta)
- Chore: deprecated classes and methods from version 15 and lower have been removed (see https://github.com/melonjs/melonJS/wiki/Upgrade-Guide)
- Math: namespace `Math` is now deprecated and renamed to `math` for better consistency with the rest of the API.
- Renderable: the `anchorPoint` property now used the lighter `ObservablePoint` class instead of `ObservableVector2d`.

## [17.4.0] (melonJS 2) - _2024-06-22_

### Added
- Renderer: new `lineJoin` property to set the line join style (only support "round" for now in WebGL mode)
- Renderer: add support for line thickness for `strokePolygon` and `strokeRect` operations in WebGL

### Changed
- Chore: Update to TypeScript 5.5

### Fixed
- Renderer: fix `fillEllipse()` method in WebGL mode (that was stroking the ellipse instead)
- TypeScript: fix most (if not all) missing declarations

## [17.3.0] (melonJS 2) - _2024-06-04_

### Added
- Renderer: add support for line thickness when using `strokeLine()` in WebGL

### Changed
- Renderer: the `setLineWidth()` method is now deprecated and replaced by a `lineWidth` class property

### Fixed
- Renderer: fix animation when using multi-texture atlas in WebGL mode
- TMX: fix tsx file type import when using a React / Vue build step (thanks @customautosys)
- Typedef: fix missing definition for `video.init()` settings parameter, and `Application` constructor parameter

## [17.2.0] (melonJS 2) - _2024-04-22_

### Added
- Audio: add missing optional id parameter to 3D / Spatial audio methods
- Core: add platform detection if running as a standalone web app
- Loader: add missing `unload` implementation for font assets

### Fixed
- Loader: properly return an error when attempting to load FontFace assets on non-browser platforms
- Renderer: fix a regression when a global canvas is available (e.g. webapp adapter for wechat)
- Renderer: fix a regression when forcing WebGL1 rendering mode (leading to an exception)
- Renderer: fix a regression when using the canvas rendering mode where antialias setting was not being applied on cached tinted elements

### Chores
- Update to eslint 9

## [17.1.0] (melonJS 2) - _2024-03-29_

### Added
- Audio: added/exposed 3D Spatial Audio method (`stereo()`, `position()`, `orientation()` and `panner()`)
- Loader: image resources can now take an array of `src` urls with different format (preparing for later usage)
- Math: added a `isPowerOfFour()` method
- Renderer: new `renderTarget` property specifying the default `CanvasRenderTarget` to use when rendering

### Changed
- Renderer: `CanvasTexture` is now deprecated and replaced by a new `CanvasRenderTarget` class

### Fixed
- Core: prevent multiple temporary canvas creation when calling `isWebGLSupported` multiple times

## [17.0.0] (melonJS 2) - _2024-03-05_

### Added
- Sprite: add support for aseprite texture atlas (including animation)
- Atlas: `createSpritefromAnim` parameter is now optional, and if not defined will use all defined index in the corresponding atlas
- Loader: new `setOptions` method that allows specifying custom settings to be applied to fetch requests (crossOrigin, withCredentials, etc..)

### Changed
- Loader: loader settings such as `crossOrigin` and `withCredentials` are now deprecated and have to be set through the `setOptions` method

### Fixed
- Doc: fix hyperlinks to source code within documentation (thanks @Waltibaba)
- Loader: fix settings for the fetch request not being applied in ES6 builds (thanks @B0sh)

## [16.1.2] (melonJS 2) - _2024-02-12_

### Fixed
- Renderable: fix Light2d renderables not always triggering a screen refresh
- Plugin: fix version comparaison once and for all using the official semver package

## [16.1.1] (melonJS 2) - _2024-02-06_

### Fixed
- Loader: fix an issue where some mobile browser (e.g. safari) would not emit the canplay event for video assets if autoplay is disabled

## [16.1.0] (melonJS 2) - _2024-02-06_

### Added
- Loader: add optional `autoplay` and `loop` parameters when `[pre]loading` audio and video assets (`false` by default)
- Loader: add support for loading/preloading of HTMLVideoElement
- Sprite: HTMLVideoElement can now be passed as a source when creating Sprite object

## [16.0.0] (melonJS 2) - _2024-02-03_

### Added
- Path2d: preliminary SVG path parsing to the Path2D class (WIP)

### Changed
- Chore: update to npm 10, Node.js 20 and friends
- loader: replaced XHR by Fetch for assets preloading (thanks @Edwardscb)
- Renderer: fix `toBlob`, `toDataURL` and `toImageBitmap` method signature to better match with the W3C API

## [15.15.0] (melonJS 2) - _2023-11-20_

### Added
- Renderable : new `parentApp` getter that returns the parent application/game instance to which a renderable belongs to.

### Fixed
- ImageLayer: fix a regression when loading a level within a sub container (thanks @rcl)

## [15.14.0] (melonJS 2) - _2023-10-17_

### Added
- loader: prevent loading of previously loaded resources. e.g. duplicated resources across mutliple manifest (thanks @z0mb1)
- loader: add handling of asset load error, enabling to retry loading failed assets (thanks @z0mb1)

### Changed
- UI: small optimization when rendering BitmapText

## [15.13.0] (melonJS 2) - _2023-10-07_

### Changed
- UI: UITextButton `backgroundColor` and `hoverColor` properties are now deprecated in favor of `hoverOffColor` and `hoverOnColor`

### Fixed
- UI: fix duplicated text rendering in UITextButton
- UI: fix an exception when destroying a UITextButton

## [15.12.0] (melonJS 2) - _2023-09-23_

### Added
- Renderer: add proper `width` and `height` (getter/setter) properties and deprecate `getHeight()` and `getWidth()`

### Changed
- Audio: update howler.js to version 2.2.4

## [15.11.0] (melonJS 2) - _2023-09-15_

### Added
- plugin: the `BasePlugin` class now holds a reference to the app or game instance that registered the plugin
- plugin: new `plugin.get()` method to retrieve a plugin instance by its Class Type or registered name

## [15.10.0] (melonJS 2) - _2023-09-05_

### Added
- utils: new file `getPath()` method that return the path element of a full file path

### Changed
- Chore: new "docs" directory where production documentation is generated, and properly published using Github Workflows
- Chore: update NPM dependencies

### Fixed
- Loader: fix the `setParser()` method not being exported (and therefore preventing from using and setting custom parser) 

## [15.9.2] (melonJS 2) - _2023-08-28_

### Fixed
- Renderer: fix the Canvas Renderer `setMask()` method ignoring the default path when no argument is passed
- Geometries: fix missing `type` property for all geometry and use internally for type checking instead of relying on `instanceof`

## [15.9.1] (melonJS 2) - _2023-08-24_

### Fixed
- Geometry: add default parameters to the `Polygon` constructor, allowing to instantiate "empty" polygons
- TMX: fix CanvasRenderer option typo when using TMXLayer pre-rendering option (thanks @0o001)
- TypeScript: fix missing parameter for `setMask()` in the parent `Renderer` class

## [15.9.0] (melonJS 2) - _2023-08-16_

### Added
- Input: new `hasActiveEvents` returning true if there are any pending events in the queue
- Input: new `hasRegisteredEvents` returning true if there are registered pointer event listeners
- Physic: new `WORLD_STEP` event emmitted after the builtin physic world has been updated (if enabled)
- Renderer: fix/enable batching for all ellipse & arc(To) WebGL stroke operations
- Renderer: the `setTransform` and `transform()` methods now also accept individual components to match the CanvasRenderingContext2D API
 
### Fixed
- Plugin: add missing deprecation warning for `plugin.Base` (deprecated since [15.1.6] and replaced by `BasePlugin`)

### Changed
- Physic: split the world update method into a separate step for clearer code when using custom update logic.

## [15.8.0] (melonJS 2) - _2023-07-29_

### Added
- Doc: add proper documentation and example for Renderer drawing-related APIs
- Physic: new `physic` flag allowing to disable the builtin physic implementation
- Renderer: new TextureCanvas `invalidate()` method to force reuploading the corresponding WebGL Texture

### Fixed
- Doc: fix missing default `game` application instance
- Renderer: properly deallocate and reallocate texture unit after a texture deletion in WebGL rendering mode

## [15.7.0] (melonJS 2) - _2023-07-19_

### Added
- Color: new `setFloat` method allowing to specify RGBA components in a normalized float format

### Fixed
- Renderer: fix how alpha and globalAlpha values are applied in the Canvas Renderer to match with WebGL
- TypeScript : fix loader.Asset definition typings (causing an error with the Vite-Typescript boilerplate)

## [15.6.0] (melonJS 2) - _2023-07-18_

### Added
- Audio: expose the audio `load` method in the documentation and typings
- Loader: melonJS now dynamically assign parser/preload functions to known asset types
- Loader: add the possibility to specify a user defined parser/preload function for a given asset type
- Renderable: new `depth` getter/setter that will returns the depth of a renderable on the z axis
- Renderer: the default renderer instance is now passed as parameter when emitting the global `VIDEO_INIT` event
- Renderer: add path like methods (`beginPath`, `lineTo`, `moveTo`, `rect`, `roundRect`, `closePath`, `fill` and `stroke`)

### Changed
- Geometry: optimize Path2d triangulation by only recalculating all triangles when the path is modified

### Fixed
- Core: fix some leftover direct global references to `document` (now using `globalThis.document`)
- Geometry: fix consecutive Path2d line stroke in WebGL mode

## [15.5.0] (melonJS 2) - _2023-07-13_

### Changed
- Color: optimize conversion function such as `toHex` and `toUint32`
- Geometry: optimize circle/ellispe creation and recycling
- Renderable: revert previous changes on the flip[X/Y] optimization since it's causing backward compatibility issue

### Fixed
- Doc: fix multiple incorrect `@type` tags across the API
- Doc: fix `ImageLayer` extending `Sprite` and not `Renderable`
- Doc: fix missing `fillStyle` and `StrokeStyle` properties for `Text` elements
- Physic: fix a potential memory leak when recalculating a polygon edges and normals
- TypeScript: fix missing typings for `Vector[2d/3d]` `x`, `y` and `z` properties
- TypeScript: fix typings for Array parameter type

## [15.4.1] (melonJS 2) - _2023-06-24_

### Fixed
- Audio : fix a TypeScript definition issue introduced in the previous version (on the audio `init` method)

## [15.4.0] (melonJS 2) - _2023-06-24_

### Added
- Application: new `pauseOnBlur`, `resumeOnFocus` and `stopOnBlur` properties to configure a game behavior on blur and focus events

### Changed
- Core: visibility and focus/blur events are now managed internally through new global `BLUR` and `FOCUS` events
- Device: `pauseOnBlur`, `resumeOnFocus` and `stopOnBlur` properties are now deprecated and replaced by their Application counterpart
- Geometry: optimize Rect `contains` method by using typeof instead of instanceof to identify given parameter type

### Fixed
- Renderable : fix a potential issue with a Tile Layer not being properly redrawn when adding or clearing individual tiles
- TMX : properly set the `preRender`flag for Tiled layer at runtime (when added to the root container)
- TMX : fix pre-rendering for non-orthogonal maps
- UI: fix dirty flag for base UI elements not being set due to wrong property name (thanks @yuta0315)

## [15.3.0] (melonJS 2) - _2023-05-23_

### Added
- Renderer: new `scaleTarget` that allows to specify which HTML element to be used as reference when scaling the canvas (thanks @johnhyde)

### Changed
- Application: world steps and rendering update are now done through a new global `TICK` event
- Application: further "decoupling" of Application, Stage and State (see #1091)
- Renderable : faster implementation of the `tint` getter/setter, and Color `copy` method

### Fixed
- doc: fix the @name value of `state.DEFAULT` (thanks @johnhyde)
- doc: fix documentation for the `TMXUtils` namespace
- Renderer: fix potential memory leak in WebGL, where the renderer was not clearing the save/restore stack upon reset
- TypeScript : fix optional arguments typings for all renderers and Application constructor

## [15.2.1] (melonJS 2) - _2023-05-14_

### Fixed
- TMX: fix a regression with the inflate patch entry point

## [15.2.0] (melonJS 2) - _2023-05-12_

### Changed
- Plugin: the `Base` plugin class is now deprecated and replaced by `BasePlugin` (`Base` is just an alias now)

### Fixed
- Typescript: fix typing for the `utils` and `plugin` API
- Utils: fix "namespace" es6 declaration and export

## [15.1.6] (melonJS 2) - _2023-05-10_

### Fixed
- TypeScript: fix typings for methods taking a renderable as argument, by enumerating all different class types

## [15.1.5] (melonJS 2) - _2023-05-05_

### Fixed
- Container: fix child bounds not being recalculated when a child is added through the `addChildAt()` method
- Container: fix container not recursively updating child bounds when `enableChildBoundsUpdate` is enabled
- Renderable: fix floating coordinates mismatch by forcing a child `floating` property to false when added to a floating container
- Renderable: fix the `isFloating` getter to also return true when a renderable is added to nested floating containers
- UI: fix initial UIBaseElement bound calculation when using nested UI containers
- UI: fix UIBaseElement container not propagating events to child objects by default

## [15.1.4] (melonJS 2) - _2023-04-26_

### Fixed
- Core: fix a regression with OffscreenCanvas support detection
- Doc: fix broken hyperlinks in the audio documentation
- TypeScript: fix documentation and typings for the loader API (thanks @edmundg)

## [15.1.3] (melonJS 2) - _2023-04-24_

- WebGL: fix a crash when creating/uploading a texture on browser(s) not supporting OffscreenCanvas

## [15.1.2] (melonJS 2) - _2023-04-24_

### Fixed
- Core: fix detection of OffscreenCanvas support by browser (fix a crash with Waterfront, thanks @fr0st for reporting it)

## [15.1.1] (melonJS 2) - _2023-04-10_

### Fixed
- Container: fix a regression when creating a container with physic bodies, before adding it to the main world container, would throw an exception

## [15.1.0] (melonJS 2) - _2023-04-07_

### Added
- Container: new `getRootAncestor()` method that returns the root container's parent (aka World Container)
- Renderer: new `toBlob()`, `toDataURL()` and `toImageBitmap()` methods added to `CanvasTexture`
- Renderer: new `toBlob()`, `toDataURL()` and `toImageBitmap()` methods added to all Renderers
- TMX: add a "patcheable" entry point to allow for a tiled inflate (zlib/gzip/zstd) plugin
- UI: new draggable feature for UIBaseElement (can be toggled on/off using `isDraggable`)

### Changed
- Application: the `sortOn` property is now a proper getter/setter for the App World instance `sortOn` property
- Plugin: the 2nd parameter of the `register` method is now optional and will use the given plugin class name by default

### Fixed
- Renderer: add missing export for the `CanvasTexture` class
- UI: fix internal holdTimeout type to integer and properly reset value to -1 when a timer is cleared
- UI: UITextButton now properly use the given alpha value of the given background and hover color
- UI: cleaned-up the UITextButton implementation, and added proper documentation for UITextButton specific properties
- WebGL: fix a Type Error exception with the latest version of Safari when using OffscreenCanvas element as a texture source

## [15.0.0] (melonJS 2) - _2023-03-18_

### Added
- Renderer: enable batch drawing for rectangle and polygon based primitive shapes
- Renderer: new base `Compositor` class that can be extended to create custom WebGL compositors
- Renderable: custom shader can now be set per renderable through a new `shader` property (experimental feature)

### Changed
- Core: remove remaining polyfills related to pre-ECMAScript 2015 features (as melonJS 2 implementation base is now 100% ES6)
- Renderer: refactoring of the `WebGLCompositor` into a `QuadCompositor` and `PrimitiveCompitor` for Quad and Primitive composition
- Renderer: the vertex shader now takes a color attributes (as opposed to using an uniform in previous version)
- Renderer: attributes and default shader "definitions" for WebGL Compositor(s) are now directly passed through the constructor
- Text: Text object now use offscreen canvas by default to render text (this has been in beta for almost 2 years)
- Text: setting `lineWidth` to a value greater than 0 will now automatically stroke the text
- Text: `drawStroke()` is now deprecated in favour of the `lineWidth` property

### Fixed
- Geometry: fix `arcTo()` drawing a "looping" line between the start and end angle
- Input: fix `device.touch` wrongly returning `true` on non-touch devices
- Renderer: fix binding of active shader when switching compositor
- Renderer: fix a TypeError exception on Safari Technology Preview
- Text: restore the text Stroke feature (was broken since a couple of releases)

## [14.5.0] (melonJS 2) - _2023-02-13_

### Added
- Bounds: add a `centerOn` method similarly to other base geometry objects
- ImageLayer: enable blend mode for `ImageLayer` renderable objects
- Sprite: sprites now "flip" (see flip[X/Y] methods) properly around their default anchor point

### Changed
- Loader: partial refactoring of the preloader to be more es6 compliant and fix circular dependencies with other modules/classes
- Pool: simplified and optimized the pool `pull` method
- Sprite: optimized flip[X/Y] operations by using the sprite own transform matrix instead of manipulating the renderer at draw time
- Renderer: optimized access to cached textures, especially when using multiple atlases
- Renderer: Path2D now uses `Point` internally (instead of `Vector2d`) which is a much more simple object 
- Renderer: optimize Path2D triangulation

### Fixed
- Core: fix "global" exposed properties being read-only after refactoring to ES6
- Geometry: fix corresponing bounds not being properly updated when setting `center[X/Y]` or calling `centerOn()`.
- Input: fix a regression with pointer detection on transformed Renderable object
- Renderable: fix a regression with Bounds position being off after applying a transformation
- Sprite: fix `setRegion()` being called at every update for non-animated sprites 
- Tiled: fix format deprecation warning if map was not created with Tiled and format version is not available

## [14.4.0] (melonJS 2) - _2023-01-10_

### Added
- Tiled: add support for the .tmj and .tsj extension (JSON)
- Tiled: add support for Infinite map (Tiled chunks based map format)

### Changed
- Tiled: warn about map version 1.4 and below being deprecated (terrain was replaced by wangset tiles since version 1.5)

### Fixed
- Physic: fix a regression with the `collision.rayCast()` function (thanks @cpravetz)
- Tiled: fix a `cannot recycle` exception when rendering hexagonal maps

## [14.3.0] (melonJS 2) - _2022-12-30_

### Added
- Core: its now possible to specify a custom renderer (that extends the default Renderer class)

### Changed
- General: further code revamping to make melonJS more modular and allow instantiation of different app/games
- Physic: new `Detector` class instantiated by each physic world instance to detect and solve collisions

### Fixed
- Core: fix missing TS definitions when publishing on NPM (following changes in #1162)
- Doc: fix `fps` type in the World class

## [14.2.0] (melonJS 2) - _2022-12-26_

### Added
- Core: add a tsconfig file for types generation and properly enable type suggestions (thanks @lartkma)

### Changed
- Utils: move `getPixels()` as `getImageData()` under the CanvasTexture object

### Fixed
- Core: fix an uncaught exception (again) when using melonJS with parcel (thanks @infamoustrey)
- Core: fix further global reference to document (i.e. refer to globalThis instead of implicitely using window)
- Core: fix more circular dependencies for better/clearer code

## [14.1.2] (melonJS 2) - _2022-12-01_

### Fixed
- Build: fix TypeScript `.d.ts` file generation & definition (thanks @lartkma)

## [14.1.1] (melonJS 2) - _2022-11-03_

### Fixed
- Core: disable tree-shaking for now, as it is causing exception with the boilerplate
- ES6: use proper semantic when exporting default classes
- Physic: fix a regression in the quadtree implementation that was causing issues with some collision detection edge case

## [14.1.0] (melonJS 2) - _2022-10-30_

### Added
- Core: the build process has been upgraded to rollup 3 and Node 19
- Core: the build process will now only output a tree-shakeable ES Module directory `melonjs.mjs`

## [14.0.2] (melonJS 2) - _2022-10-18_

### Fixed
- Build: fix wrong distribution files being published on NPM

## [14.0.1] (melonJS 2) - _2022-10-18_

### Fixed
- Physic: fix faulty colllision detection under certain circumstances

## [14.0.0] (melonJS 2) - _2022-10-11_

### Added
- UI: New `UIBaseElement` class, a clickable container base UI element (thanks @wpernath)
- UI: New `UITextButton` class, a clickable roundRect & Text base button (thanks @wpernath)

### Changed
- Core: Build process will now only output a ES6 Bundle and the TS Declaration, ES5 is now fully deprecated
- Test Units: replaced the "old" ES5 based Jasmine+Karma framework by a modern ES6 based Mocha+Puppeteer one (thanks @L1lith)
- UI: the base `GUI_Object` class is now deprecated and replaced by `UISpriteElement`, a Sprite based clickable element

### Fixed
- Build: fix typescript generation (d.ts), no more missing API or modules
- Container: fix Container class initialization when no default viewport have been created
- Core: fix a regression with Ejecta platform detection (following ES6 refactoring)

## [13.4.0] (melonJS 2) - _2022-09-27_

### Added
- BitmapText: melonJS will now throw a warning message in the console, instead of failing silently, if a Glyph is not defined for a given character (thanks @wpernath)

### Fixed
- BitmapText: fix kerning when scaling BitmapText objects (thanks @SiLiKhon)

## [13.3.0] (melonJS 2) - _2022-08-28_

### Added
- Documentation: enable offline documentation access with the latest webdoc 2.1 version

### Changed
- Readme: replace link to the latest tutorial

## [13.2.1] (melonJS 2) - _2022-08-22_

### Fixed
- Release date and version/change tracking

## [13.2.0] (melonJS 2) - _2022-08-22_

### Added
- Geometry: new base Point geometry object
- Tiled: now properly support Point geometry if defined in a map

### Changed
- Core: replaced internal reference to the deprecated `trim[Left/Right]` methods by their `trim[Start/End]` equivalents
- WebGL: dissociate the `preMultipliedAlpha` setting from the `transparent` one since those are 2 different things

### Fixed
- BitmapText: fix improper `fillStyle` initialization in BitmapText (thanks @wpernath)
- Canvas: fix the "transparent" canvas mode with the canvas renderer (thanks @wpernath)
- Sprite: properly apply a tint when passed through the settings to the constructor
- WebGL: fix a regression with global opacity not being properly cascaded to texture in WebGL mode (thanks @wpernath)

## [13.1.1] (melonJS 2) - _2022-08-10_

### Fixed
- Release date and version/change tracking

## [13.1.0] (melonJS 2) - _2022-08-10_

### Added
- Color: added a `setHSL(h, s, l)` and `setHSV(h, s, v)` method to the Color class
- Tiled: add support for the new `class` property (note: melonJS will still set the deprecated `type` one for backward compatibility)
- Renderer: Canvas rendering mode can now be forced by adding `[#/&]canvas` to the URL (similarly with WebGL1/2 already)
- Vector: new `moveTowards()` method for `[Observable]Vector2d/3d` objects (limited to x and y axis for 3d vectors)

### Changed
- Renderer: the double-buffering option for the Canvas Renderer is now deprecated, this to better align both renderer and enable further improvements

### Fixed
- 9-Slice Sprite: fix resizing of a 9-slice sprite (thanks @NemoStein)
- Tiled: fix missing text property in TMX Object documentation
- Vector: fix `lerp()` not triggering the callback in `ObservableVector2/3d` objects
- Renderer: fix the manual canvas scaling option (thanks @NemoStein)

## [13.0.0] (melonJS 2) - _2022-07-18_

### added
- Event: also provide a reference to the camera viewport being resized when emitting `VIEWPORT_ONRESIZE`
- Unit Test: added base64 encoded data preload testing for image and audio assets
- Utils: new `isDataUrl()` helper returning true if the given url is in the `data:[<mediatype>][;base64],<data>` format.

### Changed
- Core: full ES6 refactoring of `me.device`, and API clean-up (@see https://github.com/melonjs/melonJS/wiki/Upgrade-Guide#120x-to-130x-stable)
- Game: refactoring of the global `game` into an instantiable `Application` object, with `game` now being the default instance of it (@see #1091)
- Loader: `onload` and `onerror` callbacks are now optionals when directly loading assets (easier with base64 encoded assets)
- Physic: World physic implementation is now properly tight to its corresponding parent application/game (@see #1091)
- Physic: Gravity is now properly applied as a force, instead of directly modifying a body velocity
- Physic: Gravity now properly takes in account the body mass
- Physic: resulting force is now properly cancelled at the end of an update cycle (not required anymore to manually set it to 0 in user code)

### Fixed
- Doc: fix missing `Timer` documentation following previous refactoring
- Loader: fix loading/preloading of base64 audio assets, and base64 encoded FontFace
- Renderer: fix a regression with the masking features in the Canvas Rendering mode
- Text: fix an uncaught exception when removing Text object from the game world that use offScreenCanvas texture caching (thanks @wpernath)

## [12.0.0] (melonJS 2) - _2022-06-27_

### Changed
- Loader: the default loading screen has been updated with the new melonjs logo
- String: replaced own `trim[left/right]` functions with native es10 equivalent (with polyfill)

## [11.0.0] (melonJS 2) - _2022-06-23_

### Added
- Event: new `DOM_READY` event triggered when the DOM is loaded and ready (now used internally to trigger the `onReady()` function)

### Changed
- Renderable: update the Light2d constructor to allow creating elliptical shaped lights

### Fixed
- Core: fix an uncaught exception when using parcel (thanks @8Observer8)

## [10.12.0] (melonJS 2) - _2022-06-20_

### Added
- State: new `get(state)` function that return the instance to the Stage associated with the given state

### Changed
- Physic: simplify the collision api and implementation (removed `collision.response` that serves no purpose anymore)
- Pooling: silently fail if internally failing at recycling body physic shapes

### Fixed
- Physic: fix a regression with Ellipse vs Polygon SAT collision detection
- Text: make sure the optional `x` and `y` arguments of the draw method are set to a default value
- TypeScript: fix and uniform draw method signature across all renderables
- TypeScript: fix typings for the `onCollision` method
- TypeScript: fix `setMaxVelocity` and `setFriction` method scope
- Webdoc: fix wrong or missing  argument names (`Path2D.arcTo`, `Rect.centerOn`, `Texture.AdduVs`)


## [10.11.0] (melonJS 2) - _2022-06-14_

### Changed
- Core: fix all rollup "$1" related duplicated declaration and/or export
- Core: refactored Timer into an instantiable class with `timer` (namespace) now being the default instance of the Timer class
- Doc: replaced JSDoc by Webdoc for documentation generation (huge thanks to @ShukantPal)

### Fixed
- Bounds: fix the `addFrame()` method
- Core: fix a regression when accessing `localStorage`
- Core: fix a regression when when running melonJS in node.js (undefined global reference in the roundRect polyfill)
- Geometry: fix the RoundRect `clone()` method
- Input: fix PointerEvent detection on Firefox for Android mobile (thanks @kutyamutya)
- Renderer: fix a regression with `strokeLine()` in the CanvasRenderer

## [10.10.0] (melonJS 2) - _2022-06-07_

### Added
- Core: new `CanvasTexture` object to allow recycling canvas through the engine (text caching, default particles, effect, etc..)
- Core : new experimental light effect that simply simulate a spot/point light for now (work in progress)
- Color : allow overriding the alpha component with a specific value when calling `toRGBA` or `toHex8`
- Renderer: support reverse clipping when applying geometry masks (alpha component of the masked area is ignored in legacy Canvas rendering mode)
- Renderer: added multiple clipping region for masks (only works with overlapping region in legacy Canvas rendering mode)

### Changed
- TMX: replace use of `eval()` by `Function()` when parsing map including executable code
- Core: replace internal calls to deprecated `substr` function with `slice`

### Fixed
- Renderable: mark renderable(s) as dirty when their pos or bounds are updated
- Geometry: fix a regression with roundRect shape drawing

## [10.9.0] (melonJS 2) - _2022-05-21_

### Added
- Geometry : add a proper `contains` and other utility methods to RoundRect

### Fixed
- Renderer: fix clipping of RoundRect mask with the Canvas Renderer

## [10.8.0] (melonJS 2) - _2022-05-16_

### Added
- Geometry : new RoundRect geometry object
- Geometry : new Path2D API to provide better abstraction when drawing primitives in WebGL

### Changed
- Renderer: refactored the WebGL renderer to use the new Path2D API for primitive drawing

### Fixed
- Core: improve internal object recycling, to fix instance leaking or hoarding by the pool system
- Input: fix a warning on using passive target disabling swipe on a WebView (thanks @zngb)

## [10.7.1] (melonJS 2) - _2022-05-05_

### Fixed
- Renderer: fix a crash on context restore when using the canvas renderer

## [10.7.0] (melonJS 2) - _2022-05-04_

### Added
- Core : new `device.nodeJS` to detect if running under node.js
- Particle Emitter: added the possibility to define a specific tint and blend mode for particles
- Renderable: new `centerOn` method to center a renderable around given coordinates
- Renderer: added "additive" as an alias for the "lighter" blend mode
- Renderer: listen to `contextlost` & `contextrestored` events in Canvas rendering mode (@see https://developer.chrome.com/blog/canvas2d/#context-loss)

### Changed
- Core : replace internal use of global window object by `globalThis`
- Core : refactor the boot process, and device/feature detection/initialisation to better work within node.js (will still require jsdom and node-canvas)
- Particle Emitter: refactoring of the Emitter class to directly extend `Container` instead of `Renderable`

### Fixed
- Particle Emitter: fix a regression in `ParticleEmitter` causing a crash, after es6 class reformatting
- Particle Emitter: fix particle additive blend mode in WebGL

## [10.6.1] (melonJS 2) - _2022-04-25_

### Fixed
- Renderable: fix a regression in BitmapText when specifying a scaling size through the constructor

## [10.6.0] (melonJS 2) - _2022-04-25_

### Added
- Renderable : added the possibility to specify a blend mode per renderable
- Renderer: added missing compatible/supported blend mode across the canvas and WebGL renderer ("normal", "multiply", "lighter, "screen")
- Renderable : new (simple) word wrapping feature for Text and BitmapText classes

### Changed
- Renderable : refactor of Text and BitmapText to isolate metrics related features/functions and standardize the api between the 2 classes

### Fixed
- Container: mark a container as dirty when changing own child(s) order using `MoveTo[Top/Bottom]`, `move[Up/Down]` and `swapChildren`
- Renderable : fix NineSliceSprite bounding box not being properly scaled up
- Renderer: fix blend mode in WebGL rendering mode


## [10.5.2] (melonJS 2) - _2022-03-17_

### Fixed
- WebGL: fix shader attribute for the projection matrix not being properly updated when using the flex scaling mode

## [10.5.1] (melonJS 2) - _2022-03-17_

### Fixed
- Renderer: fix a regression when zooming the canvas in WebGL rendering mode
- TypeScript : fix definition of the base Renderable class

## [10.5.0] (melonJS 2) - _2022-03-15_

### Changed
- Physic: set collision shapes as static by default (those should be fixed anyway)
- Renderable : refactor of Draggable and DropTarget base objects

### Fixed
- Physic: fix improper behavior for static bodies responding to collisions (thanks @dynamo-foundation)
- Physic: static bodies are now properly filtered out if within the same node or overlapping
- Renderable : fix a me.Sprite bug when reusing the same image/texture with different frame width/height (thanks @dynamo-foundation)

## [10.4.0] (melonJS 2) - _2022-03-08_

### Added
- Renderable : containers now define a `backgroundColor` property allowing to defined a background color for a specific container
- Renderable : new `inset[x/y]` property setting allowing to define the size of a corner for NineSliceSprite (thanks @dynamo-foundation)

### Changed
- Renderer: the video.renderer.Texture class is now directly exported (and available) as TextureAtlas

### Fixed
- TypeScript : fix all typings and other issues with the typescript definition file (now with 0 warnings and linting errors)
- Input : fix a regression (undefined error) with the `releasePointerEvent` method (thanks @siauderman)

## [10.3.0] (melonJS 2) - _2022-02-02_

### Added
- TMX: melonJS will now throw an error if collision polygons defined in Tiled are not forming a convex shape
- WebGL : vertex element and buffer size are now dynamically calculated based on attribute definition

### Changed
- WebGL : switch from drawElements to drawArrays when drawing quads
- WebGL : optimize ColorLayer rendering and `clearRect` method by using `clipRect` & `clearColor` instead of drawing primitives
- Device : modernize the `pointerLock` implementation (2.0 specs) and moved it under `me.input`

### Fixed
- Renderable : properly delete me.Text cache WebGL texture upon deactivation (if created)
- WebGL : Optimize vertex buffer allocated size following tint color packing into Uint32
- Device : fix `pointerLock` feature detection

## [10.2.3] (melonJS 2) - _2021-12-18_

### Fixed
- Core: fix a regression with the quadtree implementation and non floating objects
- Preloader: optimize defined cache canvas size in the default loading screen when using WebGL2

## [10.2.2] (melonJS 2) - _2021-12-14_

### Added
- Renderable: new `isFloating` getter returning true if the renderable is a floating object or contained in a floating container

### Fixed
- TypeScript: fix most of method parameters and return type declaration when applicable
- Input: fix an issue with pointer event detection on nested floating items

## [10.2.1] (melonJS 2) - _2021-11-23_

### Fixed
- changelog release date and links

## [10.2.0] (melonJS 2) - _2021-11-23_

### Added
- Bounds: faster condition assessment for the `overlaps` method
- Renderable: added a basic `NineSliceSprite` renderable object
- Renderable: new `offScreenCanvas` option for me.Text allowing to use an individual offscreen canvas texture per text element

### Fixed
- Input: fix a regression with me.input.pointer not being updated on pointer events
- Loader: fix a "double initialization and double reset" bug with the default loading screen

## [10.1.1] (melonJS 2) - _2021-11-12_

### Fixed
- documentation: add missing pages for `Container` and `World` object
- Renderable: also flag as "dirty" when changing opacity, or when viewport change is triggering an `ImageLayer` update

## [10.1.0] (melonJS 2) - _2021-11-08_

### Changed
- Input: refactor me.Pointer by extending me.Bounds instead of me.Rect (simplify implementation and memory usage when using pointer Event)
- WebGL: refactor/simplify the WebGLCompositor implementation to be more generic
- WebGL: prevent temporary Array Buffer Allocation when using WebGL2
- WebGL: tint color are now packed into Uint32 before passing them to the Vertex Shader
- Device: replace use of deprecated `onorientationchange()` event listener by the standard ScreenOrientation one

### Fixed
- Input: fix a regression, throwing an undefined property exception, when accessing me.input.pointer before registering on any events (thanks @kkeiper1103)
- WebGL: fix initial declaration of the WebGLVersion property

## [10.0.2] (melonJS 2) - _2021-10-29_

### Fixed
- Documentation: fix missing class definition after the 10.0.0 release

## [10.0.1] (melonJS 2) - _2021-10-25_

### Fixed
- Physic: fix a regression (crash) with undefined reference in the minified ES6 module

## [10.0.0] (melonJS 2) - _2021-10-23_

### Added
- melonJS is now a pure ES6 library, for class definition, inheritance and semantic
- melonJS now includes typescript definition for the ESM `melonjs.module` bundle (thanks @qpwo)
- Core : new `me.event.BOOT` event that will be triggered when melonJS is initialized
- Physic : physic bodies can now be configured as static bodies (which do not move automatically and do not check for collision with others)
- Event : new system events at the beginning and end of both the update and draw "loop"

### Changed
- Jay Inheritance has been replaced with ES6 standard inheritance
- Core : object using the pooling function *must* now implement a `onResetEvent` method and use the `recycling` flag when registered
- Core : manually pushing a non recyclable object into the object pool will now throw an exception instead of silently failing
- Physic : physic body update and collision check is now automatically done through the world simulation update loop
- Physic : fixed gravitational acceleration (thanks @neilsf)
- Event: minPubSub event based implementation has been replaced by a nodeJS event emitter based implementation
- Renderable: calling `flipX/Y()` without argument will now flip the renderable as expected

### Deprecated
- all deprecated API from the legacy melonJS version have been removed

### Fixed
- Renderer: fix the stencil masking feature on renderable components (for both WebGL and Canvas mode)
- Loader: fix a graphic glitch in the default preloading screen

-------------------------------------------------------------------------------

[17.5.0]: https://github.com/melonjs/melonJS/compare/17.4.0...17.5.0
[17.4.0]: https://github.com/melonjs/melonJS/compare/17.3.0...17.4.0
[17.3.0]: https://github.com/melonjs/melonJS/compare/17.2.0...17.3.0
[17.2.0]: https://github.com/melonjs/melonJS/compare/17.1.0...17.2.0
[17.1.0]: https://github.com/melonjs/melonJS/compare/17.0.0...17.1.0
[17.0.0]: https://github.com/melonjs/melonJS/compare/16.1.3...17.0.0
[16.1.3]: https://github.com/melonjs/melonJS/compare/16.1.2...16.1.3
[16.1.2]: https://github.com/melonjs/melonJS/compare/16.1.1...16.1.2
[16.1.1]: https://github.com/melonjs/melonJS/compare/16.2.0...16.1.1
[16.1.0]: https://github.com/melonjs/melonJS/compare/16.0.0...16.1.0
[16.0.0]: https://github.com/melonjs/melonJS/compare/15.15.0...16.0.0
[15.15.0]: https://github.com/melonjs/melonJS/compare/15.14.0...15.15.0
[15.14.0]: https://github.com/melonjs/melonJS/compare/15.13.0...15.14.0
[15.13.0]: https://github.com/melonjs/melonJS/compare/15.12.0...15.13.0
[15.12.0]: https://github.com/melonjs/melonJS/compare/15.11.0...15.12.0
[15.11.0]: https://github.com/melonjs/melonJS/compare/15.10.0...15.11.0
[15.10.0]: https://github.com/melonjs/melonJS/compare/15.9.2...15.10.0
[15.9.2]: https://github.com/melonjs/melonJS/compare/15.9.1...15.9.2
[15.9.1]: https://github.com/melonjs/melonJS/compare/15.9.0...15.9.1
[15.9.0]: https://github.com/melonjs/melonJS/compare/15.8.0...15.9.0
[15.8.0]: https://github.com/melonjs/melonJS/compare/15.7.0...15.8.0
[15.7.0]: https://github.com/melonjs/melonJS/compare/15.6.0...15.7.0
[15.6.0]: https://github.com/melonjs/melonJS/compare/15.5.0...15.6.0
[15.5.0]: https://github.com/melonjs/melonJS/compare/15.4.1...15.5.0
[15.4.1]: https://github.com/melonjs/melonJS/compare/15.4.0...15.4.1
[15.4.0]: https://github.com/melonjs/melonJS/compare/15.3.0...15.4.0
[15.3.0]: https://github.com/melonjs/melonJS/compare/15.2.1...15.3.0
[15.2.1]: https://github.com/melonjs/melonJS/compare/15.2.0...15.2.1
[15.2.0]: https://github.com/melonjs/melonJS/compare/15.1.6...15.2.0
[15.1.6]: https://github.com/melonjs/melonJS/compare/15.1.5...15.1.6
[15.1.5]: https://github.com/melonjs/melonJS/compare/15.1.4...15.1.5
[15.1.4]: https://github.com/melonjs/melonJS/compare/15.1.3...15.1.4
[15.1.3]: https://github.com/melonjs/melonJS/compare/15.1.2...15.1.3
[15.1.2]: https://github.com/melonjs/melonJS/compare/15.1.1...15.1.2
[15.1.1]: https://github.com/melonjs/melonJS/compare/15.1.0...15.1.1
[15.1.0]: https://github.com/melonjs/melonJS/compare/15.0.0...15.1.0
[15.0.0]: https://github.com/melonjs/melonJS/compare/14.5.0...15.0.0
[14.5.0]: https://github.com/melonjs/melonJS/compare/14.4.0...14.5.0
[14.4.0]: https://github.com/melonjs/melonJS/compare/14.3.0...14.4.0
[14.3.0]: https://github.com/melonjs/melonJS/compare/14.2.0...14.3.0
[14.2.0]: https://github.com/melonjs/melonJS/compare/14.1.2...14.2.0
[14.1.2]: https://github.com/melonjs/melonJS/compare/14.1.1...14.1.2
[14.1.1]: https://github.com/melonjs/melonJS/compare/14.1.0...14.1.1
[14.1.0]: https://github.com/melonjs/melonJS/compare/14.0.2...14.1.0
[14.0.2]: https://github.com/melonjs/melonJS/compare/14.0.1...14.0.2
[14.0.1]: https://github.com/melonjs/melonJS/compare/14.0.0...14.0.1
[14.0.0]: https://github.com/melonjs/melonJS/compare/13.4.0...14.0.0
[13.4.0]: https://github.com/melonjs/melonJS/compare/13.3.0...13.4.0
[13.3.0]: https://github.com/melonjs/melonJS/compare/13.2.1...13.3.0
[13.2.1]: https://github.com/melonjs/melonJS/compare/13.2.0...13.2.1
[13.2.0]: https://github.com/melonjs/melonJS/compare/13.1.1...13.2.0
[13.1.1]: https://github.com/melonjs/melonJS/compare/13.1.0...13.1.1
[13.1.0]: https://github.com/melonjs/melonJS/compare/13.0.0...13.1.0
[13.0.0]: https://github.com/melonjs/melonJS/compare/12.0.0...13.0.0
[12.0.0]: https://github.com/melonjs/melonJS/compare/11.0.0...12.0.0
[11.0.0]: https://github.com/melonjs/melonJS/compare/10.12.0...11.0.0
[10.12.0]: https://github.com/melonjs/melonJS/compare/10.11.0...10.12.0
[10.11.0]: https://github.com/melonjs/melonJS/compare/10.10.0...10.11.0
[10.10.0]: https://github.com/melonjs/melonJS/compare/10.9.0...10.10.0
[10.9.0]: https://github.com/melonjs/melonJS/compare/10.8.0...10.9.0
[10.8.0]: https://github.com/melonjs/melonJS/compare/10.7.1...10.8.0
[10.7.1]: https://github.com/melonjs/melonJS/compare/10.7.0...10.7.1
[10.7.0]: https://github.com/melonjs/melonJS/compare/10.6.1...10.7.0
[10.6.1]: https://github.com/melonjs/melonJS/compare/10.6.0...10.6.1
[10.6.0]: https://github.com/melonjs/melonJS/compare/10.5.2...10.6.0
[10.5.2]: https://github.com/melonjs/melonJS/compare/10.5.1...10.5.2
[10.5.1]: https://github.com/melonjs/melonJS/compare/10.5.0...10.5.1
[10.5.0]: https://github.com/melonjs/melonJS/compare/10.4.0...10.5.0
[10.4.0]: https://github.com/melonjs/melonJS/compare/10.3.0...10.4.0
[10.3.0]: https://github.com/melonjs/melonJS/compare/10.2.3...10.3.0
[10.2.3]: https://github.com/melonjs/melonJS/compare/10.2.2...10.2.3
[10.2.2]: https://github.com/melonjs/melonJS/compare/10.2.0...10.2.2
[10.2.1]: https://github.com/melonjs/melonJS/compare/10.2.0...10.2.1
[10.2.0]: https://github.com/melonjs/melonJS/compare/10.1.1...10.2.0
[10.1.1]: https://github.com/melonjs/melonJS/compare/10.1.0...10.1.1
[10.1.0]: https://github.com/melonjs/melonJS/compare/10.0.2...10.1.0
[10.0.2]: https://github.com/melonjs/melonJS/compare/10.0.1...10.0.2
[10.0.1]: https://github.com/melonjs/melonJS/compare/10.0.0...10.0.1
[10.0.0]: https://github.com/melonjs/melonJS/compare/9.1.2...10.0.0
