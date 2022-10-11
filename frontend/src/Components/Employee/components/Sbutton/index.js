import { Button } from "@mui/material";

//Button code for testing
const Sbutton = ({ text, btnWidth }) => {
  const btnStyle = { width: btnWidth };
  return (
    <Button variant="contained" style={btnStyle}>
      {text}
    </Button>
  );
};

export default Sbutton;
