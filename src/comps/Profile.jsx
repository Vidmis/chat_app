import { Link, useHistory } from "react-router-dom";
import app from "../firestore/config";
import { useAuth } from "./contexts/AuthContext";
import { useRef, useState } from "react";

const Profile = ({ user }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [usrName, setUsrName] = useState("");
  const userNameRef = useRef();
  const emailRef = useRef("");
  const history = useHistory();
  const { currentUser, updateEmail, updatePhoto, updateName } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    const promise = [];
    setLoading(true);
    setError("");
    setRefresh(false);

    // if userName field is empty do not update userName
    if (userNameRef.current.value !== "") {
      setUsrName(userNameRef.current.value);
      updateName(userNameRef.current.value);
    }

    // If email doesn't exist then update
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
  };

  // Upload image file to data base
  const onFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();

    updatePhoto(fileUrl);
    setRefresh(true);
  };

  return (
    <>
      <div className='card-content'>
        <div className='bg-palette-cloud shadow-lg overflow-hidden w-3/4 max-w-sm mt-20 m-auto items-center rounded-md'>
          <form
            className='card flex flex-col m-auto items-center'
            onSubmit={onSubmit}
          >
            <div className='overflow-hidden w-48 h-48 rounded-md mt-5 grid grid-rows-1 grid-cols-1'>
              <img
                src={currentUser.photoURL}
                alt='profile_photo'
                className='object-cover w-48 h-48 row-start-1 col-start-1'
              />
              <label>
                <input
                  className='opacity-0 w-48 h-48 row-start-1 col-start-1 cursor-pointer'
                  type='file'
                  onChange={onFileChange}
                />
              </label>
              {refresh && (
                <span className='row-start-1 col-start-1 w-48 h-48 text-palette-cloud text-center bg-gray-600 bg-opacity-90 uppercase'>
                  <p className='mt-16'>Image Uploaded</p>
                  <p>Click "Save" </p>
                  <p>to refresh</p>
                </span>
              )}
            </div>
            <h3 className='profile-name my-3 text-xl font-medium text-gray-600'>
              {usrName ? usrName : currentUser.displayName}
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
