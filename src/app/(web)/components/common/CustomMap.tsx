import '/public/styles/googleMaps/googleMapStyles.css';

import { useEffect, useState } from 'react';
import { Clinic } from '@interface/clinic';
import loader from '@utils/googleMapsLoader';

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
            center: latLng,
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

            const contentString = `
                  <div id="content" style="padding: 16px;">
                    <p class="city">${selectedClinic.city}</p>
                    <p class="address">${selectedClinic.address}</p>
                    <a href="https://wa.me/34682417208" class="link">Más info</a>
                  </div>
                `;

            const infowindow = new window.google.maps.InfoWindow({
              content: contentString,
              ariaLabel: 'Test',
            });

            marker.addListener('click', () => {
              infowindow.open({
                anchor: marker,
                map,
              });
            });

            setMap(newMap);
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
