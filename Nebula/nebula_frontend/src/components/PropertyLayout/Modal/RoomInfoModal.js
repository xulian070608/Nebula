import React, { useState } from 'react';
// import wwRooms from '../../../data/room_stats'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap";

function RoomInfoModal (props) {

    // let currentRoom = {}
    // // since we don't have roomUUID, here we use buildingName + roomNumber
    // let [currentBuildingName, currentRoomNumber] = props.buildingNameRoomNumber.split(" - ")

    // function getCurrentRoom(buildingName, roomNumber, rooms) {
    //     let allRoomsInProperty = rooms.filter(room => room['Building Name'] === buildingName)
    //     return allRoomsInProperty.find(room => room['Room Number'] === roomNumber)
    // }

    // currentRoom = getCurrentRoom(currentBuildingName, currentRoomNumber, wwRooms)
    // console.log(currentRoom)

    const [modal, setModal] = useState(props.showModal);
    const toggle = () => setModal(!modal);
    
    return props.showModal ? (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Room Info </ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipisicing elit. Nobis deserunt corrupti, 
                    ut fugit magni qui quasi nisi amet repellendus non fuga 
                    omnis a sed impedit explicabo accusantium nihil doloremque 
                    consequuntur.
                </ModalBody>
                <ModalFooter> Modal </ModalFooter>
            </Modal>
        </div>
        ) : null 
    
}

export default RoomInfoModal