# SVgood
## What
Mass editing svgs to remove gunk that designer facing software tends to add

### What exactly
It culls *defs* and *g* elements, saving only *path* and moving up to the top level of the *svg* element so developers can more easily style the svg and it's not being set to a certain color/transform at a lower level down.

# Usage
You are REQUIRED to give a icon source directory via the node env variable ICON_SOURCE and can optionally give a destination via the node env variable ICON_DESTINATION

Example usage:
ICON_SOURCE="./gunky/designer/icons/" ICON_DESTINATION="./cool/developer/icons" node svgood.js

# Future
Planning to add 
- Naming format changes, from camel case to snake, trimming spaces.
- More granular control over what you remove from the svg files