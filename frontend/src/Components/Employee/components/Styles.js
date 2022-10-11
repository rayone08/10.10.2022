import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";

const drawerWidth = "15%";

const Styles = makeStyles(() => {
  return {
    page: {
      padding: "10px",
      marginLeft: "250px",
      marginTop: "60px",
      marginBottom: "125px",
      color: "black",
      backgroundColor: "#F1F5F9 !important",
    },

    drawerPaper: {
      width: drawerWidth,
      padding: "30px 10px",
      color: "white !important",
      backgroundColor: "#040528 !important",
      borderRadius: 8,
    },

    root: {
      display: "flex",
    },

    drawer: {
      width: drawerWidth,
    },

    appbar: {
      width: `calc(100% - ${drawerWidth}) !important`,
      maxHeight: "70px",
      padding: "5px 10px",
      backgroundColor: "white !important",
    },
    downbar: {
      backgroundColor: "yellow !important",
      marginBottom: "0%",
      margin: 0,
      bottom: 0,
      position: "fixed",
      width: "100%",
      maxHeight: "40px",
      marginTop: "50px",
    },

    title: {
      height: "25%",
      margin: "25% auto",
    },

    pageTitle: {
      flexGrow: 1,
    },

    active: {
      backgroundColor: "#06658E",
    },

    children: {
      marginTop: "20px",
    },
  };
});

export default Styles;
