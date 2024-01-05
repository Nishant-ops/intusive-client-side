import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  MenuItem,
  Select,
  TextField,
  Box,
  FormControl,
  Button,
  InputLabel,
} from "@mui/material";

export default function UserTable() {
  const [columns, setColumns] = useState([
    { field: "col1", headerName: "Name", width: 150 },
    { field: "col2", headerName: "Email", width: 150 },
    { field: "col3", headerName: "Usage Time", width: 150 },
  ]);
  const [rows, setRows] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      let formData = {
        filterValue: filterText,
        filterType: userFilter,
      };
      //   formData.
      const res = await axios.post(
        "http://localhost:8080/admin/getUserOnUsageTime",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("access-token"),
          },
        }
      );
      setRows(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUserFilterChange = (event) => {
    if (event.target.value == "") setFilterText("");
    setUserFilter(event.target.value);
  };
  const handleTextFilterChange = (event) => {
    // const value
    setFilterText(event.target.value);
  };
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Box component="div" sx={{ display: "flex" }} mt={8} gap={"10px"}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userFilter}
              label="User Filter"
              onChange={handleUserFilterChange}
            >
              <MenuItem value={""}>No filter</MenuItem>
              <MenuItem value={"gender"}>Gender</MenuItem>
              <MenuItem value={"device"}>Device</MenuItem>
              <MenuItem value={"country"}>Country</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            fullWidth
            id="text-filter"
            label="Text filter"
            name="text-filter"
            autoComplete="Text-Filter"
            onChange={handleTextFilterChange}
            disabled={userFilter.length == 0}
          />
          <Button onClick={fetchUserData}>Filter</Button>
        </Box>
        <div style={{ height: 300 }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[15, 10]} />
        </div>
      </Box>
    </>
  );
}
