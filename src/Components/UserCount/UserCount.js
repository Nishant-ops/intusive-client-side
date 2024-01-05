import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TableContainer,
  TableHead,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";
function UserCount() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchCountData();
  }, []);
  const fetchCountData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/countusers", {
        headers: { auth: localStorage.getItem("access-token") },
      });
      setRows(res.data.data);
    } catch (err) {}
  };
  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
          gap: "10px",
          marginTop: "64px",
        }}
      >
        <Typography>Users Count</Typography>
        <TableContainer component={Paper} sx={{ width: "35%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Daily Count</TableCell>
                <TableCell align="right">Weekly Count</TableCell>
                <TableCell align="right">Monthly count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.daily}</TableCell>
                  <TableCell align="right">{row.weekly}</TableCell>
                  <TableCell align="right">{row.monthly}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default UserCount;
