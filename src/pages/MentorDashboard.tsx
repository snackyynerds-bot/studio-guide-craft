import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GitBranch,
  GitPullRequest,
  Users,
  FolderGit2,
  DollarSign,
  Calendar,
  MessageSquare,
  User,
  Download,
} from "lucide-react";
import { getMe } from "../api/auth";
import { useState, useEffect } from "react";
import { getCompleteProfile, getUserSessions, getSessionStats } from "../api/backend";

const MentorDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [mentorProfile, setMentorProfile] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionStats, setSessionStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const data = await getMe();
        if (!mounted) return;
        if (data?.ok) {
          setUser(data.user);
          // Verify user role - redirect if not a mentor
          if (data.user?.role && data.user.role !== 'mentor') {
            window.location.href = data.user.role === 'student' ? '/student-dashboard' : '/login';
            return;
          }
          
          // Fetch complete profile and stats from MongoDB backend
          if (data.user._id) {
            try {
              const completeProfile = await getCompleteProfile(data.user._id);
              setMentorProfile(completeProfile.mentorProfile);
              
              // Fetch upcoming sessions
              const upcomingSessions = await getUserSessions(data.user._id, 'mentor', 'confirmed');
              setSessions(upcomingSessions.slice(0, 3)); // Show top 3
              
              // Fetch session stats
              const stats = await getSessionStats(data.user._id, 'mentor');
              setSessionStats(stats);
            } catch (error) {
              console.error("Error fetching mentor data:", error);
            }
          }
        } else {
          console.error("Failed to fetch user:", data);
          window.location.href = '/login';
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-75"></span>
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></span>
        </div>
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );

  if (!user) return <p className="text-center mt-10">User not found</p>;

  const githubProfile = user.githubData?.profile || {};
  const contributions = user.githubData?.contributionsCollection || {};

  const githubMetrics = [
    {
      icon: GitBranch,
      label: "Contributions",
      value: contributions.totalContributions || 0,
    },
    {
      icon: GitPullRequest,
      label: "Pull Requests",
      value: contributions.totalPullRequestContributions || 0,
    },
    {
      icon: Users,
      label: "Total Sessions",
      value: mentorProfile?.totalSessions || 0,
    },
    {
      icon: FolderGit2,
      label: "Repositories",
      value: user.githubData?.summary?.totalRepositories || 0,
    },
  ];

  const formatSessionTime = (date: string, startTime: string) => {
    const sessionDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateStr = "";
    if (sessionDate.toDateString() === today.toDateString()) {
      dateStr = "Today";
    } else if (sessionDate.toDateString() === tomorrow.toDateString()) {
      dateStr = "Tomorrow";
    } else {
      dateStr = sessionDate.toLocaleDateString('en-US', { weekday: 'long' });
    }
    
    return `${dateStr}, ${startTime}`;
  };

  const upcomingMeetings = sessions.map(session => ({
    student: session.contributorId?.displayName || session.contributorId?.username || "Unknown",
    topic: session.topic || "General Session",
    time: formatSessionTime(session.scheduledDate, session.scheduledStartTime),
  }));

  const recentChats = user.recentChats || [];

  return (
    <DashboardLayout userType="mentor">
      <div className="overflow-y-auto">
        {/* Top Section */}
        <div className="border-b border-border bg-card/50 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Mentor Dashboard</h1>
              <p className="text-muted-foreground">
                Track your mentoring impact and GitHub contributions
              </p>
            </div>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4" />
              Download My Contribution CV
            </Button>
          </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto">
          {/* GitHub Metrics */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">GitHub Profile Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {githubMetrics.map((metric) => (
                <Card
                  key={metric.label}
                  className="p-6 border border-primary/20 hover:border-primary/40 transition-colors bg-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">{metric.label}</p>
                      <p className="text-3xl font-bold text-primary">{metric.value}</p>
                    </div>
                    <metric.icon className="w-10 h-10 text-primary" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Interactive Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Earnings */}
            <Card className="p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">My Earnings</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-muted-foreground">Hourly Rate</span>
                    <span className="text-2xl font-bold text-primary">${mentorProfile?.hourlyRate || 0}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Set your rate in profile settings</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-xl font-bold">{mentorProfile?.completedSessions || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cancelled</p>
                    <p className="text-xl font-bold">{mentorProfile?.cancelledSessions || 0}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upcoming Meetings */}
            <Card className="p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Upcoming Meetings</h3>
              </div>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting, i) => (
                  <div
                    key={i}
                    className="p-3 bg-muted rounded-lg hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-sm">{meeting.topic}</p>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{meeting.time.split(',')[0]}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">with {meeting.student}</p>
                    <p className="text-xs text-muted-foreground mt-1">{meeting.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/40">
                View All Sessions
              </Button>
            </Card>

            {/* Recent Chats */}
            <Card className="p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold">Recent Chats</h3>
                </div>
                <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  {recentChats.filter(chat => chat.unread).length}
                </span>
              </div>
              <div className="space-y-3">
                {recentChats.map((chat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{chat.name}</p>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                    </div>
                    {chat.unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/40">
                Go to Chats
              </Button>
            </Card>

            {/* Mentee Overview */}
            <Card className="p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Session Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Total Sessions</span>
                  <span className="text-xl font-bold text-primary">{sessionStats?.total || 0}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="text-xl font-bold text-primary">{sessionStats?.completed || 0}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Average Rating</span>
                  <span className="text-xl font-bold">{mentorProfile?.overallRating?.toFixed(1) || "0.0"} ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="text-xl font-bold text-primary">{sessionStats?.pending || 0}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
