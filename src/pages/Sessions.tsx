import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

const Sessions = () => {
  const sessions = [
    { student: "Sarah Johnson", topic: "React Advanced Patterns", date: "Today", time: "3:00 PM", duration: "1 hour" },
    { student: "Mike Chen", topic: "TypeScript Best Practices", date: "Tomorrow", time: "2:00 PM", duration: "1 hour" },
    { student: "Emma Davis", topic: "System Design Review", date: "Friday", time: "4:00 PM", duration: "1.5 hours" },
  ];

  return (
    <DashboardLayout userType="mentor">
      <div className="overflow-y-auto p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Sessions</h1>
        <p className="text-muted-foreground mb-8">Manage your mentoring sessions</p>

        <div className="space-y-4">
          {sessions.map((session, i) => (
            <Card key={i} className="p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{session.topic}</h3>
                  <p className="text-muted-foreground mb-4">with {session.student}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{session.time} • {session.duration}</span>
                    </div>
                  </div>
                </div>
                <Button className="gap-2">
                  <Video className="w-4 h-4" />
                  Join Session
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
