import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Chat from "./comps/Chat";
import Login from "./comps/Login";
import Profile from "./comps/Profile";
import { auth } from "./firestore/config";
import { useEffect, useState } from "react";

const App = () => {
  // const [userLogin] = useAuthState(auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth.uid,
        email: userAuth.email,
      };
      if (userAuth) {
        console.log(userAuth);
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Switch>
              <Route exact path='/'>
                <Login />
              </Route>
              <Route path='/chat'>
                <Chat />
              </Route>

            <Route path='/profile'>
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
