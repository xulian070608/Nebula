import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  button: {
    position: "absolute",
    top: 100,
    right: 20,
    background: "rgb(225,225,225)"
  },
  popper: {
    position: "absolute",
    marginLeft: 100
  }
});

export default styles;
