//gets a mapbox token, screen dimensions, map style and location data and returns an array of urls and screen cordinates to fill the screen with images
//Refernce conversions module
function mapBoxStaticHelper() {
  let token;
  let w;
  let h;
  let mapImgs;
  let style;
  let z;
  let tileSize;
  let conversions;
  function refresh(tk, wi, he, zo, st, conv, ts) {
    //mapbox token, width, height, zoom level, map style ("outdoors", "satellite"...), conversions instance and tile size
    token = tk;
    conversions = conv;
    tileSize = ts || 1024;
    w = wi;
    h = he;
    mapImgs = {
      width: 1,
      height: 1
    };
    style = st;
    z = zo;
    while (w / mapImgs.width > tileSize) mapImgs.width += 2;
    while (h / mapImgs.height > tileSize) mapImgs.height += 2;
  }

  return {
    getUrlsAndXY: function () {
      let result = [];
      if (style && style != 'none') {
        for (let i = 0; i < mapImgs.height; i++) {
          let hPos = i - (mapImgs.height - 1) / 2;
          let y = tileSize * hPos;
          for (let j = 0; j < mapImgs.width; j++) {
            let wPos = j - (mapImgs.width - 1) / 2;
            let x = tileSize * wPos;
            let lon = conversions.xToLon(0 + tileSize * wPos);
            let lat = conversions.yToLat(0 + tileSize * hPos);
            let mapString = `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${lon},${lat},${z}/${tileSize}x${tileSize}?access_token=${token}&logo=false&attribution=false`;
            result.push({
              url: mapString,
              x: x,
              y: y
            });
          }
        }
      } else {
        return null;
      }
      return result;
    },
    setStyle: function (st) {
      style = st;
    },
    getZoom: function () {
      return z;
    },
    getStyle: function () {
      return style;
    },
    setLocation: function (conv) {
      conversions = conv;
    },
    getLocation: function () {
      return conversions;
    },
    setup: function (tk, wi, he, zo, st, conv, ts) {
      refresh(tk, wi, he, zo, st, conv, ts);
    }
  };
}

module.exports = mapBoxStaticHelper();
