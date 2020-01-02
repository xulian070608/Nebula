import React, { useState } from 'react';
import { Stage, Graphics } from '@inlet/react-pixi';
import roomData from '../../data/LayoutSample';
import RoomGraph from './DrawRoom'

function DrawLayout() {

  let [currentRoomGraph, setCurrentRoomGraph] = useState()

  // function uuidv4() {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  //     var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  // }

  let allRoomGraph = roomData.map(room => {
    // var key = uuidv4
    var name = room.room_name;
    var number = room.room_number;
    var programType = room.program_type;
    var roomOutline = JSON.parse(room.outline);
    return new RoomGraph(name, number, programType, roomOutline)
  })

  function updateRoomGraph() {

    // allRoomGraph.forEach(roomGraph => {
    // if (roomGraph.isClicked === true) {
    //   setCurrentRoomGraph(roomGraph)
    //   console.log(roomGraph.roomNumber, roomGraph.isClicked, "Updated.")
    // }
  }

  function drawLayout(allRoomGraph) {
    return (
      allRoomGraph.map(roomGraph => {
        return (
          <Graphics
            draw={g => {
            roomGraph.addGraphics(g)
            }}
            scale={{ x: 5, y: 5 }}
            interactive={true}
            buttonMode={true}
          />
        )
      })
    )
  }

  return (
    <div>
      <Stage width={800} height={600} options={{ antialias: true, backgroundColor: 0xffffff }}>
        {drawLayout(allRoomGraph)}
      </Stage>
      <button onClick={() => {
        updateRoomGraph()
        // console.log(currentRoomGraph)
      }}> Show Current Room </button>
    </div>
  );
}

export default DrawLayout;
