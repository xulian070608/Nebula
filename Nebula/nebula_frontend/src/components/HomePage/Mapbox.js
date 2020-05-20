import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import GeoJSONTest from "../../data/GeoJSONTest";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXlub3ZtYnIiLCJhIjoiY2o4ZGN2cnZtMG44cTJ6bjh6amdndWF6bSJ9.oiPuyesbcs_SIuCgOVF_Bg";

class CreateMap extends Component {
  componentDidMount() {
    const { lng, lat, zoom } = this.props.coordinates;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // since we remove state and instead using props to drive map,
    // no need to record map's coordinates here.

    // map.on('move', () => {
    //     this.setState({
    //     lng: map.getCenter().lng.toFixed(4),
    //     lat: map.getCenter().lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2)
    //     });
    //     });

    GeoJSONTest.features.forEach((marker) => {
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              "<h3>" +
                marker.properties.title +
                "</h3><p>" +
                marker.properties.description +
                "</p>"
            )
        )
        .addTo(map);
    });
  }

  //re-render map upon receiving new props.coordinates; might not be an effecient way, but works.
  componentDidUpdate(prevProps) {
    const { lng, lat, zoom } = this.props.coordinates;

    if (this.props.coordinates !== prevProps.coordinates) {
      new mapboxgl.Map({
        container: this.mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });
    }
  }

  render() {
    return (
      <div className="n-card-home">
        <div ref={(el) => (this.mapContainer = el)} className="map-container" />
      </div>
    );
  }
}

export default CreateMap;
