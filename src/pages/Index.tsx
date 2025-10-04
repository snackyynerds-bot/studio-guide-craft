import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <header className="text-center mb-20 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10" />
            <h1 className="text-5xl font-bold">MentorHub</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect, Learn, and Grow with GitHub-powered mentorship
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-20">
          {/* Student Card */}
          <Card className="p-8 hover:bg-card/80 transition-colors border border-border">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-foreground rounded-lg flex items-center justify-center">
                <Users className="w-8 h-8 text-background" />
              </div>
              <h2 className="text-2xl font-bold">I'm a Student</h2>
              <p className="text-muted-foreground">
                Explore posts, find mentors, and grow your skills
              </p>
              <div className="space-y-3">
                <Link to="/student-dashboard" className="block">
                  <Button className="w-full" size="lg">
                    Enter Student Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" size="lg">
                  <Github className="mr-2 w-4 h-4" />
                  Continue with GitHub
                </Button>
              </div>
            </div>
          </Card>

          {/* Mentor Card */}
          <Card className="p-8 hover:bg-card/80 transition-colors border border-border">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-foreground rounded-lg flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-background" />
              </div>
              <h2 className="text-2xl font-bold">I'm a Mentor</h2>
              <p className="text-muted-foreground">
                Share your expertise and help shape the next generation
              </p>
              <div className="space-y-3">
                <Link to="/mentor-dashboard" className="block">
                  <Button className="w-full" size="lg">
                    Enter Mentor Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" size="lg">
                  <Github className="mr-2 w-4 h-4" />
                  Continue with GitHub
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
              <Github className="w-6 h-6" />
            </div>
            <h3 className="font-semibold">GitHub Integration</h3>
            <p className="text-sm text-muted-foreground">Seamless login and profile sync</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-semibold">Community Driven</h3>
            <p className="text-sm text-muted-foreground">Connect with peers and experts</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-semibold">Structured Learning</h3>
            <p className="text-sm text-muted-foreground">Track progress and milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
