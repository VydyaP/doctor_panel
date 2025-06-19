import React, { useState } from 'react';
import { Send, Phone, Video, FileText, Image, Paperclip, User, Clock, MoreVertical } from 'lucide-react';

const ConsultationChat: React.FC = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');

  const chatSessions = [
    {
      id: 1,
      patient: {
        name: 'Emma Johnson',
        avatar: 'EJ',
        status: 'online'
      },
      lastMessage: 'Thank you for the prescription',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      sessionType: 'consultation'
    },
    {
      id: 2,
      patient: {
        name: 'John Smith',
        avatar: 'JS',
        status: 'offline'
      },
      lastMessage: 'I have a question about my medication',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      sessionType: 'follow-up'
    },
    {
      id: 3,
      patient: {
        name: 'Sarah Davis',
        avatar: 'SD',
        status: 'online'
      },
      lastMessage: 'See you in our next session',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      sessionType: 'therapy'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'patient',
      content: 'Hello Dr. Wilson, I hope you\'re doing well. I wanted to follow up on our last session.',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'doctor',
      content: 'Hello Emma! I\'m doing well, thank you for asking. How have you been feeling since our last session?',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'patient',
      content: 'I\'ve been following the breathing exercises you recommended. They\'re really helping with my anxiety.',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'doctor',
      content: 'That\'s wonderful to hear! Consistency is key with these exercises. Have you been keeping track of your anxiety levels as we discussed?',
      timestamp: '10:37 AM',
      type: 'text'
    },
    {
      id: 5,
      sender: 'patient',
      content: 'Yes, I\'ve been using the journal app you suggested. Here\'s a summary from this week.',
      timestamp: '10:40 AM',
      type: 'text'
    },
    {
      id: 6,
      sender: 'patient',
      content: 'anxiety_log.pdf',
      timestamp: '10:40 AM',
      type: 'file'
    },
    {
      id: 7,
      sender: 'doctor',
      content: 'Thank you for sharing this. I can see significant improvement in your anxiety levels. Let me prescribe a lower dose of your medication.',
      timestamp: '10:45 AM',
      type: 'text'
    },
    {
      id: 8,
      sender: 'patient',
      content: 'Thank you for the prescription. I really appreciate your help.',
      timestamp: '10:48 AM',
      type: 'text'
    }
  ];

  const activePatient = chatSessions.find(session => session.id === activeChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'bg-green-400' : 'bg-gray-400';
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="glass-card rounded-3xl shadow-2xl h-full flex overflow-hidden animate-fade-in">
        {/* Chat Sessions Sidebar */}
        <div className="w-80 border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Active Consultations</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chatSessions.map((session, index) => (
              <button
                key={session.id}
                onClick={() => setActiveChat(session.id)}
                className={`w-full p-4 text-left hover:bg-white/10 transition-all duration-300 border-b border-white/5 animate-slide-up ${
                  activeChat === session.id ? 'bg-white/20 border-r-2 border-r-white/50' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 gradient-teal rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold">
                        {session.patient.avatar}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(session.patient.status)}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white truncate">
                        {session.patient.name}
                      </p>
                      {session.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          {session.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/70 truncate">
                      {session.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/50">
                        {session.lastMessageTime}
                      </span>
                      <span className="text-xs text-teal-400 capitalize">
                        {session.sessionType}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activePatient && (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-white/10 glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 gradient-teal rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-semibold">
                          {activePatient.patient.avatar}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(activePatient.patient.status)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">
                        {activePatient.patient.name}
                      </h3>
                      <p className="text-sm text-white/70 capitalize">
                        {activePatient.sessionType} • {activePatient.patient.status}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:scale-110">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:scale-110">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:scale-110">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`flex animate-fade-in ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                        msg.sender === 'doctor'
                          ? 'gradient-teal text-white'
                          : 'glass text-white'
                      }`}
                    >
                      {msg.type === 'file' ? (
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{msg.content}</span>
                        </div>
                      ) : (
                        <p className="text-sm">{msg.content}</p>
                      )}
                      <p className={`text-xs mt-2 ${
                        msg.sender === 'doctor' ? 'text-white/70' : 'text-white/50'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-white/10 glass">
                <div className="flex items-center space-x-3">
                  <button className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:scale-110">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:scale-110">
                    <Image className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-3 gradient-teal text-white rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-110 glow"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationChat;