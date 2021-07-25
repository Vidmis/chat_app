import { Link, useHistory } from "react-router-dom";
import pepe from "../images/1kSxAdMB_400x400.jpg";
import app from "../firestore/config";
import { useAuth } from "./contexts/AuthContext";
import { useRef, useState } from "react";

const db = app.firestore();

const Profile = ({ user }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const userNameRef = useRef();
  const emailRef = useRef();
  const history = useHistory();
  const { currentUser, updateEmail } = useAuth();

  const data = db.collection("chats");

  console.log(currentUser.email);

  const onSubmit = async (e) => {
    e.preventDefault();
    // const userNameVal = e.target.userName.value;
    // const emailVal = e.target.email.value;
    // console.log(emailVal);

    const promise = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promise.push(updateEmail(emailRef.current.value));
    }

    Promise.all(promise)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });

    // Update user info in firebase
    // const userSelect = await data.doc("QLDv9MObLTUMuVhx42WAoEkkkL23");
    // userSelect.update({ userName: userNameVal, email: emailVal });
    // console.log(userSelect);

    // data.get().then((snapshot) => {
    //   const chats = snapshot.docs.map((doc) => doc.data());
    //   console.log("This is chats variable", chats);

    // set(chats);
    // setIsLoading(false);
  };

  return (
    <>
      <div className='card-content'>
        <div className='bg-palette-cloud shadow-lg overflow-hidden w-3/4 max-w-sm mt-20 m-auto items-center rounded-md'>
          <form
            className='card flex flex-col m-auto items-center'
            onSubmit={onSubmit}
          >
            <img
              src={pepe}
              alt='profile_photo'
              className='w-48 h-48 rounded-md mt-5'
            />
            <h3 className='profile-name my-3 text-xl font-medium text-gray-600'>
              Bette Random
            </h3>
            <input
              className='transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-3/5 min-w-32 text-center py-1 px-2 focus:outline-none mt-4 focus:text-gray-600'
              type='text'
              placeholder='Name'
              ref={userNameRef}
            />
            <input
              className={`transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-3/5 min-w-32 text-center py-1 px-2 focus:outline-none mt-4 focus:text-gray-600 ${
                error ? "ring-2 ring-palette-red" : ""
              }`}
              type='text'
              placeholder='Email'
              ref={emailRef}
            />
            <div className='flex flex-row space-x-4 my-5'>
              <button
                type='submit'
                disabled={loading}
                className='bg-palette-sunrise px-3 py-2 rounded-lg text-palette-cloud mb-3 cursor-pointer'
              >
                Save
              </button>
              <Link
                className='bg-palette-red px-3 py-2 rounded-lg text-palette-cloud mb-3 cursor-pointer'
                to='/'
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
