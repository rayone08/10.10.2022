import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";

const EmpHome = () => {
  return (
    <>
      <Layout>
        <div>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={() => {
                window.location.href = "/userprofile";
              }}
            >
              User Profile
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                window.location.href = "/empregister";
              }}
            >
              User Registration
            </Button>
          </Stack>
        </div>
      </Layout>
    </>
  );
};

export default EmpHome;
