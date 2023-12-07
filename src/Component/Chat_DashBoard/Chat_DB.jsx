import React, { useState, useEffect, useContext } from "react";
import avatar from "../../assets/user2.png";
import sent from "../../assets/send.png";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { io } from "socket.io-client";
import { AuthContext } from "../../Providers/AuthProviders";

const Chat_DB = () => {
  const userId = localStorage.getItem("userID");
  const [user, setUser] = useState(JSON.stringify(userId));
  const [userDetails, setUserDetails] = useState([]);

  const [message, setMessage] = useState();
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const {
    currentConversation,
    setCurrentConversation,
    chat,
    setChat,
    messages,
    setMessages,
    convo,
    setConvo,
  } = useContext(AuthContext);
  console.log("MessagesChat: ", chat);
  console.log("MessagesUsers: ", users);
  // const { fetchMessages ,msg,setMsg} = useContext(AuthContext);

  //Socket_IO_Client
  //   useEffect(() => {
  //     setSocket(io("http://localhost:8080"));
  //   }, []);
  // //send to SocketServer
  //   useEffect(() => {
  //     console.log("Emitting 'addUser' event with userId:", userId);
  //     socket?.emit("addUser", userId);
  //     socket?.on("getUsers",Users=>{
  //       console.log('Active Users',Users);
  //     })
  //   }, [socket]);
  //   console.log("Socket : ",socket);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  // Send to SocketServer
  useEffect(() => {
    console.log("Emitting 'addUser' event with userId:", userId);
    socket?.emit("addUser", userId);

    socket?.on("getUsers", (Users) => {
      console.log("Active Users", Users);
    });

    socket?.on("getMessage", (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages, // Initialize to an empty array if undefined
          { user: data.user, message: data.message },
        ],
      }));
      console.log("Data:", data);
    });
  }, [socket]);

  const sendMessage = async (e) => {
    try {
      socket?.emit("sendMessage", {
        conversationId: messages?.conversationId,
        senderId: userId,
        message,
        receiverId: messages?.receiver?.receiverId,
      });
      const res = await fetch(`http://localhost:5000/chatApp/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: messages?.conversationId,
          senderId: userId,
          message,
          receiverId: messages?.receiver?.receiverId,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const resData = await res.json();
      console.log("resData :>>", resData);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `http://localhost:5000/providers/providersProfile?id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setUserDetails(resData);
    };
    fetchUser();
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await fetch(
  //       `http://localhost:5000/providers/providersProfile?id=${userId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const resData = await res.json();
  //     setUserDetails(resData);
  //   };
  //   fetchUser();
  // }, []);
  //From here new code will be start ...

  useEffect(() => {
    const fetchChat = async () => {
      const result = await fetch(
        `http://localhost:5000/chatApp/conversations/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resultData = await result.json();
      setChat(resultData);
      console.log("Fetched Chat:", resultData);
    };
    fetchChat();
  }, []);

  console.log("Chat", chat);

  // const [convo, setConvo] = useState([]);
  const FetchConversations = async (conversationId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/chatApp/conversations/${conversationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Make sure to await the result of res.json()
      const resultData = await res.json();

      console.log("Response Data:", resultData); // Log the response data
      setConvo(resultData);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      // Handle the error as needed, e.g., set an error state
    }
  };
  useEffect(() => {
    const conversationId = messages?.conversationId;
    FetchConversations(conversationId);
  }, []);

  console.log("Messages: ", messages);
  console.log("MessagesVal: ", messages.receiver);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/chatApp/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await res.json();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle the error as needed (e.g., show an error message to the user)
      }
    };
    fetchUsers();
  }, []);

  console.log(
    "Messages:",
    message,
    "conversationId",
    messages?.conversationId,
    "UserId : ",
    userId,
    "receiverId",
    messages?.receiver?.receiverId
  );

  useEffect(() => {
    console.log("Updated Messages State:", messages);
  }, []);

  const FetchMessages = async (conversationId, receiver) => {
    try {
      const url = `http://localhost:5000/chatApp/message/${conversationId}?senderId=${userId}&&receiverId=${receiver?.receiverId}`;
      console.log("Fetching from URL:", url);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const resultData = await res.json();

      setMessages({ messages: resultData, receiver, conversationId });

      console.log("Fetched Messages:", messages);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  console.log("currentConversation: ", currentConversation);

  console.log("currentConversation: ", currentConversation);
  return (
    <>
      <Navbar />
      <div className="w-screen max-h-max flex justify-center items-center ">
        {!(messages?.receiver?.name )&& (
          <div className="w-[25%] h-full bg-violet-200 rounded-lg  overflow-y-auto">
            {userDetails.map((conversation, index) => (
              <div key={index} className="flex justify-center my-6">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div className="ml-8 my-2 ">
                  <h3 className="text-xs">{conversation.user_fullname}</h3>
                  <p className="text-xs font-light">
                    {conversation.user_email}
                  </p>
                </div>
              </div>
            ))}
            <hr />

            <div>
              <div className=" w-full ">
                <div className="mr-9 text-center text-primary">Messages</div>

                {chat && chat.length > 0 ? (
                  chat.map(({ conversationId, user }, index) => (
                    <div
                      key={index}
                      className="flex justify-center my-6 border-b border-b-gray-300 overflow-y-auto "
                      onClick={async () => {
                        // const conversationId = CHAT?.conversationId;

                        if (conversationId) {
                          await FetchMessages(conversationId, user);
                        } else {
                          console.error("Invalid conversationId:", error);
                        }
                      }}
                    >
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                      </div>
                      <div className="ml-8 my-2">
                        {/* <h3 className="text-xs">{c.user.email.split("@")[0]}</h3> */}
                        <p className="text-xs font-semibold">{user?.name}</p>
                        <p className="text-xs font-semibold">{user?.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className=" text-center text-gray-500  mt-20 text-lg font-semibold">
                    No Conversations
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="w-[50%] h-screen border border-primary rounded-lg flex flex-col items-center ">
          <div className="w-[75%] bg-violet-200 h-[50px] mt-9 rounded-full flex items-center shadow-sm p-6  ">
            {messages?.receiver?.name && (
              <div className="flex justify-center   my-6 border-b border-b-gray-300 ml-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div className="ml-8 my-2">
                  <h3 className="text-xs">{messages?.receiver?.name}</h3>
                  <p className="text-xs font-semibold">
                    {messages?.receiver?.email}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="h-[75%] border  w-full overflow-scroll ">
            <div className="h-[1000px] px-10 py-14">
              {messages ? (
                messages.messages && messages.messages.length > 0 ? (
                  messages.messages.map(({ message, user = {} }, index) => (
                    <div
                      key={index}
                      className={`chat-bubble chat-bubble-primary chat-start max-w-[60%] h-[70px] sm:w-[100px] lg:w-[300px] rounded-b-lg ml-auto p-4 mb-6 ${
                        userId === user?.id
                          ? "text-white rounded-tr-lg bg-primary"
                          : "bg-secondary text-primary mr-40 rounded-b-lg rounded-tr-xl"
                      }`}
                    >
                      {message}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 mt-20 text-lg font-semibold">
                    No Messages
                  </div>
                )
              ) : (
                <div className="text-center text-gray-500 mt-20 text-lg font-semibold">
                  Loading Messages...
                </div>
              )}
            </div>
          </div>
          {messages?.receiver?.name && (
            <div className="ml-20 w-full flex cursor-pointer items-center">
              <input
                className={`w-[75%] lg:w-[500px] sm:w-[100px] p-2 rounded-xl text-md border-0 border-primary focus:ring-0 shadow-md outline-none  `}
                placeholder="Type Messages"
                value={message}
                onChange={async (e) => {
                  setMessage(e.target.value);
                  // console.log("Value after Click", message);
                }}
              />
              <div
                className={`ml-4 p-2 cursor-pointer bg-light rounded-full
                ${!message && "pointer-events-none "}`}
                onClick={async () => {
                  await sendMessage();
                  // console.log('Hello');
                }}
              >
                <img src={sent} alt="Sent" srcset="" height={20} width={20} />
              </div>{" "}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chat_DB;
