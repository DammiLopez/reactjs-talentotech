import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const AdminRoute = ({ children }) => {

  const {usuario, cargando} = useAuthContext();
  const localAdmin = localStorage.getItem("isAdmin") === "true"

  if (cargando) {
    return <Spinner/>; 
  }

  if (!usuario || !usuario.isAdmin || !localAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
