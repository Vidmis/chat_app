import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { pathnames } from "../constants/location";
import { useAuth } from "./contexts/AuthContext";

const SignInLayout = ({ currentPathLogin, currentPathSignUp }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { login, signUp } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // Submit after user types login info
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      currentPathSignUp &&
      passwordRef.current.value !== passwordConfirmRef.current.value
    ) {
      return setError("Passwords do not match");
    }

    if (currentPathLogin) {
      try {
        setError("");
        setIsLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        history.push(pathnames.home);
      } catch {
        setError("Failed to login.");
      }
    } else if (currentPathSignUp) {
      try {
        setError("");
        setIsLoading(true);
        await signUp(emailRef.current.value, passwordRef.current.value);
        history.push(pathnames.home);
      } catch {
        setError("Failed to create an account");
      }
    }

    setIsLoading(false);
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
            className='inpt'
            type='text'
            placeholder='user@email.com'
            ref={emailRef}
            autoComplete='username'
          />
          <input
            className={`inpt ${error ? "ring-2 ring-palette-red" : ""}`}
            type='password'
            placeholder='password'
            ref={passwordRef}
            autoComplete='new-password'
          />
          {currentPathSignUp && (
            <span className='w-full h-full text-center items-center'>
              <input
                className={`inpt ${error ? "ring-2 ring-palette-red" : ""}`}
                type='password'
                placeholder='Password Confirm'
                autoComplete='new-password'
                ref={passwordConfirmRef}
              />

              <span className='flex flex-col-reverse'>
                <button
                  className='btn-orange mt-2'
                  type='submit'
                  disabled={isLoading}
                >
                  Create account
                </button>
                <Link to={pathnames.login} className='txt-hvr'>
                  Already have an account?
                </Link>
              </span>
            </span>
          )}

          {currentPathLogin && (
            <span className='flex flex-col-reverse'>
              <button className='btn-yellow' type='submit' disabled={isLoading}>
                Login
              </button>
              <Link to={pathnames.signup} className='txt-hvr'>
                Don't have an account? Create it!
              </Link>
            </span>
          )}
        </form>
      </div>
    </>
  );
};

export default SignInLayout;