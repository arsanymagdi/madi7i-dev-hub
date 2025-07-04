// ChatRestored.tsx
import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardSidebar from "@/components/DashboardSidebar";
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

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return parts[0]?.substring(0, 2) || "U";
}

const Chat = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [friendEmail, setFriendEmail] = useState("");
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [dailyTotal, setDailyTotal] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        set(userRef, {
          email: user.email,
          name: user.displayName || "Unknown",
          photoURL: user.photoURL || "",
        });
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    return onValue(ref(database, `friendRequests/${currentUser.uid}`), snap => {
      const obj = snap.val() || {};
      setFriendRequests(Object.entries(obj).map(([uid, info]: any) => ({ uid, ...info })));
    });
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    return onValue(ref(database, `friends/${currentUser.uid}`), async snap => {
      const obj = snap.val() || {};
      const entries = await Promise.all(
        Object.keys(obj).map(async uid => {
          const info = (await get(ref(database, `users/${uid}`))).val() || {};
          return { uid, ...info };
        })
      );
      setFriends(entries);
    });
  }, [currentUser]);

  useEffect(() => {
    if (!selectedChat || !currentUser) return;
    const key = selectedChat.isAnnouncement
      ? "announcementChannel/messages"
      : `privateChats/${[currentUser.uid, selectedChat.uid].sort().join("__")}`;

    return onValue(ref(database, key), snap => {
      const obj = snap.val() || {};
      setMessages(Object.entries(obj).map(([id, v]: any) => ({ id, ...v })));
      localStorage.setItem("selectedChat", JSON.stringify(selectedChat));
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
  }, [selectedChat, currentUser]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedChat");
    if (stored) setSelectedChat(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const today = new Date().toDateString();
    return onValue(ref(database, `messageLogs/${currentUser.uid}/${today}`), snap => {
      let tot = 0;
      Object.values(snap.val() || {}).forEach((v: any) => (tot += v));
      setDailyTotal(tot);
    });
  }, [currentUser]);

  async function sendFriendRequest() {
    if (!friendEmail.trim() || !currentUser) return;
    const usersSnap = await get(ref(database, "users"));
    const users = usersSnap.val() || {};
    const found = Object.entries(users).find(([_, u]: any) => u.email === friendEmail.trim());
    if (!found) return alert("No user found");
    const [uid] = found;
    await set(ref(database, `friendRequests/${uid}/${currentUser.uid}`), {
      name: currentUser.displayName || "Unknown",
      email: currentUser.email,
    });
    setFriendEmail("");
  }

  const approve = async (uid: string) => {
    if (!currentUser) return;
    await set(ref(database, `friends/${currentUser.uid}/${uid}`), true);
    await set(ref(database, `friends/${uid}/${currentUser.uid}`), true);
    await remove(ref(database, `friendRequests/${currentUser.uid}/${uid}`));
  };

  const decline = async (uid: string) => {
    if (!currentUser) return;
    await remove(ref(database, `friendRequests/${currentUser.uid}/${uid}`));
  };

  async function handleSend() {
    if (!messageText.trim() || !currentUser || !selectedChat) return;
    const isAdmin = currentUser.uid === ADMIN_UID;
    const isAnn = selectedChat.isAnnouncement;
    const key = isAnn
      ? "announcementChannel/messages"
      : `privateChats/${[currentUser.uid, selectedChat.uid].sort().join("__")}`;
    const today = new Date().toDateString();
    const logRef = ref(database, `messageLogs/${currentUser.uid}/${today}/${key}`);
    const snap = await get(logRef);
    const count = snap.val() || 0;

    if (!isAdmin && !isAnn) {
      if (dailyTotal >= 50) return alert("Reached daily limit (50)");
      if (count >= 15) return alert("Reached chat limit (15)");
    }

    const nr = push(ref(database, key));
    await set(nr, {
      text: messageText.trim(),
      sentBy: currentUser.uid,
      timestamp: Date.now(),
    });
    await update(logRef, count + 1);
    setMessageText("");
  }

  return (
    
     <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      <div className="flex-1 w-full md:w-auto">
  <DashboardLayout>
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 gap-4 p-4 bg-background overflow-hidden">
                      {/* Friend Sidebar */}
            <Card className="w-80 flex flex-col shadow h-full">
              <CardHeader>
                <h3 className="font-semibold mb-2">Friends</h3>
                <Input
                  placeholder="Add friend by email"
                  value={friendEmail}
                  onChange={e => setFriendEmail(e.target.value)}
                />
                <Button className="mt-2 w-full" onClick={sendFriendRequest}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </CardHeader>

              <CardContent className="overflow-y-auto flex-1">
                <h4 className="font-semibold text-sm">Requests</h4>
                {friendRequests.map(r => (
                  <div key={r.uid} className="flex justify-between items-center my-2">
                    <span>{r.name}</span>
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => approve(r.uid)}>✓</Button>
                      <Button size="sm" variant="destructive" onClick={() => decline(r.uid)}>✕</Button>
                    </div>
                  </div>
                ))}

                <h4 className="font-semibold text-sm mt-4">Chats</h4>
                {friends.map(f => (
                  <div
                    key={f.uid}
                    onClick={() =>
                      setSelectedChat({
                        uid: f.uid,
                        name: f.name || f.email,
                        photoURL: f.photoURL || "",
                        isAnnouncement: false,
                      })
                    }
                    className={`cursor-pointer flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
                      selectedChat?.uid === f.uid && !selectedChat.isAnnouncement ? "bg-accent text-white font-bold" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={f.photoURL || ""} />
                      <AvatarFallback>{getInitials(f.name || f.email)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">{f.name}</span>
                      <span className="text-xs text-gray-500">{f.email}</span>
                    </div>
                  </div>
                ))}

                <h4 className="font-semibold text-sm mt-4">Announcement</h4>
                <div
                  onClick={() => setSelectedChat({ isAnnouncement: true, uid: "announcement", name: "# Announcement" })}
                  className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
                    selectedChat?.isAnnouncement ? "bg-accent text-white font-bold" : ""
                  }`}
                >
                  # Announcement
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="flex-1 flex flex-col shadow h-full overflow-hidden">
              <CardHeader className="flex items-center justify-between border-b">
                {selectedChat ? (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedChat.photoURL || ""} />
                      <AvatarFallback>{getInitials(selectedChat.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-bold">{selectedChat.name}</h2>
                      <span className="text-xs text-gray-500">
                        {selectedChat.isAnnouncement ? "Announcement Channel" : "Private Chat"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span>Select a chat</span>
                )}
                <Badge className="ml-auto">
                  <Users className="w-3 h-3 mr-1" />
                  {messages.length}
                </Badge>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => {
                  const isMe = msg.sentBy === currentUser?.uid;
                  return (
                    <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {getInitials(isMe ? currentUser.displayName || currentUser.email : selectedChat.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={isMe ? "text-right" : "text-left"}>
                        <div className="text-sm font-semibold">{isMe ? "You" : selectedChat.name}</div>
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
                <div ref={messagesEndRef} />
              </CardContent>

              {selectedChat && !(selectedChat.isAnnouncement && currentUser?.uid !== ADMIN_UID) && (
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSend()}
                      placeholder="Type your message..."
                    />
                    <Button onClick={handleSend} disabled={!messageText.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {dailyTotal}/50 today | {selectedChat.isAnnouncement ? "∞" : "15/chat"} | max 100 chars
                  </p>
                </div>
              )}
            </Card>

          </div>
        </div>
        </DashboardLayout>
      </div>
      </div>
    
  );
};

export default Chat;
