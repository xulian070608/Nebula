// import { Component } from 'react';

const colorSchema = {
  WORK: "0xabdde7",
  MEET: "0xb7f0d9",
  OPERATE: "0xe2e2e2",
  SERVE: "0xffd26a",
  WE: "0xffd26a",
  CIRCULATE: "0xfff7df",
  WASH: "0xc3c3c3"
};

class RoomGraph {
  
  constructor(name, number, programType, outline) {
    // this.key = key;
    this.name = name;
    this.roomNumber = number;
    this.programType = programType;
    this.roomColor = colorSchema[programType];
    this.roomOutline = outline;

    this.isClicked = false
    this.isMouseMoveOver = false
  }

  // handleClick(e) {
  //   this.isClicked = true
  //   alert("state is: " + this.isClicked)
  //   console.log(e.target.lineStyle)
  //   e.target.setTransform(0,0,2,2,30,0,0,0,0)
  // }

  // handleMouseMoveOver() {
  //   this.isMouseMoveOver = true
  //   // console.log("Mouse moves over.")
  //   // console.log("isMouseMoveOver: " + this.isMouseMoveOver)
  // }

  // handleMouseMoveOut() {
  //   this.isMouseMoveOver = false
  //   // console.log("Mouse moves out.")
  //   // console.log("isMouseMoveOver: " + this.isMouseMoveOver)
  // }

  addGraphics(graphics) {
    graphics.name = this.name;
    graphics.roomNumber = this.roomNumber;
    graphics.programType = this.programType;
    graphics.on("click", this.handleClick);
    graphics.on("mouseover", this.handleMouseMoveOver)
    graphics.on("mouseout", this.handleMouseMoveOut)

    var extPath = this.roomOutline.primary[0].split(", ").map(Number);
    var numberOfHoles = this.roomOutline.hole.length;
    if (numberOfHoles > 0) {
      graphics
        .beginFill(this.roomColor, 1)
        .drawPolygon(extPath)
        .endFill();
      for (var i = 0; i < numberOfHoles; i++) {
        graphics.beginHole();
        var intPath = this.roomOutline.hole[i].split(", ").map(Number);
        graphics.drawPolygon(intPath);
      }
    } else {
      graphics
        .beginFill(this.roomColor, 1)
        .drawPolygon(extPath)
        .endFill();
    }
  }

}

export default RoomGraph;