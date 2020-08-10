import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useFetchList } from '../../utils/useFetch';
import { ProjectsURL } from '../../utils/Constant';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: '20%',
    zIndex: 500,
    transition: 'all 750ms',
  },
  mapSmall: {
    position: 'absolute',
    top: 50,
    left: 50,
    height: 200,
    width: 300,
    zIndex: 650,
    transition: 'all 750ms',
  },
  mapbox: {
    height: '100%',
    width: '100%',
  },
}));

export default function MapBox(props) {
  const mapElRef = useRef(null);
  const classes = useStyles();
  const { coordinate, showDashboard } = props;
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
  const [map, setMap] = useState(null);

  // initialize map when component mounts
  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    // Don't create the map until the ref is connected to the container div.
    // Also don't create the map if it's already been created.
    if (mapElRef.current && !map) {
      const map = new mapboxgl.Map({
        container: mapElRef.current,
        // See style options here: https://docs.mapbox.com/api/maps/#styles
        style: 'mapbox://styles/mapbox/light-v10',
        // initiate center
        center: [103.8343, 36.0611],
        zoom: 3,
        attributionControl: false,
        logoPosition: 'bottom-right',
      });
      // add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

      // data from OpenStreetMap.
      map.on('load', function () {
        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
          }
        }

        map.addLayer(
          {
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 15,
            paint: {
              'fill-extrusion-color': '#aaa',

              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height'],
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height'],
              ],
              'fill-extrusion-opacity': 0.6,
            },
          },
          labelLayerId
        );
      });
      // console.log('I am rendered again.');

      setMap(map);
    }

    // // clean up on unmount
    // return () => map.remove();
  }, [map]);

  useEffect(() => {
    if (map) {
      projectLocations.forEach((location) =>
        new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map)
      );
    }
  }, [map, projectLocations]);

  useEffect(() => {
    if (map) {
      map.resize();
      setTimeout(function () {
        map.resize();
      }, 750);
    }
  }, [map, showDashboard]);

  useEffect(() => {
    if (coordinate) {
      map.flyTo({
        center: [coordinate.lng, coordinate.lat],
        zoom: 17,
        essential: true,
        pitch: 45,
        bearing: -17.6,
        antialias: true,
        speed: 1.5,
      });
    }
  }, [map, coordinate]);

  return (
    <div className={showDashboard ? classes.mapSmall : classes.map}>
      <div className={classes.mapbox} ref={mapElRef} />
    </div>
  );
}
