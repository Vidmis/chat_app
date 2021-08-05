import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./comps/Chat";
import Login from "./comps/Login";
import Signup from "./comps/Signup";
import Profile from "./comps/Profile";
import PrivateRoute from "./comps/PrivateRoute";
import { AuthProvider } from "./comps/contexts/AuthContext";
import {pathnames} from './constants/location';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <AuthProvider>
            <Switch>
              <Route path={pathnames.signup}>
                <Signup />
              </Route>
              <Route path={pathnames.login}>
                <Login />
              </Route>
              <PrivateRoute exact path={pathnames.home} component={Chat} />
              <PrivateRoute path={pathnames.profile} component={Profile} />
            </Switch>
          </AuthProvider>
        </div>
      </div>
    </Router>
  );
};

export default App;
