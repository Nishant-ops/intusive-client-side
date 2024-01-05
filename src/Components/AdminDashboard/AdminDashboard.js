import React, { useEffect } from "react";
import UserTable from "../UsersTable/UsersTable";
import UserCount from "../UserCount/UserCount";
import { Container, CssBaseline } from "@mui/material";
import CSVUpload from "../CSVUpload/CSVUpload";
import useUsageTime from "../../hooks/useUsageTime";
import Header from "../Headers/Header";

function AdminDashboard() {
  useUsageTime();
  return (
    <>
      <Header />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: "20px",
        }}
      >
        <CSVUpload></CSVUpload>
        <CssBaseline />
        <UserCount></UserCount>
        <CssBaseline />
        <UserTable />
      </Container>
    </>
  );
}

export default AdminDashboard;
