import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LogoutIcon from "@mui/icons-material/Logout";

export const DrawerMenuList = [
  {
    text: "Employees",
    path: "/employees",
    icon: <AssignmentIndIcon />,
  },
  {
    text: "Shift Scheduling",
    path: "/shiftScheduling",
    icon: <MenuBookIcon />,
  },
  {
    text: "Time sheets",
    path: "/timeSheets",
    icon: <WatchLaterIcon />,
  },
  {
    text: "Salary",
    path: "/salary",
    icon: <LocalAtmIcon />,
  },
  {
    text: "Project Budgeting",
    path: "/projectBudgeting",
    icon: <DataThresholdingIcon />,
  },

  {
    text: "Log out",
    path: "/",
    icon: <LogoutIcon />,
  },
];
