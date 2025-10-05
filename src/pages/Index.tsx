import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Award, MessageSquare, ArrowRight, Github, Star, Zap } from "lucide-react";
import { startGithubLogin } from "../api/auth";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Find Your Perfect Mentor",
      description: "Connect with experienced mentors in your field of interest through our intelligent matching system."
    },
    {
      icon: BookOpen,
      title: "Structured Learning Paths",
      description: "Follow curated learning journeys designed by industry experts to accelerate your growth."
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Engage in meaningful conversations with mentors through our integrated chat system."
    },
    {
      icon: Award,
      title: "Track Your Progress",
      description: "Earn rewards and badges as you complete sessions and achieve your learning milestones."
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Mentors" },
    { value: "50K+", label: "Students" },
    { value: "100K+", label: "Sessions Completed" },
    { value: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl border border-primary/20">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold">MentorHub</span>
          </div>
          <Button onClick={() => startGithubLogin()} className="bg-primary hover:bg-primary/90">
            <Github className="mr-2 w-4 h-4" />
            Login with GitHub
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-4">
            <Github className="w-4 h-4" />
            <span>GitHub-Powered Mentorship Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Connect, Learn, and
            <span className="text-primary"> Grow Together</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students and mentors building the future together. 
            Get personalized guidance, share knowledge, and accelerate your career growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={() => startGithubLogin()}
              className="bg-primary hover:bg-primary/90 text-lg px-8 hover:scale-105 transition-transform"
            >
              <Github className="mr-2 w-5 h-5" />
              Login with GitHub
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 hover:scale-105 transition-transform"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-scale-in">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="p-6 text-center border border-border/50 backdrop-blur-sm bg-card/50 hover:border-primary/30 transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-4">
            <Zap className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built-in tools and features to make mentorship seamless and effective
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 border border-border/50 backdrop-blur-sm bg-card/50 hover:border-primary/30 transition-all hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl border border-primary/20 mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <Card className="p-12 border border-primary/20 backdrop-blur-sm bg-gradient-to-br from-primary/10 to-primary/5 max-w-4xl mx-auto text-center animate-scale-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-primary" />
            <Star className="w-6 h-6 text-primary" />
            <Star className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community today and connect with mentors who will help you achieve your goals
          </p>
          <Button 
            size="lg" 
            onClick={() => startGithubLogin()}
            className="bg-primary hover:bg-primary/90 text-lg px-8 hover:scale-105 transition-transform"
          >
            <Github className="mr-2 w-5 h-5" />
            Login with GitHub
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-sm bg-background/80 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg border border-primary/20">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold">MentorHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 MentorHub. Empowering growth through mentorship.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
