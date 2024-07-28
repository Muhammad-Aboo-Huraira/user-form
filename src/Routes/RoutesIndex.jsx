import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import UserForm from "../Pages/UserForm/UserForm";
import UserTable from "../Pages/UserTable/UserTable";
const RoutesIndex = () => {
  return (
    <Layout>
      <Routes>
        {
          <>
            <Route path="/" element={<UserForm />} />
            <Route path="/usertable" element={<UserTable />} />
          </>
        }
      </Routes>
      </Layout>
  );
};
export default RoutesIndex;