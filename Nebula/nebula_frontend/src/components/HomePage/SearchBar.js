import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useFetchList } from "../Utils/useFetch";
import { ProjectsURL } from "../Utils/Constant";
import Popper from "@material-ui/core/Popper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: "16px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  list: {
    width: "100%",
    minWidth: 240,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
    zIndex: "100",
    backgroundColor: "#393e46",
    boxShadow: "5px #000000",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  itemText: {
    color: "#fff",
  },
}));

function SearchBar() {
  const classes = useStyles();
  const [matchedNames, setMatchedNames] = React.useState([]);
  const [inputValue, setInputValue] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(Boolean);

  let history = useHistory();
  const id = open ? "simple-popper" : undefined;
  const { data: projects, loaded } = useFetchList(ProjectsURL);

  React.useEffect(() => {
    let matchedArray = [];
    if (inputValue) {
      projects.forEach((project) => {
        if (
          project.attributes.project_name.toLowerCase().includes(inputValue)
        ) {
          matchedArray.push(project);
        }
      });
      setMatchedNames(matchedArray);
    } else {
      setOpen(false);
    }
  }, [inputValue, projects]);

  const handleClickAway = () => {
    setOpen(false);
  };

  return loaded ? (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => {
          setInputValue(event.target.value);
          setAnchorEl(event.currentTarget);
          setOpen(true);
        }}
      />
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <List className={classes.list}>
            {matchedNames.map((project) => (
              <ListItem
                button
                key={`project-${project.id}`}
                onClick={() => {
                  setOpen(false);
                  history.push(`/${project.id}/summary`);
                  window.location.reload();
                }}
              >
                <ListItemText
                  className={classes.itemText}
                  primary={project.attributes.project_name}
                />
              </ListItem>
            ))}
          </List>
        </Popper>
      </ClickAwayListener>
    </div>
  ) : null;
}

export default SearchBar;
