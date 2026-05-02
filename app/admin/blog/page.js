"use client";
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    tags: '',
    published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/blog?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem('adminToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      const url = editingPost
        ? `${API_URL}/blog/${editingPost.slug}`
        : `${API_URL}/blog`;

      const res = await fetch(url, {
        method: editingPost ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchPosts();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`${API_URL}/blog/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const openModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        content: post.content || '',
        excerpt: post.excerpt || '',
        coverImage: post.coverImage || '',
        tags: post.tags?.join(', ') || '',
        published: post.published,
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        coverImage: '',
        tags: '',
        published: false,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPost(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-white/60">Manage your blog articles</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          + New Post
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded-xl"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{post.title}</h3>
                    <p className="text-white/50 text-sm">/{post.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      post.published
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/10 text-white/70 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-white/40 text-sm">
                    <span>{post.views || 0} views</span>
                    <span>{post.readTime || 0} min read</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openModal(post)}
                  className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/50">No blog posts yet. Write your first article!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-[#1a1a3e] border border-white/20 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a3e] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-white">
                {editingPost ? 'Edit Post' : 'New Post'}
              </h2>
              <button onClick={closeModal} className="p-2 text-white/60 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 h-20"
                  placeholder="Brief summary of the post..."
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Content (Markdown supported)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 h-64 font-mono text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Cover Image URL</label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    placeholder="React, Tutorial, Web Dev"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded bg-white/10 border-white/20"
                />
                <label htmlFor="published" className="text-white/70">Publish immediately</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  {editingPost ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
