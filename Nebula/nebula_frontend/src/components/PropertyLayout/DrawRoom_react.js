import React, { Component } from 'react';

const colorSchema = {
  WORK: "0xabdde7",
  MEET: "0xb7f0d9",
  OPERATE: "0xe2e2e2",
  SERVE: "0xffd26a",
  WE: "0xffd26a",
  CIRCULATE: "0xfff7df",
  WASH: "0xc3c3c3"
};

function RoomGraph_react(props) {  

  function handleClick() {
    console.log("clicked.")
  }

  function  handleMouseMoveOver() {
    console.log("Mouse move over.")
  }

  function addGraphics(graphics) {
    graphics.name = props.name;
    graphics.roomNumber = props.roomNumber;
    graphics.programType = props.programType;
    graphics.on("click", handleClick);
    graphics.on("mouseover", handleMouseMoveOver)

    var extPath = props.roomOutline.primary[0].split(", ").map(Number);
    var numberOfHoles = props.roomOutline.hole.length;

    if (numberOfHoles > 0) {
      graphics
        .beginFill(props.roomColor, 1)
        .drawPolygon(extPath)
        .endFill();
      for (var i = 0; i < numberOfHoles; i++) {
        graphics.beginHole();
        var intPath = props.roomOutline.hole[i].split(", ").map(Number);
        graphics.drawPolygon(intPath);
      }
    } else {
      graphics
        .beginFill(props.roomColor, 1)
        .drawPolygon(extPath)
        .endFill();
    }
    console.log("Room Name: " + graphics.name)
    console.log("Room Room#: " + graphics.roomNumber)
    console.log("Room Type: " + graphics.programType)
  }

}

// class RoomGraph_react extends Component {
//   // constructor(name, number, programType, outline) {
//   //   this.name = name;
//   //   this.roomNumber = number;
//   //   this.programType = programType;
//   //   this.roomColor = colorSchema[programType];
//   //   this.roomOutline = outline;
//   // }

//   constructor(props) {
//     super(props)
//     this.name = props.name;
//     this.roomNumber = props.number;
//     this.programType = props.programType;
//     this.roomColor = colorSchema[props.programType];
//     this.roomOutline = props.outline
//     this.graphics = props.graphics

//     this.addGraphics = this.addGraphics.bind(this)
//   }

//   handleClick() {
//     console.log("Clicked.");
//     alert("this is a test message.")
//   }

//   handleMouseMoveOver() {
//     console.log("Mouse move over.")
//   }

//   addGraphics(graphics) {
//     graphics.name = this.name;
//     graphics.roomNumber = this.roomNumber;
//     graphics.programType = this.programType;
//     graphics.on("click", this.handleClick);
//     graphics.on("mouseover", this.handleMouseMoveOver)

//     var extPath = this.roomOutline.primary[0].split(", ").map(Number);
//     var numberOfHoles = this.roomOutline.hole.length;
//     if (numberOfHoles > 0) {
//       graphics
//         .beginFill(this.roomColor, 1)
//         .drawPolygon(extPath)
//         .endFill();
//       for (var i = 0; i < numberOfHoles; i++) {
//         graphics.beginHole();
//         var intPath = this.roomOutline.hole[i].split(", ").map(Number);
//         graphics.drawPolygon(intPath);
//       }
//     } else {
//       graphics
//         .beginFill(this.roomColor, 1)
//         .drawPolygon(extPath)
//         .endFill();
//     }
//     console.log("Room Name: " + graphics.name)
//     console.log("Room Room#: " + graphics.roomNumber)
//     console.log("Room Type: " + graphics.programType)
//   }

//   render() {
//     return(
//       <div></div>
//     )
//   }

// }

export default RoomGraph_react;