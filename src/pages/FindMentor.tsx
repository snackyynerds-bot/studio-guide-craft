import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Github, Star, Clock, Users, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { getTopMentors, searchMentors } from "../api/backend";
import { getMe } from "../api/auth";

const FindMentor = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getMe();
        if (userRes.ok) {
          setCurrentUser(userRes.user);
        }
        
        const mentorsData = await getTopMentors(null, 20);
        setMentors(mentorsData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const mentorsData = await getTopMentors(null, 20);
      setMentors(mentorsData);
      return;
    }

    try {
      setLoading(true);
      const searchFilters = {
        technologies: [searchQuery],
        userId: currentUser?._id,
      };
      const result = await searchMentors(searchFilters);
      setMentors(result.mentors || []);
    } catch (error) {
      console.error("Error searching mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userType="student">
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-75"></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-150"></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></span>
          </div>
          <p className="text-muted-foreground">Finding the best mentors for you...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="student">
      <div className="overflow-y-auto p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Find Your Mentor</h1>
        <p className="text-muted-foreground mb-8">Connect with experienced developers</p>

        <div className="mb-8">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search by skills or technologies..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </div>

        {mentors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No mentors found. Try a different search.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Found {mentors.length} {mentors.length === 1 ? 'mentor' : 'mentors'}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {mentors.map((mentor, i) => {
                const user = mentor.userId || {};
                const matchingSkills = mentor.matchingSkills || [];
                
                return (
                  <Card key={mentor._id || i} className="p-6 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xl font-bold text-primary overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                          user.username?.[0]?.toUpperCase() || "M"
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{user.displayName || user.username || "Mentor"}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{mentor.headline || "Experienced Developer"}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-primary fill-primary" />
                            <span>{mentor.overallRating?.toFixed(1) || "0.0"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{mentor.completedSessions || 0} sessions</span>
                          </div>
                          {mentor.hourlyRate > 0 && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              <span>${mentor.hourlyRate}/hr</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {mentor.bio && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.bio}</p>
                    )}
                    
                    {matchingSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {matchingSkills.slice(0, 5).map((skill: any) => (
                          <span
                            key={skill._id}
                            className="px-2 py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20"
                          >
                            {skill.skillName}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button className="flex-1">Book Session</Button>
                      {user.profileUrl && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={user.profileUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FindMentor;
