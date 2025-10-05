# 🎓 Studio Guide Craft - Mentor-Contributor Platform

> A modern mentoring platform connecting open-source contributors with experienced mentors for personalized guidance and skill development.

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Studio Guide Craft** is a comprehensive mentoring platform designed to bridge the gap between aspiring open-source contributors and experienced developers. The platform facilitates meaningful connections, structured learning paths, and real-time collaboration.

### 🎯 Key Goals

- **Connect** contributors with mentors who have relevant expertise
- **Enable** structured mentoring sessions with scheduling and tracking
- **Foster** a community-driven learning environment
- **Showcase** GitHub achievements and open-source contributions
- **Reward** active participation and learning milestones

---

## ✨ Features

### For Contributors (Students)
- 🔍 **Find Mentors** - Search and filter mentors by skills, technologies, and ratings
- 📅 **Schedule Sessions** - Book mentoring sessions with integrated calendar
- 💬 **Community Feed** - Engage with posts, tips, and discussions
- 📊 **GitHub Integration** - Showcase your contributions and stats
- 🎁 **Rewards System** - Earn badges and recognition for achievements
- 📈 **Progress Tracking** - Monitor your learning journey

### For Mentors
- 👥 **Manage Sessions** - View, confirm, and track mentoring sessions
- 📝 **Share Knowledge** - Post tips, insights, and best practices
- ⭐ **Build Reputation** - Earn ratings and reviews from mentees
- 💼 **Showcase Expertise** - Display skills, certifications, and experience
- 📊 **Analytics Dashboard** - Track session stats and student progress
- ⚙️ **Availability Management** - Set your schedule and preferences

### Platform Features
- 🔐 **GitHub OAuth** - Secure authentication via GitHub
- 🌐 **Real-time Updates** - Live notifications and updates
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🎨 **Modern UI** - Beautiful, intuitive interface with shadcn/ui
- 🚀 **Fast Performance** - Built with Vite for optimal speed
- 🔒 **CORS Support** - Multiple CORS bypass strategies included

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful icon set

### Backend Integration
- **MongoDB** - Database (via backend API)
- **Express.js** - Backend API server
- **Mongoose** - MongoDB ODM
- **GitHub API** - OAuth & profile data

### Additional Tools
- **JSONPlaceholder** - Mock posts API
- **DiceBear** - Avatar generation
- **Vercel** - Deployment platform
- **CORS Proxy** - Cross-origin request handling

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control
- **GitHub Account** for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/astro-dally/studio-guide-craft.git
   cd studio-guide-craft
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Quick Setup

For the fastest setup with CORS support:

```bash
npm install && npm run dev
```

The app automatically handles CORS using Vite proxy in development!

---

## 📁 Project Structure

```
studio-guide-craft/
├── src/
│   ├── api/              # API integration services
│   │   ├── auth.js       # GitHub OAuth (port 5001)
│   │   ├── backend.js    # MongoDB API (port 3000)
│   │   └── posts.js      # Mock posts API
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── DashboardLayout.tsx
│   ├── pages/            # Route pages
│   │   ├── Index.tsx     # Landing page
│   │   ├── Login.tsx     # Login page
│   │   ├── StudentDashboard.tsx
│   │   ├── MentorDashboard.tsx
│   │   ├── Profile.tsx
│   │   ├── FindMentor.tsx
│   │   ├── Sessions.tsx
│   │   ├── Chats.tsx
│   │   └── ExplorePosts.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # App entry point
├── public/               # Static assets
├── docs/                 # Documentation
│   ├── AUTHENTICATION.md
│   ├── API_INTEGRATION.md
│   ├── CORS_BYPASS_GUIDE.md
│   └── QUICK_START.md
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment config
└── package.json          # Project dependencies
```

---

## 🔌 API Integration

### Authentication API (Port 5001)
- **GitHub OAuth** login flow
- User session management
- Role assignment (student/mentor)

### Backend API (Port 3000)
- **User Management** - Profile CRUD operations
- **Mentor Profiles** - Skills, expertise, certifications
- **Sessions** - Booking, scheduling, tracking
- **Reviews** - Ratings and testimonials
- **Search** - Mentor discovery and filtering

### Mock Posts API
- **Community Feed** - Social posts and discussions
- **Hot Posts** - Trending content
- **Interactions** - Likes, comments, sharing

### CORS Handling

The app includes **3 CORS bypass strategies**:

1. **Vite Proxy** (Development) ✅ Active
2. **CORS Proxy** (Production) - corsproxy.io
3. **Vercel Rewrites** (Vercel Deployment)

See `CORS_BYPASS_GUIDE.md` for details.

---

## 📱 Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/login` | Login with GitHub | Public |
| `/student-dashboard` | Student main dashboard | Student |
| `/student-dashboard/profile` | Student profile | Student |
| `/student-dashboard/explore` | Explore posts | Student |
| `/student-dashboard/find-mentor` | Find mentors | Student |
| `/student-dashboard/chats` | Messages | Student |
| `/mentor-dashboard` | Mentor main dashboard | Mentor |
| `/mentor-dashboard/profile` | Mentor profile | Mentor |
| `/mentor-dashboard/sessions` | Manage sessions | Mentor |
| `/mentor-dashboard/chats` | Messages | Mentor |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts** to link project and deploy

### Manual Build

```bash
npm run build
npm run preview  # Test production build locally
```

The build outputs to `dist/` directory.

### Environment Variables

For production, set these variables in your deployment platform:

```env
VITE_API_URL=https://your-backend.vercel.app
VITE_AUTH_URL=https://your-auth-api.vercel.app
```

---

## 📚 Documentation

Comprehensive guides are available in the project:

- **[AUTHENTICATION.md](./AUTHENTICATION.md)** - GitHub OAuth setup and flow
- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Backend API integration guide
- **[CORS_BYPASS_GUIDE.md](./CORS_BYPASS_GUIDE.md)** - CORS solutions (3 methods)
- **[QUICK_START.md](./QUICK_START.md)** - Fast setup guide
- **[backend-cors-example.js](./backend-cors-example.js)** - Backend CORS setup

---

## 🎨 Features Showcase

### Student Dashboard
- GitHub contribution metrics
- Community feed with posts
- Hot/trending posts sidebar
- Session statistics
- Quick actions

### Mentor Dashboard
- Session management
- Earnings tracking
- Upcoming meetings
- Student overview
- GitHub metrics

### Profile Management
- Edit personal information
- View GitHub integration
- Display skills and expertise
- Session history
- Reviews and ratings

### Find Mentor
- Search by skills/technologies
- Filter by ratings, price, availability
- View mentor profiles
- Book sessions
- GitHub profile links

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/studio-guide-craft.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes

### Commit Message Guidelines

- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Improvements
- `Docs:` Documentation
- `Style:` Code formatting
- `Refactor:` Code restructuring

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components and hooks
- Keep components small and focused
- Write meaningful comments
- Use Tailwind CSS for styling

---

## 🧪 Testing

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

---

## 🐛 Troubleshooting

### CORS Errors
See `CORS_BYPASS_GUIDE.md` for 3 different solutions.

### GitHub OAuth Not Working
Check `AUTHENTICATION.md` for setup instructions.

### API Connection Issues
Verify backend URLs in `src/api/backend.js` and `src/api/auth.js`.

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🗺️ Roadmap

### Phase 1 - Current ✅
- [x] GitHub OAuth integration
- [x] Student & Mentor dashboards
- [x] Profile management
- [x] Find mentor functionality
- [x] Session management
- [x] Community posts feed
- [x] CORS bypass solutions

### Phase 2 - In Progress 🚧
- [ ] Real-time chat functionality
- [ ] Video call integration
- [ ] Payment processing
- [ ] Advanced search filters
- [ ] Notification system

### Phase 3 - Planned 📅
- [ ] Mobile app (React Native)
- [ ] AI-powered mentor matching
- [ ] Learning path recommendations
- [ ] Gamification system
- [ ] Analytics dashboard

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer**: [astro-dally](https://github.com/astro-dally)
- **Original Concept**: studio-guide-craft team

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Lucide Icons](https://lucide.dev/) - Icon set
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [Vercel](https://vercel.com/) - Deployment platform
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Mock API
- [DiceBear](https://dicebear.com/) - Avatar generation

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/astro-dally/studio-guide-craft/issues)
- **Discussions**: [GitHub Discussions](https://github.com/astro-dally/studio-guide-craft/discussions)
- **Email**: [Your Email]

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐!

[![Star History Chart](https://api.star-history.com/svg?repos=astro-dally/studio-guide-craft&type=Date)](https://star-history.com/#astro-dally/studio-guide-craft&Date)

---

<div align="center">

**Made with ❤️ by the Studio Guide Craft team**

[Website](https://studio-guide-craft.vercel.app) · [Documentation](./docs) · [Report Bug](https://github.com/astro-dally/studio-guide-craft/issues)

</div>
