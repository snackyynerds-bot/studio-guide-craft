// src/api/posts.js - Mock Posts API

// Use JSONPlaceholder as a dummy API (free, no setup required)
const DUMMY_API = 'https://jsonplaceholder.typicode.com';

// Mock user avatars from different sources
const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
];

// Mock data for fallback
const MOCK_POSTS = [
  {
    id: 1,
    author: "Sarah Chen",
    role: "Senior React Developer",
    avatar: AVATARS[0],
    time: "2 hours ago",
    content: "Just finished a great mentoring session on React Hooks! Understanding useEffect and useCallback can really level up your React game. Happy to help anyone struggling with these concepts. 🚀",
    likes: 45,
    comments: 12,
    tags: ["React", "JavaScript", "Mentoring"],
  },
  {
    id: 2,
    author: "Mike Rodriguez",
    role: "Full-Stack Engineer @ Google",
    avatar: AVATARS[1],
    time: "5 hours ago",
    content: "Pro tip: When contributing to open source, start with 'good first issue' labels. It's a great way to understand the codebase and make your first PR! I'm happy to review PRs for anyone getting started. 💪",
    likes: 89,
    comments: 23,
    tags: ["OpenSource", "Tips", "Contributing"],
  },
  {
    id: 3,
    author: "Emma Watson",
    role: "DevOps Mentor",
    avatar: AVATARS[2],
    time: "1 day ago",
    content: "Docker and Kubernetes can seem overwhelming at first, but trust me - once you understand containers, everything clicks! Starting a beginner-friendly workshop next week. DM me if interested! 🐳",
    likes: 67,
    comments: 18,
    tags: ["Docker", "Kubernetes", "DevOps"],
  },
  {
    id: 4,
    author: "David Kim",
    role: "Tech Lead @ Microsoft",
    avatar: AVATARS[3],
    time: "1 day ago",
    content: "Reminder: Writing clean code is not about being clever, it's about being clear. Your future self (and your team) will thank you. Share your favorite clean code practices below! 👇",
    likes: 134,
    comments: 45,
    tags: ["CleanCode", "BestPractices"],
  },
  {
    id: 5,
    author: "Lisa Anderson",
    role: "UI/UX Designer & Mentor",
    avatar: AVATARS[4],
    time: "2 days ago",
    content: "Design systems are game-changers for consistency and speed. Just helped a mentee set up their first component library using Figma and Storybook. The results are amazing! 🎨",
    likes: 92,
    comments: 31,
    tags: ["Design", "UI/UX", "ComponentLibrary"],
  },
  {
    id: 6,
    author: "Alex Johnson",
    role: "Backend Engineer @ Netflix",
    avatar: AVATARS[0],
    time: "3 days ago",
    content: "Scaling to millions of users taught me one thing: simplicity wins. Over-engineering is a real problem. Start with the simplest solution that works, then iterate based on actual needs. 📈",
    likes: 156,
    comments: 38,
    tags: ["Backend", "Scaling", "Architecture"],
  },
  {
    id: 7,
    author: "Maria Garcia",
    role: "Mobile Developer",
    avatar: AVATARS[1],
    time: "3 days ago",
    content: "React Native vs Flutter? I've used both extensively. The answer is: it depends on your team and project. Both are excellent choices. Happy to share my experience with either! 📱",
    likes: 78,
    comments: 29,
    tags: ["Mobile", "ReactNative", "Flutter"],
  },
  {
    id: 8,
    author: "James Wilson",
    role: "Security Engineer",
    avatar: AVATARS[2],
    time: "4 days ago",
    content: "Security isn't just about encryption and firewalls. It's about thinking like an attacker. Always validate inputs, never trust user data, and keep your dependencies updated! 🔒",
    likes: 201,
    comments: 52,
    tags: ["Security", "BestPractices", "CyberSecurity"],
  },
  {
    id: 9,
    author: "Nina Patel",
    role: "Data Scientist @ Amazon",
    avatar: AVATARS[3],
    time: "5 days ago",
    content: "Machine Learning doesn't always need complex models. Sometimes a simple linear regression outperforms a neural network. Start simple, measure results, then add complexity if needed. 📊",
    likes: 143,
    comments: 41,
    tags: ["MachineLearning", "DataScience", "AI"],
  },
  {
    id: 10,
    author: "Robert Brown",
    role: "Engineering Manager",
    avatar: AVATARS[4],
    time: "5 days ago",
    content: "Best advice I can give to junior developers: Ask questions! No question is stupid. The only stupid thing is staying stuck because you're afraid to ask. Great teams support learning. 🌱",
    likes: 267,
    comments: 73,
    tags: ["Career", "Learning", "TeamCulture"],
  },
  {
    id: 11,
    author: "Jessica Lee",
    role: "Frontend Architect",
    avatar: AVATARS[0],
    time: "1 week ago",
    content: "Performance optimization tip: Use React.memo wisely! Not every component needs it. Profile first, optimize later. Premature optimization is still the root of all evil. ⚡",
    likes: 89,
    comments: 27,
    tags: ["React", "Performance", "Optimization"],
  },
  {
    id: 12,
    author: "Carlos Martinez",
    role: "Cloud Architect @ AWS",
    avatar: AVATARS[1],
    time: "1 week ago",
    content: "Moving to the cloud? Start with lift-and-shift, then optimize. Don't try to refactor everything at once. Incremental migration reduces risk and keeps the business running. ☁️",
    likes: 112,
    comments: 34,
    tags: ["Cloud", "AWS", "Migration"],
  },
  {
    id: 13,
    author: "Sophia Zhang",
    role: "Product Engineer",
    avatar: AVATARS[2],
    time: "1 week ago",
    content: "The best code is code you don't write. Before adding a new library or feature, ask: Do we really need this? Sometimes the answer is yes, often it's no. Keep it simple! 🎯",
    likes: 178,
    comments: 56,
    tags: ["Engineering", "Simplicity", "ProductThinking"],
  },
  {
    id: 14,
    author: "Thomas Anderson",
    role: "DevRel Engineer @ MongoDB",
    avatar: AVATARS[3],
    time: "1 week ago",
    content: "Documentation is not an afterthought. Good docs save more time than good code. If you're building something others will use, invest in clear, simple documentation. 📚",
    likes: 145,
    comments: 39,
    tags: ["Documentation", "DeveloperExperience", "Writing"],
  },
  {
    id: 15,
    author: "Rachel Green",
    role: "QA Engineer & Mentor",
    avatar: AVATARS[4],
    time: "1 week ago",
    content: "Testing isn't just QA's job - it's everyone's responsibility. Write tests as you code, not after. Future you will thank present you when that refactor doesn't break everything! ✅",
    likes: 134,
    comments: 42,
    tags: ["Testing", "QA", "BestPractices"],
  },
];

const HOT_POSTS = [
  {
    id: 101,
    title: "How I landed my first FAANG job after 100 rejections",
    author: "Alex Turner",
    likes: 456,
    comments: 89,
    trending: true,
    tags: ["Career", "FAANG", "Interview"],
  },
  {
    id: 102,
    title: "Free resources that helped me become a better developer",
    author: "Maria Garcia",
    likes: 389,
    comments: 67,
    trending: true,
    tags: ["Learning", "Resources", "Free"],
  },
  {
    id: 103,
    title: "My journey from bootcamp to senior engineer in 3 years",
    author: "James Wilson",
    likes: 523,
    comments: 112,
    trending: true,
    tags: ["Career", "Journey", "Bootcamp"],
  },
  {
    id: 104,
    title: "Top 10 GitHub repos every developer should know",
    author: "Nina Patel",
    likes: 678,
    comments: 94,
    trending: false,
    tags: ["GitHub", "OpenSource", "Tools"],
  },
  {
    id: 105,
    title: "How mentoring changed my perspective on coding",
    author: "Robert Brown",
    likes: 234,
    comments: 45,
    trending: false,
    tags: ["Mentoring", "Learning", "Community"],
  },
];

// Helper function to transform JSONPlaceholder data to our format
function transformPost(apiPost, index) {
  return {
    id: apiPost.id,
    author: apiPost.name || `User ${apiPost.userId}`,
    role: ["Senior Developer", "Tech Lead", "Full-Stack Engineer", "Mentor", "DevOps Expert"][index % 5],
    avatar: AVATARS[index % AVATARS.length],
    time: ["2 hours ago", "5 hours ago", "1 day ago", "2 days ago", "3 days ago"][index % 5],
    content: apiPost.body,
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 50) + 5,
    tags: ["JavaScript", "React", "Node.js", "TypeScript", "OpenSource"].slice(0, Math.floor(Math.random() * 3) + 1),
  };
}

// Fetch posts from dummy API or use fallback
export async function getPosts(limit = 10) {
  // Use high-quality mock data (in English) instead of JSONPlaceholder (Latin text)
  // If you want to use JSONPlaceholder, uncomment the try-catch block below
  
  // For now, always return mock posts (they're in English and look professional)
  return MOCK_POSTS.slice(0, Math.min(limit, MOCK_POSTS.length));
  
  /* Uncomment this if you want to use JSONPlaceholder API:
  try {
    const response = await fetch(`${DUMMY_API}/comments?_limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    
    const data = await response.json();
    return data.map((post, index) => transformPost(post, index));
  } catch (error) {
    console.warn('Using mock posts data:', error.message);
    return MOCK_POSTS.slice(0, limit);
  }
  */
}

// Get hot/trending posts
export async function getHotPosts(limit = 5) {
  try {
    // In a real app, this would fetch trending posts
    // For now, return mock data
    return HOT_POSTS.slice(0, limit);
  } catch (error) {
    console.error('Error fetching hot posts:', error);
    return HOT_POSTS.slice(0, limit);
  }
}

// Get single post by ID
export async function getPost(postId) {
  try {
    const response = await fetch(`${DUMMY_API}/posts/${postId}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    
    const data = await response.json();
    return transformPost(data, 0);
  } catch (error) {
    console.error('Error fetching post:', error);
    return MOCK_POSTS[0];
  }
}

// Create new post (mock - doesn't actually save)
export async function createPost(postData) {
  try {
    const response = await fetch(`${DUMMY_API}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) throw new Error('Failed to create post');
    const data = await response.json();
    
    return {
      id: data.id,
      author: postData.author || "You",
      role: postData.role || "Developer",
      avatar: AVATARS[0],
      time: "Just now",
      content: postData.content,
      likes: 0,
      comments: 0,
      tags: postData.tags || [],
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Like a post (mock)
export async function likePost(postId) {
  try {
    // In a real app, this would update the backend
    console.log(`Liked post ${postId}`);
    return { success: true };
  } catch (error) {
    console.error('Error liking post:', error);
    return { success: false };
  }
}

// Comment on a post (mock)
export async function commentOnPost(postId, comment) {
  try {
    const response = await fetch(`${DUMMY_API}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        name: comment.author,
        email: `${comment.author.toLowerCase().replace(' ', '.')}@example.com`,
        body: comment.text,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to comment');
    const data = await response.json();
    
    return {
      id: data.id,
      author: comment.author,
      text: comment.text,
      time: "Just now",
    };
  } catch (error) {
    console.error('Error commenting on post:', error);
    throw error;
  }
}

// Get comments for a post
export async function getPostComments(postId, limit = 5) {
  try {
    const response = await fetch(`${DUMMY_API}/posts/${postId}/comments?_limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    
    const data = await response.json();
    return data.map((comment, index) => ({
      id: comment.id,
      author: comment.name,
      text: comment.body,
      time: ["Just now", "5 minutes ago", "1 hour ago", "2 hours ago", "1 day ago"][index % 5],
      avatar: AVATARS[index % AVATARS.length],
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

// Search posts
export async function searchPosts(query) {
  try {
    const posts = await getPosts(50);
    return posts.filter(post => 
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.author.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}

