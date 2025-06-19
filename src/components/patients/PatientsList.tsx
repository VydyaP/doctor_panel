import React, { useState } from 'react';
import { Search, Filter, MoreVertical, User, Calendar, MessageCircle, FileText, Star } from 'lucide-react';

const PatientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const patients = [
    {
      id: 1,
      name: 'John Smith',
      avatar: 'JS',
      age: 35,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-01-15',
      status: 'Active',
      condition: 'Hypertension',
      notes: 'Regular follow-ups needed',
      rating: 5
    },
    {
      id: 2,
      name: 'Emma Johnson',
      avatar: 'EJ',
      age: 28,
      gender: 'Female',
      phone: '+1 (555) 234-5678',
      email: 'emma.johnson@email.com',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-15',
      status: 'New',
      condition: 'Anxiety',
      notes: 'First consultation scheduled',
      rating: null
    },
    {
      id: 3,
      name: 'Michael Brown',
      avatar: 'MB',
      age: 42,
      gender: 'Male',
      phone: '+1 (555) 345-6789',
      email: 'michael.brown@email.com',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-01-15',
      status: 'Active',
      condition: 'Diabetes Type 2',
      notes: 'Medication adjustment needed',
      rating: 5
    },
    {
      id: 4,
      name: 'Sarah Davis',
      avatar: 'SD',
      age: 31,
      gender: 'Female',
      phone: '+1 (555) 456-7890',
      email: 'sarah.davis@email.com',
      lastVisit: '2024-01-12',
      nextAppointment: '2024-01-15',
      status: 'Active',
      condition: 'Depression',
      notes: 'CBT therapy in progress',
      rating: 5
    },
    {
      id: 5,
      name: 'David Wilson',
      avatar: 'DW',
      age: 55,
      gender: 'Male',
      phone: '+1 (555) 567-8901',
      email: 'david.wilson@email.com',
      lastVisit: '2024-01-03',
      nextAppointment: '2024-01-16',
      status: 'Inactive',
      condition: 'Chronic Pain',
      notes: 'Missed last two appointments',
      rating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400';
      case 'New':
        return 'bg-blue-500/20 text-blue-400';
      case 'Inactive':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-white/50 text-sm">No rating</span>;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`}
          />
        ))}
        <span className="text-sm text-white/60 ml-1">({rating}/5)</span>
      </div>
    );
  };

  const handlePatientAction = (patientId: number, action: string) => {
    console.log(`${action} patient ${patientId}`);
    setSelectedPatient(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between animate-slide-up">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-white/50 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 w-80 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 glass text-white hover:bg-white/20 rounded-2xl transition-all duration-300 transform hover:scale-105">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        <button className="btn-primary">
          Add New Patient
        </button>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {patients.map((patient, index) => (
          <div 
            key={patient.id} 
            className="glass-card rounded-3xl shadow-xl p-6 hover-lift animate-fade-in glow"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 gradient-teal rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {patient.avatar}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {patient.name}
                  </h3>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-white/70">{patient.age} years, {patient.gender}</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>
                  {renderStars(patient.rating)}
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setSelectedPatient(selectedPatient === patient.id ? null : patient.id)}
                  className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:scale-110"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {selectedPatient === patient.id && (
                  <div className="absolute right-0 top-12 w-48 glass-card rounded-2xl shadow-2xl py-2 z-10 animate-scale-in">
                    <button
                      onClick={() => handlePatientAction(patient.id, 'view')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white/80 hover:bg-white/10 transition-all duration-300 rounded-xl mx-2"
                    >
                      <User className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={() => handlePatientAction(patient.id, 'schedule')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white/80 hover:bg-white/10 transition-all duration-300 rounded-xl mx-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Appointment</span>
                    </button>
                    <button
                      onClick={() => handlePatientAction(patient.id, 'message')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white/80 hover:bg-white/10 transition-all duration-300 rounded-xl mx-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                    <button
                      onClick={() => handlePatientAction(patient.id, 'records')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white/80 hover:bg-white/10 transition-all duration-300 rounded-xl mx-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Medical Records</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Patient Details */}
            <div className="grid grid-cols-2 gap-4 text-sm text-white/70 mb-4">
              <div>
                <span className="font-medium">Condition:</span>
                <p className="text-white">{patient.condition}</p>
              </div>
              <div>
                <span className="font-medium">Last Visit:</span>
                <p className="text-white">{patient.lastVisit}</p>
              </div>
              <div>
                <span className="font-medium">Next Appointment:</span>
                <p className="text-white">{patient.nextAppointment}</p>
              </div>
              <div>
                <span className="font-medium">Phone:</span>
                <p className="text-white">{patient.phone}</p>
              </div>
            </div>

            {patient.notes && (
              <div className="mb-4 p-4 glass rounded-2xl">
                <span className="font-medium text-sm text-white/70">Notes:</span>
                <p className="text-sm text-white/80 mt-1">{patient.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
                <User className="w-4 h-4" />
                <span>View Profile</span>
              </button>
              <button className="btn-secondary flex-1 flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Message</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;