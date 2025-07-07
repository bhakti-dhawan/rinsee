'use client';

import React, { useEffect, useRef, useState } from 'react';

const Map = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [address, setAddress] = useState<string>('Fetching address...');
  const mapRef = useRef<HTMLDivElement>(null);

  const GOOGLE_MAP_API_KEY = 'AIzaSyAmJixElxZzVtD26BWhCaGC1S3HMHsGDLc';

  const loadMap = () => {
    const defaultLatLng = { lat: 22.7456, lng: 75.898 }; // Indore Default Location
    const map = new window.google.maps.Map(mapRef.current as HTMLDivElement, {
      center: defaultLatLng,
      zoom: 14,
    });

    const marker = new window.google.maps.Marker({
      position: defaultLatLng,
      map,
      draggable: true,
    });

    setLocation(defaultLatLng);
    fetchAddress(defaultLatLng.lat, defaultLatLng.lng);

    marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setLocation({ lat, lng });
        fetchAddress(lat, lng);
      }
    });
  };

  const fetchAddress = (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        setAddress(results[0].formatted_address);
      } else {
        setAddress('Address not found');
      }
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    script.async = true;
    script.onload = loadMap;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '250px',
          borderRadius: '10px',
          marginBottom: '10px',
        }}
      />
      <div>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Latitude:</strong> {location?.lat}
        </p>
        <p>
          <strong>Longitude:</strong> {location?.lng}
        </p>
      </div>
    </div>
  );
};

export default Map;
