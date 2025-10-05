import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageSquare, Share2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts, searchPosts, likePost } from "../api/posts";

const ExplorePosts = () => {
  const location = useLocation();
  const userType = location.pathname.includes("student") ? "student" : "mentor";
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(20);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const data = await getPosts(20);
      setPosts(data);
      return;
    }

    try {
      setLoading(true);
      const results = await searchPosts(searchQuery);
      setPosts(results);
    } catch (error) {
      console.error("Error searching posts:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <DashboardLayout userType={userType}>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-75"></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-150"></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></span>
          </div>
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="overflow-y-auto p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Explore Posts</h1>
        <p className="text-muted-foreground mb-8">Discover insights from the community</p>

        <div className="mb-8">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search posts, authors, or tags..." 
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

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No posts found.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="p-6 border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      {post.avatar ? (
                        <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-primary">
                          {post.author.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExplorePosts;
