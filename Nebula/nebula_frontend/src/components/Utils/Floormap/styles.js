import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  root: {
    width: 1020,
    height: 650,
  },
  button: {
    position: "absolute",
    top: 100,
    right: 20,
    background: "rgb(225,225,225)",
  },
  popper: {
    position: "absolute",
    marginLeft: 100,
    marginTop: theme.spacing(0),
  },
}));

export default styles;
