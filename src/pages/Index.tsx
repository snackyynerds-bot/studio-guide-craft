import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Lock, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoCredentials = [
    { type: "Student", email: "student@mentorhub.com", password: "student123" },
    { type: "Mentor", email: "mentor@mentorhub.com", password: "mentor123" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    // Check credentials and redirect
    if (email === "student@mentorhub.com" && password === "student123") {
      toast.success("Welcome back, Student!");
      setTimeout(() => navigate("/student-dashboard"), 500);
    } else if (email === "mentor@mentorhub.com" && password === "mentor123") {
      toast.success("Welcome back, Mentor!");
      setTimeout(() => navigate("/mentor-dashboard"), 500);
    } else {
      toast.error("Invalid credentials. Please use demo credentials below.");
    }
  };

  const fillDemoCredentials = (type: "Student" | "Mentor") => {
    const creds = demoCredentials.find(c => c.type === type);
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
      toast.success(`${type} credentials filled!`);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 border border-primary/20 animate-pulse-glow">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">MentorHub</h1>
          <p className="text-muted-foreground">GitHub-powered mentorship platform</p>
        </div>

        {/* Login Form */}
        <Card className="p-8 border border-border backdrop-blur-sm bg-card/80 animate-scale-in">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-200 focus:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-200 focus:border-primary/50"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              Sign In
            </Button>
          </form>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 animate-slide-in-bottom">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground font-medium">Demo Credentials</p>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {demoCredentials.map((cred) => (
              <Card
                key={cred.type}
                className="p-4 border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => fillDemoCredentials(cred.type as "Student" | "Mentor")}
              >
                <div className="space-y-1">
                  <p className="font-bold text-sm text-primary">{cred.type}</p>
                  <p className="text-xs text-muted-foreground break-all">{cred.email}</p>
                  <p className="text-xs text-muted-foreground">{cred.password}</p>
                  <p className="text-xs text-primary mt-2">Click to fill →</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Connect, learn, and grow with GitHub-powered mentorship
        </p>
      </div>
    </div>
  );
};

export default Index;
