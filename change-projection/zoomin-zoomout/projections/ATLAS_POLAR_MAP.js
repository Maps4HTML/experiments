      let customProjectionDefinition = `{
            "projection": "ATLAS_POLAR_MAP",
            "proj4string" : "+proj=aeqd +lat_0=90 +lon_0=-90 +x_0=0 +y_0=0 +ellps=sphere +units=m +no_defs +type=crs",
            "code" : "ATLAS_POLAR_MAP",
            "origin" : [-20015200,20015200],
            "resolutions" :  [33073,16536.5,8268.246,4134.123,2067.061,1033.531,516.765],
            "bounds" : [[4979939,-4846977],[-5139071,3980038]],
            "tilesize" : 256
        }`;
      let map = document.querySelector("mapml-viewer");
      let cProjection = map.defineCustomProjection(customProjectionDefinition);