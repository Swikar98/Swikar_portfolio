"use client";
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    education: 0,
    blogPosts: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [projectsRes, skillsRes, expRes, eduRes, blogRes, msgRes] = await Promise.all([
        fetch(`${API_URL}/projects`),
        fetch(`${API_URL}/skills`),
        fetch(`${API_URL}/experience`),
        fetch(`${API_URL}/education`),
        fetch(`${API_URL}/blog`, { headers }),
        fetch(`${API_URL}/contact`, { headers }),
      ]);

      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();
      const expData = await expRes.json();
      const eduData = await eduRes.json();
      const blogData = await blogRes.json();

      let msgData = { messages: [], total: 0 };
      if (msgRes.ok) {
        msgData = await msgRes.json();
      }

      const projects = projectsData.projects || [];
      const messages = msgData.messages || [];

      setStats({
        projects: projectsData.total || projects.length,
        skills: skillsData.skills?.length || 0,
        experiences: Array.isArray(expData) ? expData.length : 0,
        education: Array.isArray(eduData) ? eduData.length : 0,
        blogPosts: blogData.total || 0,
        messages: msgData.total || 0,
        unreadMessages: messages.filter(m => !m.read).length,
      });

      setRecentProjects(projects.slice(0, 4));
      setRecentMessages(messages.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: '📁', color: 'from-purple-500 to-indigo-500', href: '/admin/projects' },
    { label: 'Skills', value: stats.skills, icon: '⚡', color: 'from-pink-500 to-rose-500', href: '/admin/skills' },
    { label: 'Experience', value: stats.experiences, icon: '💼', color: 'from-teal-500 to-cyan-500', href: '/admin/experience' },
    { label: 'Education', value: stats.education, icon: '🎓', color: 'from-orange-500 to-amber-500', href: '/admin/education' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: '📝', color: 'from-green-500 to-emerald-500', href: '/admin/blog' },
    { label: 'Messages', value: stats.messages, icon: '✉️', color: 'from-blue-500 to-sky-500', href: '/admin/messages', badge: stats.unreadMessages },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back! 👋</h1>
        <p className="text-white/60">Here&apos;s an overview of your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <a
            key={index}
            href={stat.href}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-purple-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <span className="text-lg">{stat.icon}</span>
              </div>
              {stat.badge > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {stat.badge}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-white/50 text-sm">{stat.label}</p>
          </a>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Projects</h2>
            <a href="/admin/projects" className="text-purple-400 text-sm hover:text-purple-300">
              View all →
            </a>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                {project.image ? (
                  <img src={project.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xl">
                    📁
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{project.title}</p>
                  <p className="text-white/50 text-sm">{project.category}</p>
                </div>
                <div className="text-white/40 text-sm">{project.views} views</div>
              </div>
            ))}
            {recentProjects.length === 0 && (
              <p className="text-white/50 text-center py-4">No projects yet</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Messages</h2>
            <a href="/admin/messages" className="text-purple-400 text-sm hover:text-purple-300">
              View all →
            </a>
          </div>
          <div className="space-y-4">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  !msg.read ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                }`}>
                  {msg.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium">{msg.name}</p>
                    {!msg.read && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">New</span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm truncate">{msg.subject}</p>
                </div>
              </div>
            ))}
            {recentMessages.length === 0 && (
              <p className="text-white/50 text-center py-4">No messages yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">💡 Quick Tips</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-purple-400 font-medium mb-1">API Base URL</p>
            <code className="text-white/70">http://localhost:3001/api</code>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-purple-400 font-medium mb-1">Authentication</p>
            <code className="text-white/70">Bearer Token in Header</code>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-purple-400 font-medium mb-1">Frontend URL</p>
            <code className="text-white/70">http://localhost:3000</code>
          </div>
        </div>
      </div>
    </div>
  );
}
