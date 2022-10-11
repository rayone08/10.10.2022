import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import dateFormat from "dateformat";
import Layout from "../components/Layout";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Buffer } from "buffer";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Link } from "react-router-dom";

const ProfileView = () => {
  var user = JSON.parse(localStorage.user);
  var id = localStorage.getItem("logID");
  const [loginRole, setLoginRole] = useState("");
  const [deptUser, setDeptUser] = useState([]);
  const [bankUser, setBankUser] = useState([]);

  axios
    .get(`http://localhost:8400/department/details/show/${id}`)
    .then((res) => {
      if (res.data === 1) {
        axios.get(`http://localhost:8400/department/show/${id}`).then((res) => {
          setLoginRole(res.data.existingDepartment.jobrole);
        });
      }
    });

  // Department data show
  const departmentDataShow = () => {
    axios
      .get(`http://localhost:8400/department/show/${user.row.empid}`)
      .then((response) => {
        setDeptUser(response.data.existingDepartment);
      });
  };

  // Bank account data show
  const bankAccDataShow = () => {
    axios
      .get(`http://localhost:8400/bank/${user.row.empid}`)
      .then((response) => {
        setBankUser(response.data.existingBankAccount);
      });
  };

  useEffect(() => {
    departmentDataShow();
    bankAccDataShow();
  });

  let buffer = "";
  let base64String = "";
  let mimetype = "";

  if (user.row.profilePic) {
    buffer = user.row.profilePic.data;
    base64String = Buffer.from(buffer).toString("base64");
    mimetype = user.row.profilePic.contentType;
  }

  return (
    <>
      <Layout>
        <div>
          <div>
            <Stack
              direction="row"
              // alignItems="flex-end"
              justifyContent="space-between"
            >
              <h1>Employee Details</h1>
              <Button
                variant="contained"
                sx={{ height: "40px", borderRadius: "80px" }}
                onClick={() => {
                  // window.open("/viewnic")
                  window.location.href = "/viewnic";
                }}
              >
                View NIC
              </Button>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={2}
            >
              <Stack direction="column" spacing={3}>
                <Chip
                  sx={{ backgroundColor: "#d8d4d4" }}
                  label={<h3>Address: {user.row.empadd}</h3>}
                />
                <Chip
                  sx={{ backgroundColor: "#d8d4d4" }}
                  label={<h3>Email: {user.row.email}</h3>}
                />
                <Chip
                  sx={{ backgroundColor: "#d8d4d4" }}
                  label={<h3>DOB: {dateFormat(user.row.dob, "yyyy-mm-dd")}</h3>}
                />
                <Chip
                  sx={{ backgroundColor: "#d8d4d4" }}
                  label={<h3>Contact Number: {user.row.empPhone}</h3>}
                />
                <Chip
                  sx={{ backgroundColor: "#d8d4d4" }}
                  label={
                    <h3>
                      Appointment Date:{" "}
                      {dateFormat(user.row.dateApp, "yyyy-mm-dd")}
                    </h3>
                  }
                />
                <Chip
                  sx={{ backgroundColor: "#d8d4d4" }}
                  label={<h3>NIC: {user.row.nic}</h3>}
                />
                <Chip
                  sx={{ backgroundColor: "#d8d4d4" }}
                  label={<h3>Gender: {user.row.gender}</h3>}
                />
              </Stack>
              <Stack direction="column" alignItems="center" spacing={2}>
                <Avatar
                  sx={{ width: 200, height: 200 }}
                  src={`data:${mimetype};base64, ${base64String}`}
                />

                <Chip
                  sx={{ backgroundColor: "#d8d4d4" }}
                  label={<h3>Employee ID: {user.row.empid}</h3>}
                />
                <Chip
                  sx={{ backgroundColor: "#d8d4d4" }}
                  label={
                    <h2>
                      {user.row.titleName} {user.row.empName}
                    </h2>
                  }
                />

                {deptUser ? (
                  deptUser.empstate === "Active" ? (
                    <Chip
                      sx={{ backgroundColor: "#d8d4d4" }}
                      label={
                        <Stack direction="row">
                          <CircleIcon
                            sx={{
                              color: "green",
                              paddingTop: "18px",
                              paddingRight: "6px",
                              height: "18px",
                              width: "18px",
                            }}
                          />
                          <h2>{deptUser.empstate}</h2>
                        </Stack>
                      }
                    />
                  ) : (
                    <Chip
                      sx={{ backgroundColor: "#d8d4d4" }}
                      label={
                        <Stack direction="row">
                          <CircleIcon
                            sx={{
                              color: "red",
                              paddingTop: "18px",
                              paddingRight: "6px",
                              height: "18px",
                              width: "18px",
                            }}
                          />
                          <h2>{deptUser.empstate}</h2>
                        </Stack>
                      }
                    />
                  )
                ) : null}
              </Stack>
              {deptUser ? (
                <Stack direction="column" spacing={3}>
                  <Chip
                    sx={{ backgroundColor: "#d8d4d4" }}
                    label={<h3>Job Type: {user.row.jtype}</h3>}
                  />
                  <Chip
                    sx={{ backgroundColor: "#d8d4d4" }}
                    label={<h3>Base Salary: {deptUser.basesalary}</h3>}
                  />
                  <Chip
                    sx={{ backgroundColor: "#d8d4d4" }}
                    label={<h3>Job Role: {deptUser.jobrole}</h3>}
                  />
                  <Chip
                    sx={{ backgroundColor: "#d8d4d4" }}
                    label={<h3>Department: {deptUser.depetfield}</h3>}
                  />
                  {bankUser ? (
                    <>
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Account Number: {bankUser.accNum}</h3>}
                      />
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Bank Name: {bankUser.bankName}</h3>}
                      />
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Branch Name: {bankUser.branch}</h3>}
                      />
                    </>
                  ) : (
                    <>
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Account Number: Not Updated</h3>}
                      />
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Bank Name: Not Updated</h3>}
                      />
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Branch Name: Not Updated</h3>}
                      />
                    </>
                  )}
                </Stack>
              ) : (
                <Stack direction="column" spacing={3}>
                  <Chip
                    sx={{ backgroundColor: "#d8d4d4" }}
                    label={<h3>Job Type: {user.row.jtype}</h3>}
                  />
                  <Chip
                    sx={{ backgroundColor: "#d8d4d4" }}
                    label={<h3>Base Salary: Not Updated</h3>}
                  />
                  <Chip
                    sx={{ backgroundColor: "#d8d4d4" }}
                    label={<h3>Job Role: Not Updated</h3>}
                  />
                  <Chip
                    sx={{ backgroundColor: "#d8d4d4" }}
                    label={<h3>Department: Not Updated</h3>}
                  />
                  {bankUser ? (
                    <>
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Account Number: {bankUser.accNum}</h3>}
                      />
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Bank Name: {bankUser.bankName}</h3>}
                      />
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Branch Name: {bankUser.branch}</h3>}
                      />
                    </>
                  ) : (
                    <>
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Account Number: Not Updated</h3>}
                      />
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Bank Name: Not Updated</h3>}
                      />
                      <Chip
                        sx={{ backgroundColor: "#d8d4d4" }}
                        label={<h3>Branch Name: Not Updated</h3>}
                      />
                    </>
                  )}
                </Stack>
              )}
            </Stack>
          </div>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ paddingTop: "40px" }}
          >
            <Stack>
              <Button
                sx={{ color: "black" }}
                onClick={() => {
                  window.location.href = "/userprofile";
                }}
              >
                <ArrowLeftIcon sx={{ height: "50px", width: "50px" }} />
                <b>User Profile</b>
              </Button>
            </Stack>
            <Stack alignItems="flex-end">
              {loginRole === "Manager" ? (
                bankUser ? (
                  <Link
                    to={{ pathname: "/editbank", state: { user: bankUser } }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button sx={{ color: "black" }}>
                      <b>To Edit Bank Details</b> <PlayArrowIcon />
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: "/bankdetails",
                      state: { id: user.row.empid },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button sx={{ color: "black" }}>
                      <b>To Register Bank Details</b> <PlayArrowIcon />
                    </Button>
                  </Link>
                )
              ) : null}



              {loginRole === "Manager" ? (
                deptUser ? (
                  <Link
                    to={{ pathname: "/editdept", state: { user: deptUser } }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button sx={{ color: "black" }}>
                      <b>To Edit Department Details</b> <PlayArrowIcon />
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: "/departments",
                      state: { id: user.row.empid },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button sx={{ color: "black" }}>
                      <b>To Register Department Details</b> <PlayArrowIcon />
                    </Button>
                  </Link>
                )
              ) : null}
            </Stack>
          </Stack>
        </div>
      </Layout>
    </>
  );
};

export default ProfileView;
