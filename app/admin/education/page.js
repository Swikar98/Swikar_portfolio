"use client";
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function EducationPage() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await fetch(`${API_URL}/education`);
      const data = await res.json();
      setEducation(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching education:', error);
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
      endDate: formData.current ? null : formData.endDate,
    };

    try {
      const url = editingEdu
        ? `${API_URL}/education/${editingEdu.id}`
        : `${API_URL}/education`;

      const res = await fetch(url, {
        method: editingEdu ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchEducation();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this education?')) return;

    try {
      const res = await fetch(`${API_URL}/education/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.ok) {
        fetchEducation();
      }
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  const openModal = (edu = null) => {
    if (edu) {
      setEditingEdu(edu);
      setFormData({
        school: edu.school,
        degree: edu.degree,
        field: edu.field,
        startDate: edu.startDate?.split('T')[0] || '',
        endDate: edu.endDate?.split('T')[0] || '',
        current: edu.current,
        description: edu.description || '',
      });
    } else {
      setEditingEdu(null);
      setFormData({
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEdu(null);
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
          <h1 className="text-2xl font-bold text-white">Education</h1>
          <p className="text-white/60">Manage your educational background</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          + Add Education
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-6">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
                  🎓
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-purple-400">{edu.school}</p>
                  <p className="text-white/50 text-sm">{edu.field}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {edu.current && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    Current
                  </span>
                )}
                <span className="text-white/40 text-sm">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
            {edu.description && (
              <p className="text-white/70 mb-4">{edu.description}</p>
            )}
            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => openModal(edu)}
                className="px-3 py-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
                className="px-3 py-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {education.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/50">No education yet. Add your educational background!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-[#1a1a3e] border border-white/20 rounded-2xl w-full max-w-lg">
            <div className="border-b border-white/10 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingEdu ? 'Edit Education' : 'Add Education'}
              </h2>
              <button onClick={closeModal} className="p-2 text-white/60 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">School/University</label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Degree</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Field of Study</label>
                <input
                  type="text"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
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
                <label htmlFor="current" className="text-white/70">Currently studying here</label>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Description (optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 h-24"
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
                  {editingEdu ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
