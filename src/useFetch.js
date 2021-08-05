import { useEffect, useState } from "react";
import { useAuth } from "./comps/contexts/AuthContext";
import app from "./firestore/config";

const db = app.firestore();

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, updatePhoto } = useAuth();

  // Render sidebar of users
  const fetchChats = () => {
    setIsLoading(true);
    db.collection("users")
      .get()
      .then((snapshot) => {
        const chats = snapshot.docs.map((doc) => doc.data());
        setData(chats);
        setIsLoading(false);
      });
  };

  // Add current user data to "users" collection and update data on each refresh in "Chat" page
  useEffect(() => {
    const uniqueKey = Math.round(Date.now() / 10);
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        id: uniqueKey,
        uid: currentUser.uid,
        userName: currentUser.displayName,
        email: currentUser.email,
        profilePhoto: currentUser.photoURL,
      })
      .then()
      .catch((err) => console.log(err));

    // On page refresh update current (logged in) user photo
    updatePhoto();
    // On page refresh call fetchChats function
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data, isLoading };
};

export default useFetch;
