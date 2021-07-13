import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className='mt-12 focus-within:login-box w-4/5 min-w-1/2 h-80 shadow-xl flex flex-col lg:flex-row m-auto rounded-md overflow-hidden max-w-4xl'>
        <div className='relative overflow-hidden design-content flex-2 bg-palette-sunset w-full h-full lg:flex'>
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
        <form className='login-content flex flex-3 flex-col justify-center items-center bg-palette-cloud'>
          <input
            className='transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-3/5 min-w-32 text-center py-1 px-2 focus:outline-none mt-4 focus:text-gray-600'
            type='text'
            placeholder='user@email.com'
          />
          <input
            className='transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-3/5 min-w-32 text-center py-1 px-2 my-5 focus:outline-none focus:text-gray-600'
            type='password'
            placeholder='password'
          />
          <span className='bg-palette-sunrise px-3 py-2 rounded-lg transform hover: text-palette-cloud mb-3 cursor-pointer'>
            <Link to='/chat'>Login</Link>
          </span>
          <span className='bg-palette-sunset px-3 py-2 rounded-lg text-palette-cloud mb-4 cursor-pointer'>
            Create account
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
