import { Link, useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import app from "../firestore/config";
import firebase from "firebase/app";
import { useAuth } from "./contexts/AuthContext";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useFetch from "../useFetch";
import { pathnames } from "../constants/location";

const db = app.firestore();

const Chat = () => {
  const history = useHistory();
  const { logout, currentUser } = useAuth();
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dummy = useRef();
  const { data, isLoading } = useFetch();

  // Initialize messages collection
  const messagesRef = db.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(1000);
  const [messages] = useCollectionData(query, { idField: "id" });

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (selectedChat && input.trim() !== "") {
      const uniqueKey = Math.round(Date.now() / 10);
      messagesRef
        .add({
          id: uniqueKey,
          senderId: currentUser.uid,
          sender: currentUser.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          text: input.trim(),
          sentTo: selectedChat.email,
          hasRead: false,
        })
        .then
        // dummy.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        ()
        .catch((err) => console.log(err));
    }
    // Scroll to chat bottom after submiting message
    dummy.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    setInput("");
  };

  useEffect(() => {
    messagesRef.get().then((snap) => {
      snap.docs.forEach((doc, index) => {
        const msg = doc.data();

        if (
          msg.sentTo === currentUser.email &&
          !msg.hasRead &&
          selectedChat.email === msg.sender
        ) {
          messagesRef.doc(doc.id).update({ hasRead: true });
        }
      });

    });

  }, [currentUser.email, messagesRef, selectedChat.email]);

  // Show popup when user sends new message
  const handlePopup = (chatUsr) => {
    return messages?.some(({ sentTo, sender, hasRead }) => {
      if (currentUser.email === sentTo && chatUsr === sender && !hasRead) {
        return true;
      }
      return false;
    });
  };


  // Set selected chat
  const onChatSelect = (usr) => {
    setSelectedChat(usr);
  };

  // Scroll to chat bottom after another user sent message to current user
  if (messages && selectedChat) {
    dummy.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }

  // Logout from current user and go back to Login page
  const handleLogOut = async () => {
    try {
      await logout();
      history.push(pathnames.login);
    } catch {
      console.log("Failed to logout");
    }
  };

  return (
    <>
      {/* Wait till data is loaded and then render the chat page view */}
      {isLoading && (
        <div className='content bg-palette-cloud h-screen w-full text-gray-800 text-center'>
          <h3 className='pt-14 text-xl font-semibold'>
            Loading chat screen...
          </h3>
        </div>
      )}
      {data && (
        <div className='content flex flex-row bg-palette-cloud h-screen text-gray-800'>
          <div className='sidebar px-5 border-r-2 border-opacity-40 border-palette-moon w-36 md:w-284'>
            {/* Loged in user top left info */}
            <div className='user-info flex md:justify-between flex-row space-x-2 w-28 md:w-full'>
              <span className='flex felx-row'>
                <Link to='/profile'>
                  <img
                    src={currentUser.photoURL}
                    className='object-cover w-12 h-12 m-2 rounded-full self-center'
                    alt='usrPhoto'
                  />
                </Link>
                <h2 className='user-name text-xl self-center m-2 font-medium hidden md:block'>
                  {currentUser.displayName}
                </h2>
              </span>

              {/* Sign out button */}
              <span className='btn-red' onClick={handleLogOut}>
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
              className='inpt'
              type='text'
              placeholder='Search chats'
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />

            {/* Left side, users sidebar */}
            <div className='flex h-3/5 md:h-5/6'>
              <div className='chats overflow-hidden w-full flex-grow'>
                <ul className='overflow-y-auto h-full '>
                  {/* Search Filter and usernames in left side bar */}
                  {/* eslint-disable-next-line array-callback-return */}
                  {data
                    ?.filter((val) => {
                      if (
                        searchTerm === "" ||
                        val.userName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                      return null;
                    })
                    .map((chat) =>
                      chat.uid !== currentUser.uid ? (
                        <li
                          className={`text-sm my-3 font-flow grid rounded-md`}
                          key={chat.id}
                          onClick={() => onChatSelect(chat)}
                        >
                          <div
                            className={`flex flex-row space-x-3 transition hover:bg-palette-sunset easy-in-out cursor-pointer rounded-md p-1 ${
                              selectedChat.uid === chat.uid
                                ? "bg-palette-sunset text-palette-cloud"
                                : ""
                            }
                            ${
                              handlePopup(chat.email)
                                ? "bg-palette-sunrise text-palette-cloud"
                                : ""
                            }
                            `}
                          >
                            <img
                              className='object-cover h-10 w-10 rounded-full self-center'
                              src={chat.profilePhoto}
                              alt='usrPhoto'
                            />
                            <span className='self-center hidden md:block'>
                              <h4 className='font-medium '>{chat.userName}</h4>
                            </span>
                          </div>
                        </li>
                      ) : (
                        <span className='hidden w-0 h-0' key={chat.id}></span>
                      )
                    )}
                </ul>
              </div>
            </div>
          </div>

          {/* Main chat window with messages and messages input */}
          <main className='main-window flex flex-col space-y-2 pt-5 w-full'>
            {/* Top bar with selected user info */}
            <div className='user-content flex flex-row space-x-2 pb-2 px-5 border-b-2 border-palette-moon border-opacity-40 w-full overflow-y-scroll flex-shrink-0 h-16'>
              <img
                className='object-cover h-12 w-12 rounded-full self-center'
                src={
                  selectedChat
                    ? selectedChat.profilePhoto
                    : currentUser.photoURL
                }
                alt='usrPhoto'
              />
              <h3 className='selected-chat self-center font-medium text-lg'>
                {selectedChat ? selectedChat.userName : currentUser.displayName}
              </h3>
            </div>

            {/* Chat/messages content */}
            <div className='overflow-hidden w-full flex-grow'>
              <div className='overflow-y-auto h-full border-b-2 border-palette-moon border-opacity-40'>
                <div className='text-content chat-window mx-5 mt-5 grid justify-items-stretch text-palette-cloud font-flow'>
                  {messages?.map((msg) =>
                    // Filter out messages
                    (selectedChat.email === msg.sentTo &&
                      currentUser.email === msg.sender) ||
                    (currentUser.email === msg.sentTo &&
                      selectedChat.email === msg.sender) ? (
                      <span
                        className={`selected-msg px-3 py-1 rounded-2xl my-1 ${
                          currentUser.email === msg.sentTo &&
                          selectedChat.email === msg.sender
                            ? "bg-palette-moon justify-self-start"
                            : "bg-palette-sunset justify-self-end"
                        }`}
                        key={msg.id}
                      >
                        {msg.text}
                      </span>
                    ) : (
                      <span key={msg.id} className='w-0 h-0 opacity-0'></span>
                    )
                  )}
                  <span ref={dummy} className='h-10 w-10 opacity-0'></span>
                </div>
              </div>
            </div>

            {/* Input for typing and sending messages in chat */}
            <form
              className='flex mb-5 w-full p-3 flex-shrink-0'
              onSubmit={handleSendMessage}
            >
              <input
                className='inpt-chat'
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
