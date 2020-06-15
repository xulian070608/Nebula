import React, { useState } from "react";

// material ui components
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

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

function StyledCard(props) {
  const classes = useStyles(props);
  const { content, title } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
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
            </Menu>
          </>
        }
        title={title}
        titleTypographyProps={{ variant: "h5" }}
        className={classes.header}
      />
      <Divider />
      <div className={classes.content}>{content}</div>
    </Card>
  );
}

export default StyledCard;

StyledCard.defaultProps = {
  title: "Name",
  content: "this is a card placeholder",
  cardSize: "small",
};
