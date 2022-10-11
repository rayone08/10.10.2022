import React, { Fragment, useState } from "react";
import axios from "axios";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

const NicUpload = ({ setUploadedNicfilePath, setInputs }) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose file");

  const onChange = (e) => {
    setUploadedNicfilePath("");
    const file = e.target.files[0];

    if (file.type === "image/png" || file.type === "image/jpeg") {
      if (file.size <= 2097152) {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      } else {
        alert("Cannot upload, Maximum file size is 2MB");
      }
    } else if (file.type === "application/pdf") {
      if (file.size <= 1048576) {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      } else {
        alert("Cannot upload, Maximum file size is 1MB");
      }
    } else {
      alert("Cannot upload, Required file type is .png or .jpg or .pdf");
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8400/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedNicfilePath(res.data.filePath);
      alert("NIC uploaded!");
      setInputs((values) => ({
        ...values,
        nicPath: res.data,
      }));
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div>
      <Fragment>
        <form onSubmit={onSubmit}>
          <div>
            <IconButton
              sx={{ marginRight: "20px" }}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" onChange={onChange} />
              <PhotoCamera
                sx={{ height: "40px", width: "40px", color: "#040528" }}
              />
            </IconButton>
            <label className="custom-file-label" htmlFor="customFile">
              {fileName}
            </label>
            <Button
              sx={{ marginLeft: "25px" }}
              style={{
                backgroundColor: "#040528",
                borderRadius: "30px",
                height: "35px",
              }}
              type="submit"
              variant="contained"
            >
              Upload
            </Button>
          </div>
        </form>
      </Fragment>
    </div>
  );
};

export default NicUpload;
