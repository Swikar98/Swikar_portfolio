'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function StackPage() {
  const [skills, setSkills] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API_URL}/skills`);
      const data = await res.json();
      setSkills(data.skills || []);
      setGrouped(data.grouped || {});
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Object.keys(grouped)];
  const filteredSkills = activeCategory === 'all' ? skills : grouped[activeCategory] || [];

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
            <Link href="/blog" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Blog</Link>
            <Link href="/stack" className="text-sm font-bold uppercase tracking-widest text-[#ff3d00]">Stack</Link>
            <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-4">Technologies</p>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            MY TECH<br />
            <span className="text-stroke">STACK</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl">
            The tools and technologies I use to bring ideas to life. Always learning, always evolving.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 font-black text-sm uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#ff3d00] text-black'
                    : 'border-2 border-white/20 text-white/60 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-[#ff3d00] border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="card-brutal p-6 hover-lift group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl">{skill.icon}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-white/30 px-2 py-1 border border-white/10">
                      {skill.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-4 group-hover:text-[#ff3d00] transition-colors">
                    {skill.name}
                  </h3>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-white/40 text-sm">Proficiency</span>
                    <span className="text-[#ff3d00] font-black">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff3d00] to-[#ff6b35] transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-[#111] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: skills.length, label: 'Technologies' },
              { value: Object.keys(grouped).length, label: 'Categories' },
              { value: '2+', label: 'Years Learning' },
              { value: '∞', label: 'Curiosity' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-5xl md:text-6xl font-black text-[#ff3d00] mb-2">{stat.value}</p>
                <p className="text-white/40 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            SWIKAR<span className="text-[#ff3d00]">.</span>
          </Link>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
            © 2024 All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
