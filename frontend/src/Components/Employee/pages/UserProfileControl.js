import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";
import Layout from "../components/Layout";
import { confirm } from "react-confirm-box";
import { Stack } from "@mui/system";
import "../components/css/indexEmp.css";
import { Link } from "react-router-dom";

// Styles for table cell
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styles for table row
const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#06658E",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserProfileControl = () => {
  var id = localStorage.getItem("logID");
  var loginRole = sessionStorage.getItem("loginRole");
  const [user, setUser] = useState([]);

  //search function
  const [searchTerm, setSearchTerm] = useState("");

  //Employee data show
  const employeeDataShow = () => {
    axios.get("http://localhost:8400/employee/show").then((response) => {
      setUser(response.data.existingEmployee);
    });
  };

  useEffect(() => {
    employeeDataShow();
  });

  //deleteConformation
  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };

  // delete function
  const onDelete = async (id) => {
    const result = await confirm("Are you sure to Delete?", options);
    if (result) {
      axios.delete(`http://localhost:8400/department/delete/${id}`).then(() => {
        axios
          .delete(`http://localhost:8400/employeebank/delete/${id}`)
          .then(() => {
            axios
              .delete(`http://localhost:8400/employee/delete/${id}`)
              .then(() => {
                alert("Deleted Successfully!");
              });
          });
      });
    }
  };

  return (
    <>
      <Layout>
        <div>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <h1>User Profile Control</h1>
            <input
              className="input-field"
              type="text"
              placeholder="Search by employee ID..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </Stack>

          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 1300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Employee ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user
                  .filter((row) => {
                    if (searchTerm === "") {
                      return row;
                    } else if (
                      row.empid.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return row;
                    } else {
                      return "";
                    }
                  })
                  .map((row) => (
                    <StyledTableRow key={row.empid}>
                      <StyledTableCell component="th" scope="row">
                        <b>{row.empid}</b>
                      </StyledTableCell>
                      <StyledTableCell>
                        <b>{row.empName}</b>
                      </StyledTableCell>
                      <StyledTableCell>
                        <b>{row.email}</b>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "#b0b7bd",
                            borderRadius: 15,
                          }}
                          onClick={() => {
                            var user = { row };
                            localStorage.setItem("user", JSON.stringify(user));

                            window.location.href = "/viewprofile";
                          }}
                        >
                          <b>View</b>
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "#b0b7bd",
                            borderRadius: 15,
                          }}
                          onClick={() => {
                            var id = row._id;

                            sessionStorage.setItem("id", id);
                            window.location.href = "/editprofile";
                          }}
                        >
                          <b> Edit</b>
                        </Button>
                      </StyledTableCell>
                      {id === row.empid ? (
                        <StyledTableCell>
                          <Button
                            style={{
                              color: "black",
                              backgroundColor: "#b0b7bd",
                              borderRadius: 15,
                            }}
                            disabled
                          >
                            <b> Chat</b>
                          </Button>
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell>
                          <Link
                            to={{
                              pathname: "/chat",
                              state: {
                                chatId: id + row.empid,
                                arisedBy: id,
                              },
                            }}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              style={{
                                color: "black",
                                backgroundColor: "#b0b7bd",
                                borderRadius: 15,
                              }}
                            >
                              <b> Chat</b>
                            </Button>
                          </Link>
                        </StyledTableCell>
                      )}

                      {loginRole === "Manager" ? (
                        <StyledTableCell>
                          <Button
                            onClick={() => onDelete(row.empid)}
                            style={{
                              color: "black",
                              backgroundColor: "#b0b7bd",
                              borderRadius: 15,
                            }}
                          >
                            <b>Delete</b>
                          </Button>
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell></StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Layout>
    </>
  );
};

export default UserProfileControl;
