import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react.js";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    overflow: "scroll",
    overflowX:'hidden',
    overflowY:'auto',
    minHeight:"calc(100vh - 200px)",
    maxHeight: "calc(100vh - 200px)"
  },
  container,
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
