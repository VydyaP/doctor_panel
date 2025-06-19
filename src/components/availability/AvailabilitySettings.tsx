import React, { useState } from 'react';
import { Calendar, Clock, Plus, X, Save } from 'lucide-react';

const AvailabilitySettings: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [availability, setAvailability] = useState({
    monday: [{ start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } }],
    tuesday: [{ start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } }],
    wednesday: [{ start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } }],
    thursday: [{ start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } }],
    friday: [{ start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } }],
    saturday: [],
    sunday: []
  });

  const [timeOff, setTimeOff] = useState([
    {
      id: 1,
      title: 'Medical Conference',
      start: '2024-01-20',
      end: '2024-01-22',
      type: 'conference'
    },
    {
      id: 2,
      title: 'Personal Leave',
      start: '2024-02-15',
      end: '2024-02-16',
      type: 'personal'
    }
  ]);

  const [newTimeOff, setNewTimeOff] = useState({
    title: '',
    start: '',
    end: '',
    type: 'personal'
  });

  const [showAddTimeOff, setShowAddTimeOff] = useState(false);

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  const handleAvailabilityChange = (day: string, index: number, field: string, value: string) => {
    setAvailability(prev => {
      const daySchedule = [...prev[day as keyof typeof prev]];
      if (field.includes('break.')) {
        const breakField = field.split('.')[1];
        daySchedule[index] = {
          ...daySchedule[index],
          break: {
            ...daySchedule[index].break,
            [breakField]: value
          }
        };
      } else {
        daySchedule[index] = { ...daySchedule[index], [field]: value };
      }
      return { ...prev, [day]: daySchedule };
    });
  };

  const addTimeSlot = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: [...prev[day as keyof typeof prev], { start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } }]
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setAvailability(prev => {
      const daySchedule = [...prev[day as keyof typeof prev]];
      daySchedule.splice(index, 1);
      return { ...prev, [day]: daySchedule };
    });
  };

  const handleAddTimeOff = () => {
    if (newTimeOff.title && newTimeOff.start && newTimeOff.end) {
      setTimeOff(prev => [...prev, { 
        ...newTimeOff, 
        id: Date.now() 
      }]);
      setNewTimeOff({ title: '', start: '', end: '', type: 'personal' });
      setShowAddTimeOff(false);
    }
  };

  const removeTimeOff = (id: number) => {
    setTimeOff(prev => prev.filter(item => item.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conference':
        return 'bg-blue-500/20 text-blue-400';
      case 'vacation':
        return 'bg-green-500/20 text-green-400';
      case 'sick':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h2 className="text-3xl font-bold text-white">Availability Settings</h2>
          <p className="text-white/70">Set your working hours and manage time off</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <div className="glass-card rounded-3xl shadow-xl p-6 animate-fade-in glow">
          <h3 className="text-xl font-bold text-white mb-6">Weekly Schedule</h3>
          
          <div className="space-y-4">
            {daysOfWeek.map((day, dayIndex) => (
              <div 
                key={day.key} 
                className="glass rounded-2xl p-4 animate-slide-up"
                style={{ animationDelay: `${dayIndex * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{day.label}</h4>
                  <button
                    onClick={() => addTimeSlot(day.key)}
                    className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors duration-300"
                  >
                    Add Time Slot
                  </button>
                </div>
                
                {availability[day.key as keyof typeof availability].length === 0 ? (
                  <p className="text-white/50 text-sm">Not available</p>
                ) : (
                  <div className="space-y-2">
                    {availability[day.key as keyof typeof availability].map((slot, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <select
                          value={slot.start}
                          onChange={(e) => handleAvailabilityChange(day.key, index, 'start', e.target.value)}
                          className="px-3 py-2 glass text-white rounded-xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                        >
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="bg-gray-800">{time}</option>
                          ))}
                        </select>
                        
                        <span className="text-white/50">to</span>
                        
                        <select
                          value={slot.end}
                          onChange={(e) => handleAvailabilityChange(day.key, index, 'end', e.target.value)}
                          className="px-3 py-2 glass text-white rounded-xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                        >
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="bg-gray-800">{time}</option>
                          ))}
                        </select>
                        
                        <span className="text-white/50">|</span>
                        <span className="text-white/50 text-xs">Break:</span>
                        
                        <select
                          value={slot.break.start}
                          onChange={(e) => handleAvailabilityChange(day.key, index, 'break.start', e.target.value)}
                          className="px-2 py-1 glass text-white rounded-lg focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300 text-xs"
                        >
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="bg-gray-800">{time}</option>
                          ))}
                        </select>
                        
                        <span className="text-white/50 text-xs">to</span>
                        
                        <select
                          value={slot.break.end}
                          onChange={(e) => handleAvailabilityChange(day.key, index, 'break.end', e.target.value)}
                          className="px-2 py-1 glass text-white rounded-lg focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300 text-xs"
                        >
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="bg-gray-800">{time}</option>
                          ))}
                        </select>
                        
                        <button
                          onClick={() => removeTimeSlot(day.key, index)}
                          className="text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time Off Management */}
        <div className="glass-card rounded-3xl shadow-xl p-6 animate-fade-in glow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Time Off</h3>
            <button
              onClick={() => setShowAddTimeOff(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Time Off</span>
            </button>
          </div>

          {/* Add Time Off Form */}
          {showAddTimeOff && (
            <div className="mb-6 p-4 glass rounded-2xl animate-scale-in">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Title</label>
                  <input
                    type="text"
                    value={newTimeOff.title}
                    onChange={(e) => setNewTimeOff(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Medical Conference"
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newTimeOff.start}
                      onChange={(e) => setNewTimeOff(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-4 py-3 glass text-white rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">End Date</label>
                    <input
                      type="date"
                      value={newTimeOff.end}
                      onChange={(e) => setNewTimeOff(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-4 py-3 glass text-white rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Type</label>
                  <select
                    value={newTimeOff.type}
                    onChange={(e) => setNewTimeOff(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 glass text-white rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                  >
                    <option value="personal" className="bg-gray-800">Personal</option>
                    <option value="vacation" className="bg-gray-800">Vacation</option>
                    <option value="sick" className="bg-gray-800">Sick Leave</option>
                    <option value="conference" className="bg-gray-800">Conference</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleAddTimeOff}
                    className="btn-primary"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddTimeOff(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Time Off List */}
          <div className="space-y-3">
            {timeOff.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-4 glass rounded-2xl animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-white/70">
                    <Calendar className="w-4 h-4" />
                    <span>{item.start} - {item.end}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                  <button
                    onClick={() => removeTimeOff(item.id)}
                    className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-3xl shadow-xl p-6 animate-fade-in glow">
        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Clock, label: 'Copy Last Week', gradient: 'gradient-teal' },
            { icon: Calendar, label: 'Block Next Week', gradient: 'gradient-blue' },
            { icon: X, label: 'Clear Schedule', gradient: 'gradient-purple' }
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

export default AvailabilitySettings;