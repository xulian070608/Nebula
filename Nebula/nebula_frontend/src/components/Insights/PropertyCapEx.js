// third party packages
import React, { useState } from "react";

// local components
import CapExModal from "../Modals/CapExModal";

// material ui components
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function PropertyCapEx(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget
        justo nec enim luctus tincidunt. In porttitor tellus dui, eget.
      </Typography>
      <Grid
        item
        container
        xs={6}
        justify="center"
        style={{ alignItems: "center" }}
      >
        <MonetizationOnOutlinedIcon
          color="primary"
          style={{ fontSize: "100px" }}
        />
      </Grid>
      <Grid
        item
        container
        xs={4}
        justify="center"
        style={{ alignItems: "center" }}
      >
        <Typography variant="h4" color="secondary">
          195 M
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={2}
        justify="flex-end"
        style={{ alignItems: "flex-end" }}
      >
        <IconButton
          className={classes.button}
          variant="outlined"
          size="small"
          onClick={handleModalOpen}
        >
          <InfoIcon />
        </IconButton>
        <Modal
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <CapExModal />
          </Fade>
        </Modal>
      </Grid>
    </Grid>
  );
}

export default PropertyCapEx;
