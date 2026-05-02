"use client";
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 80,
    icon: '',
  });

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
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem('adminToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    try {
      const url = editingSkill
        ? `${API_URL}/skills/${editingSkill.id}`
        : `${API_URL}/skills`;

      const res = await fetch(url, {
        method: editingSkill ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchSkills();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const res = await fetch(`${API_URL}/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.ok) {
        fetchSkills();
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const openModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        icon: skill.icon || '',
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: '',
        category: 'Frontend',
        level: 80,
        icon: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSkill(null);
  };

  const categories = ['Frontend', 'Backend', 'Tools'];

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
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="text-white/60">Manage your technical skills</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          + Add Skill
        </button>
      </div>

      {/* Skills by Category */}
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>{category === 'Frontend' ? '🎨' : category === 'Backend' ? '⚙️' : '🛠️'}</span>
            {category}
            <span className="text-white/40 text-sm font-normal">({grouped[category]?.length || 0})</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(grouped[category] || []).map((skill) => (
              <div
                key={skill.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon || '💻'}</span>
                    <span className="text-white font-medium">{skill.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openModal(skill)}
                      className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1">
                  <span className="text-white/50 text-sm">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/50">No skills yet. Add your first skill!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-[#1a1a3e] border border-white/20 rounded-2xl w-full max-w-md">
            <div className="border-b border-white/10 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingSkill ? 'Edit Skill' : 'Add Skill'}
              </h2>
              <button onClick={closeModal} className="p-2 text-white/60 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Level ({formData.level}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Icon (emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  placeholder="🚀"
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
                  {editingSkill ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
