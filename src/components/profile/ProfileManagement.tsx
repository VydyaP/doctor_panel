import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Upload, Save, Edit, CheckCircle, Award, Clock } from 'lucide-react';

const ProfileManagement: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Wilson',
    title: 'Dr.',
    specialization: 'General Practitioner',
    licenseNumber: 'MD123456789',
    email: 'sarah.wilson@medcenter.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center Drive, Health City, HC 12345',
    experience: '8',
    languages: ['English', 'Spanish'],
    bio: 'Experienced General Practitioner with 8 years of experience in preventive care and chronic disease management. Passionate about patient-centered care and community health.',
    education: [
      {
        degree: 'Doctor of Medicine (MD)',
        institution: 'Harvard Medical School',
        year: '2016'
      },
      {
        degree: 'Bachelor of Science in Biology',
        institution: 'Stanford University',
        year: '2012'
      }
    ],
    certifications: [
      {
        name: 'Board Certified in Family Medicine',
        issuer: 'American Board of Family Medicine',
        year: '2017'
      },
      {
        name: 'Advanced Cardiac Life Support (ACLS)',
        issuer: 'American Heart Association',
        year: '2023'
      }
    ]
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleFileUpload = (type: string) => {
    console.log(`Uploading ${type}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h2 className="text-3xl font-bold text-white">Profile Management</h2>
          <p className="text-white/70">Manage your professional profile and credentials</p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo & Basic Info */}
        <div className="glass-card rounded-3xl shadow-xl p-6 animate-fade-in glow">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 gradient-teal rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <span className="text-4xl font-bold text-white">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </span>
              </div>
              {isEditing && (
                <button
                  onClick={() => handleFileUpload('photo')}
                  className="absolute bottom-2 right-2 p-3 gradient-blue text-white rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Upload className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Verified Doctor</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white">
              {profileData.title} {profileData.firstName} {profileData.lastName}
            </h3>
            <p className="text-white/70 mt-1 text-lg">{profileData.specialization}</p>
            <p className="text-sm text-white/50 mt-1">License: {profileData.licenseNumber}</p>
            
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-white/70">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{profileData.experience} years exp.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>{profileData.certifications.length} certifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl shadow-xl p-6 animate-fade-in glow">
            <h4 className="text-xl font-bold text-white mb-6">Personal Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-white/50" />
                    <p className="text-white">{profileData.email}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-white/50" />
                    <p className="text-white">{profileData.phone}</p>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-2">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-white/50" />
                    <p className="text-white">{profileData.address}</p>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-2xl focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300"
                  />
                ) : (
                  <p className="text-white">{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="glass-card rounded-3xl shadow-xl p-6 animate-fade-in glow">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-white">Education</h4>
              {isEditing && (
                <button className="text-teal-400 hover:text-teal-300 font-medium text-sm">
                  Add Education
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 glass rounded-2xl">
                  <div className="w-10 h-10 gradient-blue rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-white">{edu.degree}</h5>
                    <p className="text-white/70">{edu.institution}</p>
                    <p className="text-sm text-white/50">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-card rounded-3xl shadow-xl p-6 animate-fade-in glow">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-white">Certifications</h4>
              {isEditing && (
                <button className="text-teal-400 hover:text-teal-300 font-medium text-sm">
                  Add Certification
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 glass rounded-2xl">
                  <div className="w-10 h-10 gradient-purple rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-white">{cert.name}</h5>
                    <p className="text-white/70">{cert.issuer}</p>
                    <p className="text-sm text-white/50">{cert.year}</p>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleFileUpload('certificate')}
                      className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;