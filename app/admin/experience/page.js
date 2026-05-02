"use client";
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    responsibilities: '',
    technologies: '',
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch(`${API_URL}/experience`);
      const data = await res.json();
      setExperiences(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
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
      responsibilities: formData.responsibilities.split('\n').filter(Boolean),
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      endDate: formData.current ? null : formData.endDate,
    };

    try {
      const url = editingExp
        ? `${API_URL}/experience/${editingExp.id}`
        : `${API_URL}/experience`;

      const res = await fetch(url, {
        method: editingExp ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchExperiences();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const res = await fetch(`${API_URL}/experience/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.ok) {
        fetchExperiences();
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const openModal = (exp = null) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        company: exp.company,
        position: exp.position,
        location: exp.location,
        startDate: exp.startDate?.split('T')[0] || '',
        endDate: exp.endDate?.split('T')[0] || '',
        current: exp.current,
        description: exp.description,
        responsibilities: exp.responsibilities?.join('\n') || '',
        technologies: exp.technologies?.join(', ') || '',
      });
    } else {
      setEditingExp(null);
      setFormData({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        responsibilities: '',
        technologies: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingExp(null);
  };

  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
          <h1 className="text-2xl font-bold text-white">Experience</h1>
          <p className="text-white/60">Manage your work experience</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          + Add Experience
        </button>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {exp.company?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{exp.position}</h3>
                  <p className="text-purple-400">{exp.company}</p>
                  <p className="text-white/50 text-sm">{exp.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {exp.current && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    Current
                  </span>
                )}
                <span className="text-white/40 text-sm">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
              </div>
            </div>
            <p className="text-white/70 mb-4">{exp.description}</p>
            {exp.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => openModal(exp)}
                className="px-3 py-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="px-3 py-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/50">No experience yet. Add your first job!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-[#1a1a3e] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a3e] border-b border-white/10 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingExp ? 'Edit Experience' : 'Add Experience'}
              </h2>
              <button onClick={closeModal} className="p-2 text-white/60 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    disabled={formData.current}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="current"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                  className="w-5 h-5 rounded bg-white/10 border-white/20"
                />
                <label htmlFor="current" className="text-white/70">Currently working here</label>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Responsibilities (one per line)</label>
                <textarea
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 h-24"
                  placeholder="Developed new features&#10;Collaborated with team&#10;Improved performance"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  placeholder="React, Node.js, MongoDB"
                />
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
                  {editingExp ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
