import React from 'react';
import { Calendar, Users, MessageCircle, Clock, TrendingUp, Activity, ArrowUp, ArrowDown } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: 'Today\'s Appointments',
      value: '8',
      change: '+2 from yesterday',
      trend: 'up',
      icon: Calendar,
      gradient: 'gradient-blue',
      glow: 'glow-blue'
    },
    {
      title: 'Active Patients',
      value: '142',
      change: '+5 this week',
      trend: 'up',
      icon: Users,
      gradient: 'gradient-teal',
      glow: 'glow'
    },
    {
      title: 'Messages',
      value: '23',
      change: '12 unread',
      trend: 'neutral',
      icon: MessageCircle,
      gradient: 'gradient-purple',
      glow: 'glow-purple'
    },
    {
      title: 'Hours Today',
      value: '6.5',
      change: 'On schedule',
      trend: 'up',
      icon: Clock,
      gradient: 'gradient-teal',
      glow: 'glow'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'John Smith',
      time: '9:00 AM',
      type: 'Follow-up',
      status: 'confirmed',
      avatar: 'JS'
    },
    {
      id: 2,
      patient: 'Emma Johnson',
      time: '10:30 AM',
      type: 'Consultation',
      status: 'pending',
      avatar: 'EJ'
    },
    {
      id: 3,
      patient: 'Michael Brown',
      time: '2:00 PM',
      type: 'Check-up',
      status: 'confirmed',
      avatar: 'MB'
    },
    {
      id: 4,
      patient: 'Sarah Davis',
      time: '3:30 PM',
      type: 'Therapy Session',
      status: 'confirmed',
      avatar: 'SD'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Completed consultation',
      patient: 'Alice Wilson',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      action: 'Updated availability',
      patient: null,
      time: '4 hours ago',
      type: 'info'
    },
    {
      id: 3,
      action: 'New appointment booked',
      patient: 'David Chen',
      time: '6 hours ago',
      type: 'success'
    },
    {
      id: 4,
      action: 'Prescription sent',
      patient: 'Maria Garcia',
      time: '1 day ago',
      type: 'info'
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-400" />;
    return null;
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 text-green-400';
      case 'info':
        return 'bg-blue-500/20 text-blue-400';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className={`glass-card p-6 rounded-3xl shadow-xl hover-lift animate-scale-in ${stat.glow}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 ${stat.gradient} rounded-2xl shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {getTrendIcon(stat.trend)}
              </div>
              <div>
                <p className="text-sm font-medium text-white/70 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-sm text-white/60 flex items-center space-x-1">
                  {getTrendIcon(stat.trend)}
                  <span>{stat.change}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="glass-card rounded-3xl shadow-xl hover-lift animate-fade-in">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Today's Schedule</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div 
                  key={appointment.id} 
                  className="flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-teal rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold text-sm">
                        {appointment.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{appointment.patient}</p>
                      <p className="text-sm text-white/70">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{appointment.time}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-white/70 hover:text-white font-medium text-sm hover:bg-white/10 rounded-2xl transition-all duration-300">
              View All Appointments
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card rounded-3xl shadow-xl hover-lift animate-fade-in">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-start space-x-4 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">
                      {activity.action}
                      {activity.patient && (
                        <span className="font-semibold"> for {activity.patient}</span>
                      )}
                    </p>
                    <p className="text-xs text-white/50 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-white/70 hover:text-white font-medium text-sm hover:bg-white/10 rounded-2xl transition-all duration-300">
              View All Activity
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-3xl shadow-xl p-6 animate-fade-in">
        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: 'Block Time', gradient: 'gradient-blue' },
            { icon: Users, label: 'Add Patient', gradient: 'gradient-teal' },
            { icon: MessageCircle, label: 'Send Message', gradient: 'gradient-purple' },
            { icon: TrendingUp, label: 'View Reports', gradient: 'gradient-blue' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button 
                key={index}
                className="flex items-center space-x-3 p-6 glass rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-3 ${action.gradient} rounded-xl shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-white">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;