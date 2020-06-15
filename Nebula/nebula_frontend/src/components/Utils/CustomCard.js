import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";

// local components
import LogisticChart from "../PropertyInfo/DevelopmentInsights/LogisticChart";
import MSSKUChart from "../PropertyInfo/DevelopmentInsights/MSSKUChart";
import PropertyCapEx from "../PropertyInfo/DevelopmentInsights/PropertyCapEx";
import OccupancyTable from "../PropertyInfo/ManagementInsights/OccupancyTable";
import ServiceRecTable from "../PropertyInfo/ManagementInsights/ServiceRevTable";
import OccupancyChart from "../PropertyInfo/ManagementInsights/OccupancyChart";

// material ui components
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ControlCameraIcon from "@material-ui/icons/ControlCamera";

const ItemTypes = {
  CARD: "card",
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: (props) => (props.cardSize === "small" ? 300 : 350),
    margin: theme.spacing(3, 0),
  },
  header: {
    height: 50,
    padding: theme.spacing(2, 2, 1),
  },
  content: {
    height: (props) => (props.cardSize === "small" ? 250 : 300),
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
    overflowY: "auto",
  },
}));

function CustomCard(props) {
  const classes = useStyles(props);
  const { cardId, index, cardTitle, setCardWidth } = props;
  const ref = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSmall = () => {
    setCardWidth(6);
    setAnchorEl(null);
  };

  const handleLarge = () => {
    setCardWidth(12);
    setAnchorEl(null);
  };

  const getComponent = () => {
    let component;
    switch (cardId) {
      case "card-1":
        component = <PropertyCapEx />;
        break;
      case "card-2":
        component = <LogisticChart />;
        break;
      case "card-3":
        component = <MSSKUChart />;
        break;
      case "card-4":
        component = "This is a placeholder.";
        break;
      case "card-5":
        component = <OccupancyChart />;
        break;
      case "card-6":
        component = <OccupancyTable />;
        break;
      case "card-7":
        component = <ServiceRecTable />;
        break;
      case "card-8":
        component = "This is a placeholder.";
        break;

      default:
        component = "This is a placeholder.";
        break;
    }
    return component;
  };

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, cardId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(ref);

  return (
    <Card className={classes.root} style={{ opacity }}>
      <CardHeader
        action={
          <>
            <IconButton ref={ref} aria-label="settings">
              <ControlCameraIcon />
            </IconButton>
            <IconButton aria-label="more" onClick={handleMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null} //without this anchor position is not correct
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Export</MenuItem>
              <MenuItem onClick={handleSmall}>Small</MenuItem>
              <MenuItem onClick={handleLarge}>Large</MenuItem>
            </Menu>
          </>
        }
        title={cardTitle}
        titleTypographyProps={{ variant: "h5" }}
        className={classes.header}
      />
      <Divider />
      <div className={classes.content}>{getComponent()}</div>
    </Card>
  );
}

export default CustomCard;

CustomCard.defaultProps = {
  title: "Name",
  cardSize: "small",
};
