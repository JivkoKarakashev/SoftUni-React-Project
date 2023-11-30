import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"

export const AuthGuard = () => {
    const { hasUser } = useContext(AuthContext);

    if (!hasUser) {
        return <Navigate to='/auth/login' />;
    }

    return <Outlet />;
};

export default AuthGuard;