import React from 'react';
import { Stage, Graphics } from '@inlet/react-pixi';
import roomData from '../../data/LayoutSample';
import RoomGraph from './DrawRoom'
import RoomGraph_react from './DrawRoom_react'

function DrawLayout() {

  var name_01 = roomData[0].room_name;
  var number_01 = roomData[0].room_number;
  var programType_01 = roomData[0].program_type;
  var roomOutline_01 = JSON.parse(roomData[0].outline);

  return (
    <RoomGraph_react 
      name="name_01"
      number="number_01"
      programType="programType_01"
      outline="roomOutline_01"
    />
    // <Stage width={800} height={600} options={{ antialias: true, backgroundColor: 0xffffff }}>
    //   <Graphics
    //     draw={g => {
    //       // var myRoom = new RoomGraph (name_01, number_01, programType_01, roomOutline_01)
    //       // myRoom.addGraphics(g)

    //       //testing out React Class verion:
    //       // var myRoom = <RoomGraph_react 
    //       //   name="name_01"
    //       //   number="number_01"
    //       //   programType="programType_01"
    //       //   outline="roomOutline_01"/>
    //       // myRoom.addGraphics(g)
    //     }}
    //     scale={{ x: 5, y: 5 }}
    //     interactive={true}
    //     buttonMode={true}
    //   />
    //   {/* {roomData.map(room => {
    //     var name = room.room_name;
    //     var number = room.room_number;
    //     var programType = room.program_type;
    //     var roomOutline = JSON.parse(room.outline);
    //     return (
    //       <Graphics
    //         draw={g => {
    //           var myRoom = new RoomGraph(name, number, programType, roomOutline);
    //           myRoom.addGraphics(g);
    //         }}
    //         scale={{ x: 5, y: 5 }}
    //         interactive={true}
    //         buttonMode={true}
    //       />
    //     );
    //   })} */}
    // </Stage>
  );
}

export default DrawLayout;
