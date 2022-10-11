import { BrowserRouter as Router, Route } from "react-router-dom";
import BankAccount from "./Components/Employee/pages/BankAccount";
import UserProfileControl from "./Components/Employee/pages/UserProfileControl";
import EmpHome from "./Components/Employee/pages/EmpHome";
import Department from "./Components/Employee/pages/Department";
import ProfileView from "./Components/Employee/pages/ProfileView";
import ProfileEdit from "./Components/Employee/pages/ProfileEdit";
import BankEdit from "./Components/Employee/pages/BankEdit";
import DepartmentEdit from "./Components/Employee/pages/DepartmentEdit";
import Employee from "./Components/Employee/pages/Employee";
import ViewNic from "./Components/Employee/pages/ViewNic";
import Login from "./Components/Employee/pages/Login";
import Chat from "./Components/Employee/pages/Chat";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Login}></Route>
        <Route path="/bankdetails" exact component={BankAccount}></Route>
        <Route path="/userprofile" exact component={UserProfileControl}></Route>
        <Route path="/empregister" exact component={Employee}></Route>
        <Route path="/departments" exact component={Department}></Route>
        <Route path="/viewprofile" exact component={ProfileView}></Route>
        <Route path="/editbank" exact component={BankEdit}></Route>
        <Route path="/editdept" exact component={DepartmentEdit}></Route>
        <Route path="/editprofile" exact component={ProfileEdit}></Route>
        <Route path="/employees" exact component={EmpHome}></Route>
        <Route path="/viewnic" exact component={ViewNic}></Route>
        <Route path='/chat' exact component={Chat}></Route>
      </div>
    </Router>
  );
}

export default App;
