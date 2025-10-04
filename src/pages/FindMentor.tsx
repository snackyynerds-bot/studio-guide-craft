import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Github } from "lucide-react";

const FindMentor = () => {
  const mentors = [
    { name: "Sarah Johnson", role: "Senior Developer", skills: ["React", "TypeScript"], mentees: 24 },
    { name: "Mike Chen", role: "Tech Lead", skills: ["Node.js", "PostgreSQL"], mentees: 18 },
    { name: "Emma Davis", role: "Full-Stack", skills: ["Next.js", "AWS"], mentees: 15 },
  ];

  return (
    <DashboardLayout userType="student">
      <div className="overflow-y-auto p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Find Your Mentor</h1>
        <p className="text-muted-foreground mb-8">Connect with experienced developers</p>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search by name, skills, or expertise..." className="pl-10" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mentors.map((mentor, i) => (
            <Card key={i} className="p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{mentor.role}</p>
                  <p className="text-xs text-muted-foreground">{mentor.mentees} mentees</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Connect</Button>
                <Button variant="outline" size="icon">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FindMentor;
