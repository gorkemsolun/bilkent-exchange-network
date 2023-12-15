import { useEffect, useState } from "react";
import axios from "axios";
import "../message.css"; // Link to your CSS file
import { useAuthContext } from "./authentication/authHelpers.ts";
import { Conversation, Message } from "../data-types/datatypes.ts";

interface MessengerProps {
  onMessageLinkClick?: () => void;
}

const MessengerPage = (props: MessengerProps) => {
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState([] as Conversation[]);
  const [selectedConversation, setSelectedConversation] = useState(
    {} as Conversation
  );
  const [isInConversation, setIsInCoversation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:3000/conversation/conversation/userID/" + user._id)
      .then((res) => {
        const conversationsWithUsernames = res.data.map(
          (conversation: Conversation) => {
            return {
              ...conversation,
              username: "Loading...",
            };
          }
        );
        setConversations(conversationsWithUsernames);

        // Fetch and update usernames for each conversation
        conversationsWithUsernames.forEach((conversation: Conversation) => {
          let url = "http://localhost:3000/profile/profile/";
          const otherUserID =
            conversation.userIDs[0] === user._id
              ? conversation.userIDs[1]
              : conversation.userIDs[0];

          url += otherUserID;

          axios
            .get(url)
            .then((res) => {
              setConversations((prevConversations) => {
                const updatedConversations = [...prevConversations];
                const index = updatedConversations.findIndex(
                  (conv) => conv._id === conversation._id
                );
                if (index !== -1) {
                  updatedConversations[index].username =
                    res.data.profile.username;
                }
                return updatedConversations;
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props]);

  const handleSendMessage = () => {
    const newMessage: Message = {
      userID: user._id,
      message: messageInput,
      createdAt: new Date(),
    };

    const updatedConversation: Conversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
    };

    selectedConversation.messages = updatedConversation.messages;

    axios
      .put(
        "http://localhost:3000/conversation/conversation/conversationID/" +
          selectedConversation._id,
        updatedConversation
      )
      .then((res) => {
        setMessageInput("");
      })
      .catch((err) => {
        console.log(
          "http://localhost:3000/conversation/conversationID/" +
            selectedConversation._id
        );
        console.error("Error sending message:", err);
      });
  };

  const handleCloseMessenger = () => {
    if (props.onMessageLinkClick) {
      props.onMessageLinkClick();
    }
  };

  function getLastMessageOfConversation(messages: Message[]) {
    if (messages.length === 0) {
      return "";
    }
    return messages[messages.length - 1].message;
  }

  return (
    <div className="messenger-container">
      <div className="messenger-close-button" onClick={handleCloseMessenger}>
        {"❯"}
      </div>

      {!isInConversation ? (
        <div className="messenger-menu-container">
          <div className="messenger-menu-top-text">Conversations</div>
          <div className="messenger-menu">
            {conversations.map((conversation: Conversation) => (
              <div
                key={conversation._id}
                className="messenger-menu-item"
                onClick={() => {
                  setSelectedConversation(conversation);
                  setIsInCoversation(true);
                }}
              >
                <div className="messenger-menu-item-top-half">
                  <label className="messenger-menu-item-username">
                    {"" + conversation.username}
                  </label>
                  <label className="messenger-menu-item-date">
                    {"" +
                      conversation.updatedAt?.toString().slice(11, 16) +
                      " " +
                      conversation.updatedAt?.toString().slice(0, 10)}
                  </label>
                </div>
                <div className="messenger-menu-item-bottom-half">
                  <label className="messenger-menu-item-last-message">
                    {getLastMessageOfConversation(conversation.messages)
                      .length > 40
                      ? getLastMessageOfConversation(
                          conversation.messages
                        ).slice(0, 40) + "..."
                      : getLastMessageOfConversation(conversation.messages)}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="messenger-conversation-container">
          <div
            className="messenger-conversation-back-button"
            onClick={() => {
              setIsInCoversation(false);
              setSelectedConversation({} as Conversation);
              setMessageInput("");
            }}
          >
            {"❮ Back"}
          </div>

          <div className="messenger-conversation">
            <label className="messenger-conversation-username">
              {"" + selectedConversation.username}
            </label>

            <div className="messenger-conversation-messages">
              {selectedConversation.messages.map((message: Message) => (
                <div
                  key={message._id}
                  className={`messenger-conversation-message ${
                    message.userID === user._id ? "outgoing" : "incoming"
                  }`}
                >
                  <label className="messenger-conversation-message-sender">
                    {message.userID === user._id
                      ? "You"
                      : selectedConversation.username}
                  </label>
                  <p className="messenger-conversation-message-content">
                    {message.message}
                  </p>
                </div>
              ))}
            </div>

            <div className="messenger-conversation-input-container">
              <textarea
                className="messenger-conversation-input"
                placeholder="Type your message..."
                value={messageInput}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent the default behavior of adding a new line
                    handleSendMessage(); // Call your function here
                  }
                }}
              />
              <button
                className="messenger-conversation-send-button"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessengerPage;
