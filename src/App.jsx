import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./comps/Chat";
import Login from "./comps/Login";
import Signup from "./comps/Signup";
import Profile from "./comps/Profile";
import PrivateRoute from "./comps/PrivateRoute";
import { AuthProvider } from "./comps/contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <AuthProvider>
            <Switch>
              <Route path='/signup'>
                <Signup />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <PrivateRoute exact path='/' component={Chat} />
              <PrivateRoute path='/profile' component={Profile} />
            </Switch>
          </AuthProvider>
        </div>
      </div>
    </Router>
  );
};

export default App;
