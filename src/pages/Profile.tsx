import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Mail, MapPin, Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const userType = location.pathname.includes("student") ? "student" : "mentor";

  return (
    <DashboardLayout userType={userType}>
      <div className="overflow-y-auto p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        <Card className="p-8 border border-border">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
              JD
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">John Doe</h2>
              <p className="text-muted-foreground mb-4">
                {userType === "student" ? "Aspiring Full-Stack Developer" : "Senior Software Engineer"}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined January 2024</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <Button variant="outline" className="gap-2">
              <Github className="w-4 h-4" />
              Connect GitHub
            </Button>
            <Button>Edit Profile</Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3">About</h3>
              <p className="text-muted-foreground">
                {userType === "student"
                  ? "Passionate about learning web development and building modern applications. Currently focusing on React, TypeScript, and Node.js."
                  : "Experienced software engineer with 10+ years in full-stack development. Passionate about mentoring and helping developers grow their skills."}
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "Git"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
