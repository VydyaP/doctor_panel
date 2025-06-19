import React, { useState } from 'react';
import { Bell, Calendar, User, MessageCircle, AlertCircle, CheckCircle, Clock, MoreVertical } from 'lucide-react';

const NotificationsList: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment Request',
      message: 'Emma Johnson has requested an appointment for Jan 15, 2024 at 10:30 AM',
      time: '5 minutes ago',
      unread: true,
      priority: 'high',
      action: 'Accept/Decline appointment request'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message from John Smith',
      message: 'Patient has sent a message regarding their medication side effects',
      time: '15 minutes ago',
      unread: true,
      priority: 'medium',
      action: 'View message'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Upcoming Appointment Reminder',
      message: 'You have an appointment with Michael Brown in 30 minutes',
      time: '30 minutes ago',
      unread: false,
      priority: 'medium',
      action: 'View appointment details'
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile Verification Complete',
      message: 'Your professional credentials have been verified successfully',
      time: '2 hours ago',
      unread: false,
      priority: 'low',
      action: 'View profile'
    },
    {
      id: 5,
      type: 'appointment',
      title: 'Appointment Cancelled',
      message: 'David Wilson has cancelled their appointment scheduled for Jan 16, 2024',
      time: '3 hours ago',
      unread: true,
      priority: 'medium',
      action: 'Update schedule'
    },
    {
      id: 6,
      type: 'message',
      title: 'Follow-up Required',
      message: 'Sarah Davis needs follow-up after yesterday\'s therapy session',
      time: '1 day ago',
      unread: false,
      priority: 'high',
      action: 'Schedule follow-up'
    }
  ]);

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => n.unread).length },
    { id: 'appointment', label: 'Appointments', count: notifications.filter(n => n.type === 'appointment').length },
    { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'reminder', label: 'Reminders', count: notifications.filter(n => n.type === 'reminder').length }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-5 h-5" />;
      case 'message':
        return <MessageCircle className="w-5 h-5" />;
      case 'reminder':
        return <Clock className="w-5 h-5" />;
      case 'system':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconGradient = (type: string, priority: string) => {
    if (priority === 'high') return 'gradient-purple';
    if (priority === 'medium') return 'gradient-blue';
    
    switch (type) {
      case 'appointment':
        return 'gradient-blue';
      case 'message':
        return 'gradient-teal';
      case 'reminder':
        return 'gradient-purple';
      case 'system':
        return 'gradient-teal';
      default:
        return 'gradient-teal';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification.unread;
    return notification.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h2 className="text-3xl font-bold text-white">Notifications</h2>
          <p className="text-white/70">Stay updated with important alerts and messages</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="btn-secondary"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 glass-card p-2 rounded-2xl shadow-lg animate-slide-up">
        {filters.map((filterOption, index) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in ${
              filter === filterOption.id
                ? 'glass text-white shadow-lg glow'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span>{filterOption.label}</span>
            <span className={`px-2.5 py-1 rounded-full text-xs ${
              filter === filterOption.id
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white/60'
            }`}>
              {filterOption.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`glass-card rounded-3xl shadow-xl p-6 hover-lift animate-fade-in glow ${
              notification.unread ? 'border-l-4 border-l-teal-400' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`p-3 ${getIconGradient(notification.type, notification.priority)} rounded-2xl shadow-lg`}>
                {getIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-lg font-bold ${notification.unread ? 'text-white' : 'text-white/80'}`}>
                        {notification.title}
                      </h3>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                    </div>
                    <p className="text-white/70 mb-2">{notification.message}</p>
                    <p className="text-sm text-white/50">{notification.time}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {notification.unread && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-teal-400 hover:text-teal-300 hover:bg-teal-500/20 rounded-2xl transition-all duration-300 transform hover:scale-110"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <div className="relative">
                      <button className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:scale-110">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <button className="text-teal-400 hover:text-teal-300 font-medium text-sm hover:underline transition-colors duration-300">
                    {notification.action}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-16 h-16 glass rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-white/50" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No notifications</h3>
          <p className="text-white/60">
            {filter === 'all' 
              ? "You're all caught up! No new notifications."
              : `No ${filter} notifications at the moment.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;