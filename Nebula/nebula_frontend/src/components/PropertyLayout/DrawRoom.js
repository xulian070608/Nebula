
import React from 'react';

const colorSchema = {
  WORK: "0xabdde7",
  MEET: "0xb7f0d9",
  OPERATE: "0xe2e2e2",
  SERVE: "0xffd26a",
  WE: "0xffd26a",
  CIRCULATE: "0xfff7df",
  WASH: "0xc3c3c3"
};

// function RoomGraph (props) {
  
//   // constructor(name, number, programType, outline) {
//   //   this.name = name;
//   //   this.roomNumber = number;
//   //   this.programType = programType;
//   //   this.roomColor = colorSchema[programType];
//   //   this.roomOutline = outline;
//   // }
// }

function AddGraphics(graphics, room) {
    graphics.name = room.room_name;
    // graphics.roomNumber = this.roomNumber;
    // graphics.on("click", function() {
    //   var roomNumber = document.getElementById("roomNumber");
    //   // roomNumber.innerHTML = this.name + " " + this.roomNumber;
    //   console.log(roomNumber)
    // });
    // var extPath = this.roomOutline.primary[0].split(", ").map(Number);
    // var numberOfHoles = this.roomOutline.hole.length;
    // if (numberOfHoles > 0) {
    //   graphics
    //     .beginFill(this.roomColor, 1)
    //     .drawPolygon(extPath)
    //     .endFill();
    //   for (var i = 0; i < numberOfHoles; i++) {
    //     graphics.beginHole();
    //     var intPath = this.roomOutline.hole[i].split(", ").map(Number);
    //     graphics.drawPolygon(intPath);
    //   }
    // } else {
    //   graphics
    //     .beginFill(this.roomColor, 1)
    //     .drawPolygon(extPath)
    //     .endFill();
    // }
  }


// export default RoomGraph;
export default AddGraphics;