document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.querySelector('mapml-viewer');

    function renderResults(container, responses, map) {
        container.innerHTML = '';
        for (const r of responses) {
        const data = r.data;
        if (!data) continue;
        // geogratis format (items array)
        if (data.items) {
            for (const item of data.items) {
            const btn = document.createElement('button');
            btn.className = 'mapml-search-result';
            btn.setAttribute('type', 'button');
            btn.textContent = item.name
                + (item.concise ? ' (' + item.concise.code + ')' : '')
                + (item.province ? ', ' + item.province.code : '');
            btn.addEventListener('click', () => {
                if (item.bbox && item.bbox.length === 4) {
                const [west, south, east, north] = item.bbox;
                map.fitBounds([[south, west], [north, east]]);
                } else {
                map.setView([item.latitude, item.longitude], 10);
                }
                map._container
                .querySelector('.mapml-search-panel')
                .classList.remove('mapml-search-panel-open');
            });
            container.appendChild(btn);
            }
        }
        // GeoJSON format (Photon etc.)
        if (data.features) {
            for (const feature of data.features) {
            const props = feature.properties || {};
            const parts = [props.name];
            for (const key of ['city', 'county', 'state', 'country']) {
                if (props[key] && props[key] !== props.name) parts.push(props[key]);
            }
            const btn = document.createElement('button');
            btn.className = 'mapml-search-result';
            btn.setAttribute('type', 'button');
            btn.textContent = parts.filter(Boolean).join(', ') || 'Unnamed';
            btn.addEventListener('click', () => {
                const bbox = feature.bbox
                || (props.extent && props.extent.length === 4 ? props.extent : null);
                if (bbox && bbox.length === 4) {
                const [west, south, east, north] = bbox;
                map.fitBounds([[south, west], [north, east]]);
                } else if (feature.geometry && feature.geometry.coordinates) {
                const [lon, lat] = feature.geometry.coordinates;
                map.setView([lat, lon], props.zoom || 14);
                }
                map._container
                .querySelector('.mapml-search-panel')
                .classList.remove('mapml-search-panel-open');
            });
            container.appendChild(btn);
            }
        }
        }
    }

    viewer.addEventListener('mapsuggestions', (e) => {
        e.preventDefault();
        const container = viewer._map._container.querySelector('.mapml-search-results');
        renderResults(container, e.detail.responses, viewer._map);
    });

    viewer.addEventListener('mapsearch', (e) => {
        e.preventDefault();
        const container = viewer._map._container.querySelector('.mapml-search-results');
        renderResults(container, e.detail.responses, viewer._map);
    });

});
