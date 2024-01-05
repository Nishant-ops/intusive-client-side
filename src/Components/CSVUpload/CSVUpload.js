import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CSVupload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [properFile, setProperFile] = useState(true);
  const [isFileAvailable, setisFileAvailable] = useState(true);
  const [uploaded, setUploaded] = useState(true);
  const [error, setError] = useState(true);

  async function handleSubmit() {
    if (selectedFile == null) {
      setisFileAvailable(false);
    } else {
      setisFileAvailable(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (selectedFile.type === "text/csv") {
        console.log(selectedFile);
        setProperFile(true);
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const res = await axios({
          method: "post",
          url: "http://localhost:8080/admin/file",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            auth: localStorage.getItem("access-token"),
          },
        })
          .then((result) => {
            setUploaded(false);
          })
          .catch((result) => {
            setError(false);
          });
        console.log(res, selectedFile);
      } else {
        setProperFile(false);
      }
    }
  }
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <>
      <Typography className="form-upload-heading">
        Please Select A file to be Uploaded
      </Typography>
      <Box
        className="form-upload-section"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          type={"file"}
          className="file-upload-input"
          onChange={handleFileSelect}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={handleSubmit}
        >
          Upload
        </Button>
      </Box>
      <Typography
        style={{ display: isFileAvailable ? "none" : "block" }}
        className="error-check"
      >
        Please Select a File to be uploaded
      </Typography>
      <Typography
        style={{
          display: properFile ? "none" : "block",
          color: properFile ? "none" : "red",
        }}
        className="error-check"
      >
        Please upload csv file only
      </Typography>
      <Typography
        style={{ display: uploaded ? "none" : "block" }}
        className="error-check"
      >
        File is SuccessFully loaded
      </Typography>
      <Typography
        style={{
          display: error ? "none" : "block",
          color: error ? "none" : "red",
        }}
        className="error-check"
      >
        Their is some error while uploading the file please Try Again
      </Typography>
    </>
  );
}

export default CSVupload;
