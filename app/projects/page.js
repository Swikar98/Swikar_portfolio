'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects?limit=50`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

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
            <Link href="/projects" className="text-sm font-bold uppercase tracking-widest text-[#ff3d00]">Projects</Link>
            <Link href="/blog" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-4">Portfolio</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            ALL<br /><span className="text-stroke">PROJECTS</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            A collection of projects I have worked on, from web applications to full-stack solutions.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all ${
                  filter === cat
                    ? 'bg-[#ff3d00] text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#ff3d00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="group card-brutal p-6 hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl font-black text-white/10">{String(index + 1).padStart(2, '0')}</span>
                    {project.featured && (
                      <span className="px-3 py-1 bg-[#ff3d00] text-black text-xs font-black uppercase">Featured</span>
                    )}
                  </div>

                  {project.image && (
                    <div className="aspect-video bg-[#1a1a1a] mb-6 overflow-hidden border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-black mb-2 group-hover:text-[#ff3d00] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-1 border border-white/20 text-xs font-bold uppercase text-white/60">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-white/40 text-sm uppercase">{project.category}</span>
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                           className="text-[#ff3d00] text-sm font-bold uppercase hover:underline">
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                           className="text-white/60 text-sm font-bold uppercase hover:text-white">
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/50 text-xl">No projects found in this category.</p>
            </div>
          )}
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
