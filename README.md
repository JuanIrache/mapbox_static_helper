# mapbox_static_helper

Provides urls and pixel positions for loading MapBox's static (square) tiles and create a bigger image

- Used for creating the SRT log viewer in https://djitelemetryoverlay.com

## Installation

Using npm:

```shell
$ npm install mapbox_static_helper
```

## Usage

```js
//Load module
let map = require('mapbox_static_helper');

//set values
//Available styles can be found here: https://www.mapbox.com/api-documentation/#styles
//for example satellite-v9
//location_data must be an instance of this other module: https://github.com/JuanIrache/latlon_to_xy
map.setup(
  mapBoxToken,
  screen_width,
  screen_height,
  zoom,
  map_style,
  location_data,
  tile_size
);
let image_urls = mp.getUrlsAndXY();
//getUrlsAndXY() returns an array of objects, with 3 values each: url (string), x and y (center position of image on screen)

//Other methods
map.setStyle(style); //sets the style string
console.log(map.getStyle()); //returns the style string
map.setLocation(location_data); //sets the location instance of latlon_to_xy
let location_data = console.log(map.getLocation()); //returns the location instance of latlon_to_xy
```

## TODO

- Not sure it's working well in conjunction with the laton_to_xy conversions module when changing tile size. What works for me is setting the tile size to 512 in the laton_to_xy module ant to 1024 here
- Maybe we should make this module completely independent of laton_to_xy
