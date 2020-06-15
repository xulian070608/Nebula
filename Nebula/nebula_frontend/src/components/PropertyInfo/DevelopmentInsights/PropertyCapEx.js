import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import CapExModal from "../Modal/CapExModal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {},
}));

function PropertyCapEx(props) {
  const classes = useStyles();
  let [modalState, setModalState] = useState(false);
  const toggleModalState = () => {
    setModalState(!modalState);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={6}>
          <h3> XX $/SQF </h3>
        </Grid>
        <Grid item xs={6}>
          <ul>
            <li>item 01</li>
            <li>item 02</li>
            <li>item 03</li>
            <li>item 04</li>
          </ul>
          <Button
            className={classes.button}
            variant="outlined"
            size="small"
            onClick={toggleModalState}
          >
            View Details
          </Button>
          {/* {console.log(modalState)} */}
          {modalState ? (
            <CapExModal
              showModal={modalState}
              toggleModalState={toggleModalState}
            />
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PropertyCapEx;
