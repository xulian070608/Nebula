import React, { useState } from 'react';
import {Graphics} from '@inlet/react-pixi'

const colorSchema = {
  WORK: "0xabdde7",
  MEET: "0xb7f0d9",
  OPERATE: "0xe2e2e2",
  SERVE: "0xffd26a",
  WE: "0xffd26a",
  CIRCULATE: "0xfff7df",
  WASH: "0xc3c3c3"
};

const RoomGraphReact = props => {
  const [roomColor, setRoomColor] = useState(colorSchema[props.programType]);
  // const [currentHoverOver, setCurrentHoverOver] = useState(false)

  const extPath = props.roomOutline.primary[0].split(", ").map(Number);
  const numberOfHoles = props.roomOutline.hole.length;

  return (
    <Graphics
      {...props}
      interactive={true}
      buttonMode={true}
      scale={{ x: 5, y: 5 }}
      pointerover={() => setRoomColor("0xff3333")}
      pointerout={() => setRoomColor(colorSchema[props.programType])}
      //onChange = e => {
      //   updateProperty(e.target.value, wwBuildings)
      //   setSelectedPropertyUUID(e.target.value)
      //   this.props.history.push(`/${e.target.value}/summary`)
      // };
      draw={g => {
        if (numberOfHoles > 0) {
          g.beginFill(roomColor, 1)
            .drawPolygon(extPath)
            .endFill();
          for (var i = 0; i < numberOfHoles; i++) {
            g.beginHole();
            var intPath = props.roomOutline.hole[i].split(", ").map(Number);
            g.drawPolygon(intPath);
          }
        } else {
          g.beginFill(roomColor, 1)
            .drawPolygon(extPath)
            .endFill();
        }
      }}
    />
  );
};

export default RoomGraphReact;