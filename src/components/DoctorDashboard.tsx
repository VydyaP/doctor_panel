import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  MessageCircle, 
  User, 
  Clock, 
  Bell, 
  Home,
  Settings,
  LogOut,
  Search,
  Phone,
  Video,
  FileText,
  Star,
  CheckCircle
} from 'lucide-react';
import AppointmentsList from './appointments/AppointmentsList';
import PatientsList from './patients/PatientsList';
import ConsultationChat from './consultation/ConsultationChat';
import ProfileManagement from './profile/ProfileManagement';
import AvailabilitySettings from './availability/AvailabilitySettings';
import NotificationsList from './notifications/NotificationsList';
import DashboardOverview from './dashboard/DashboardOverview';

interface DoctorDashboardProps {}

const DoctorDashboard: React.FC<DoctorDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(5);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'consultation', label: 'Consultation', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'appointments':
        return <AppointmentsList />;
      case 'patients':
        return <PatientsList />;
      case 'consultation':
        return <ConsultationChat />;
      case 'profile':
        return <ProfileManagement />;
      case 'availability':
        return <AvailabilitySettings />;
      case 'notifications':
        return <NotificationsList />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-72 glass-card shadow-2xl border-r border-white/20 animate-slide-up">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 gradient-teal rounded-2xl flex items-center justify-center shadow-lg glow">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Dr. Sarah Wilson</h2>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Verified Professional</span>
                </div>
              </div>
            </div>
          </div>

          <nav className="mt-6 px-4">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-6 py-4 mb-2 text-left rounded-2xl transition-all duration-300 ease-out transform hover:scale-105 animate-fade-in ${
                    activeTab === item.id
                      ? 'glass text-white shadow-lg glow'
                      : 'text-white/70 hover:text-white hover:glass-dark'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      activeTab === item.id ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <div className="relative">
                      <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full shadow-lg animate-pulse">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-4 right-4 space-y-2">
            <button className="w-full flex items-center space-x-4 px-6 py-4 text-white/70 hover:text-white hover:glass-dark rounded-2xl transition-all duration-300 transform hover:scale-105">
              <div className="p-2 bg-white/10 rounded-xl">
                <Settings className="w-5 h-5" />
              </div>
              <span className="font-medium">Settings</span>
            </button>
            <button className="w-full flex items-center space-x-4 px-6 py-4 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-2xl transition-all duration-300 transform hover:scale-105">
              <div className="p-2 bg-red-500/20 rounded-xl">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="glass-card shadow-lg border-b border-white/10 px-8 py-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white capitalize mb-2">{activeTab}</h1>
                <p className="text-white/70">
                  {activeTab === 'dashboard' && 'Welcome back! Here\'s your practice overview.'}
                  {activeTab === 'appointments' && 'Manage your upcoming appointments and schedule.'}
                  {activeTab === 'patients' && 'View and manage your patient list.'}
                  {activeTab === 'consultation' && 'Chat with your patients in real-time.'}
                  {activeTab === 'profile' && 'Update your professional profile and credentials.'}
                  {activeTab === 'availability' && 'Set your availability and working hours.'}
                  {activeTab === 'notifications' && 'Stay updated with important alerts and messages.'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-white/50 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-12 pr-6 py-3 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300 w-80"
                  />
                </div>
                <button className="relative p-3 glass text-white hover:bg-white/20 rounded-2xl transition-all duration-300 transform hover:scale-110 glow">
                  <Bell className="w-6 h-6" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-8">
            <div className="animate-fade-in">
              {renderActiveComponent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;