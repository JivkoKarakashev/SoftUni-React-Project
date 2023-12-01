import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { OwnerContext } from "../../contexts/OwnerContext";

export const OwnerGuard = () => {
    const { isOwner } = useContext(OwnerContext);

    if (!isOwner) {
        return <Navigate to='/auth/login' />;
    }

    return <Outlet />;
};

export default OwnerGuard;