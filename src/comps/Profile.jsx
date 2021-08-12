import { Link, useHistory } from "react-router-dom";
import app from "../firestore/config";
import { useAuth } from "./contexts/AuthContext";
import { useRef, useState } from "react";
import { pathnames } from "../constants/location";

const Profile = () => {
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState("");
  const [usrName, setUsrName] = useState("");
  const userNameRef = useRef();
  const emailRef = useRef("");
  const history = useHistory();
  const { currentUser, updateEmail, updatePhoto, updateName } = useAuth();
  const [image, setImage] = useState(currentUser.photoURL);

  const onSubmit = async (e) => {
    e.preventDefault();

    const promise = [];
    setIsLoading(true);
    setError("");

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
        history.push(pathnames.home);
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setIsLoading(false);
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
    setImage(fileUrl);
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
                src={image}
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
            </div>
            <h3 className='profile-name my-3 text-xl font-medium text-gray-600'>
              {usrName ? usrName : currentUser.displayName}
            </h3>

            <input
              className='inpt'
              type='text'
              placeholder='Name'
              ref={userNameRef}
            />
            <input
              className={`inpt ${error ? "ring-2 ring-palette-red" : ""}`}
              type='text'
              placeholder='Email'
              ref={emailRef}
            />
            <div className='flex flex-row space-x-4 my-5'>
              <button type='submit' disabled={isloading} className='btn-yellow'>
                Save
              </button>
              <Link
                className='btn-red'
                to={pathnames.home}
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
