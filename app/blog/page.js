'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/blog`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="noise"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            SWIKAR<span className="text-[#ff3d00]">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Home</Link>
            <Link href="/projects" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Projects</Link>
            <Link href="/blog" className="text-sm font-bold uppercase tracking-widest text-[#ff3d00]">Blog</Link>
            <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-4">Articles</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            BLOG<br /><span className="text-stroke">POSTS</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Thoughts, tutorials, and insights about web development, design, and technology.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#ff3d00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post, index) => (
                <article key={post.id} className="group card-brutal p-8 hover-lift">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Post Image */}
                    {post.coverImage && (
                      <div className="lg:w-1/3">
                        <div className="aspect-video bg-[#1a1a1a] overflow-hidden border border-white/10">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Post Content */}
                    <div className={post.coverImage ? 'lg:w-2/3' : 'w-full'}>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl font-black text-white/10">{String(index + 1).padStart(2, '0')}</span>
                        <span className="text-white/40 text-sm uppercase tracking-widest">{formatDate(post.createdAt)}</span>
                        {post.published && (
                          <span className="px-2 py-1 bg-[#00ff88]/20 text-[#00ff88] text-xs font-bold uppercase">Published</span>
                        )}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black mb-4 group-hover:text-[#ff3d00] transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-white/60 mb-6 line-clamp-3">{post.excerpt}</p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 border border-white/20 text-xs font-bold uppercase text-white/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-white/40 text-sm">{post.views || 0} views</span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-[#ff3d00] font-bold text-sm uppercase tracking-wider hover:underline"
                        >
                          Read Article →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/50 text-xl">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-[#111]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-4">Stay Updated</p>
          <h2 className="text-3xl md:text-4xl font-black mb-6">Subscribe to Newsletter</h2>
          <p className="text-white/60 mb-8">Get the latest articles and insights delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/5 border-2 border-white/20 text-white placeholder-white/40 font-medium focus:outline-none focus:border-[#ff3d00] transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#ff3d00] text-black font-black uppercase tracking-wider hover:bg-[#00ff88] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
            © 2024 Swikar Singh
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/40 hover:text-[#ff3d00] text-sm font-bold uppercase tracking-widest transition-colors">GitHub</a>
            <a href="#" className="text-white/40 hover:text-[#ff3d00] text-sm font-bold uppercase tracking-widest transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
