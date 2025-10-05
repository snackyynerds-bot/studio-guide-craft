import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { getMe, setUserRole } from "../api/auth";
import { Users, Github } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await getMe();
      if (res.ok) {
        setUser(res.user);
        // If user already has a role, redirect to appropriate dashboard
        if (res.user?.role) {
          navigate(res.user.role === 'student' ? '/student-dashboard' : '/mentor-dashboard');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleRoleSelection = async (role: 'student' | 'mentor') => {
    setLoading(true);
    const res = await setUserRole(role);
    if (res.ok) {
      toast.success(`Welcome as a ${role}!`);
      navigate(role === 'student' ? '/student-dashboard' : '/mentor-dashboard');
    } else {
      toast.error('Failed to set role. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-75"></span>
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-2xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white">
              MentorHub
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {user ? `Welcome back, ${user.username || user.githubData?.profile?.login || 'User'}! Please choose your role to continue.` : 'Connect, Learn, and Grow with GitHub-powered mentorship'}
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 animate-slide-up">
          {/* Student Card */}
          <Card className="p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">I'm a Student</h2>
              <p className="text-muted-foreground">
                Explore posts, find mentors, and grow your skills with guidance from experienced developers
              </p>
              <div className="space-y-3">
                <Button onClick={() => handleRoleSelection('student')} variant="outline" className="w-full" size="lg" disabled={loading}>
                  Continue as Student
                </Button>
              </div>
            </div>
          </Card>

          {/* Mentor Card */}
          <Card className="p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">I'm a Mentor</h2>
              <p className="text-muted-foreground">
                Share your expertise, track contributions, manage bookings, and help shape the next generation
              </p>
              <div className="space-y-3">
                <Button onClick={() => handleRoleSelection('mentor')} variant="outline" className="w-full" size="lg" disabled={loading}>
                  Continue as Mentor
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center mb-3">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">GitHub Integration</h3>
            <p className="text-sm text-muted-foreground">Seamless login and profile sync</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Community Driven</h3>
            <p className="text-sm text-muted-foreground">Connect with peers and experts</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center mb-3">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Structured Learning</h3>
            <p className="text-sm text-muted-foreground">Track progress and milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
