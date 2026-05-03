'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`${API_URL}/blog/${params.slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      setError('Failed to load post');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff3d00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-4">404</h1>
          <p className="text-white/60 mb-8">{error || 'Post not found'}</p>
          <Link href="/blog" className="px-8 py-4 bg-[#ff3d00] text-black font-black uppercase">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Article Header */}
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/blog" className="text-white/60 hover:text-white transition-colors">Blog</Link>
            <span className="text-white/30">/</span>
            <span className="text-[#ff3d00]">{post.title}</span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-white/40 uppercase tracking-widest text-sm">{formatDate(post.createdAt)}</span>
            <span className="text-white/20">•</span>
            <span className="text-white/40 text-sm">{post.views || 0} views</span>
            {post.published && (
              <>
                <span className="text-white/20">•</span>
                <span className="px-2 py-1 bg-[#00ff88]/20 text-[#00ff88] text-xs font-bold uppercase">Published</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{post.title}</h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 border-2 border-white/20 text-sm font-bold uppercase text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-12">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full aspect-video object-cover border-2 border-white/10"
              />
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-white/70 leading-relaxed mb-12 border-l-4 border-[#ff3d00] pl-6">
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-white/80 leading-relaxed space-y-6"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {post.content}
            </div>
          </div>

          {/* Author */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff3d00] to-[#ff6b35] flex items-center justify-center text-2xl font-black text-black">
                S
              </div>
              <div>
                <p className="text-white font-black">Swikar Singh</p>
                <p className="text-white/60 text-sm">Frontend Developer</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-white/60 hover:text-[#ff3d00] transition-colors font-bold uppercase text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

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
