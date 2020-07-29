import React, { useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

// material ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemDetails from '../Modals/ItemDetails';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

import ms_stats from '../../data/ms_stats';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function MSSKUChart(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggleModalState = () => {
    setOpen(!open);
  };

  let [selectedSKU, setSelectedSKU] = useState();

  // to count by the usage of SKU
  let countBySKU = ms_stats.reduce((map, sku) => {
    map[sku.WWSKU] = (map[sku.WWSKU] || 0) + 1;
    return map;
  }, {});

  let sortable = [];
  for (var sku in countBySKU) {
    sortable.push([sku, countBySKU[sku]]);
  }

  let sortBySKU = sortable.sort((a, b) => b[1] - a[1]);
  let topUsed = sortBySKU.slice(0, 7);

  var SKUObjSorted = {};
  topUsed.forEach(function (sku) {
    SKUObjSorted[sku[0]] = sku[1];
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <HorizontalBar
          height={200}
          width={450}
          data={{
            labels: Object.keys(SKUObjSorted),
            datasets: [
              {
                label: '',
                data: Object.values(SKUObjSorted),
                fill: false,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.4)',
                  'rgba(255, 159, 64, 0.4)',
                  'rgba(255, 205, 86, 0.4)',
                  'rgba(75, 192, 192, 0.4)',
                  'rgba(54, 162, 235, 0.4)',
                  'rgba(153, 102, 255, 0.4)',
                  'rgba(201, 203, 207, 0.4)',
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
          onElementsClick={(elems) => {
            if (elems[0]) {
              toggleModalState();
              // console.log(sortBySKU[elems[0]._index][0]);
              setSelectedSKU(sortBySKU[elems[0]._index][0]);
            }
          }}
        />
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
            <ItemDetails sku={selectedSKU} />
          </Fade>
        </Modal>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
          deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
          fuga omnis a sed impedit explicabo accusantium nihil doloremque
          consequuntur.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MSSKUChart;
