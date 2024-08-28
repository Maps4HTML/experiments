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
  'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=41392fb7515533a5',
  { theme: { theme: 'light' } }
);
export { pmtilesRules };
