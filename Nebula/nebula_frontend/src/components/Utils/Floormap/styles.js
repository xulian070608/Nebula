import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  viz: {
    width: "100%",
    height: "100%",
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
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default styles;
