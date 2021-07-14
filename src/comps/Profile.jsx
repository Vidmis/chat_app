import pepe from "../images/1kSxAdMB_400x400.jpg";

const Profile = () => {
  return (
    <>
      <div className='card-content'>
        <div className='bg-palette-cloud shadow-lg overflow-hidden w-2/5 mt-20 m-auto items-center rounded-md'>
          <form className='card flex flex-col m-auto items-center'>
            <img
              src={pepe}
              alt='profile_photo'
              className='w-48 h-48 rounded-md mt-5'
            />
            <h3 className='profile-name my-3 text-xl font-medium text-gray-600'>Bette Random</h3>
            <input
              className='transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-3/5 min-w-32 text-center py-1 px-2 focus:outline-none mt-4 focus:text-gray-600'
              type='text'
              placeholder='Name'
            />
            <input
              className='transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-3/5 min-w-32 text-center py-1 px-2 focus:outline-none mt-4 focus:text-gray-600'
              type='text'
              placeholder='Email'
            />
            <div className='flex flex-row space-x-4 my-5'>
              <span className='bg-palette-sunrise px-3 py-2 rounded-lg text-palette-cloud mb-3 cursor-pointer'>
                Save
              </span>
              <span className='bg-palette-red px-3 py-2 rounded-lg text-palette-cloud mb-3 cursor-pointer'>
                Cancel
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
