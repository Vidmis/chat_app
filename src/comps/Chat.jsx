import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import app from "../firestore/config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "./contexts/AuthContext";

const db = app.firestore();

const Chat = ({ setUser }) => {
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const [messages, setMessages] = useState([{ text: "" }]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const { logout } = useAuth();
  // const { data, isPending } = useFetch(
  //   "https://api.jsonbin.io/b/60f7366f99892a4ae9a6b026/1"
  // );

  // Initialize collection
  const ref = db.collection("chats");
  const query = ref.orderBy("createdAt").limit(25);
  const [messagess] = useCollectionData(query, { idField: "id" });

  // ref.get().then((snapshot) => {
  //   snapshot.docs.forEach((doc) => {
  //     console.log(doc.data());
  //     // setData(doc.data());
  //   });
  // });

  console.log("This is data hook", data);

  const getChats = () => {
    setIsLoading(true);
    ref.get().then((snapshot) => {
      const chats = snapshot.docs.map((doc) => doc.data());
      console.log("This is chats variable", chats);

      setData(chats);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getChats();
  }, []);

  // const photo = () => {
  //   let photoUrl;
  //   if (isLoading) {
  //     console.log("Data is loading");
  //   } else {
  //     photoUrl = data.users[0].profilePhoto;
  //   }
  //   return photoUrl;
  // };

  const submit = (e) => {
    e.preventDefault();
    const uniqueKey = Math.round(Date.now() / 10);

    setMessages([...messages, { id: uniqueKey, text: input }]);

    setInput("");
  };

  const handleLogOut = async() => {
    try {
      await logout();
      history.push('/login');
    } catch {
      console.log("Failed to logout");
    }
  };

  return (
    <>
      {isLoading && (
        <div className='content bg-palette-cloud h-screen w-full text-gray-800 text-center'>
          <h3 className='pt-14 text-xl font-semibold'>
            Loading chat screen...
          </h3>
        </div>
      )}
      {data && (
        <div className='content flex flex-row bg-palette-cloud h-screen text-gray-800'>
          <div className='sidebar px-5 border-r-2 border-opacity-40 border-palette-moon w-284'>
            {/* Loged in user top left info */}
            <div className='user-info flex justify-between flex-row space-x-2'>
              <span className='flex felx-row'>
                <Link to='/profile'>
                  <img
                    src='https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png'
                    className='w-12 h-12 m-2 rounded-full self-center'
                    alt='profile_photo'
                  />
                </Link>
                <h2 className='user-name text-xl self-center m-2 font-medium'>
                  Bette
                </h2>
              </span>

              {/* Sign out button */}
              <span
                className='bg-palette-red px-3 py-2 m-3 left-2 rounded-lg text-palette-cloud mb-3 cursor-pointer self-center'
                onClick={handleLogOut}
              >
                {/* <Link to='/chat'>Login</Link> */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                  />
                </svg>
              </span>
            </div>

            {/* SearchBox for chats/users */}
            <input
              className='transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-48 text-left py-1 px-2 focus:outline-none my-4 focus:text-gray-600'
              type='text'
              placeholder='Search chats'
            />

            {/* Left side, users sidebar */}
            <div className='chats'>
              <ul>
                {data.map((chat) => (
                  <li
                    className='text-sm my-3'
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div
                      className={`flex flex-row space-x-3 transition hover:bg-palette-sunset easy-in-out cursor-pointer rounded-md p-1 ${
                        selectedChat === chat
                          ? "bg-palette-sunset text-palette-cloud"
                          : ""
                      }`}
                    >
                      <img
                        className='h-10 w-10 rounded-full self-center'
                        src={chat.profilePhoto}
                        alt='profile_photo'
                      />
                      <span className='self-center'>
                        <h4 className='font-medium'>
                          {chat.firstName + " " + chat.lastName}
                        </h4>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <main className='main-window flex-3 pt-5 relative'>
            {/* Top bar with selected user info */}
            <div className='user-content flex flex-row space-x-2 px-5 pb-5 border-b-2 border-palette-moon border-opacity-40 w-full'>
              <img
                className='h-12 w-12 rounded-full self-center'
                src={selectedChat.profilePhoto}
                alt='profile_photo'
              />
              <h3 className='selected-chat self-center font-medium text-lg'>
                Agurku Vagis
              </h3>
            </div>

            {/* Chat/messages content */}
            <div className='chat-window mx-5 mt-5 grid justify-items-stretch text-palette-cloud'>
              {selectedChat &&
                selectedChat.messages.map((message) => (
                  <span className='selected-messages justify-self-start bg-palette-moon px-3 py-1 rounded-2xl my-1'>
                    {message}
                  </span>
                ))}

              <span className='user-messages justify-self-end bg-palette-sunset px-3 py-1 rounded-2xl my-1'>
                Hello, mate!
              </span>
            </div>

            {/* Input for typing and sending messages in chat */}
            <form className='flex bottom-2 absolute w-full' onSubmit={submit}>
              <input
                className='transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon focus:text-gray-600 rounded-2xl no-underline text-left py-1 px-3 focus:outline-none mx-5 flex-1 min-w-0'
                type='text'
                placeholder='Type message'
                name='messageInput'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type='submit'
                className='rounded-2xl px-2 py-1 mr-5 bg-palette-sunrise text-palette-cloud'
              >
                Send
              </button>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default Chat;
