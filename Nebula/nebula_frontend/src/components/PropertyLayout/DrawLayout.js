import React from 'react';
import { Stage, Container} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js'
import makeId from '../Utils/makeId'
import roomData from '../../data/LayoutSample';
import RoomGraph from './DrawRoom'

function DrawLayout(props) {

  PIXI.utils.skipHello()
  
  // when we have realdata, we need these followings to determine what to draw
  // let currentProperty = props.currentProperty
  // let currentFloor = props.currentFloor

  function drawLayout(roomData) {
    return (
      roomData.map(room => {
        return (
          <RoomGraph 
          key={makeId(8)}
          name={room.room_name}
          roomNumber={room.room_number}
          programType={room.program_type}
          roomOutline={JSON.parse(room.outline)}
          toggleModalState={props.toggleModalState}
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
    </div>
  );
}

export default DrawLayout;
