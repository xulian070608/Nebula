import React from 'react';
import { Stage, Graphics } from '@inlet/react-pixi';
import roomData from '../../data/LayoutSample';
import DrawRoom from './DrawRoom'
import AddGraphics from './DrawRoom';

function DrawLayout() {

  const testRoom = roomData[0]

  return (
    <Stage width={800} height={600} options={{ antialias: true, backgroundColor: 0xffffff }}>
      <Graphics 
        draw={g => {
          AddGraphics(g, testRoom)
        }}
        scale={{ x: 5, y: 5 }}
            interactive={true}
            buttonMode={true}
      />
      {/* {roomData.map(room => {
        var name = room.room_name;
        var number = room.room_number;
        var programType = room.program_type;
        var roomOutline = JSON.parse(room.outline);
        return (
          <Graphics
            draw={g => {
              var myRoom = new DrawRoom(name, number, programType, roomOutline);
              myRoom.addGraphics(g);
            }}
            scale={{ x: 5, y: 5 }}
            interactive={true}
            buttonMode={true}
          />
        );
      })} */}
    </Stage>
  );
}

export default DrawLayout;
