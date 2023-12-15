import { useEffect, useState } from "react";
import axios from "axios";
import "../message.css"; // Link to your CSS file
import { useAuthContext } from "./authentication/authHelpers.ts";
import Loader from "./components/loader.tsx";
import { Conversation, Message } from "../data-types/datatypes.ts";

interface MessengerProps {
  onMessageLinkClick?: () => void;
}

const MessengerPage = (props: MessengerProps) => {
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(
    {} as Conversation
  );
  const [isInConversation, setIsInCoversation] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:3000/conversation/conversation/userID/" + user._id)
      .then((res) => {
        console.log(res.data);
        setConversations(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props]);

  const handleSendMessage = () => {
    // send message to server
  };

  const handleCloseMessenger = () => {
    if (props.onMessageLinkClick) {
      props.onMessageLinkClick();
    }
  };

  function getUsernameOfConversation(conversation: Conversation) {
    let url = "http://localhost:3000/profile/profile/";
    if (conversation.userIDs[0] === user._id) {
      url += conversation.userIDs[1];
    } else {
      url += conversation.userIDs[0];
    }

    axios
      .get(url)
      .then((res) => {
        return res.data.profile.username;
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
                className="messenger-menu-item"
                onClick={() => {
                  setSelectedConversation(conversation);
                  setIsInCoversation(true);
                }}
              >
                <div className="messenger-menu-item-top-half">
                  <label className="messenger-menu-item-username">
                    {"" + getUsernameOfConversation(conversation)}
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
            }}
          >
            {"❮ Back"}
          </div>

          <div className="messenger-conversation">
            <label className="messenger-conversation-username">
              {"" + getUsernameOfConversation(selectedConversation)}
            </label>

            <div className="messenger-conversation-messages">
              {selectedConversation.messages.map((message: Message) => (
                <div
                  key={message._id}
                  className="messenger-conversation-message"
                >
                  <label className="messenger-conversation-message-sender">
                    {"sender"}
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
