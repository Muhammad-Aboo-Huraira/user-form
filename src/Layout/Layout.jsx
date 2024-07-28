import SideBar from "../Components/Sidebar/Sidebar";
import { React } from "react";

const Layout = ({ children }) => {
  
  return (
    <div className="layout">
      {<SideBar data={children} />}
      
    </div>
  );
};
export default Layout;