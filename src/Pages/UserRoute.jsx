import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const UserRoute = ({ children }) => {
  const { usuario, cargando } = useAuthContext();

  if (cargando) {
    return <Spinner/>; 
  }

  if (!usuario) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return children;
};

export default UserRoute;
