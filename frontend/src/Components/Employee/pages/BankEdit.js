import React, { useState } from "react";
import Layout from "../components/Layout";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import axios from "axios";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useLocation } from "react-router-dom";

const BankEdit = () => {
  const location = useLocation();
  const user = location.state.user;
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.persist();
    axios
      .patch(
        `http://localhost:8400/employeebank/edit/all/${user.empid}`,
        inputs
      )
      .then((res) => {
        alert("Updated successfully");
        window.location.href = "/userprofile";
      })
      .catch(function (error) {
        if (user.accNum !== Number) {
          alert("Invalid type of account number");
        } else {
          alert("Duplicate value! Try with New Entry");
        }
      });
  };

  return (
    <div>
      <Layout>
        <div>
          <h1>Edit Bank Details</h1>
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
                  <label>Employee ID</label>
                  <input
                    id="textbox"
                    type="text"
                    name="empid"
                    value={user.empid}
                    readOnly
                  />
                </Stack>
                <Stack direction="row" spacing={7.2}>
                  <label>Account Number</label>
                  <input
                    id="textbox"
                    type="text"
                    name="accNum"
                    value={inputs.accNum || user.accNum}
                    onChange={handleChange}
                  />
                </Stack>

                <Stack direction="row" spacing={11.5}>
                  <label>Bank Name</label>
                  <input
                    id="textbox"
                    type="text"
                    name="bankName"
                    value={inputs.bankName || user.bankName}
                    onChange={handleChange}
                  />
                </Stack>

                <Stack direction="row" spacing={10.5}>
                  <label>Bank Branch</label>
                  <input
                    id="textbox"
                    type="text"
                    name="branch"
                    value={inputs.branch || user.branch}
                    onChange={handleChange}
                  />
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
  );
};

export default BankEdit;
