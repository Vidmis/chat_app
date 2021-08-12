import { Redirect, Route } from "react-router-dom";
import { pathnames } from "../constants/location";
import { useAuth } from "./contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {currentUser} = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to={pathnames.login} />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
