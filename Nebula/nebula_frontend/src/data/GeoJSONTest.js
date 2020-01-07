const GeoJSONTest = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [113.314624, 23.124661]
      },
      properties: {
        buildingName: '293 Guangzhou Middle Avenue',
        address: '293 Guangzhou Middle Avenue'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [120.20917, 30.235146]
      },
      properties: {
        buildingName: 'Mingzhu International Business Center',
        address: 'Mingzhu International Business Center'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [114.183872, 22.28017]
      },
      properties: {
        buildingName: 'Hysan Place',
        address: 'Hysan Place'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [114.168036, 22.298115]
      },
      properties: {
        buildingName: 'Sun Life Tower',
        address: 'Sun Life Tower'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [114.21457, 22.315605]
      },
      properties: {
        buildingName: 'The Quayside',
        address: 'The Quayside'
      }
    }
  ]
}

export default GeoJSONTest;
