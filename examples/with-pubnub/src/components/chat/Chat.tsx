"use client";

import { cn } from "@/lib/utils";
import { type Channel, type Message, User } from "@pubnub/chat";
import { SendHorizontal } from "lucide-react";
import {
  type ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { RotatingLines } from "react-loader-spinner";
import Modal from "react-modal";
import MessageComponent from "./components/message";
import ChatSignIn from "./components/sign-in";
import { ChatContext, type ChatType } from "./context/ChatContext";

export const Chat = ({ playbackId }: { playbackId: string }) => {
  const {
    chatInstance,
    userInstance,
    channelInstance,
    createPubnubChannel,
    createPubnubUser,
  } = useContext(ChatContext) as ChatType;

  const [isBroadcaster, setIsBroadcaster] = useState(false);
  const [username, setUsername] = useState<string | undefined>();

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [storedUsers, setStoredUsers] = useState<Map<string, User>>(new Map());
  const [loading, setLoading] = useState(false);
  const [disconnectMessageStream, setDisconnectMessageStream] = useState<
    (() => void) | undefined
  >();
  const [disconnectPresenseStream, setDisconnectPresenseStream] = useState<
    (() => void) | undefined
  >();
  const [endTimetoken, setEndTimetoken] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Add states for flagged messages and users
  const [flaggedMessages, setFlaggedMessages] = useState<string[]>([]);
  const [flaggedUsers, setFlaggedUsers] = useState<string[]>([]);

  // Add states for banned users and modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bannedUsers, setBannedUsers] = useState<
    Array<{ ban: boolean; mute: boolean; userId: string }>
  >([]);

  const [isUserMuted, setMuteStatus] = useState(false);
  const [isUserBanned, setBanStatus] = useState(false);

  const [presenceCount, setPresenceCount] = useState<number>(0);

  // Store the input's value for chat message.
  const [inputMessage, setInputMessage] = useState<string>("");

  // If we are currently fetching history
  const [fetchingHistory, setFetchingHistory] = useState<boolean>(false);

  // Inside your component function
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatInstance) return;

    setLoading(window.location.pathname === "/" ? true : false);

    // Determine if the user is the broadcaster based on the URL path
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const broadcaster = path === "/";
      setIsBroadcaster(broadcaster);
      if (broadcaster) {
        setUsername("Admin");
      }
    }
  }, [chatInstance]);

  useEffect(() => {
    // Create or retrieve and instance of a Pubnub user object
    async function initUser() {
      if (!chatInstance || !username) return;
      await createPubnubUser(username);
    }
    initUser();
  }, [chatInstance, username, createPubnubUser]);

  useEffect(() => {
    // Create and instance of a PubNub channel
    async function initChannel() {
      if (!userInstance) return;
      await createPubnubChannel(playbackId);

      // Store the current user in the user cache
      const newStoredUsers = new Map(storedUsers);
      newStoredUsers.set(userInstance.id, userInstance);
    }

    initChannel();
  }, [playbackId, userInstance, storedUsers, createPubnubChannel]);

  useEffect(() => {
    // This will connect the message and presense stream
    async function initChat() {
      if (!channelInstance || !chatInstance) return;
      if (!loading) return;

      setLoading(false);

      // Join channel, able to listen to incoming messages
      const { disconnect: messageStream } = await channelInstance.join(
        (message: Message) => {
          // Cache the stored user if a new user has sent a message
          if (!storedUsers.has(message.userId)) {
            chatInstance?.getUser(message.userId).then((user) => {
              if (user != null) {
                setStoredUsers((users) => {
                  const updatedUsers = new Map(users);
                  updatedUsers.set(user.id, user);
                  return updatedUsers;
                });
              }
            });
          }
          // Callback function that adds incoming messages to the chatMessages state
          setChatMessages((prevMessages) => [...prevMessages, message]);
        },
      );

      // Join presence stream to listen when people hav joined the channel
      const presenceStream = await channelInstance.streamPresence(
        (userIds: string[]) => {
          setPresenceCount(userIds.length);
        },
      );

      setDisconnectMessageStream(() => messageStream);
      setDisconnectPresenseStream(() => presenceStream);

      // Listen for reporting, banning and muting events
      moderationListeners();
      // Fetch the history from the PubNub channel
      await fetchHistory(channelInstance);
      // Get the current restricted users in the channel if they are either muted or banned
      await getRestrictedUsers();

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }

    initChat();

    return () => {
      // This function will run when the component unmounts
      disconnectMessageStream?.(); // Disconnect the message stream on the channel
      disconnectPresenseStream?.(); // Disconnect the presense stream on the channel
    };
  }, [
    channelInstance,
    chatInstance,
    loading,
    storedUsers,
    disconnectMessageStream,
    disconnectPresenseStream,
  ]);

  /// Fetch history from the current channel
  /// Stroe all the current users in the stored users
  const fetchHistory = async (channel: Channel) => {
    if (!hasMore || fetchingHistory) return;
    setFetchingHistory(true);

    console.log("Fetching History");

    const history = await channel?.getHistory({
      count: 20,
      startTimetoken: endTimetoken,
    });

    setHasMore(history.isMore);
    if (history.messages.length !== 0) {
      // Collect all unique user IDs from the messages
      const uniqueUserIds = Array.from(
        new Set(history.messages.map((message) => message.userId)),
      );

      // Prepare a list of user IDs for which user details need to be fetched
      const userIdsToFetch = uniqueUserIds.filter(
        (userId) => !storedUsers.has(userId),
      );

      // Fetch details only for users not already in the cache
      const fetchUserDetailsPromises = userIdsToFetch.map(async (userId) => {
        const userDetails = (await chatInstance?.getUser(userId)) ?? new User();
        // Update the cache as soon as user details are fetched
        return userDetails;
      });

      // Wait for all the user details to be fetched and cached
      Promise.all(fetchUserDetailsPromises).then((users: User[]) => {
        const newStoredUsers = new Map(storedUsers);
        for (const user of users) {
          newStoredUsers.set(user.id, user);
        }
        setStoredUsers(newStoredUsers);

        const messages = history.messages;
        const messages_length = messages.length;

        // Offset the scroll position depending on how many messages are loaded in
        const scroll_offset = messages_length * 40;

        // Offset the scroll position
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = scroll_offset;
        }

        // Update chat messages with enriched data
        setChatMessages((prevMessages) => [...messages, ...prevMessages]);

        // Set the timetoken for the next fetch
        setEndTimetoken(messages[0].timetoken);
      });
    }

    setFetchingHistory(false);
  };

  /// Get all the banned users in the current channel
  const getRestrictedUsers = async () => {
    if (!channelInstance) return;
    try {
      const { restrictions } = await channelInstance.getUsersRestrictions();
      // Add the list of banned users to state
      setBannedUsers(restrictions);
    } catch (error) {
      console.error(`Failed to get restricted users: ${error}`);
    }
  };

  /// Listen to moderation events such as:
  /// Users to report misbehaving users to admin
  /// Admins to mute misbehaving users on channels
  /// Admins to ban misbehaving users from accessing the channel
  const moderationListeners = () => {
    if (!chatInstance) return;

    // Start listening for report events
    if (isBroadcaster) {
      // Listen to moderation events reported by "users" to the admin
      chatInstance.listenForEvents({
        channel: "PUBNUB_INTERNAL_ADMIN_CHANNEL",
        type: "report",
        callback: async (event) => {
          const messageTimeToken: string | null =
            event.payload?.reportedMessageTimetoken ?? null;
          const userID: string = event.payload.reportedUserId;

          // If there is a message timetoken in the payload then a message was reported
          // If there was no message timetoken then we can assume a user is reported
          if (messageTimeToken) {
            setFlaggedMessages((prevFlaggedMessages) => [
              ...prevFlaggedMessages,
              messageTimeToken ?? "",
            ]);
          } else {
            setFlaggedUsers((prevFlaggedUsers) => [
              ...prevFlaggedUsers,
              userID,
            ]);
          }
        },
      });
    } else {
      // Start listening to any moderation events that might effect your the "user" access
      // This only applies to the current user to check if you have been banned or muted
      chatInstance.listenForEvents({
        channel: chatInstance.currentUser.id,
        type: "moderation",
        callback: async (event) => {
          if (event.payload.restriction === "muted") {
            setMuteStatus(true);
          } else if (event.payload.restriction === "banned") {
            setBanStatus(true);
          } else if (event.payload.restricted === "lifted") {
            setBanStatus(false);
            setMuteStatus(false);
          }
        },
      });
    }
  };

  /// As a user you can report a message and the admin will receive this event when listening to the "PUBNUB_INTERNAL_ADMIN_CHANNEL" for moderation events
  const flagMessage = async (message: Message) => {
    if (isBroadcaster) {
      console.log("Admin cannot flag messages");
      return;
    }

    setFlaggedMessages([...flaggedMessages, message.timetoken]);

    // Report a message
    await message.report("Reported By User");
  };

  /// As a user you can report another user and the admin will receive this event when listening to the "PUBNUB_INTERNAL_ADMIN_CHANNEL" for moderation events
  const flagUser = async (userId: string) => {
    if (!chatInstance) return;
    if (isBroadcaster) {
      console.log("Admin cannot flag users");
      return;
    }

    setFlaggedUsers([...flaggedUsers, userId]);

    // Get User
    const user: User = (await chatInstance.getUser(userId)) ?? new User();

    // Report a user
    await user.report("Reported By User");
  };

  /// As a admin you can mute another user. If you are the user that has been muted you will receive this event by listening to your userId as a channel
  const muteUser = async (userId: string, mute: boolean) => {
    if (!channelInstance || !chatInstance) return;

    if (!isBroadcaster) {
      console.log("Only an Admin can mute users");
      return;
    }

    // After successfully muting the user, add to the bannedUsers state
    // We will include the ban property as 'false' since we're muting, not banning
    setBannedUsers((prevUsers) => {
      const userExists = prevUsers.find((user) => user.userId === userId);

      if (userExists)
        return prevUsers.map((user) =>
          user.userId === userId ? { ...user, ban: false, mute: mute } : user,
        );

      return [...prevUsers, { ban: false, mute: mute, userId }];
    });

    // Get User
    const user: User = (await chatInstance.getUser(userId)) ?? new User();

    // Mute/un-mute a user
    try {
      await channelInstance.setRestrictions(user, {
        ban: false,
        mute: mute,
        reason: "Muted/Un-muted by Admin",
      });
    } catch (error) {
      console.log("Error Muting User: ", error);
    }
  };

  /// As a admin you can ban another user. If you are the user that has been banned you will receive this event by listening to your userId as a channel
  const banUser = async (userId: string, ban: boolean) => {
    if (!chatInstance || !channelInstance) return;
    if (!isBroadcaster) {
      console.log("Only admin can ban users");
      return;
    }

    // Get current user's mute status
    const userRestrictions = bannedUsers.find((item) => item.userId === userId);
    const muteStatus = userRestrictions ? userRestrictions.mute : false;

    // After successfully banning the user, add to the bannedUsers state
    setBannedUsers((prevUsers) => {
      const userExists = prevUsers.find((user) => user.userId === userId);

      if (userExists)
        return prevUsers.map((user) =>
          user.userId === userId
            ? { ...user, ban: ban, mute: muteStatus }
            : user,
        );

      return [...prevUsers, { ban: ban, mute: muteStatus, userId }];
    });

    // Get User
    const user: User = (await chatInstance.getUser(userId)) ?? new User();

    // Ban/un-ban a user
    try {
      await channelInstance.setRestrictions(user, {
        ban: true,
        mute: true,
        reason: "Banned by Admin",
      });
    } catch (error) {
      console.log("Error Banning User: ", error);
    }
  };

  /// Handle changes to the chat input field
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  /// Handle the chat input field
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (channelInstance && inputMessage) {
      console.log("Sending text message");
      try {
        await channelInstance.sendText(inputMessage, {
          storeInHistory: true,
        });
      } catch (e) {
        console.log("Failed to send message");
      }
      setInputMessage("");
    }
  };

  /// Handle the scroll of the chat
  const handleScroll = async (e: React.UIEvent<HTMLElement>) => {
    const scrollTop = (e.target as HTMLElement).scrollTop;
    if (scrollTop === 0) {
      // Fetch more messages when scrolled to top
      if (channelInstance) {
        await fetchHistory(channelInstance);
      }
    }
  };

  // Function to handle name submission
  const handleNameSubmit = (name: string) => {
    if (name.length > 0) {
      setLoading(true);
      setUsername(name);
    }
  };

  // use the playback ID as a unique ID to set up the chat
  return (
    <div
      className={cn(
        "relative h-screen w-full flex flex-col px-3 py-4 mx-auto justify-between bg-white/10 rounded-sm",
        loading && "animate-pulse",
      )}
    >
      {!isBroadcaster && !username ? (
        <ChatSignIn submit={handleNameSubmit} />
      ) : (
        <>
          {isBroadcaster && (
            <div className="flex flex-row">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Admin Dashboard
              </button>
            </div>
          )}
          <span>Users: {presenceCount}</span>
          {isUserBanned ? (
            <div>You have been banned</div>
          ) : (
            <div
              className={cn(
                "h-full",
                isBroadcaster ? "pb-[115px]" : "pb-[90px]",
              )}
            >
              <span className="text-sm font-semibold">Stream chat</span>
              <span className="my-2 h-px w-full bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
              <div
                className="min-h-[300px] max-h-[450px] md:max-h-full flex-grow overflow-scroll overflow-y-auto my-2 space-y-2"
                onScroll={handleScroll}
                ref={chatContainerRef}
              >
                {fetchingHistory ? (
                  <div className="w-full h-20 flex justify-center items-center">
                    <RotatingLines width="40" strokeColor="grey" />
                  </div>
                ) : (
                  <div />
                )}
                {loading ? (
                  <div>
                    <div className="w-full h-10 animate-pulse bg-white/5 rounded-lg mt-2" />
                    <div className="w-full h-10 animate-pulse bg-white/5 rounded-lg mt-2" />
                    <div className="w-full h-10 animate-pulse bg-white/5 rounded-lg mt-2" />
                    <div className="w-full h-10 animate-pulse bg-white/5 rounded-lg mt-2" />
                  </div>
                ) : (
                  chatMessages.map((message) => {
                    // Check if the user is banned or muted
                    const bannedUser = bannedUsers.find(
                      (user) => user.userId === message.userId,
                    );

                    // If the broadcaster is viewing, count how often this message has been flagged
                    const flagCount = isBroadcaster
                      ? flaggedMessages.filter((id) => id === message.timetoken)
                          .length
                      : 0;

                    // Check if a user or a message is already flagged
                    const isUserFlagged = flaggedUsers.includes(message.userId);
                    const isMessageFlagged = flaggedMessages.includes(
                      message.timetoken,
                    );

                    return (
                      <MessageComponent
                        key={message.timetoken + message.userId}
                        timetoken={message.timetoken}
                        userId={message.userId}
                        username={storedUsers.get(message.userId)?.name ?? ""}
                        message={message}
                        isUserFlagged={isUserFlagged}
                        isMessageFlagged={isMessageFlagged}
                        isBroadcaster={isBroadcaster}
                        bannedUser={bannedUser}
                        flagCount={flagCount}
                        banUser={(userId) => banUser(userId, true)}
                        muteUser={(userId) => muteUser(userId, true)}
                        unBanUser={(userId) => banUser(userId, false)}
                        unMuteUser={(userId) => muteUser(userId, false)}
                        flagMessage={flagMessage}
                        flagUser={flagUser}
                      />
                    );
                  })
                )}
              </div>
            </div>
          )}
          {isUserMuted || isUserBanned ? (
            <div />
          ) : (
            <div className="absolute bottom-2 left-2 right-2">
              <label className="sr-only" htmlFor="message" />
              <form onSubmit={handleFormSubmit} className="w-full relative">
                <input
                  name="message"
                  className="flex h-9 pr-8 w-full rounded-md border border-white/30 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  value={inputMessage}
                  disabled={loading}
                  onChange={handleInputChange}
                />
                <div className="absolute bottom-0 right-2 top-0 flex w-5 items-center justify-center">
                  <button
                    className="hover:outline hover:outline-1 hover:outline-offset-1 hover:outline-white/40 rounded-full p-1 transition"
                    type="submit"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={{
              // Customizable styles
              overlay: {},
              content: {},
            }}
            ariaHideApp={false}
          >
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2
                id="restricted-users-title"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Restricted Users
              </h2>
              <div className="border-b border-gray-300 my-2" />
              {bannedUsers.map((user, index) => (
                <div
                  className="text-md font-medium text-gray-900"
                  key={user.userId}
                >
                  <p>{storedUsers.get(user.userId)?.name ?? ""}</p>
                  <p>Banned: {user.ban ? "Yes" : "No"}</p>
                  <p>Muted: {user.mute ? "Yes" : "No"}</p>
                  <div className="border-b border-gray-300 my-2" />
                </div>
              ))}
              <h2
                id="restricted-users-title"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Flagged Users
              </h2>
              <div className="border-b border-gray-300 my-2" />
              {Array.from(new Set(flaggedUsers))
                .sort(
                  (a, b) =>
                    flaggedUsers.filter((v) => v === b).length -
                    flaggedUsers.filter((v) => v === a).length,
                )
                .map((userId, index) => {
                  const user = bannedUsers.find(
                    (user) => user.userId === userId,
                  );
                  const flagCount = flaggedUsers.filter(
                    (id) => id === userId,
                  ).length;
                  return (
                    <div
                      className="text-md font-medium text-gray-900"
                      key={userId}
                    >
                      <p>
                        {storedUsers.get(userId)?.name ?? ""} (Flagged{" "}
                        {flagCount} times)
                      </p>
                      <p>Banned: {user?.ban ? "Yes" : "No"}</p>
                      <p>Muted: {user?.mute ? "Yes" : "No"}</p>
                      <div className="border-b border-gray-300 my-2" />
                    </div>
                  );
                })}
            </div>

            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2
                id="restricted-messages-title"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Flagged Messages
              </h2>
              <div className="border-b border-gray-300 my-2" />
              {Array.from(new Set(flaggedMessages))
                .sort(
                  (a, b) =>
                    flaggedMessages.filter((v) => v === b).length -
                    flaggedMessages.filter((v) => v === a).length,
                )
                .map((timetoken, index) => {
                  const message = chatMessages.find(
                    (message) => message.timetoken === timetoken,
                  );
                  const flagCount = flaggedMessages.filter(
                    (id) => id === timetoken,
                  ).length;
                  return (
                    message && (
                      <div
                        className="text-md font-medium text-gray-900"
                        key={timetoken}
                      >
                        <p>
                          {message.content.text} (Flagged {flagCount} times)
                        </p>
                        <div className="border-b border-gray-300 my-2" />
                      </div>
                    )
                  );
                })}
            </div>
            <div className="px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white ml-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-0 sm:mr-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};
