import { Link } from "react-router-dom";
import { useState } from "react";
import pepe from "../images/1kSxAdMB_400x400.jpg";
import sadPepe from "../images/10mzovF9_400x400.jpg";
import happyPepe from "../images/aWEW8KZ_460s.jpg";
import lovePepe from "../images/pepelove.png";
import angryPepe from "../images/pepeangry.jpg";
import thinkingPepe from "../images/pepethink.jpg";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { key: 1, username: "Agurku Vagis", text: "Yo bastards!" },
    { key: 2, username: "Bette", text: "What's up?" },
  ]);

  const submit = (e) => {
    e.preventDefault();
    const uniqueKey = Math.round(Date.now()/10);

    setMessages([
      ...messages,
      { key: uniqueKey, username: "Vidmis", text: input },
    ]);

    setInput("");
  };

  return (
    <>
      <div className='content flex flex-row bg-palette-cloud h-screen text-gray-800'>
        <div className='sidebar px-5 flex-1 border-r-2 border-opacity-40 border-palette-moon'>
          <div className='user-info flex flex-row space-x-2'>
            <Link to='/profile'>
              <img
                src={pepe}
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
          <div className='chats '>
            <ul>
              <li className='text-sm my-3'>
                <div className='flex flex-row space-x-3 transition hover:bg-palette-moon easy-in-out cursor-pointer rounded-md p-1'>
                  <img
                    className='h-10 w-10 rounded-full self-center'
                    src={sadPepe}
                    alt='profile_photo'
                  />
                  <span className='self-center'>
                    <p className='font-medium'>Margarita Power</p>
                    <p className='text-xs font-light'>
                      Something typed here...
                    </p>
                  </span>
                </div>
              </li>

              <li className='text-sm my-3'>
                <div className='flex flex-row space-x-3 transition hover:bg-palette-moon easy-in-out cursor-pointer rounded-md p-1'>
                  <img
                    className='h-10 w-10 rounded-full self-center'
                    src={happyPepe}
                    alt='profile_photo'
                  />
                  <span className='self-center'>
                    <p className='font-medium'>John Sand</p>
                    <p className='text-xs font-light'>
                      Something typed here...
                    </p>
                  </span>
                </div>
              </li>

              <li className='text-sm my-3'>
                <div className='flex flex-row space-x-3 transition hover:bg-palette-moon easy-in-out cursor-pointer bg-palette-sunrise rounded-md p-1'>
                  <img
                    className='h-10 w-10 rounded-full self-center'
                    src={lovePepe}
                    alt='profile_photo'
                  />
                  <span className='self-center'>
                    <p className='font-medium'>Agurku vagis</p>
                    <p className='text-xs font-light'>
                      Something typed here...
                    </p>
                  </span>
                </div>
              </li>

              <li className='text-sm my-3'>
                <div className='flex flex-row space-x-3 transition hover:bg-palette-moon easy-in-out cursor-pointer rounded-md p-1'>
                  <img
                    className='h-10 w-10 rounded-full self-center'
                    src={angryPepe}
                    alt='profile_photo'
                  />
                  <span className='self-center'>
                    <p className='font-medium'>Millhouse Ford</p>
                    <p className='text-xs font-light'>
                      Something typed here...
                    </p>
                  </span>
                </div>
              </li>

              <li className='text-sm my-3'>
                <div className='flex flex-row space-x-3 transition hover:bg-palette-moon easy-in-out cursor-pointer rounded-md p-1'>
                  <img
                    className='h-10 w-10 rounded-full self-center'
                    src={thinkingPepe}
                    alt='profile_photo'
                  />
                  <span className='self-center'>
                    <p className='font-medium'>Empty Man</p>
                    <p className='text-xs font-light'>
                      Something typed here...
                    </p>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <main className='main-window flex-3 pt-5 relative'>
          <div className='user-content flex flex-row space-x-2 px-5 pb-5 border-b-2 border-palette-moon border-opacity-40 w-full'>
            <img
              className='h-12 w-12 rounded-full self-center'
              src={lovePepe}
              alt='profile_photo'
            />
            <h3 className='selected-chat self-center font-medium text-lg'>
              Agurku Vagis
            </h3>
          </div>

          <div className='chat-window mx-5 mt-5 grid justify-items-stretch text-palette-cloud'>
            {messages.map((m) => (
              <span
                key={m.key}
                className='selected-messages justify-self-end bg-palette-sunset px-3 py-1 rounded-2xl my-1'
              >
                {m.text}
              </span>
            ))}

            <span className='user-messages justify-self-start bg-palette-moon px-3 py-1 rounded-full my-1'>
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
    </>
  );
};

export default Chat;
