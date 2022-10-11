import React from "react";
import { Buffer } from "buffer";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const ViewNic = () => {
  var user = JSON.parse(localStorage.user);

  let buffer = "";
  let base64String = "";
  let mimetype = "";

  if (user.row.nicPic) {
    buffer = user.row.nicPic.data;
    base64String = Buffer.from(buffer).toString("base64");
    mimetype = user.row.nicPic.contentType;
  }

  return (
    <div>
      {user.row.nicPic ? (
        <iframe
          src={`data:${mimetype};base64, ${base64String}`}
          height="650px"
          width="100%"
        />
      ) : (
        <div>
          <Stack direction="row">
            <h1>Oh, Sorry </h1>
            <SentimentVeryDissatisfiedIcon
              sx={{
                height: "40px",
                width: "40px",
                paddingTop: "25px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            />{" "}
            <h1>!!! You have not uploade NIC!</h1>
          </Stack>
          <Link style={{ textDecoration: "none" }} to="/editprofile">
            <Button sx={{ color: "black" }}>
              <b>To update the NIC, Click Here</b>
              <PlayArrowIcon />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewNic;
