import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getUserSessions, updateSessionStatus } from "../api/backend";
import { getMe } from "../api/auth";
import { useToast } from "@/hooks/use-toast";

const Sessions = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("mentor");
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getMe();
        if (userRes.ok && userRes.user) {
          setCurrentUser(userRes.user);
          const role = userRes.user.role === 'student' ? 'contributor' : 'mentor';
          setUserRole(role);
          
          if (userRes.user._id) {
            const sessionsData = await getUserSessions(userRes.user._id, role);
            setSessions(sessionsData);
          }
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (sessionId: string, status: string) => {
    try {
      await updateSessionStatus(sessionId, status);
      toast({
        title: "Session Updated",
        description: `Session has been ${status}.`,
      });
      
      // Refresh sessions
      if (currentUser?._id) {
        const sessionsData = await getUserSessions(currentUser._id, userRole);
        setSessions(sessionsData);
      }
    } catch (error) {
      console.error("Error updating session:", error);
      toast({
        title: "Error",
        description: "Failed to update session status.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: any = {
      pending: { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: AlertCircle, text: "Pending" },
      confirmed: { color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: CheckCircle, text: "Confirmed" },
      completed: { color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle, text: "Completed" },
      cancelled: { color: "bg-red-500/10 text-red-500 border-red-500/20", icon: XCircle, text: "Cancelled" },
      no_show: { color: "bg-gray-500/10 text-gray-500 border-gray-500/20", icon: XCircle, text: "No Show" },
    };
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`px-2 py-1 rounded text-xs border ${badge.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <DashboardLayout userType={currentUser?.role || "mentor"}>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-75"></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-150"></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></span>
          </div>
          <p className="text-muted-foreground">Loading your sessions...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType={currentUser?.role || "mentor"}>
      <div className="overflow-y-auto p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Sessions</h1>
        <p className="text-muted-foreground mb-8">Manage your {userRole === 'mentor' ? 'mentoring' : 'learning'} sessions</p>

        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No sessions scheduled yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, i) => {
              const otherUser = userRole === 'mentor' ? session.contributorId : session.mentorId;
              
              return (
                <Card key={session._id || i} className="p-6 border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary overflow-hidden">
                          {otherUser?.avatar ? (
                            <img src={otherUser.avatar} alt={otherUser.username} className="w-full h-full object-cover" />
                          ) : (
                            otherUser?.username?.[0]?.toUpperCase() || "U"
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">
                            {session.topic || "General Session"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {userRole === 'mentor' ? 'with' : 'by'} {otherUser?.displayName || otherUser?.username || "Unknown"}
                          </p>
                        </div>
                        {getStatusBadge(session.status)}
                      </div>
                      
                      {session.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {session.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{formatDate(session.scheduledDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {session.scheduledStartTime} - {session.scheduledEndTime}
                            {session.durationMinutes && ` • ${session.durationMinutes} min`}
                          </span>
                        </div>
                      </div>
                      
                      {session.technologies && session.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {session.technologies.map((tech: string) => (
                            <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {session.status === 'confirmed' && session.meetingLink && (
                        <Button className="gap-2" asChild>
                          <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
                            <Video className="w-4 h-4" />
                            Join Session
                          </a>
                        </Button>
                      )}
                      {session.status === 'pending' && userRole === 'mentor' && (
                        <>
                          <Button 
                            className="gap-2" 
                            onClick={() => handleStatusUpdate(session._id, 'confirmed')}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Confirm
                          </Button>
                          <Button 
                            variant="outline" 
                            className="gap-2"
                            onClick={() => handleStatusUpdate(session._id, 'cancelled')}
                          >
                            <XCircle className="w-4 h-4" />
                            Decline
                          </Button>
                        </>
                      )}
                      {session.status === 'confirmed' && (
                        <Button 
                          variant="outline"
                          onClick={() => handleStatusUpdate(session._id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
