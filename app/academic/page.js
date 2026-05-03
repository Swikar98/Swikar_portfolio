'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AcademicPage() {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eduRes, expRes] = await Promise.all([
        fetch(`${API_URL}/education`),
        fetch(`${API_URL}/experience`),
      ]);
      const eduData = await eduRes.json();
      const expData = await expRes.json();

      setEducation(Array.isArray(eduData) ? eduData : []);
      setExperience(Array.isArray(expData) ? expData : []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
            <Link href="/blog" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Blog</Link>
            <Link href="/academic" className="text-sm font-bold uppercase tracking-widest text-[#ff3d00]">Academic</Link>
            <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-4">Background</p>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            ACADEMIC<br />
            <span className="text-stroke">JOURNEY</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl">
            My educational path and professional experience that shaped who I am today.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-[#ff3d00] border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Education Section */}
          <section className="px-6 pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-[#00ff88] font-black uppercase tracking-widest text-sm mb-2">Education</p>
                  <h2 className="text-4xl md:text-5xl font-black">DEGREES</h2>
                </div>
                <span className="text-6xl font-black text-white/10">{String(education.length).padStart(2, '0')}</span>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="card-brutal p-8 hover-lift group">
                    <div className="grid md:grid-cols-[auto,1fr] gap-8">
                      <div className="text-center md:text-left">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00ff88] text-black text-3xl font-black mb-4">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
                          {formatDate(edu.startDate)}
                        </p>
                        <p className="text-white/40 text-sm">to</p>
                        <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
                          {formatDate(edu.endDate)}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-black mb-2 group-hover:text-[#00ff88] transition-colors">
                              {edu.degree}
                            </h3>
                            <p className="text-[#ff3d00] font-bold text-lg">{edu.school}</p>
                          </div>
                          {edu.current && (
                            <span className="px-3 py-1 bg-[#00ff88] text-black text-xs font-black uppercase">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-white/50 font-bold uppercase tracking-widest text-sm mb-4">
                          {edu.field}
                        </p>
                        {edu.description && (
                          <p className="text-white/40 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="px-6 pb-32 bg-[#111] py-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-[#ff3d00] font-black uppercase tracking-widest text-sm mb-2">Career</p>
                  <h2 className="text-4xl md:text-5xl font-black">EXPERIENCE</h2>
                </div>
                <span className="text-6xl font-black text-white/10">{String(experience.length).padStart(2, '0')}</span>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>

                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="relative md:pl-20">
                      {/* Timeline Dot */}
                      <div className="absolute left-6 top-8 w-5 h-5 bg-[#ff3d00] border-4 border-[#111] hidden md:block"></div>

                      <div className="card-brutal p-8 hover-lift group">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                          <div>
                            <h3 className="text-2xl font-black mb-2 group-hover:text-[#ff3d00] transition-colors">
                              {exp.position}
                            </h3>
                            <p className="text-[#ff3d00] font-bold text-lg">{exp.company}</p>
                            <p className="text-white/40 text-sm">{exp.location}</p>
                          </div>
                          <div className="text-right">
                            {exp.current ? (
                              <span className="px-4 py-2 bg-[#00ff88] text-black text-xs font-black uppercase">
                                Current Role
                              </span>
                            ) : (
                              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
                                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="text-white/50 leading-relaxed mb-6">{exp.description}</p>

                        {exp.responsibilities?.length > 0 && (
                          <div className="mb-6">
                            <p className="text-white/30 font-black uppercase tracking-widest text-xs mb-3">Key Responsibilities</p>
                            <ul className="space-y-2">
                              {exp.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                                  <span className="text-[#ff3d00] mt-1">→</span>
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {exp.technologies?.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                            {exp.technologies.map((tech, i) => (
                              <span key={i} className="px-3 py-1 border border-white/20 text-xs font-bold uppercase text-white/60">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            WANT TO<br />
            <span className="text-[#ff3d00]">COLLABORATE?</span>
          </h2>
          <p className="text-white/50 text-lg mb-12">
            I&apos;m always open to discussing new projects and opportunities.
          </p>
          <Link href="/#contact" className="inline-block px-12 py-6 bg-[#ff3d00] text-black font-black text-lg uppercase tracking-wider hover:bg-[#00ff88] transition-colors">
            Get In Touch
          </Link>
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
