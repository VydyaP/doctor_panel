import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Video, MoreVertical, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const AppointmentsList: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);

  const appointments = [
    {
      id: 1,
      patient: {
        name: 'John Smith',
        avatar: 'JS',
        age: 35,
        phone: '+1 (555) 123-4567'
      },
      date: '2024-01-15',
      time: '9:00 AM',
      duration: '30 min',
      type: 'Follow-up',
      method: 'video',
      status: 'confirmed',
      notes: 'Follow-up on blood pressure medication'
    },
    {
      id: 2,
      patient: {
        name: 'Emma Johnson',
        avatar: 'EJ',
        age: 28,
        phone: '+1 (555) 234-5678'
      },
      date: '2024-01-15',
      time: '10:30 AM',
      duration: '45 min',
      type: 'Initial Consultation',
      method: 'in-person',
      status: 'pending',
      notes: 'New patient - anxiety consultation'
    },
    {
      id: 3,
      patient: {
        name: 'Michael Brown',
        avatar: 'MB',
        age: 42,
        phone: '+1 (555) 345-6789'
      },
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '30 min',
      type: 'Check-up',
      method: 'in-person',
      status: 'confirmed',
      notes: 'Routine physical examination'
    },
    {
      id: 4,
      patient: {
        name: 'Sarah Davis',
        avatar: 'SD',
        age: 31,
        phone: '+1 (555) 456-7890'
      },
      date: '2024-01-15',
      time: '3:30 PM',
      duration: '60 min',
      type: 'Therapy Session',
      method: 'video',
      status: 'confirmed',
      notes: 'CBT session - session 6 of 12'
    },
    {
      id: 5,
      patient: {
        name: 'David Wilson',
        avatar: 'DW',
        age: 55,
        phone: '+1 (555) 567-8901'
      },
      date: '2024-01-16',
      time: '11:00 AM',
      duration: '30 min',
      type: 'Follow-up',
      method: 'phone',
      status: 'rescheduled',
      notes: 'Diabetes management follow-up'
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: appointments.length },
    { id: 'today', label: 'Today', count: 4 },
    { id: 'pending', label: 'Pending', count: 1 },
    { id: 'confirmed', label: 'Confirmed', count: 3 },
    { id: 'rescheduled', label: 'Rescheduled', count: 1 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'rescheduled':
        return 'bg-blue-500/20 text-blue-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const handleAction = (appointmentId: number, action: string) => {
    console.log(`${action} appointment ${appointmentId}`);
    setSelectedAppointment(null);
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-2 glass-card p-2 rounded-2xl shadow-lg animate-slide-up">
        {filters.map((filter, index) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in ${
              selectedFilter === filter.id
                ? 'glass text-white shadow-lg glow'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span>{filter.label}</span>
            <span className={`px-2.5 py-1 rounded-full text-xs ${
              selectedFilter === filter.id
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white/60'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <div 
            key={appointment.id} 
            className="glass-card rounded-3xl shadow-xl p-6 hover-lift animate-fade-in glow"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="w-14 h-14 gradient-teal rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-semibold">
                    {appointment.patient.avatar}
                  </span>
                </div>

                {/* Patient Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {appointment.patient.name}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time} ({appointment.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(appointment.method)}
                      <span className="capitalize">{appointment.method}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{appointment.type}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="p-4 glass rounded-2xl">
                      <p className="text-sm text-white/80">{appointment.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="relative">
                <button
                  onClick={() => setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)}
                  className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:scale-110"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {selectedAppointment === appointment.id && (
                  <div className="absolute right-0 top-12 w-48 glass-card rounded-2xl shadow-2xl py-2 z-10 animate-scale-in">
                    <button
                      onClick={() => handleAction(appointment.id, 'accept')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-green-400 hover:bg-green-500/20 transition-all duration-300 rounded-xl mx-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleAction(appointment.id, 'reschedule')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-blue-400 hover:bg-blue-500/20 transition-all duration-300 rounded-xl mx-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reschedule</span>
                    </button>
                    <button
                      onClick={() => handleAction(appointment.id, 'cancel')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-400 hover:bg-red-500/20 transition-all duration-300 rounded-xl mx-2"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-white/10">
              <button className="btn-primary flex items-center space-x-2">
                {appointment.method === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                <span>Start Session</span>
              </button>
              <button className="btn-secondary">
                View Patient
              </button>
              <button className="px-6 py-3 text-white/70 border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105">
                Send Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;