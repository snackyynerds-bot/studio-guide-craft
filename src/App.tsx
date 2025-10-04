import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import Profile from "./pages/Profile";
import ExplorePosts from "./pages/ExplorePosts";
import FindMentor from "./pages/FindMentor";
import Sessions from "./pages/Sessions";
import Chats from "./pages/Chats";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-dashboard/profile" element={<Profile />} />
          <Route path="/student-dashboard/explore" element={<ExplorePosts />} />
          <Route path="/student-dashboard/find-mentor" element={<FindMentor />} />
          <Route path="/student-dashboard/chats" element={<Chats />} />
          <Route path="/student-dashboard/rewards" element={<Rewards />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/mentor-dashboard/profile" element={<Profile />} />
          <Route path="/mentor-dashboard/explore" element={<ExplorePosts />} />
          <Route path="/mentor-dashboard/sessions" element={<Sessions />} />
          <Route path="/mentor-dashboard/chats" element={<Chats />} />
          <Route path="/mentor-dashboard/rewards" element={<Rewards />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
