import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Mail, MapPin, Calendar, Users, GitBranch, FolderGit2, Save, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMe } from "../api/auth";
import { getCompleteProfile, updateUserProfile, getMentorSkills } from "../api/backend";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const location = useLocation();
  const userType = location.pathname.includes("student") ? "student" : "mentor";
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    timezone: "",
    preferredLanguage: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        if (res.ok && res.user) {
          setUser(res.user);
          
          // Fetch complete profile from MongoDB backend
          if (res.user._id) {
            try {
              const completeProfile = await getCompleteProfile(res.user._id);
              setProfileData(completeProfile);
              
              // Fetch skills if mentor
              if (completeProfile.mentorProfile) {
                const mentorSkills = await getMentorSkills(completeProfile.mentorProfile._id);
                setSkills(mentorSkills);
              }
              
              setFormData({
                username: completeProfile.user?.username || "",
                email: completeProfile.user?.email || "",
                timezone: completeProfile.user?.timezone || "",
                preferredLanguage: completeProfile.user?.preferredLanguage || "",
                bio: completeProfile.contributorProfile?.bio || completeProfile.mentorProfile?.bio || "",
              });
            } catch (error) {
              console.error("Error fetching complete profile:", error);
              // Use basic user data if backend fails
              setFormData({
                username: res.user.username || "",
                email: res.user.email || "",
                timezone: "",
                preferredLanguage: "",
                bio: res.user.bio || "",
              });
            }
          }
        } else {
          console.warn(res.message);
          window.location.href = '/login';
        }
      } catch (error) {
        console.error("Error in fetchUser:", error);
        window.location.href = '/login';
      }
    };
    fetchUser();
  }, [userType]);

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-75"></span>
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></span>
        </div>
        <p className="text-muted-foreground">Fetching your profile...</p>
      </div>
    );

  const github = user.githubData?.profile || {};
  const contributions = user.githubData?.contributionsCollection || {};
  const summary = user.githubData?.summary || {};

  const metrics = [
    { icon: GitBranch, label: "Total Contributions", value: contributions.totalContributions || 0 },
    { icon: Users, label: "Followers", value: github.followers || 0 },
    { icon: FolderGit2, label: "Repositories", value: summary.totalRepositories || 0 },
    { icon: GitBranch, label: "PRs", value: contributions.totalPullRequestContributions || 0 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (user?._id) {
        await updateUserProfile(user._id, {
          timezone: formData.timezone,
          preferredLanguage: formData.preferredLanguage,
        });
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        
        setUser({ 
          ...user, 
          timezone: formData.timezone,
          preferredLanguage: formData.preferredLanguage,
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout userType={userType}>
      <div className="overflow-y-auto p-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <Card className="p-8 flex flex-col md:flex-row items-center md:items-start gap-6 border border-border">
          <div className="w-28 h-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-4xl font-bold text-primary">
            {user.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4 w-full">
                <div>
                  <label className="text-sm font-medium mb-1 block">Timezone</label>
                  <input
                    type="text"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="w-full border border-border rounded px-3 py-2 text-black"
                    placeholder="e.g., Asia/Kolkata, America/New_York"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Preferred Language</label>
                  <input
                    type="text"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="w-full border border-border rounded px-3 py-2 text-black"
                    placeholder="e.g., English, Spanish, Hindi"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={handleSave} className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                    <Save className="w-4 h-4" /> Save
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>
                    <X className="w-4 h-4" /> Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{user.username || "User"}</h1>
                <p className="text-muted-foreground mb-4">
                  {userType === "student" ? "Aspiring Full-Stack Developer" : "Senior Software Engineer"}
                </p>

                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{github.location || "India"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button className="flex-1" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.label} className="p-6 border border-primary/20 hover:border-primary/40 transition-colors bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{metric.label}</p>
                  <p className="text-2xl font-bold text-primary">{metric.value}</p>
                </div>
                <metric.icon className="w-8 h-8 text-primary" />
              </div>
            </Card>
          ))}
        </div>

        {/* About & Skills */}
        {!isEditing && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border border-border">
              <h3 className="text-xl font-bold mb-3">About</h3>
              <p className="text-muted-foreground">{user.bio || "No bio available."}</p>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="text-xl font-bold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <span
                      key={skill._id}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {skill.skillName}
                      {skill.proficiencyLevel && (
                        <span className="ml-1 text-xs opacity-70">
                          ({skill.proficiencyLevel})
                        </span>
                      )}
                    </span>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No skills added yet.</p>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
