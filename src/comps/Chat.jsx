import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";

const Chat = () => {
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const [messages, setMessages] = useState([{text: ''}]);
  const { data, isPending } = useFetch(
    "https://api.jsonbin.io/b/60f7366f99892a4ae9a6b026/1"
  );

  // if (data) {
  //   const someData = data.users;
  //   fetch("https://api.jsonbin.io/b/60f7366f99892a4ae9a6b026/", {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "secret-key":
  //         "$2b$10$6EJmnPE5i2hVJdX/UR/rRe.mwWL416ML/DgiIeS4QUVCNtQLp7NG.",
  //       versioning: false,
  //     },
  //     body: JSON.stringify({
  //       users: [
  //         ...someData,
  //         {
  //           id: 6,
  //           firstName: "Vidmis",
  //           lastName: "G",
  //           profilePhoto:
  //             "https://i.kym-cdn.com/photos/images/newsfeed/002/130/626/591.png",
  //           messages: messages,
  //         },
  //       ],
  //     }),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // }

  const photo = () => {
    let photoUrl;
    if (isPending) {
      console.log("Data is loading");
    } else {
      photoUrl = data.users[0].profilePhoto;
    }
    return photoUrl;
  };

  const submit = (e) => {
    e.preventDefault();
    const uniqueKey = Math.round(Date.now() / 10);

    setMessages([
      ...messages, {id: uniqueKey, text: input}
    ]);

    setInput("");
  };

  return (
    <>
      {isPending && (
        <div className='content bg-palette-cloud h-screen w-full text-gray-800 text-center'>
          <h3 className='pt-14 text-xl font-semibold'>
            Loading chat screen...
          </h3>
        </div>
      )}
      {data && (
        <div className='content flex flex-row bg-palette-cloud h-screen text-gray-800'>
          <div className='sidebar px-5 border-r-2 border-opacity-40 border-palette-moon w-284'>
            <div className='user-info flex flex-row space-x-2'>
              <Link to='/profile'>
                <img
                  src={photo()}
                  className='w-12 h-12 m-2 rounded-full self-center'
                  alt='profile_photo'
                />
              </Link>
              <h2 className='user-name text-xl self-center m-2 font-medium'>
                Bette Random
              </h2>
            </div>
            <input
              className='transition duration-150 ease-in-out font-medium focus:shadow-md focus:ring-2 focus:ring-palette-teal text-palette-moon rounded-md no-underline w-48 text-left py-1 px-2 focus:outline-none my-4 focus:text-gray-600'
              type='text'
              placeholder='Search chats'
            />
            <div className='chats'>
              <ul>
                {data.users.map((user) => (
                  <li
                    className='text-sm my-3'
                    key={user.id}
                    onClick={() => setSelectedChat(user)}
                  >
                    <div
                      className={`flex flex-row space-x-3 transition hover:bg-palette-sunset easy-in-out cursor-pointer rounded-md p-1 ${
                        selectedChat === user
                          ? "bg-palette-sunset text-palette-cloud"
                          : ""
                      }`}
                    >
                      <img
                        className='h-10 w-10 rounded-full self-center'
                        src={user.profilePhoto}
                        alt='profile_photo'
                      />
                      <span className='self-center'>
                        <h4 className='font-medium'>
                          {user.firstName + " " + user.lastName}
                        </h4>
                        <p className='text-xs font-light truncate max-w-164'>
                          {user.messages.text}
                        </p>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <main className='main-window flex-3 pt-5 relative'>
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
