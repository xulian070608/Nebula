// this.renderObjects = [];
// this.renderObjects.push({
//   id: "001",
//   tags: ["hello"],
//   type: "MESH",
//   style: {
//     color: "rgb(155, 255, 55)",
//     side: "FRONT",
//     outline: {
//       color: "rgb(255, 0, 0)",
//       only: false
//     }
//   },
//   points: [
//     { x: -2, y: -2 },
//     { x: 2, y: -2 },
//     { x: 2, y: 2 },
//     { x: -2, y: 2 }
//   ],
//   interactable: true,
//   extrude: 3,
//   position: { x: 0, y: 0, z: 0 }, // original point
//   rotation: { x: 0, y: 0, z: 0 },
//   scale: { x: 10, y: 10, z: 10 }
// });
// this.renderObjects.push({
//   id: "002",
//   tags: ["hi"],
//   type: "MESH",
//   style: {
//     color: "rgb(155, 255, 55)",
//     side: "FRONT",
//     outline: {
//       color: "rgb(255, 0, 0)",
//       only: false
//     }
//   },
//   points: [
//     { x: 1, y: 1 },
//     { x: 3, y: 1 },
//     { x: 3, y: 3 },
//     { x: 1, y: 3 }
//   ],
//   interactable: true,
//   extrude: 3,
//   position: { x: 0, y: 0, z: 0 },
//   rotation: { x: 0, y: 0, z: 0 },
//   scale: { x: 10, y: 10, z: 10 }
// });

this.renderObjects = [];

this.objs = createRenderObjects({
  id: "001",
  shapes: [
    [
      { x: -2, y: -2 },
      { x: 2, y: -2 },
      { x: 2, y: 2 },
      { x: -2, y: 2 }
    ],
    [
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 }
    ]
  ],
  type: "space",
  subType: "PRIVATE OFFICE",
  programType: "WORK",
  roomNumber: "04-104",
  hasWindow: true
});

this.objs.forEach(o => {
  this.renderObjects.push(o);
});

this.objs = createRenderObjects({
  id: "002",
  shapes: [
    [
      { x: 4, y: 4 },
      { x: 4, y: 6 },
      { x: 6, y: 6 },
      { x: 6, y: 4 }
    ]
  ],
  type: "space",
  subType: "PRIVATE OFFICE",
  programType: "WORK",
  roomNumber: "04-105",
  hasWindow: true
});

this.objs.forEach(o => {
  this.renderObjects.push(o);
});

applyInstancing(this.renderObjects, this.renderer);
