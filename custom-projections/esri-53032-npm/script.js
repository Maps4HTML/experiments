var crs = new L.Proj.CRS('EPSG:xxxx',
	'+proj=aeqd +lat_0=90 +lon_0=-90 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs +type=crs',
	{
		resolutions: [33073,16536.5,8268.246,4134.123,2067.061,1033.531,516.765],
		origin: [-20015200,20015200],
		bounds:  L.bounds( [-4861825.5,-4564849.0],[4861825.5,3664151.75])
	}),
	map = new L.Map('map', {
		crs: crs,
		continuousWorld: false,
	});

new L.TileLayer('https://geoappext.nrcan.gc.ca/arcgis/rest/services/FGP/NCR_RCN/MapServer/tile/{z}/{y}/{x}/', {
	maxZoom: 6,
	minZoom: 0,
	continuousWorld: false
}).addTo(map);
//Set view over Stockholm Södermalm
map.setView([90, -90], 0);
