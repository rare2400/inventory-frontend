import { Outlet } from "react-router-dom";
import ProtectedRoute from "../protectedRoute";

const AdminLayout = () => {
    return (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    )
}

export default AdminLayout;