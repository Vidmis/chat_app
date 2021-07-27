import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  // Submit after user types login info
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError("Failed to login.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className='mt-12 focus-within:login-box w-4/5 min-w-1/2 h-96 shadow-xl flex flex-col lg:flex-row m-auto rounded-md overflow-hidden max-w-4xl'>
        <div className='design-content relative overflow-hidden flex-2 bg-palette-sunset w-full h-full lg:flex'>
          <div className='w-full relative'>
            <div className='figure-1 py-10 px-24 rounded-l-full bg-palette-sunrise absolute sm:flex lg:bottom-20 -right-16 -bottom-32 transform rotate-45'></div>
            <div className='figure-2 py-10 px-24 rounded-l-full bg-palette-sunrise absolute hidden sm:flex lg:-bottom-5 right-10 -bottom-52 transform rotate-45'></div>
            <div className='figure-3 py-8 px-20 rounded-r-full bg-palette-sunrise absolute hidden sm:flex bottom-20 -left-20 transform rotate-45'></div>
            <div className='figure-4 py-10 sm:py-20 px-28 sm:px-32 rounded-r-full bg-palette-sunrise absolute sm:flex top-0 sm:top-0 -left-24 sm:-left-12 transform rotate-45'></div>
            <div className='figure-5 py-8 px-20 rounded-r-full bg-palette-sunrise absolute hidden sm:flex -top-10 left-32 transform rotate-45'></div>
          </div>
          <h1 className='text-palette-cloud w-full top-2/5 text-3xl m-auto text-center absolute'>
            Chat App
          </h1>
        </div>
        <form
          className='login-content flex flex-3 flex-col justify-center items-center bg-palette-cloud'
          onSubmit={handleSubmit}
        >
          <input
            className='transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-3/5 min-w-32 text-center py-1 my-2 focus:outline-nonefocus:text-gray-600'
            type='text'
            placeholder='user@email.com'
            ref={emailRef}
          />
          <input
            className={`transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-3/5 min-w-32 text-center py-1 px-2 my-4 focus:outline-none focus:text-gray-600 ${
              error ? "ring-2 ring-palette-red" : ""
            }`}
            type='password'
            placeholder='password'
            ref={passwordRef}
          />
          <span className='flex flex-col-reverse'>
            <button
              className='bg-palette-sunrise px-3 py-2 order-1 rounded-lg text-palette-cloud my-3 cursor-pointer self-center hover:bg-yellow-300 transition ease-in-out duration-300' 
              type='submit'
              disabled={loading}
            >
              Login
            </button>
            <Link to='/signup' className='text-gray-500 my-2 hover:text-palette-teal transition ease-in-out duration-300'>
              Don't have an account? Create it!
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Signup;
