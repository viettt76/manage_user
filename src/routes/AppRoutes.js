import { Route, Routes } from "react-router-dom";
import TableUsers from "../components/TableUsers";
import Home from "../components/Home";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

function AppRoutes() {
    return ( 
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route 
            path="/users" 
            element={
                <PrivateRoute>
                    <TableUsers />
                </PrivateRoute>
            }
          >
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
     );
}

export default AppRoutes;