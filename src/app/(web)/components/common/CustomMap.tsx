import '/public/styles/googleMaps/googleMapStyles.css';

import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Clinic } from '@interface/clinic';
import loader from '@utils/googleMapsLoader';
import { poppins } from 'app/fonts';

const styles = {
  silver: [
    {
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }],
    },
    {
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#616161' }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#f5f5f5' }],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#bdbdbd' }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#eeeeee' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#757575' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#e5e5e5' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9e9e9e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#757575' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#dadada' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#616161' }],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9e9e9e' }],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{ color: '#e5e5e5' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{ color: '#eeeeee' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#c9c9c9' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9e9e9e' }],
    },
  ],
};

function CustomPopup({
  map,
  position,
  content,
}: {
  map: google.maps.Map;
  position: google.maps.LatLng;
  content: ReactNode;
}) {
  const popupRef = useRef(document.createElement('div'));

  useEffect(() => {
    const popupDiv = popupRef.current;
    popupDiv.style.position = 'absolute';
    popupDiv.style.transform = 'translate(-50%, -100%)';
    popupDiv.style.background = 'transparent'; // Custom styles
    popupDiv.style.padding = '0';
    popupDiv.style.border = 'none';
    popupDiv.style.borderRadius = '0';
    popupDiv.style.boxShadow = 'none';

    const popUp = new window.google.maps.OverlayView();

    popUp.onAdd = () => {
      const panes = popUp.getPanes();
      if (panes) {
        panes.floatPane.appendChild(popupDiv);
      }
    };

    popUp.draw = () => {
      const projection = popUp.getProjection();
      const pos = projection.fromLatLngToDivPixel(position);
      if (pos) {
        popupDiv.style.left = `${pos.x}px`;
        popupDiv.style.top = `${pos.y}px`;
      }
    };

    popUp.onRemove = () => {
      if (popupDiv.parentNode) {
        popupDiv.parentNode.removeChild(popupDiv);
      }
    };

    popUp.setMap(map);

    return () => {
      popUp.setMap(null);
    };
  }, [map, position]);

  return ReactDOM.createPortal(content, popupRef.current);
}

export default function CustomMap({
  address,
  selectedClinic,
}: {
  address: string;
  selectedClinic: Clinic;
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (loader) {
        loader.load().then(() => {
          const latLng = new window.google.maps.LatLng(
            selectedClinic.lat,
            selectedClinic.long
          );

          const mapOptions = {
            center: new window.google.maps.LatLng(
              selectedClinic.lat + 0.0005,
              selectedClinic.long
            ),
            zoom: 17,
            disableDefaultUI: true,
          };

          const mapElement = document.getElementById('map');

          if (mapElement) {
            const newMap = new window.google.maps.Map(mapElement, mapOptions);

            newMap.setOptions({ styles: styles['silver'] });

            const customIconUrl = '/images/customMarker.svg';

            const marker = new window.google.maps.Marker({
              position: latLng,
              map: newMap,
              icon: customIconUrl,
            });

            setMap(newMap);

            const popupContent = (
              <div
                id="content"
                className={`${poppins.className} text-sm text-hg-black -translate-y-16 bg-white p-4 rounded-2xl shadow-lg w-60`}
              >
                <p className="text-lg font-semibold mb-2">
                  {selectedClinic.city}
                </p>
                <p className="text-xs mb-2">{selectedClinic.address}</p>
                <a
                  className="text-hg-secondary text-xs"
                  href="https://wa.me/34682417208"
                >
                  Más info
                </a>
              </div>
            );

            ReactDOM.render(
              <CustomPopup
                map={newMap}
                position={latLng}
                content={popupContent}
              />,
              mapElement
            );
          } else {
            console.error('Failed to find map element');
          }
        });
      } else {
        console.error('Loader is null');
      }
    }, 400);
  }, [address]);

  return <div id="map" className="h-full" />;
}
