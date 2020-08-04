import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useFetchList } from '../../utils/useFetch';
import { ProjectsURL } from '../../utils/Constant';

export default function MapBox(props) {
  const mapContainrRef = useRef(null);
  const coordinates = props.coordinates;
  const accessToken =
    'pk.eyJ1IjoiYmFuZ3l1YW4iLCJhIjoiY2tkOXBocXBrMGxseTJzcGRkdGw4OHM5cyJ9.57jlzEsYdxhZ8wWpHOzz2Q';

  const { data: projects } = useFetchList(ProjectsURL);
  var projectLocations = [];
  projects.forEach((project) => {
    const projectLocation = {
      lng: project.attributes.longitude,
      lat: project.attributes.latitude,
    };
    projectLocations.push(projectLocation);
  });

  // initialize map when component mounts
  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapContainrRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/light-v10',
      // initiate center
      center: [103.8343, 36.0611],
      zoom: 3,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    projectLocations.forEach((location) =>
      new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map)
    );

    if (coordinates) {
      map.jumpTo({ center: [coordinates.lng, coordinates.lat], zoom: 12 });
    }

    // clean up on unmount
    return () => map.remove();
  }, [projectLocations, coordinates]);

  return (
    <div className="n-card-home">
      <div className="map-container" ref={mapContainrRef} />
    </div>
  );
}
