import React from 'react';
import { Stage, Container} from '@inlet/react-pixi';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import makeId from '../Utils/makeId'
import roomData from '../../data/LayoutSample';
// import RoomGraph from './DrawRoom'
import RoomGraphReact from './DrawRoomReact'

function DrawLayout(props) {

  // when we have realdata, we need these followings to determine what to draw
  // let currentProperty = props.currentProperty
  // let currentFloor = props.currentFloor

  function drawLayout(roomData) {
    return (
      roomData.map(room => {
        return (
          <RoomGraphReact 
          key={makeId(8)}
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
