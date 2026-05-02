"use client";
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/contact?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem('adminToken');

  const handleMarkRead = async (id) => {
    try {
      const res = await fetch(`${API_URL}/contact/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const res = await fetch(`${API_URL}/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.ok) {
        fetchMessages();
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-white/60">
            {unreadCount > 0 ? `${unreadCount} unread messages` : 'All messages read'}
          </p>
        </div>
        <div className="flex gap-2">
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Layout */}
      <div className="flex gap-6 h-full">
        {/* Messages List */}
        <div className="w-1/3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="h-full overflow-y-auto">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.read) handleMarkRead(msg.id);
                  }}
                  className={`p-4 border-b border-white/10 cursor-pointer transition-colors ${
                    selectedMessage?.id === msg.id
                      ? 'bg-purple-500/20'
                      : 'hover:bg-white/5'
                  } ${!msg.read ? 'bg-white/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      !msg.read
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-white/20'
                    }`}>
                      {msg.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-medium ${!msg.read ? 'text-white' : 'text-white/70'}`}>
                          {msg.name}
                        </span>
                        {!msg.read && (
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-white/60 text-sm truncate">{msg.subject}</p>
                      <p className="text-white/40 text-xs mt-1">{formatDate(msg.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-white/50">
                No messages found
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              {/* Message Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {selectedMessage.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedMessage.name}</h2>
                      <p className="text-purple-400">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                      className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Message Subject */}
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">{selectedMessage.subject}</h3>
                <p className="text-white/40 text-sm">{formatDate(selectedMessage.createdAt)}</p>
              </div>

              {/* Message Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-white/50">
              <div className="text-center">
                <div className="text-6xl mb-4">✉️</div>
                <p>Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
