import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageSquare } from "lucide-react";
import { useLocation } from "react-router-dom";

const ExplorePosts = () => {
  const location = useLocation();
  const userType = location.pathname.includes("student") ? "student" : "mentor";

  const posts = [
    { author: "Sarah Johnson", role: "Senior Dev", content: "10 React patterns every developer should know...", likes: 145, comments: 23 },
    { author: "Mike Chen", role: "Tech Lead", content: "Building scalable APIs with Node.js and PostgreSQL", likes: 98, comments: 15 },
    { author: "Emma Davis", role: "Designer", content: "The future of web design: AI and personalization", likes: 76, comments: 12 },
  ];

  return (
    <DashboardLayout userType={userType}>
      <div className="overflow-y-auto p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Explore Posts</h1>
        <p className="text-muted-foreground mb-8">Discover insights from the community</p>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search posts..." className="pl-10" />
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((post, i) => (
            <Card key={i} className="p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold">{post.author}</h3>
                    <span className="text-sm text-muted-foreground">• {post.role}</span>
                  </div>
                  <p className="mb-4">{post.content}</p>
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExplorePosts;
