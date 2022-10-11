import React, { useState } from "react";
import Layout from "../components/Layout";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import axios from "axios";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Link, useLocation } from "react-router-dom";

const DepartmentEdit = () => {
  const location = useLocation();
  const dept = location.state.user;

  const [inputs, setInputs] = useState({
   
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  //submit to update
  const onSubmit = (e) => {
    e.preventDefault();
    e.persist();

    axios
      .patch(`http://localhost:8400/departmnent/edit/all/${dept.empid}`, inputs)
      .then((res) => {
        alert("Updated successfully");
      })
      .catch(() => {
        if (dept.basesalary !== Number) {
          alert("Invalid type for base salary");
        }
      });
  };

  return (
    <>
      <div>
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
              {/* form starting */}
              <form>
                <Stack direction="column" spacing={4}>
                  <Stack direction="row" spacing={11}>
                    <label>Employee Id</label>
                    <input
                      id="textbox"
                      type="text"
                      name="empid"
                      value={dept.empid}
                      readOnly
                    />
                  </Stack>
                  <Stack direction="row" spacing={14.6}>
                    <label>Job Role</label>
                    <input
                      id="textbox"
                      type="text"
                      name="jobrole"
                      value={inputs.jobrole || dept.jobrole}
                      onChange={handleChange}
                    />
                  </Stack>
                  <Stack direction="row" spacing={10.8}>
                    <label>Basic Salary</label>
                    <input
                      id="textbox"
                      type="text"
                      name="basesalary"
                      value={inputs.basesalary || dept.basesalary}
                      onChange={handleChange}
                    />
                  </Stack>
                  <Stack direction="row" spacing={11.2}>
                    <label>Department</label>
                    <select
                      name="depetfield"
                      id="box"
                      value={inputs.depetfield || dept.depetfield}
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
                      value={inputs.empstate || dept.empstate}
                      onChange={handleChange}
                    >
                      <option disabled defaultValue="" hidden></option>
                      <option value="Active">Active</option>
                      <option value="Retired">Retired</option>
                    </select>
                  </Stack>
                </Stack>
              </form>
              {/* form ending */}
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
                <ArrowLeftIcon sx={{ height: "50px", width: "50px" }} />{" "}
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
                Update
              </Button>
            </Stack>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default DepartmentEdit;
