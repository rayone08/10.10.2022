import React from "react";
import "./css/cssfooter.css";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Button } from "@mui/material";

function Footer() {
  return (
    <div>
      <footer className="site-footer mt-auto">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" alignItems="center">
            <CopyrightIcon sx={{ height: "10px", width: "10px" }} />
            <Typography sx={{ fontSize: "10px" }}>
              2022 IOU | All rights reserved
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ fontSize: "10px" }}>
              Terms of use | Privacy policy
            </Typography>
          </Stack>

          <Stack spacing={-1} direction="row" alignItems="center">
            <Typography sx={{ fontSize: "10px" }}>Follow us Here</Typography>
            <a href="https://www.linkedin.com/" target="_blank">
              <Button>
                <img src="https://img.icons8.com/fluency/20/000000/linkedin-2.png" />
              </Button>
            </a>
            <a href="https://twitter.com/?lang=en" target="_blank">
              <Button>
                <img src="https://img.icons8.com/fluency/20/000000/twitter.png" />
              </Button>
            </a>
            <a href="https://accounts.google.com/" target="_blank">
              <Button>
                <img src="https://img.icons8.com/color/20/000000/gmail--v1.png" />
              </Button>
            </a>
          </Stack>
        </Stack>
      </footer>
    </div>
  );
}
export default Footer;
