import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import "../components/css/indexEmp.css";
import Button from "@mui/material/Button";
import axios from "axios";
import Layout from "../components/Layout";
import ProfileUpload from "../components/ProfileUpload";
import NicUpload from "../components/NicUpload";

const Employee = () => {

  const [inputs, setInputs] = useState({
    titleName: "",
    empid: "",
    empPwd: "",
    empName: "",
    empadd: "",
    empPhone: "",
    email: "",
    dob: "",
    nic: "",
    dateApp: "",
    gender: "",
    jtype: "",
  });

  const [uploadedProfilePath, setUploadedProfilePath] = useState("");

  const [uploadedNicfilePath, setUploadedNicfilePath] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputs.titleName === "") {
      alert("Title should not be empty");
    } else if (inputs.empid === "") {
      alert("Employee ID should not be empty");
    } else if (inputs.empPwd === "") {
      alert("Password should not be empty");
    } else if (inputs.empPwd.length < 5) {
      alert("Password Should Be atleast 5 characters.");
    } else if (inputs.empName === "") {
      alert("Name should not be empty");
    } else if (inputs.empadd === "") {
      alert("Address should not be empty");
    } else if (inputs.empPhone === "") {
      alert("Contact Number should not be empty");
    } else if (inputs.empPhone.length !== 10) {
      alert("Contact Number Should Be 10 Digit.");
    } else if (inputs.email === "") {
      alert("Email should not be empty");
    } else if (inputs.dob === "") {
      alert("Date of Birth should not be empty");
    } else if (inputs.nic === "") {
      alert("NIC should not be empty");
    } else if (inputs.dateApp === "") {
      alert("Date of Appoinment should not be empty");
    } else if (inputs.gender === "") {
      alert("Gender should not be empty");
    } else if (inputs.jtype === "") {
      alert("Job Type should not be empty");
    } else {
      axios
        .post("http://localhost:8400/employee/add", inputs)
        .then((res) => {
          alert("Added Successfully!!!");
          setInputs("");
          // setUploadedProfilePath("");
          window.location.reload();
        })
        .catch(function (error) {
          if (inputs.empPhone.type !== Number) {
            alert("Invalid type of contact number");
          } else {
            alert("Duplicate value! Try with New Entry");
          }
        });
    }
  };

  return (
    <>
      <Layout>
        <h1>Employee Registration</h1>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={2}
        >
          <Stack direction="column" spacing={2} alignItems="center">
            <Avatar sx={{ width: 200, height: 200 }} />

            <ProfileUpload
              setUploadedProfilePath={setUploadedProfilePath}
              setInputs={setInputs}
            />
          </Stack>
          <form>
            <Stack direction="column" spacing={4}>
              <Stack direction="row" spacing={17.5}>
                <label>Title</label>
                <select
                  className="textbox-radius"
                  name="titleName"
                  id="box"
                  onChange={handleChange}
                  value={inputs.titleName || ""}
                >
                  <option disabled defaultValue="" hidden></option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                </select>
              </Stack>
              <Stack direction="row" spacing={10.4}>
                <label>Employee ID</label>
                <input
                  className="textbox-radius"
                  id="textbox"
                  type="text"
                  name="empid"
                  value={inputs.empid || ""}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={12.9}>
                <label>Password</label>
                <input
                  className="textbox-radius"
                  id="textbox"
                  type="password"
                  name="empPwd"
                  value={inputs.empPwd || ""}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={16.2}>
                <label>Name</label>
                <input
                  className="textbox-radius"
                  id="textbox"
                  type="text"
                  name="empName"
                  value={inputs.empName || ""}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={14.3}>
                <label>Address</label>
                <textarea
                  className="textbox-radius"
                  id="textbox"
                  type="textarea"
                  name="empadd"
                  value={inputs.empadd || ""}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={7}>
                <label>Contact Number</label>
                <input
                  className="textbox-radius"
                  id="textbox"
                  type="text"
                  name="empPhone"
                  value={inputs.empPhone || ""}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={16.3}>
                <label>Email</label>
                <input
                  className="textbox-radius"
                  id="email"
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={10.2}>
                <label>Date of Birth</label>
                <input
                  className="textbox-radius"
                  id="textbox"
                  type="date"
                  name="dob"
                  value={inputs.dob || ""}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={18.3}>
                <label>NIC</label>
                <input
                  className="textbox-radius"
                  id="textbox"
                  type="text"
                  name="nic"
                  value={inputs.nic || ""}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={3.9}>
                <label>Date of Appoinment</label>
                <input
                  className="textbox-radius"
                  id="textbox"
                  type="date"
                  name="dateApp"
                  value={inputs.dateApp || ""}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={15}>
                <label>Gender</label>
                <select
                  className="textbox-radius"
                  name="gender"
                  // id="box"
                  onChange={handleChange}
                  value={inputs.gender || ""}
                >
                  <option disabled defaultValue="" hidden></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </Stack>
              <Stack direction="row" spacing={14}>
                <label>Job Type</label>
                <select
                  className="textbox-radius"
                  name="jtype"
                  // id="box"
                  onChange={handleChange}
                  value={inputs.jtype || ""}
                >
                  <option disabled defaultValue="" hidden></option>
                  <option value="Part time">Part time</option>
                  <option value="Full time">Full time</option>
                </select>
              </Stack>
              <Stack direction="row">
                <NicUpload
                  setUploadedNicfilePath={setUploadedNicfilePath}
                  setInputs={setInputs}
                />
              </Stack>
              <Stack direction="column">
                <Button
                  style={{ backgroundColor: "#040528", borderRadius: "50px" }}
                  onClick={onSubmit}
                  variant="contained"
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Layout>
    </>
  );
};

export default Employee;
