import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Trophy, Star } from "lucide-react";
import { useLocation } from "react-router-dom";

const Rewards = () => {
  const location = useLocation();
  const userType = location.pathname.includes("student") ? "student" : "mentor";

  const achievements = [
    { title: "First Session", description: "Completed your first mentoring session", earned: true },
    { title: "10 Sessions", description: "Completed 10 sessions", earned: true },
    { title: "Community Star", description: "Received 5-star rating", earned: false },
  ];

  return (
    <DashboardLayout userType={userType}>
      <div className="overflow-y-auto p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Rewards</h1>
        <p className="text-muted-foreground mb-8">Track your achievements and milestones</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center border border-primary/20 bg-primary/5">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-3xl font-bold text-primary mb-2">1,240</h3>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </Card>
          <Card className="p-6 text-center border border-border">
            <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-3xl font-bold mb-2">12</h3>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </Card>
          <Card className="p-6 text-center border border-border">
            <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-3xl font-bold mb-2">Gold</h3>
            <p className="text-sm text-muted-foreground">Current Tier</p>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6">Achievements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, i) => (
            <Card
              key={i}
              className={`p-6 border ${
                achievement.earned ? "border-primary/20 bg-primary/5" : "border-border opacity-50"
              }`}
            >
              <div className="flex items-start gap-4">
                <Award className={`w-12 h-12 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  {achievement.earned ? (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Earned</span>
                  ) : (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">Locked</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Rewards;
