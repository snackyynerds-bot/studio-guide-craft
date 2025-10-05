import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageSquare,
  Share2,
  TrendingUp,
  Flame,
  Zap,
  GitBranch,
  FolderGit2,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getMe } from "../api/auth";
import { getCompleteProfile, getSessionStats } from "../api/backend";
import { getPosts, getHotPosts, likePost } from "../api/posts";

const StudentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [contributorProfile, setContributorProfile] = useState<any>(null);
  const [sessionStats, setSessionStats] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [hotPosts, setHotPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMe();
        if (res.ok) {
          setUser(res.user);
          // Verify user role - redirect if not a student
          if (res.user?.role && res.user.role !== 'student') {
            window.location.href = res.user.role === 'mentor' ? '/mentor-dashboard' : '/login';
            return;
          }
          
          // Fetch complete profile and stats from MongoDB backend
          if (res.user._id) {
            try {
              const completeProfile = await getCompleteProfile(res.user._id);
              setContributorProfile(completeProfile.contributorProfile);
              
              // Fetch session stats
              const stats = await getSessionStats(res.user._id, 'contributor');
              setSessionStats(stats);
            } catch (error) {
              console.error("Error fetching student data:", error);
            }
          }
        } else {
          console.warn(res.message);
          window.location.href = '/login';
        }
      } catch (error) {
        console.error("Error in fetchUser:", error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };
    
    const fetchPosts = async () => {
      try {
        const [postsData, hotPostsData] = await Promise.all([
          getPosts(10),
          getHotPosts(5)
        ]);
        setPosts(postsData);
        setHotPosts(hotPostsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    
    fetchData();
    fetchPosts();
  }, []);

  const handleLike = async (postId: number) => {
    try {
      await likePost(postId);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-75"></span>
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    );

  if (!user) return <p className="text-center mt-10">User not found</p>;

  const github = user?.githubData?.profile || {};
  const contributions = user?.githubData?.contributionsCollection || {};
  const summary = user?.githubData?.summary || {};

  const githubMetrics = [
    { icon: GitBranch, label: "Contributions", value: contributions.totalContributions || 0 },
    { icon: FolderGit2, label: "Repositories", value: summary.totalRepositories || 0 },
    { icon: Users, label: "Followers", value: github.followers || 0 },
    { icon: GitBranch, label: "PRs", value: contributions.totalPullRequestContributions || 0 },
  ];

  return (
    <DashboardLayout userType="student">
      <div className="flex h-screen overflow-hidden">
        {/* Middle Section - Posts Feed */}
        <div className="flex-1 overflow-y-auto border-r border-border">
          <div className="p-8 max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Community Feed</h1>
              <p className="text-muted-foreground">
                Stay updated with the latest from mentors and peers
              </p>
            </div>

            {/* GitHub Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {githubMetrics.map((metric) => (
                <Card
                  key={metric.label}
                  className="p-6 border border-primary/20 hover:border-primary/40 transition-colors bg-primary/5"
                >
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

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post: any) => (
                  <Card
                    key={post.id}
                    className="p-6 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        {post.avatar ? (
                          <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-bold text-primary">
                            {post.author.split(" ").map((n: string) => n[0]).join("")}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{post.author}</h3>
                          <span className="text-sm text-muted-foreground">• {post.role}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{post.time}</p>
                        <p className="mb-4 leading-relaxed">{post.content}</p>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-6">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-2 hover:text-primary"
                            onClick={() => handleLike(post.id)}
                          >
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Hot Posts / Quick Stats */}
        <div className="w-80 overflow-y-auto bg-card/50">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Hot Posts</h2>
              </div>
              <p className="text-sm text-muted-foreground">Trending in the community</p>
            </div>
            <div className="space-y-4">
              {hotPosts.map((post: any, i: number) => (
                <Card
                  key={i}
                  className="p-4 border border-border hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      {post.trending && (
                        <div className="flex items-center gap-1 mb-2">
                          <TrendingUp className="w-3 h-3 text-primary" />
                          <span className="text-xs font-medium text-primary">Trending</span>
                        </div>
                      )}
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{post.title}</h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <div className="flex items-center gap-1 text-primary">
                          <Heart className="w-3 h-3" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
