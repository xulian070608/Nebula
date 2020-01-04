import React, { Component }  from 'react';
import mapboxgl from 'mapbox-gl';
import GeoJSONTest from '../../data/GeoJSONTest'


mapboxgl.accessToken = 'pk.eyJ1IjoibXlub3ZtYnIiLCJhIjoiY2o4ZGN2cnZtMG44cTJ6bjh6amdndWF6bSJ9.oiPuyesbcs_SIuCgOVF_Bg';

class CreateMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
        lng: 121.4835,
        lat: 31.2291,
        zoom: 12
        };
    }

    componentDidMount() {

        const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom
        });

        //somehow this deconstruction is not working...
        const {lng, lat, zoom} = this.props.newCoordinates
        // const newCoordinates = [lng, lat, zoom]
        // console.log(newCoordinates)
            
        // map.jumpTo({center: newCoordinates})

        //This is a test to triger this.setState:
        // map.on('click', () => {
        //     this.setState({
        //     lng: this.props.newCoordinates.lng,
        //     lat: this.props.newCoordinates.lat,
        //     zoom: this.props.newCoordinates.zoom
        //     });
        // });
        

        map.on('move', () => {
            this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
            });
            });

        GeoJSONTest.features.forEach(marker => {
            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';
            
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                .addTo(map);
        })
    }

    render() {
        return (
        <div>
            <div ref={el => this.mapContainer = el} className="mapContainer" />
        </div>
        )
    }
}

export default CreateMap;