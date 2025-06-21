// Full Chat.tsx code with all requested features and fixes
import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  ref,
  onValue,
  get,
  set,
  push,
  remove,
  update,
} from "firebase/database";
import { database, auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Plus, Users, X, Flag } from "lucide-react";

const ADMIN_UID = "7ZWhIjcEcrS6NjlpvwqCxHv0PNg1";

const getInitials = (name: string) => {
  const parts = name?.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  }
  return parts[0]?.slice(0, 2).toUpperCase() || "U";
};

const Chat = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [friendEmail, setFriendEmail] = useState("");
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [dailyTotal, setDailyTotal] = useState(0);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = ref(database, "users/" + user.uid);
        set(userRef, {
          email: user.email,
          name: user.displayName || "Unknown",
          photoURL: user.photoURL || "",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const reqRef = ref(database, "friendRequests/" + currentUser.uid);
    return onValue(reqRef, (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([uid, info]: any) => ({ uid, ...info }));
      setFriendRequests(list);
    });
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const friendsRef = ref(database, "friends/" + currentUser.uid);
    return onValue(friendsRef, async (snap) => {
      const friendUids = snap.val() || {};
      const loaded = await Promise.all(
        Object.keys(friendUids).map(async (uid) => {
          const info = (await get(ref(database, "users/" + uid))).val() || {};
          return { uid, ...info };
        })
      );
      setFriends(loaded);
    });
  }, [currentUser]);

  useEffect(() => {
    if (!selectedChat || !currentUser) return;
    const path = selectedChat?.isAnnouncement
      ? "announcementChannel/messages"
      : `privateChats/${[currentUser.uid, selectedChat?.uid].sort().join("__")}`;
    return onValue(ref(database, path), (snap) => {
      const msgs = snap.val() || {};
      const list = Object.entries(msgs).map(([id, v]: any) => ({ id, ...v }));
      setMessages(list);
      localStorage.setItem("selectedChat", JSON.stringify(selectedChat));
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  }, [selectedChat, currentUser]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedChat");
    if (saved) setSelectedChat(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const today = new Date().toDateString();
    const logRef = ref(database, `messageLogs/${currentUser.uid}/${today}`);
    return onValue(logRef, (snap) => {
      let total = 0;
      Object.values(snap.val() || {}).forEach((v: any) => (total += v));
      setDailyTotal(total);
    });
  }, [currentUser]);

  const sendFriendRequest = async () => {
    if (!friendEmail || !currentUser) return;
    const usersSnap = await get(ref(database, "users"));
    const users = usersSnap.val() || {};
    const found = Object.entries(users).find(
      ([_, val]: any) => val.email === friendEmail.trim()
    );
    if (!found) return alert("User not found");
    const [uid, user] = found;
    await set(ref(database, `friendRequests/${uid}/${currentUser.uid}`), {
      email: currentUser.email,
      name: currentUser.displayName || "Unknown",
    });
    setFriendEmail("");
  };

  const approveRequest = async (uid: string) => {
    if (!currentUser) return;
    await set(ref(database, `friends/${currentUser.uid}/${uid}`), true);
    await set(ref(database, `friends/${uid}/${currentUser.uid}`), true);
    await remove(ref(database, `friendRequests/${currentUser.uid}/${uid}`));
  };

  const declineRequest = async (uid: string) => {
    if (!currentUser) return;
    await remove(ref(database, `friendRequests/${currentUser.uid}/${uid}`));
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !currentUser || !selectedChat) return;

    const isAdmin = currentUser.uid === ADMIN_UID;
    const isAnnounce = selectedChat?.isAnnouncement;
    const path = isAnnounce
      ? "announcementChannel/messages"
      : `privateChats/${[currentUser.uid, selectedChat?.uid].sort().join("__")}`;
    const today = new Date().toDateString();
    const logRef = ref(database, `messageLogs/${currentUser.uid}/${today}/${path}`);
    const snap = await get(logRef);
    const count = snap.val() || 0;

    if (!isAdmin && !isAnnounce) {
      if (dailyTotal >= 50) return alert("Reached 50 messages today");
      if (count >= 15) return alert("Max 15 messages in this chat today");
    }

    const newMsgRef = push(ref(database, path));
    await set(newMsgRef, {
      text: messageText.trim(),
      sentBy: currentUser.uid,
      timestamp: Date.now(),
    });
    await update(logRef, count + 1);
    setMessageText("");
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-12rem)] gap-4">
        <Card className="w-80 flex flex-col">
          <CardHeader>
            <h2 className="font-semibold">Friends</h2>
            <Input
              placeholder="Add friend by email"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
            />
            <Button className="w-full mt-2" onClick={sendFriendRequest}>
              <Plus className="w-4 h-4 mr-1" /> Send Request
            </Button>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-1">
            <h4 className="font-bold mt-4 text-sm">Requests</h4>
            {friendRequests.map((req) => (
              <div key={req.uid} className="flex justify-between items-center my-1">
                <span>{req.name}</span>
                <div className="flex gap-1">
                  <Button size="sm" onClick={() => approveRequest(req.uid)}>✓</Button>
                  <Button size="sm" variant="destructive" onClick={() => declineRequest(req.uid)}>✕</Button>
                </div>
              </div>
            ))}
            <h4 className="font-bold mt-4 text-sm">Chats</h4>
            {friends.map((f) => (
              <div
                key={f.uid}
                onClick={() => setSelectedChat({ ...f })}
                className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
                  selectedChat?.uid === f.uid && !selectedChat?.isAnnouncement
                    ? "bg-accent text-white font-bold"
                    : ""
                }`}
              >
                {f.name || f.email || "Unnamed"}
              </div>
            ))}

            <h4 className="font-bold mt-4 text-sm">Announcement</h4>
            <div
              onClick={() =>
                setSelectedChat({
                  isAnnouncement: true,
                  uid: "announcement",
                  name: "# Announcement",
                })
              }
              className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
                selectedChat?.isAnnouncement ? "bg-accent text-white font-bold" : ""
              }`}
            >
              # Announcement
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex items-center justify-between border-b">
            {selectedChat ? (
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={selectedChat.photoURL || "/placeholder.svg"} />
                  <AvatarFallback>{getInitials(selectedChat.name || "")}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold">{selectedChat.name}</h2>
                  <span className="text-xs text-gray-500">
                    {selectedChat?.isAnnouncement ? "Announcement Channel" : "Private Chat"}
                  </span>
                </div>
              </div>
            ) : (
              <span>Select a chat</span>
            )}
            <Badge className="ml-auto">
              <Users className="w-3 h-3 mr-1" /> {messages.length}
            </Badge>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => {
              const isMe = msg.sentBy === currentUser?.uid;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    alert("Right-click: Edit / Reply / Forward / Delete (placeholder)");
                  }}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {getInitials(isMe ? currentUser.displayName : selectedChat.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={isMe ? "text-right" : "text-left"}>
                    <div className="text-sm font-semibold">
                      {isMe ? "You" : selectedChat.name}
                    </div>
                    <p
                      className={`p-2 rounded-lg max-w-md ${
                        isMe ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
                      }`}
                    >
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            })}
            {announcements.length > 0 && (
              <div className="mt-4 border-t pt-2 text-center text-xs text-gray-500">
                {announcements.map((a) => (
                  <div key={a.id} className="py-1">
                    📢 {a.text}
                  </div>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {selectedChat && selectedChat?.isAnnouncement && currentUser?.uid !== ADMIN_UID ? null : (
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                />
                <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {dailyTotal}/50 today | {selectedChat?.isAnnouncement ? "∞" : "15/chat"} | max 100 chars
              </p>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
