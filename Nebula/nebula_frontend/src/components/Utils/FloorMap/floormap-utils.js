import get from "lodash/get";
import isArray from "lodash/isArray";

/**
 * Convert string geometry to x,y,z
 * e.g.
 * bounds: [ "12", "10", "-1" ]
 * result: { x: 12, y: 10, z: -1 }
 */
export const convertBounds = bounds => {
  return {
    x: parseFloat(bounds[0]),
    y: parseFloat(bounds[1]),
    z: parseFloat(bounds[2])
  };
};

/**
 * Returns the centroid given the array of boundaries
 */
export const getCentroid = boundaries => {
  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;
  let minY = 0;
  let minX = 0;
  boundaries.forEach(b => {
    b.forEach(bv => {
      const v = convertBounds(bv);
      if (v.x > maxX) maxX = v.x;
      if (v.y > maxY) maxY = v.y;
      if (v.z > maxZ) maxZ = v.z;
      if (v.y < minY) minY = v.y;
      if (v.x < minX) minX = v.x;
    });
  });
  return { x: (maxX + minX) / 2, y: (maxY + minY) / 2, z: maxZ / 2 };
};

export const getPayloadById = (id, data) => {
  if (!Array.isArray(data.included)) return null;
  for (var i = 0; i < data.included.length; ++i) {
    if (data.included[i].id === id) {
      return data.included[i];
    }
  }
  return null;
};

/**
 * set center, and zoom level for the floor boundaries
 */
export const centerFloor = (data, renderer, targetDom) => {
  let vertices = [];
  const boundaries = get(data, "data.attributes.boundaries");
  if (!boundaries || boundaries.length === 0) {
    console.warn("Invalid boundaries");
    return;
  }
  boundaries[0].forEach(b => {
    vertices.push(convertBounds(b));
  });
  const c = renderer.getCenter(vertices);
  renderer.setCameraViewPoint({
    position: { x: c.x, y: c.y },
    target: { x: c.x, y: c.y }
  });
  const z = renderer.getZoomLevel({
    points: vertices,
    container: {
      width: targetDom.offsetWidth,
      height: targetDom.offsetHeight
    },
    padding: targetDom.offsetWidth * 0.05
  });
  renderer.setZoom(z);
};

/**
 * Convert boundaries in array of strings to array of points.
 *
 * Example:
 * Input:
 *  [
 *    [
 *      "18.1292650921691",
 *      "19.8648293963255",
 *      "177.910875839162"
 *    ],
 *    [
 *      "18.8727034123791",
 *      "19.8648293963255",
 *      "177.910875839162"
 *    ]
 *  ]
 *
 * Output:
 *  [
 *    {
 *      x: 18.1292650921691,
 *      y: 19.8648293963255,
 *      z: 177.910875839162
 *    },
 *    {
 *      x: 18.8727034123791,
 *      y: 19.8648293963255,
 *      z: 177.910875839162
 *    },
 *  ]
 */
export const stringArrayToPoints = a => {
  if (!isArray(a)) return;
  let pts = [];
  a.forEach(b => {
    if (!isArray(b)) return;
    if (b.length !== 3) {
      pts.push({
        x: parseFloat(b[0]),
        y: parseFloat(b[1]),
        z: 0.0
      });
    } else {
      pts.push({
        x: parseFloat(b[0]),
        y: parseFloat(b[1]),
        z: parseFloat(b[2])
      });
    }
  });
  return pts;
};
