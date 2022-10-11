import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Styles from "./Styles";
import { DrawerMenuList } from "./DrawerMenuList";
import Logo from "./Images/iou.png";
import "./css/indexEmp.css";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import axios from "axios";
import { Stack } from "@mui/system";
import { Buffer } from "buffer";

const Layout = ({ children }) => {
  var id = localStorage.getItem("logID");
  const [user, setUser] = useState([]);
  // const [dept, setDept] = useState([]);
  const [role, setRole] = useState("");

  const empData = () => {
    axios
      .get(`http://localhost:8400/employee/get/details/${id}`)
      .then((res) => {
        setUser(res.data.existingEmployee[0]);
      });
  };

  axios
    .get(`http://localhost:8400/department/details/show/${id}`)
    .then((res) => {
      if (res.data === 1) {
        axios.get(`http://localhost:8400/department/show/${id}`).then((res) => {
          // setDept(res.data.existingDepartment);
          setRole(res.data.existingDepartment.jobrole);
        });
      }
    });

  useEffect(() => {
    empData();
  }, []);

  var loginRole = role;
  sessionStorage.setItem("loginRole", loginRole);

  let buffer = "";
  let base64String = "";
  let mimetype = "";

  if (user.profilePic) {
    buffer = user.profilePic.data;
    base64String = Buffer.from(buffer).toString("base64");
    mimetype = user.profilePic.contentType;
  }

  const classes = Styles();
  return (
    <>
      <AppBar className={classes.appbar} sx={{ alignItems: "flex-end" }}>
        <Stack alignItems="center">
          <Avatar
            sx={{ width: 25, height: 25 }}
            src={`data:${mimetype};base64, ${base64String}`}
          />

          <Typography sx={{ color: "black" }}>{user.empName}</Typography>
        </Stack>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className="logo">
          <img src={Logo} />
        </div>
        <List>
          {DrawerMenuList.map((item) => (
            <ListItem
              button
              key={item.text}
              className={
                window.location.pathname === item.path ? classes.active : null
              }
              onClick={() => {
                window.location.pathname = item.path;
              }}
            >
              <ListItemIcon style={{ color: "white" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Footer>
          <Box></Box>
        </Footer>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.children}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
