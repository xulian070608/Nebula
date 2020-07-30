// third party packages
import React, { useState } from 'react';

// local components
import CapExModal from '../Modals/CapExModal';

// material ui components
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function PropertyCapEx() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget
          justo nec enim luctus tincidunt. In porttitor tellus dui, eget.
        </Typography>
      </Grid>
      <Grid item container xs={6}>
        <Typography variant="h4">XX $/SQF</Typography>
      </Grid>
      <Grid
        item
        container
        xs={4}
        justify="center"
        style={{ alignItems: 'center' }}
      >
        <ul>
          <li>item 01</li>
          <li>item 02</li>
          <li>item 03</li>
          <li>item 04</li>
        </ul>
      </Grid>
      <Grid
        item
        container
        xs={2}
        justify="flex-end"
        style={{ alignItems: 'flex-end' }}
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
