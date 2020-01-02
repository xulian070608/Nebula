import React, { useState } from 'react';
import { Stage, Graphics, Container } from '@inlet/react-pixi';
import roomData from '../../data/LayoutSample';
import RoomGraph from './DrawRoom'
import RoomGraph_react from './DrawRoom_react'

function DrawLayout() {

  function drawLayout(roomData) {
    return (
      roomData.map(room => {
        return (
          <RoomGraph_react 
          name={room.room_name}
          roomNumber={room.room_number}
          programType={room.program_type}
          roomOutline={JSON.parse(room.outline)}
          />
        )}))
  }

  return (
    <div>
      <Stage width={800} height={600} options={{ antialias: true, backgroundColor: 0xffffff }}>
        <Container sortableChildren={true}>
          {drawLayout(roomData)}
        </Container>
      </Stage>
      <button> Show Current Room </button>
    </div>
  );
}

export default DrawLayout;
