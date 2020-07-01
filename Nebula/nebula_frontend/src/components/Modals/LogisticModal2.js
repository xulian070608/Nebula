import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import { HorizontalBar } from "react-chartjs-2";

import { useFetch } from "../../utils/useFetch";
import { furnitureRoot } from "../../utils/Constant";
import ms_stats from "../../data/ms_stats";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  media: {
    width: 200,
    height: 200,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  value: {
    marginLeft: theme.spacing(4),
  },
}));

export default function LogisticModal(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (elem) => {
    if (elem[0]) {
      const itemOnClick = elem[0]._model.label;
      if (itemOnClick !== currentSKU) {
        setCurrentSKU(itemOnClick);
        setExpanded(true);
      } else {
        setExpanded(!expanded);
      }
    }
  };

  const handleButtonClick = () => {
    setExpanded(!expanded);
  };

  const filteredSKU = ms_stats.filter(
    (item) => item["PO Status"] === props.selectedPOStatus
  );

  // to count by the usage of SKU
  let countBySKU = filteredSKU.reduce((map, sku) => {
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
  const { toggleModalState } = props;
  const [currentSKU, setCurrentSKU] = React.useState(topUsed[0][0]);

  const itemURL = furnitureRoot + currentSKU;
  const { data: furniture, loaded } = useFetch(itemURL);

  return props.showModal ? (
    <Modal
      className={classes.modal}
      open={props.showModal}
      onClose={toggleModalState}
    >
      <Card className={classes.root}>
        <CardHeader
          title={<Typography>{props.selectedPOStatus}</Typography>}
          action={
            <IconButton aria-label="settings" onClick={toggleModalState}>
              <CancelIcon />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
          <HorizontalBar
            data={{
              labels: Object.keys(SKUObjSorted),
              datasets: [
                {
                  label: "",
                  data: Object.values(SKUObjSorted),
                  fill: false,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.4)",
                    "rgba(255, 159, 64, 0.4)",
                    "rgba(255, 205, 86, 0.4)",
                    "rgba(75, 192, 192, 0.4)",
                    "rgba(54, 162, 235, 0.4)",
                    "rgba(153, 102, 255, 0.4)",
                    "rgba(201, 203, 207, 0.4)",
                  ],
                  borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
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
            onElementsClick={handleExpandClick}
          />

          {/* {JSON.stringify(ms_stats.filter(item => item['PO Status'] === props.selectedPOStatus))} */}
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleButtonClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {loaded ? (
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <CardMedia
                    className={classes.media}
                    image={furniture.attributes.image[0].image}
                    title="cafe"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    variant="body1"
                    className={classes.param}
                    component="p"
                  >
                    Name:
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.value}
                    component="p"
                  >
                    {furniture.attributes.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.param}
                    component="p"
                  >
                    SKU:
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.value}
                    component="p"
                  >
                    {currentSKU}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.param}
                    component="p"
                  >
                    Manufacturer:
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.value}
                    component="p"
                  >
                    {furniture.attributes.manufacturer}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          ) : (
            <div>loading</div>
          )}
        </Collapse>
      </Card>
    </Modal>
  ) : null;
}
