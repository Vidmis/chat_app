import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firestore/config";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isloading, setIsLoading] = useState(true);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updateName = (userName) => {
    return currentUser
      .updateProfile({
        displayName: userName,
      })
      .then(() => {
        console.log("Username update successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePhoto = (photo) => {
    if (currentUser.photoURL) {
      return currentUser
        .updateProfile({
          photoURL: photo,
        })
        .then(() => {
          console.log("Photo Update successful");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return currentUser
        .updateProfile({
          displayName: "userName",
          photoURL:
            "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
        })
        .then(() => {
          console.log("Default user info set");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    logout,
    updateEmail,
    updatePhoto,
    updateName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isloading && children}
    </AuthContext.Provider>
  );
};
