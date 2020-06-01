import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useFetchList } from "../Utils/useFetch";
import { ProjectsURL } from "../Utils/Constant";

export default function MapboxGLMap(props) {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const accessToken =
    "pk.eyJ1IjoibXlub3ZtYnIiLCJhIjoiY2o4ZGN2cnZtMG44cTJ6bjh6amdndWF6bSJ9.oiPuyesbcs_SIuCgOVF_Bg";
  const initCoordinate = {
    lng: 103.8343,
    lat: 36.0611,
    zoom: 3,
  };
  const coordinates = props.coordinates;

  const { data: projects } = useFetchList(ProjectsURL);
  var projectLocations = [];
  projects.forEach((project) => {
    const projectLocation = {
      lng: project.attributes.longitude,
      lat: project.attributes.latitude,
    };
    projectLocations.push(projectLocation);
  });

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [initCoordinate.lng, initCoordinate.lat],
        zoom: initCoordinate.zoom,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      projectLocations.forEach((location) => {
        // eslint-disable-next-line no-unused-vars
        const marker = new mapboxgl.Marker()
          .setLngLat([location.lng, location.lat])
          .addTo(map);
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, initCoordinate, projectLocations]);

  useEffect(() => {
    if (map && coordinates) {
      map.jumpTo({ center: [coordinates.lng, coordinates.lat], zoom: 12 });
    }
  }, [map, coordinates]);

  return (
    <div className="n-card-home">
      <div
        ref={(el) => (mapContainer.current = el)}
        className="map-container"
      />
    </div>
  );
}
