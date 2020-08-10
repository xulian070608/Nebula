// third party packages
import React from 'react';
// import { useHistory } from 'react-router-dom';

// local components
import { useFetchList } from '../../utils/useFetch';
import { ProjectsURL } from '../../utils/Constant';

// material ui components
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 650,
    borderRadius: 8,
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
    width: 'auto',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 100,
      '&:focus': {
        width: 200,
      },
    },
  },
  list: {
    width: 250,
    position: 'relative',
    top: 5,
    overflow: 'auto',
    maxHeight: 300,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    borderRadius: 8,
  },
  popper: {
    zIndex: 800,
  },
}));

function SearchBar(props) {
  const classes = useStyles();
  const { setCoordinate } = props;
  const [matchedNames, setMatchedNames] = React.useState([]);
  const [inputValue, setInputValue] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(Boolean);

  // let history = useHistory();
  const id = open ? 'simple-popper' : undefined;
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
        inputProps={{ 'aria-label': 'search' }}
        onChange={(event) => {
          setInputValue(event.target.value);
          setAnchorEl(event.currentTarget);
          setOpen(true);
        }}
      />
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper
          className={classes.popper}
          id={id}
          open={open}
          anchorEl={anchorEl}
        >
          <List className={classes.list}>
            {matchedNames.map((project) => (
              <ListItem
                button
                key={`project-${project.id}`}
                onClick={() => {
                  setOpen(false);
                  setCoordinate({
                    lng: project.attributes.longitude,
                    lat: project.attributes.latitude,
                    zoom: 12,
                  });
                }}
              >
                <ListItemText style={{ fontSize: '1rem' }}>
                  {project.attributes.project_name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Popper>
      </ClickAwayListener>
    </div>
  ) : null;
}

export default SearchBar;

// list onCLick to project view
// onClick={() => {
//   setOpen(false);
//   history.push(`/project/${project.id}`);
//   window.location.reload();
// }}
