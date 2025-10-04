import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, TrendingUp, Flame, Zap } from "lucide-react";

const StudentDashboard = () => {
  const posts = [
    {
      author: "Sarah Johnson",
      role: "Senior Developer",
      time: "2 hours ago",
      content: "Just published a new article on React Server Components! Check it out and let me know what you think. #React #WebDev",
      likes: 24,
      comments: 5,
    },
    {
      author: "Mike Chen",
      role: "Tech Lead",
      time: "5 hours ago",
      content: "Looking for mentees interested in learning backend development with Node.js and PostgreSQL. DM me if interested!",
      likes: 45,
      comments: 12,
    },
    {
      author: "Emma Davis",
      role: "Product Designer",
      time: "1 day ago",
      content: "Sharing my experience transitioning from frontend to full-stack. Here are 5 things I wish I knew earlier...",
      likes: 67,
      comments: 23,
    },
    {
      author: "Alex Kumar",
      role: "Full-Stack Engineer",
      time: "2 days ago",
      content: "Built my first production app with Next.js 14! The server components are game-changing. Happy to mentor anyone learning Next.js",
      likes: 89,
      comments: 31,
    },
  ];

  const hotPosts = [
    { title: "How to Land Your First Developer Job in 2025", author: "Jane Smith", likes: 234, trending: true },
    { title: "System Design Interview Guide", author: "Robert Lee", likes: 189, trending: true },
    { title: "Building Scalable React Apps", author: "Maria Garcia", likes: 156, trending: false },
    { title: "Git Workflow Best Practices", author: "David Kim", likes: 142, trending: false },
    { title: "Understanding TypeScript Generics", author: "Lisa Wang", likes: 128, trending: false },
  ];

  return (
    <DashboardLayout userType="student">
      <div className="flex h-screen">
        {/* Middle Section - Posts Feed */}
        <div className="flex-1 overflow-y-auto border-r border-border">
          <div className="p-8 max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Community Feed</h1>
              <p className="text-muted-foreground">Stay updated with the latest from mentors and peers</p>
            </div>

            <div className="space-y-6">
              {posts.map((post, i) => (
                <Card key={i} className="p-6 border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold flex-shrink-0 text-primary">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{post.author}</h3>
                        <span className="text-sm text-muted-foreground">• {post.role}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{post.time}</p>
                      <p className="mb-4 leading-relaxed">{post.content}</p>

                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
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
          </div>
        </div>

        {/* Right Section - Hot Posts */}
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
              {hotPosts.map((post, i) => (
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

            <Card className="p-4 border border-primary/20 bg-primary/5 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Quick Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Posts</span>
                  <span className="font-semibold text-primary">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mentors Following</span>
                  <span className="font-semibold text-primary">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Sessions</span>
                  <span className="font-semibold text-primary">3</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
