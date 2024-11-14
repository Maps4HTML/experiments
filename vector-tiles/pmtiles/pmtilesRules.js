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
const sheet = new protomapsL.Sheet(`
<html>
  <body>
    <svg id="icon_0" width="99px" height="97px" xmlns="http://www.w3.org/2000/svg">
      <image href="data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbl82NCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGltYWdlIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkFBQUFBUUNBWUFBQUFmOC85aEFBQUFDWEJJV1hNQUFBN0VBQUFPeEFHVkt3NGJBQUFBMlVsRVFWUjRuTldQTVdvQ1lSQ0Z2MElDZ2xZaFZnRUwzZmNyZGlsczBteVJUdkFLa2xaSXdKM2ZpTjE2aGhoeUFCRkVjZ2J2WUtFbmtCUkpiNWtFSlRheXNNdFd5WVBYRFBPOW1RZC9YcjVHSlRkc1Rhb21wdm12TzBZbVB1T1FRcjRQeE5yRXR3L29wQzdITFM1TVRFd3NEdmFPdHdOOERCRGIwenh5eklkMWJoSkQraTFLWHN4T1lJSjN2a0dZM2ozZ1BnRmVqUnRjWnVvK2ROeWVCM2l4Skt0TXZQeUNtMGc4bS9neXNYOXlsRlBoT0tUZ3hZYzVYZ2ZYRkkrVnhKMkpkeE85MUlDQmFFZU83dm44b2M2VkQzak1YT1AvNkFmS0Ywd3dXeU9Oc3dBQUFBQkpSVTVFcmtKZ2dnPT0iIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIvPgogICAgPC9zdmc+" width="99" height="97" />
    </svg>
  </body>
</html>
`);
const pmtilesRules = new Map();
const pmtilesRulesReady = sheet.load().then(() => {
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
    'https://maps4html.org/experiments/vector-tiles/pmtiles/tiles/{z}/{y}/{x}.mvt?format=application/vnd.mapbox-vector-tile',
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
  return pmtilesRules;
});

export { pmtilesRules, pmtilesRulesReady };