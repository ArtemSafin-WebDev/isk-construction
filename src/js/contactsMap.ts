export default async function contactsMap() {
  await ymaps3.ready;
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapMarker,
    YMapDefaultFeaturesLayer,
  } = ymaps3;
  const { YMapZoomControl } = await ymaps3.import(
    "@yandex/ymaps3-controls@0.0.1"
  );

  const element = document.querySelector<HTMLElement>(".contacts");
  if (!contactsMap) return;

  const mapElement = element?.querySelector<HTMLElement>(
    ".contacts__map-element"
  );
  if (!mapElement) return;
  const lat = Number(mapElement.parentElement?.getAttribute("data-lat"));
  const lng = Number(mapElement.parentElement?.getAttribute("data-lng"));
  const themeUrl = mapElement?.parentElement?.getAttribute("data-theme-url");
  const zoom = mapElement?.parentElement?.hasAttribute("data-zoom")
    ? Number(mapElement?.parentElement?.getAttribute("data-zoom"))
    : 14;
  let theme = null;

  if (themeUrl) {
    try {
      theme = await fetch(themeUrl).then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      });
    } catch (err) {
      console.error(err);
    }
  }

  const map = new YMap(mapElement, {
    location: {
      center: [lng, lat],
      zoom: zoom,
    },
    behaviors: ["drag", "pinchZoom"],
  });

  if (theme) {
    map.addChild(
      new YMapDefaultSchemeLayer({
        customization: theme,
      })
    );
  } else {
    map.addChild(new YMapDefaultSchemeLayer({}));
  }
  map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));
  const controls = new YMapControls({
    position: "bottom right",
    orientation: "vertical",
  });
  controls.addChild(
    new YMapZoomControl({
      easing: "linear",
    })
  );
  map.addChild(controls);
  const markerElement = document.createElement("div");
  markerElement.className = "contacts__marker";
  markerElement.innerHTML = `
      <img src="/images/pin.webp" alt="" class="contacts__map-pin">
    `;

  const marker = new YMapMarker(
    {
      coordinates: [lng, lat],
      draggable: false,
      mapFollowsOnDrag: false,
    },
    markerElement
  );
  map.addChild(marker);
}
