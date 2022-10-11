import React, { Fragment, useState } from "react";
import axios from "axios";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

const ProfileUpload = ({ setUploadedProfilePath, setInputs }) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose file");

  const onChange = (e) => {
    setUploadedProfilePath("");
    const file = e.target.files[0];

    if (file.type === "image/png" || file.type === "image/jpeg") {
      if (file.size <= 2097152) {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      } else {
        alert("Cannot upload, Maximum file size is 2MB");
      }
    } else {
      alert("Cannot upload, Required file type is .png or .jpg");
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
      setUploadedProfilePath(res.data.filePath);
      alert("Profile Picture uploaded!");
      setInputs((values) => ({
        ...values,
        profilePath: res.data,
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
              sx={{ paddingLeft: "50px" }}
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

export default ProfileUpload;
