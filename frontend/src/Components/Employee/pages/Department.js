import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import axios from "axios";
import Layout from "../components/Layout";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useLocation } from "react-router-dom";

const Department = () => {
  const location = useLocation();

  var id = location.state.id;
  const [inputs, setInputs] = useState({
    jobrole: "",
    basesalary: "",
    depetfield: "",
    empstate: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    inputs.empid = id;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputs.jobrole === "") {
      alert("Job Role should not be empty");
    } else if (inputs.basesalary === "") {
      alert("Basic Salary should not be empty");
    } else if (inputs.depetfield === "") {
      alert("Department should not be empty");
    } else if (inputs.empstate === "") {
      alert("Employment Status should not be empty");
    } else {
      axios
        .post("http://localhost:8400/department/add", inputs)
        .then((res) => {
          alert("Added Successfully!!!");
          window.location.href = "/userprofile";
        })
        .catch(function (error) {
          if (inputs.basesalary !== Number) {
            alert("Invalid type of base salary");
          } else {
            alert("Duplicate value! Try with New Entry");
          }
        });
    }
  };

  return (
    <>
      <Layout>
        <div>
          <h1>Job Description</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form>
              <Stack direction="column" spacing={4}>
                <Stack direction="row" spacing={11}>
                  <label>Employee Id</label>
                  <input
                    id="textbox"
                    type="text"
                    name="empid"
                    value={id}
                    readOnly
                  />
                </Stack>
                <Stack direction="row" spacing={14.3}>
                  <label>Job Role</label>
                  <input
                    id="textbox"
                    type="text"
                    name="jobrole"
                    value={inputs.jobrole || ""}
                    onChange={handleChange}
                  />
                </Stack>
                <Stack direction="row" spacing={10.8}>
                  <label>Basic Salary</label>
                  <input
                    id="textbox"
                    type="text"
                    name="basesalary"
                    value={inputs.basesalary || ""}
                    onChange={handleChange}
                  />
                </Stack>
                <Stack direction="row" spacing={11.2}>
                  <label>Department</label>
                  <select
                    name="depetfield"
                    id="box"
                    value={inputs.depetfield || ""}
                    onChange={handleChange}
                  >
                    <option disabled defaultValue="" hidden></option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="IT">IT</option>
                    <option value="Accounting and Finance">
                      Accounting and Finance
                    </option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </Stack>

                <Stack direction="row" spacing={4.6}>
                  <label>Employment Status</label>
                  <select
                    name="empstate"
                    id="box"
                    value={inputs.empstate || ""}
                    onChange={handleChange}
                  >
                    <option disabled defaultValue="" hidden></option>
                    <option value="Active">Active</option>
                    <option value="Retired">Retired</option>
                  </select>
                </Stack>
              </Stack>
            </form>
          </div>
          <br />
          <br />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            marginRight="120px"
          >
            <Button
              sx={{ color: "black" }}
              onClick={() => {
                window.location.href = "/userprofile";
              }}
            >
              <ArrowLeftIcon sx={{ height: "50px", width: "50px" }} />
              <b>User Profile</b>
            </Button>
            <Button
              style={{
                color: "white",
                backgroundColor: "#040528",
                borderRadius: 15,
                width: "120px",
              }}
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              Submit
            </Button>
          </Stack>
        </div>
      </Layout>
    </>
  );
};

export default Department;
