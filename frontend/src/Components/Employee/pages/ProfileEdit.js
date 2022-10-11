import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Stack from "@mui/material/Stack";
import dateFormat from "dateformat";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Avatar } from "@mui/material";
import ProfileUpload from "../components/ProfileUpload";
import { Buffer } from "buffer";
import NicUpload from "../components/NicUpload";

const ProfileEdit = () => {
  //from User profile control page(we are passing the value)

  var id = sessionStorage.getItem("id");

  const [user, setUser] = useState([]);

  const [uploadedNicfilePath, setUploadedNicfilePath] = useState("");

  //Employee data show
  const employeeDataShow = () => {
    axios.get(`http://localhost:8400/employee/show/${id}`).then((response) => {
      setUser(response.data.existingEmployee);
    });
  };

  useEffect(() => {
    employeeDataShow();
  });

  let buffer = "";
  let base64String = "";
  let mimetype = "";

  if (user.profilePic) {
    buffer = user.profilePic.data;
    base64String = Buffer.from(buffer).toString("base64");
    mimetype = user.profilePic.contentType;
  }

  const [uploadedProfilePath, setUploadedProfilePath] = useState("");

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputs.empPhone) {
      if (inputs.empPhone.length !== 10) {
        alert("Contact Number Should Be 10 Digit.");
      } else {
        axios
          .patch(`http://localhost:8400/employee/edit/${user._id}`, inputs)
          .then((res) => {
            alert("Updated successfully");
          })
          .catch(function (error) {
            alert("Duplicate value! Try with New Entry");
          });
      }

      //We can update all emolyee ID () Department,Bank Account, Employee ID ) at Employee registration page
    } else {
      axios
        .patch(`http://localhost:8400/employee/edit/${user._id}`, inputs)
        .then((res) => {
          alert("Updated successfully");
          window.location.href = "/userprofile";
        })
        .then(() => {
          axios.patch(
            `http://localhost:8400/departmnent/edit/${user.empid}`,
            inputs
          );
        })
        .then(() => {
          axios.patch(
            `http://localhost:8400/employeebank/edit/${user.empid}`,
            inputs
          );
        })
        .catch(function (error) {
          alert("Duplicate value! Try with New Entry");
        });
    }
  };

  return (
    <>
      <Layout>
        <div>
          <h1>Edit Employee Details</h1>
          <div>
            <Stack justifyContent="space-evenly" alignItems="center">
              {/* <Stack direction="column" spacing={3}>
                <Avatar
                  sx={{ width: 200, height: 200 }}
                  src={`data:${mimetype};base64, ${base64String}`}
                />

                <ProfileUpload
                  setUploadedProfilePath={setUploadedProfilePath}
                  setInputs={setInputs}
                />
              </Stack> */}
            </Stack>
            <Stack sx={{ paddingTop: "25px" }}>
              {user && (
                <form>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                  >
                    <Stack direction="row" spacing={13}>
                      <label>Employee ID</label>
                      <input
                        className="textbox-radius"
                        id="textbox"
                        type="text"
                        name="empid"
                        value={inputs.empid || user.empid}
                        onChange={handleChange}
                      />
                    </Stack>
                    <Stack direction="row" spacing={20}>
                      <label>Title</label>

                      <select
                        className="textbox-radius"
                        name="titleName"
                        id="box"
                        onChange={handleChange}
                        value={inputs.titleName || user.titleName}
                      >
                        <option disabled defaultValue="" hidden></option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                      </select>
                    </Stack>
                    <Stack direction="row" spacing={9}>
                      <label>Employee Name</label>
                      <input
                        className="textbox-radius"
                        id="textbox"
                        type="text"
                        name="empName"
                        value={inputs.empName || user.empName}
                        onChange={handleChange}
                      />
                    </Stack>
                    <Stack direction="row" spacing={16.5}>
                      <label>Address</label>
                      <textarea
                        className="textbox-radius"
                        id="textbox"
                        type="textarea"
                        name="empadd"
                        value={inputs.empadd || user.empadd}
                        onChange={handleChange}
                      />
                    </Stack>
                    <Stack direction="row" spacing={9}>
                      <label>Contact Number</label>
                      <input
                        className="textbox-radius"
                        id="textbox"
                        type="text"
                        name="empPhone"
                        value={inputs.empPhone || user.empPhone}
                        onChange={handleChange}
                      />
                    </Stack>
                    <Stack direction="row" spacing={18}>
                      <label>Email</label>
                      <input
                        className="textbox-radius"
                        id="textbox"
                        type="email"
                        name="email"
                        value={inputs.email || user.email}
                        onChange={handleChange}
                      />
                    </Stack>
                    <Stack direction="row" spacing={12}>
                      <label>Date of Birth</label>
                      <input
                        className="textbox-radius"
                        id="textbox"
                        type="date"
                        name="dob"
                        value={inputs.dob || dateFormat(user.dob, "yyyy-mm-dd")}
                        onChange={handleChange}
                      />
                    </Stack>
                    <Stack direction="row" spacing={20}>
                      <label>NIC</label>
                      <input
                        className="textbox-radius"
                        id="textbox"
                        type="text"
                        name="nic"
                        value={inputs.nic || user.nic}
                        onChange={handleChange}
                      />
                    </Stack>
                    <Stack direction="row" spacing={5}>
                      <label>Date of Appointment</label>
                      <input
                        className="textbox-radius"
                        id="textbox"
                        type="date"
                        name="dateApp"
                        value={
                          inputs.dateApp ||
                          dateFormat(user.dateApp, "yyyy-mm-dd")
                        }
                        onChange={handleChange}
                      />
                    </Stack>
                    <Stack direction="row" spacing={17}>
                      <label>Gender</label>

                      <select
                        className="textbox-radius"
                        name="gender"
                        id="box"
                        onChange={handleChange}
                        value={inputs.gender || user.gender}
                      >
                        <option disabled defaultValue="" hidden></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </Stack>
                    <Stack direction="row" spacing={16}>
                      <label>Job Type</label>

                      <select
                        className="textbox-radius"
                        name="jtype"
                        id="box"
                        onChange={handleChange}
                        value={inputs.jtype || user.jtype}
                      >
                        <option disabled defaultValue="" hidden></option>
                        <option value="fulltime">Full time</option>
                        <option value="parttime">Part time</option>
                      </select>
                    </Stack>
                    {/* <Stack direction="row">
                      <NicUpload
                        setUploadedNicfilePath={setUploadedNicfilePath}
                        setInputs={setInputs}
                      />
                    </Stack> */}
                    <Stack direction="column">
                      <Button
                        style={{
                          backgroundColor: "#040528",
                          borderRadius: "50px",
                          width: "500px",
                        }}
                        onClick={onSubmit}
                        variant="contained"
                      >
                        Update
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              )}
            </Stack>
          </div>
          <Link style={{ textDecoration: "none" }} to="/userprofile">
            <Button sx={{ color: "black" }}>
              <ArrowLeftIcon sx={{ height: "50px", width: "50px" }} />{" "}
              <b>User Profile</b>
            </Button>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default ProfileEdit;
