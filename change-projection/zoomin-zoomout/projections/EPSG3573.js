      let customProjectionDefinition = `{
            "projection": "EPSG3573", 
            "proj4string" : "+proj=laea +lat_0=90 +lon_0=-100 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs", 
            "origin" : [-4889334.802955,4889334.802955], 
            "resolutions" : [38197.92815,19098.96407,9549.482037,4774.741019,2387.370509,1193.685255,596.8426273,298.4213137,149.2106568,74.60532841,37.30266421],  
            "bounds" : [[-4594983,4507258],[4655569,-4562485]],  
            "tilesize" : 256 
        }`;
      let map = document.querySelector("mapml-viewer");
      let cProjection = map.defineCustomProjection(customProjectionDefinition);  