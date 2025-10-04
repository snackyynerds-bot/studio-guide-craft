import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useLocation } from "react-router-dom";

const Chats = () => {
  const location = useLocation();
  const userType = location.pathname.includes("student") ? "student" : "mentor";

  const conversations = [
    { name: "Sarah Johnson", lastMessage: "Thanks for the session!", time: "5m ago", unread: true },
    { name: "Mike Chen", lastMessage: "See you tomorrow!", time: "1h ago", unread: false },
    { name: "Emma Davis", lastMessage: "Got the resources, thanks!", time: "2h ago", unread: false },
  ];

  return (
    <DashboardLayout userType={userType}>
      <div className="flex h-screen">
        {/* Conversations List */}
        <div className="w-80 border-r border-border overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="space-y-2">
              {conversations.map((conv, i) => (
                <Card
                  key={i}
                  className={`p-4 cursor-pointer transition-colors ${
                    i === 0 ? "bg-primary/5 border-primary/20" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {conv.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{conv.name}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border p-6">
            <h2 className="font-bold text-lg">Sarah Johnson</h2>
            <p className="text-sm text-muted-foreground">Senior Developer</p>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  SJ
                </div>
                <div className="flex-1">
                  <div className="bg-muted p-3 rounded-lg inline-block">
                    <p className="text-sm">Thanks for the session!</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">5m ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border p-6">
            <div className="flex gap-3">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chats;
