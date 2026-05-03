'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, skillRes, expRes] = await Promise.all([
        fetch(`${API_URL}/projects`),
        fetch(`${API_URL}/skills`),
        fetch(`${API_URL}/experience`),
      ]);
      const projData = await projRes.json();
      const skillData = await skillRes.json();
      const expData = await expRes.json();

      setProjects(projData.projects || []);
      setSkills(skillData.skills || []);
      setExperience(Array.isArray(expData) ? expData : []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="noise"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            SWIKAR<span className="text-[#ff3d00]">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-12">
            <a href="#work" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Work</a>
            <a href="#about" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">About</a>
            <a href="#skills" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative grid-pattern">
        <div className="max-w-7xl mx-auto px-6 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 border-2 border-[#ff3d00] text-[#ff3d00] text-xs font-black uppercase tracking-widest mb-8">
                Available for work
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-8">
                FRONTEND
                <br />
                <span className="text-stroke">DEVELOPER</span>
              </h1>
              <p className="text-xl text-white/60 max-w-lg mb-12 leading-relaxed">
                I build bold digital experiences that make an impact. Clean code, striking design, zero compromises.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#work" className="btn-bold px-8 py-4 text-sm">
                  <span>View Work</span>
                </a>
                <a href="#contact" className="px-8 py-4 border-2 border-white text-sm font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all">
                  Contact Me
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-[#111] border-2 border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[200px] font-black text-white/5">SS</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black">
                  <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm">Swikar Singh</p>
                  <p className="text-white/60 text-sm">Kathmandu, Nepal</p>
                </div>
              </div>
              {/* Stats */}
              <div className="absolute -bottom-8 -right-8 bg-[#ff3d00] text-black p-6">
                <p className="text-4xl font-black">2+</p>
                <p className="text-xs font-bold uppercase">Years Exp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-8 bg-[#ff3d00] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black font-black text-2xl uppercase tracking-widest mx-8">
              React • Next.js • TypeScript • Node.js • Tailwind • MongoDB •
            </span>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-4">Portfolio</p>
              <h2 className="text-5xl md:text-7xl font-black">SELECTED<br />WORKS</h2>
            </div>
            <p className="text-6xl font-black text-white/10">{String(projects.length).padStart(2, '0')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project, index) => (
              <div key={project.id} className="group card-brutal p-6 hover-lift">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-black text-white/10">{String(index + 1).padStart(2, '0')}</span>
                  {project.featured && (
                    <span className="px-3 py-1 bg-[#ff3d00] text-black text-xs font-black uppercase">Featured</span>
                  )}
                </div>
                {project.image && (
                  <div className="aspect-video bg-[#1a1a1a] mb-6 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2 group-hover:text-[#ff3d00] transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-3 py-1 border border-white/20 text-xs font-bold uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-white/40 text-sm">{project.category}</span>
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#ff3d00] text-sm font-bold uppercase hover:underline">
                        Live →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm font-bold uppercase hover:text-white">
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-4">About</p>
              <h2 className="text-5xl md:text-7xl font-black mb-8">
                I BUILD<br />
                <span className="text-stroke">THINGS</span>
              </h2>
              <p className="text-xl text-white/60 leading-relaxed mb-8">
                I&apos;m a passionate frontend developer based in Kathmandu, Nepal. I specialize in building modern, performant web applications with React and Next.js.
              </p>
              <p className="text-white/40 leading-relaxed mb-12">
                With a BCA degree and hands-on experience, I transform complex problems into simple, beautiful solutions. I believe in clean code, bold design, and creating experiences that matter.
              </p>
              <a href="#contact" className="inline-block px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-wider hover:bg-[#ff3d00] transition-colors">
                Let&apos;s Talk
              </a>
            </div>
            <div>
              <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-8">Experience</p>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-white/20 pl-6 hover:border-[#ff3d00] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-black">{exp.position}</h3>
                      {exp.current && (
                        <span className="px-2 py-1 bg-[#00ff88] text-black text-xs font-black">NOW</span>
                      )}
                    </div>
                    <p className="text-[#ff3d00] font-bold mb-2">{exp.company}</p>
                    <p className="text-white/40 text-sm">{exp.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-4">Expertise</p>
            <h2 className="text-5xl md:text-7xl font-black">SKILLS</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.slice(0, 8).map((skill) => (
              <div key={skill.id} className="card-brutal p-6 hover-lift group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{skill.icon}</span>
                  <span className="text-3xl font-black text-white/10 group-hover:text-[#ff3d00] transition-colors">
                    {skill.level}%
                  </span>
                </div>
                <h3 className="text-lg font-black mb-2">{skill.name}</h3>
                <div className="h-1 bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#ff3d00] transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/stack" className="inline-block px-8 py-4 border-2 border-white font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all">
              View All Skills
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-[#ff3d00]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-black/60 font-black uppercase tracking-widest text-sm mb-4">Get in touch</p>
          <h2 className="text-5xl md:text-8xl font-black text-black mb-8">
            LET&apos;S WORK<br />TOGETHER
          </h2>
          <p className="text-xl text-black/70 max-w-2xl mx-auto mb-12">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something bold together.
          </p>
          <a
            href="mailto:swikar@example.com"
            className="inline-block px-12 py-6 bg-black text-white font-black text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all"
          >
            Say Hello
          </a>
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
            <a href="#" className="text-white/40 hover:text-[#ff3d00] text-sm font-bold uppercase tracking-widest transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
