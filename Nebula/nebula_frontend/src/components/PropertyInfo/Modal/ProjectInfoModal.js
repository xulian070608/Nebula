import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { CSVLink } from "react-csv";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 2),
  },
}));

export default function ProjectInfoModal(props) {
  const classes = useStyles();
  const projectID = props.projectID;
  const url = "http://100.94.29.214/api/v1/projects/" + projectID + "/";

  const config = { headers: { "Content-Type": "application/vnd.api+json" } };

  // information needed to display and modify
  const [projectName, setProjectName] = useState(String);
  const [projectAddreeLocal, setProjectAddreeLocal] = useState(String);
  const [projectAddressEn, setProjectAddressEn] = useState(String);
  const [notes, setNotes] = useState({});
  // const [deskcount, setDeskcount] = useState(0);2
  // const [usf, setUsf] = useState(0.0);
  const [usfPerDesk, setUsfPerDesk] = useState();
  const [averageOfficeDeskcount, setAverageOfficeDeskcount] = useState();

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    axios.get(url).then((res) => {
      const projectAttributes = res.data.data.attributes;
      setProjectName(projectAttributes.project_name);
      setProjectAddreeLocal(projectAttributes.project_address_local);
      setProjectAddressEn(projectAttributes.project_address_en);
      setUsfPerDesk(projectAttributes.usf_per_desk.toFixed(2));
      setAverageOfficeDeskcount(
        projectAttributes.average_office_desk_count.toFixed(2)
      );
      if (projectAttributes.notes) {
        const note = JSON.parse(projectAttributes.notes);
        setNotes({ fileName: note.fileName, fileLink: note.fileLink });
      } else {
        setNotes({ fileName: null, fileLink: null });
      }
      // setDeskcount(projectAttributes.deskcount);
      // setUsf(projectAttributes.usf);

      setLoading(false);
    });
  }, [url]);

  function hanadleOnSave() {
    setEditMode(false);
    const content = {
      data: {
        type: "Project",
        id: projectID,
        attributes: {
          project_name: projectName,
          notes: JSON.stringify(notes),
        },
      },
    };
    axios.patch(url, content, config);
  }

  useEffect(() => {
    setCsvData([
      { "parameter name": "Project Name", value: projectName },
      { "parameter name": "Project Address Local", value: projectAddreeLocal },
      { "parameter name": "Project Address En", value: projectAddressEn },
      { "parameter name": "USF Per Desk", value: usfPerDesk },
      {
        "parameter name": "Average Office Deskcount",
        value: averageOfficeDeskcount,
      },
      { "parameter name": "File Link", value: notes.fileLink },
      // { "parameter name": "Desk Count", value: deskcount },
      // { "parameter name": "USF", value: usf },
    ]);
  }, [
    projectName,
    projectAddreeLocal,
    projectAddressEn,
    usfPerDesk,
    averageOfficeDeskcount,
    notes,
  ]);

  return (
    <div>
      {loading ? null : (
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
                  Project Info
                </Grid>
                <Grid item xs={4} align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={hanadleOnSave}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  Project Name:
                </Grid>
                <Grid item xs={4} align="right">
                  <Input
                    defaultValue={projectName}
                    inputProps={{ "aria-label": "description" }}
                    onChange={(event) => setProjectName(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  Project Notes:
                </Grid>
                <Grid item xs={4} align="right">
                  <Input
                    placeholder="File Name"
                    defaultValue={notes.fileName}
                    inputProps={{ "aria-label": "description" }}
                    onChange={(event) => {
                      event.persist();
                      setNotes((prevNote) => ({
                        ...prevNote,
                        fileName: event.target.value,
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={4} align="right">
                  <Input
                    placeholder="File Link"
                    defaultValue={notes.fileLink}
                    inputProps={{ "aria-label": "description" }}
                    onChange={(event) => {
                      event.persist();
                      setNotes((prevNote) => ({
                        ...prevNote,
                        fileLink: event.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  Project Address Local:
                </Grid>
                <Grid item xs={4} align="right">
                  <Input
                    disabled
                    defaultValue={projectAddreeLocal}
                    inputProps={{ "aria-label": "description" }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  Project Address (en):
                </Grid>
                <Grid item xs={4} align="right">
                  <Input
                    disabled
                    defaultValue={projectAddressEn}
                    inputProps={{ "aria-label": "description" }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  USF Per Desk:
                </Grid>
                <Grid item xs={4} align="right">
                  <Input
                    disabled
                    defaultValue={usfPerDesk}
                    inputProps={{ "aria-label": "description" }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  Average Office Desk Count:
                </Grid>
                <Grid item xs={4} align="right">
                  <Input
                    disabled
                    defaultValue={averageOfficeDeskcount}
                    inputProps={{ "aria-label": "description" }}
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
                  Project Info
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
                <Grid item xs={4}>
                  Project Name:
                </Grid>
                <Grid item xs={4} align="right">
                  {projectName}
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  Project Notes:
                </Grid>
                <Grid item xs={4} align="right">
                  <Button
                    href={notes.fileLink}
                    target="_blank"
                    aria-label="attached-file"
                    size="medium"
                  >
                    <AttachFileIcon fontSize="inherit" /> {notes.fileName}
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  Project Address Local:
                </Grid>
                <Grid item xs={4} align="right">
                  {projectAddreeLocal}
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  Project Address (en):
                </Grid>
                <Grid item xs={4} align="right">
                  {projectAddressEn}
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  USF Per Desk:
                </Grid>
                <Grid item xs={4} align="right">
                  {usfPerDesk}
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={4}>
                  Average Office Desk Count:
                </Grid>
                <Grid item xs={4} align="right">
                  {averageOfficeDeskcount}
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ minHeight: "7vh" }}>
                <Grid item xs={8}></Grid>
                <Grid item xs={4} align="center">
                  <CSVLink filename="projectData.csv" data={csvData}>
                    <IconButton aria-label="download" size="medium">
                      <CloudDownloadIcon fontSize="inherit" />
                    </IconButton>
                  </CSVLink>
                </Grid>
              </Grid>
            </Container>
          )}
        </div>
      )}
    </div>
  );
}
