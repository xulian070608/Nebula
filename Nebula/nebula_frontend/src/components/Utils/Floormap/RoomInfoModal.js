// third party packages
import React, { useState, useEffect } from "react";
import axios from "axios";

// local components
import { ProjectsURL } from "../Constant";
import { useFetch } from "../useFetch";

// material ui
import Input from "@material-ui/core/Input";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 450,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ProjectInfoModal(props) {
  const classes = useStyles();

  const currentProjectID = props.currentProjectID;
  const floorID = props.floorID;
  const roomID = props.roomID;
  const url =
    ProjectsURL +
    currentProjectID +
    "/floors/" +
    floorID +
    "/rooms/" +
    roomID +
    "/";

  const { data: roomInfo, loaded } = useFetch(url);

  const [roomName, setRoomName] = useState(String);
  const [roomNumber, setRoomNumber] = useState(String);
  const [deskcount, setDeskcount] = useState(Number);
  const [physicalDeskcount, setPhysicalDeskcount] = useState(Number);
  const [programType, setProgramType] = useState(String);
  const [internalRoomCount, setInternalRoomCount] = useState(Number);
  const [hasWindow, setHasWindow] = useState(Boolean);
  const [hasAV, setHasAV] = useState(Boolean);
  const [note, setNote] = useState(String);

  useEffect(() => {
    if (loaded) {
      setRoomName(roomInfo.attributes.room_name);
      setRoomNumber(roomInfo.attributes.room_number);
      setDeskcount(roomInfo.attributes.deskcount);
      setPhysicalDeskcount(roomInfo.attributes.physical_deskcount);
      setProgramType(roomInfo.attributes.program_type);
      setInternalRoomCount(roomInfo.attributes.internal_room_count);
      setHasWindow(roomInfo.attributes.has_window);
      setHasAV(roomInfo.attributes.has_av);
      setNote(roomInfo.attributes.note);
    }
  }, [loaded, roomInfo]);
  // not sure

  const [editMode, setEditMode] = useState(false);
  const config = { headers: { "Content-Type": "application/vnd.api+json" } };

  const handleHasWindow = (event) => {
    setHasWindow(event.target.checked);
  };
  const handleHasAV = (event) => {
    setHasAV(event.target.checked);
  };

  const handleOnSave = () => {
    setEditMode(false);
    const content = {
      data: {
        type: "Room",
        id: roomID,
        attributes: {
          room_name: roomName,
          room_number: roomNumber,
          deskcount: deskcount,
          physical_deskcount: physicalDeskcount,
          program_type: programType,
          internal_room_count: internalRoomCount,
          has_window: hasWindow,
          has_av: hasAV,
          note: note,
        },
      },
    };
    axios.patch(url, content, config);
  };

  return loaded ? (
    <div className={classes.paper}>
      {editMode ? (
        <Container maxWidth="md">
          <Grid
            container
            alignItems="center"
            justify="center"
            spacing={1}
            style={{ minHeight: "10vh" }}
          >
            <Grid item xs={8} align="center">
              {roomName + " " + roomNumber}
            </Grid>
            <Grid item xs={4} align="center">
              <Button variant="outlined" size="small" onClick={handleOnSave}>
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Room Name:
            </Grid>
            <Grid item xs={6} align="right">
              <Input
                defaultValue={roomName}
                inputProps={{ "aria-label": "description" }}
                onChange={(event) => setRoomName(event.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Room Number:
            </Grid>
            <Grid item xs={6} align="right">
              <Input
                defaultValue={roomNumber}
                inputProps={{ "aria-label": "description" }}
                onChange={(event) => setRoomNumber(event.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Desk Count:
            </Grid>
            <Grid item xs={6} align="right">
              <Input
                defaultValue={deskcount}
                inputProps={{ "aria-label": "description" }}
                onChange={(event) => setDeskcount(event.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Physical Desk Count:
            </Grid>
            <Grid item xs={6} align="right">
              <Input
                defaultValue={physicalDeskcount}
                inputProps={{ "aria-label": "description" }}
                onChange={(event) => setPhysicalDeskcount(event.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Program Type:
            </Grid>
            <Grid item xs={6} align="right">
              <Input
                disabled
                defaultValue={programType}
                inputProps={{ "aria-label": "description" }}
                onChange={(event) => setProgramType(event.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Internal Room Count:
            </Grid>
            <Grid item xs={6} align="right">
              <Input
                defaultValue={internalRoomCount}
                inputProps={{ "aria-label": "description" }}
                onChange={(event) => setInternalRoomCount(event.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Has Window:
            </Grid>
            <Grid item xs={6} align="right">
              <Checkbox
                checked={hasWindow}
                onChange={handleHasWindow}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Has AV:
            </Grid>
            <Grid item xs={6} align="right">
              <Checkbox
                checked={hasAV}
                onChange={handleHasAV}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Note:
            </Grid>
            <Grid item xs={6} align="right">
              <Input
                defaultValue={note}
                inputProps={{ "aria-label": "description" }}
                onChange={(event) => setNote(event.target.value)}
              />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container maxWidth="md">
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="center"
            style={{ minHeight: "10vh" }}
          >
            <Grid item xs={8} align="center">
              {roomName + " " + roomNumber}
            </Grid>
            <Grid item xs={4} align="center">
              <IconButton
                aria-label="edit"
                size="medium"
                onClick={() => setEditMode(true)}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Room Name:
            </Grid>
            <Grid item xs={6} align="right">
              {roomName}
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Room Number:
            </Grid>
            <Grid item xs={6} align="right">
              {roomNumber}
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Desk Count:
            </Grid>
            <Grid item xs={6} align="right">
              {deskcount}
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Physical Desk Count:
            </Grid>
            <Grid item xs={6} align="right">
              {physicalDeskcount}
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Program Type:
            </Grid>
            <Grid item xs={6} align="right">
              {programType}
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Internal Room Count:
            </Grid>
            <Grid item xs={6} align="right">
              {internalRoomCount}
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Has Window:
            </Grid>
            <Grid item xs={6} align="right">
              <Checkbox
                disabled
                checked={hasWindow}
                inputProps={{ "aria-label": "disabled checked checkbox" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Has AV:
            </Grid>
            <Grid item xs={6} align="right">
              <Checkbox
                disabled
                checked={hasAV}
                inputProps={{ "aria-label": "disabled checked checkbox" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ minHeight: "7vh" }}>
            <Grid item xs={6}>
              Note:
            </Grid>
            <Grid item xs={6} align="right">
              {note}
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  ) : (
    <div style={{ width: 450 }}>
      <CircularProgress
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    </div>
  );
}
