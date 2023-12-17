import axios from "axios";
import { useEffect, useState } from "react";
import {
  conversationUrl,
  defaultConversation,
  profileUrl,
} from "../../data-types/constants.ts";
import {
  Conversation,
  Message,
  UserContextType,
} from "../../data-types/datatypes.ts";
import { MessengerProps } from "../../data-types/props.ts";
import { useAuthContext } from "../authentication/AuthHelpers.ts";
import ErrorModal from "../components/ErrorModal.tsx";

export default function Messenger(props: MessengerProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(props.selectedConversation || defaultConversation);
  const [isInConversation, setIsInCoversation] = useState<boolean>(
    selectedConversation.userIDs !== undefined || false
  );
  const [messageInput, setMessageInput] = useState<string>("");
  const user = (useAuthContext() as unknown as UserContextType).user;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    setSelectedConversation(props.selectedConversation || defaultConversation);
    setIsInCoversation(selectedConversation.createdAt !== undefined || false);
  }, [props.selectedConversation]);
  // props is not a dependency, This should be checked NEEDS TO BE CONTROLLED

  useEffect(() => {
    axios
      .get(conversationUrl + "/userID/" + user?._id)
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
          let url = profileUrl + "/";
          const otherUserID =
            conversation.userIDs[0] === user?._id
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
                if (index !== -1 && res.data.profile) {
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
      });
  }, [props.onClick]);

  const handleSendMessage = () => {
    const newMessage: Message = {
      userID: user?._id as string,
      message: messageInput,
      createdAt: new Date().toLocaleString("en-US", {
        timeZone: "Europe/Istanbul",
      }),
    };

    const updatedConversation: Conversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
    };

    selectedConversation.messages = updatedConversation.messages;

    axios
      .put(
        conversationUrl + "/conversationID/" + selectedConversation._id,
        updatedConversation
      )
      .then(() => {
        setMessageInput("");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const handleCloseMessenger = () => {
    if (props.onClick) {
      props.onClick();
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
              {selectedConversation.messages?.map((message: Message) => (
                <div
                  key={message._id}
                  className={`messenger-conversation-message ${
                    message.userID === user?._id ? "outgoing" : "incoming"
                  }`}
                >
                  <div className="messenger-conversation-message-top-half">
                    <label className="messenger-conversation-message-sender">
                      {message.userID === user?._id
                        ? "You"
                        : selectedConversation.username}
                    </label>
                    <label className="messenger-conversation-message-date">
                      {"" +
                        message.createdAt?.toString().slice(11, 16) +
                        " " +
                        message.createdAt?.toString().slice(0, 10)}
                    </label>
                  </div>
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
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}
    </div>
  );
}
