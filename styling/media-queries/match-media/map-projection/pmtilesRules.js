class SpearfishSymbolizer {
  constructor(options) {
    this.color = options.color;
    this.shape = options.shape;
  }
  draw(context, geom, z, feature) {
    let pt = geom[0][0];
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.beginPath();
    if (this.shape === 'circle') {
      context.arc(pt.x, pt.y, 3, 0, 2 * Math.PI);
    } else {
      context.rect(pt.x - 2, pt.y - 2, 4, 4);
    }
    context.stroke();
    context.fill();
  }
}
const pmtilesRules = new Map();
pmtilesRules.set(
  'https://data.source.coop/protomaps/openstreetmap/tiles/v3.pmtiles',
  { theme: { theme: 'light' } }
);
pmtilesRules.set(
  'https://maps4html.org/experiments/vector-tiles/pmtiles/spearfish.pmtiles?theme=light',
  { theme: { theme: 'light' } }
);
pmtilesRules.set(
  'https://maps4html.org/experiments/vector-tiles/pmtiles/spearfish.pmtiles?theme=dark',
  { theme: { theme: 'dark' } }
);
pmtilesRules.set(
  'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=41392fb7515533a5',
  { theme: { theme: 'light' } }
);
pmtilesRules.set(
  'http://localhost:8080/geoserver/gwc/service/wmts/rest/spearfish/OSMTILE/{z}/{y}/{x}?format=application/vnd.mapbox-vector-tile',
  {
    rules: {
      PAINT_RULES: [
        {
          dataLayer: 'streams',
          symbolizer: new protomapsL.LineSymbolizer({ color: 'steelblue', width: 2 })
        },
        {
          dataLayer: 'roads',
          symbolizer: new protomapsL.LineSymbolizer({ color: 'maroon', width: 2 })
        },
        {
          dataLayer: 'restricted',
          symbolizer: new protomapsL.PolygonSymbolizer({
            fill: 'red',
            opacity: 0.5
          })
        },
        {
          dataLayer: 'restricted',
          symbolizer: new protomapsL.LineSymbolizer({ color: 'red', width: 2 })
        },
        {
          dataLayer: 'archsites',
          symbolizer: new SpearfishSymbolizer({
            color: 'red',
            shape: 'square'
          })
        },
        {
          dataLayer: 'bugsites',
          symbolizer: new SpearfishSymbolizer({
            color: 'black',
            shape: 'circle'
          })
        }
      ],
      LABEL_RULES: [
        {
          dataLayer: 'archsites',
          symbolizer: new protomapsL.CenteredTextSymbolizer({
            labelProps: ['str1'],
            fill:'white',
            width:2,
            stroke:'black',
            font:"600 16px sans-serif"
          }),
          // note that filter is a property of a rule, not an option to a symbolizer
          filter: (z,f) => { return f.props['str1'].trim().toLowerCase() !== 'no name'; }
        }
      ]
    }
  }
);
export { pmtilesRules };
