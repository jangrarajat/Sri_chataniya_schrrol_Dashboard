import React, { useState, useEffect } from 'react';
import AdminLayout from "../components/AdminLayout";
import {
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Home,
  Info,
  Phone,
  Mail,
  Upload,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users,
  Trophy,
  Calendar
} from 'lucide-react';

// Social icons as simple SVG components (since lucide-react doesn't export them properly)
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const Content = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Load content from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem('website_content');
    if (savedContent) {
      setEditedContent(JSON.parse(savedContent));
    } else {
      // Default content
      const defaultContent = {
        home: {
          heroTitle: "Welcome to Bright Future School",
          heroSubtitle: "Nurturing Young Minds for a Brighter Tomorrow",
          heroButtonText: "Admissions Open",
          heroButtonLink: "/admissions",
          heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200",
          welcomeTitle: "Welcome to Our School",
          welcomeDescription: "Bright Future School is committed to providing quality education that fosters academic excellence, character development, and holistic growth.",
          welcomeImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600",
          features: [
            {
              id: "1",
              icon: "BookOpen",
              title: "Quality Education",
              description: "Comprehensive curriculum with modern teaching methods"
            },
            {
              id: "2",
              icon: "Users",
              title: "Expert Faculty",
              description: "Highly qualified and experienced teachers"
            },
            {
              id: "3",
              icon: "Trophy",
              title: "Extracurricular Activities",
              description: "Sports, arts, and cultural programs"
            },
            {
              id: "4",
              icon: "Calendar",
              title: "Events & Workshops",
              description: "Regular educational tours and workshops"
            }
          ],
          stats: [
            { id: "1", value: "1000+", label: "Students" },
            { id: "2", value: "50+", label: "Teachers" },
            { id: "3", value: "25+", label: "Awards" },
            { id: "4", value: "10+", label: "Years of Excellence" }
          ],
          banners: [
            {
              id: "1",
              title: "Annual Sports Day",
              image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800",
              link: "/events/sports-day"
            },
            {
              id: "2",
              title: "Science Exhibition",
              image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
              link: "/events/science-exhibition"
            },
            {
              id: "3",
              title: "Cultural Festival",
              image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800",
              link: "/events/cultural-fest"
            }
          ]
        },
        about: {
          title: "About Bright Future School",
          description: "Established in 2014, Bright Future School has been a beacon of quality education in our community.",
          mission: "To provide holistic education that empowers students to become lifelong learners, responsible citizens, and future leaders.",
          vision: "To be a center of educational excellence that inspires innovation, fosters character, and prepares students for global challenges.",
          history: "Bright Future School was founded with a vision to revolutionize education. Starting with just 50 students, we have grown into a thriving educational institution.",
          image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",
          coreValues: [
            {
              id: "1",
              title: "Excellence",
              description: "Striving for the highest standards in everything we do"
            },
            {
              id: "2",
              title: "Integrity",
              description: "Being honest, ethical, and transparent in all our actions"
            },
            {
              id: "3",
              title: "Respect",
              description: "Valuing diversity and treating everyone with dignity"
            },
            {
              id: "4",
              title: "Innovation",
              description: "Embracing creativity and new ideas in education"
            }
          ]
        },
        contact: {
          address: "123 Education Street, Knowledge City, KC 12345",
          phone: "+1 234 567 8900",
          email: "info@brightfutureschool.com",
          workingHours: "Monday - Friday: 8:00 AM - 4:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
          mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb6d4b5%3A0xc89ffe6f6b4e9c8!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1641234567890!5m2!1sen!2sus",
          socialLinks: {
            facebook: "https://facebook.com/brightfutureschool",
            twitter: "https://twitter.com/brightfutureschool",
            instagram: "https://instagram.com/brightfutureschool",
            linkedin: "https://linkedin.com/school/brightfutureschool",
            youtube: "https://youtube.com/brightfutureschool"
          }
        }
      };
      setEditedContent(defaultContent);
      localStorage.setItem('website_content', JSON.stringify(defaultContent));
    }
  }, []);

  const handleSave = () => {
    if (editedContent) {
      localStorage.setItem('website_content', JSON.stringify(editedContent));
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleImageUpload = (section, field) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('File size should be less than 5MB');
          return;
        }
        setUploadingImage(true);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (editedContent) {
            const updatedContent = { ...editedContent };
            if (section === 'home') {
              updatedContent.home[field] = reader.result;
            } else if (section === 'about') {
              updatedContent.about[field] = reader.result;
            }
            setEditedContent(updatedContent);
          }
          setUploadingImage(false);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addFeature = () => {
    if (editedContent) {
      const newFeature = {
        id: Date.now().toString(),
        icon: "BookOpen",
        title: "New Feature",
        description: "Feature description"
      };
      setEditedContent({
        ...editedContent,
        home: {
          ...editedContent.home,
          features: [...editedContent.home.features, newFeature]
        }
      });
    }
  };

  const updateFeature = (id, field, value) => {
    if (editedContent) {
      const updatedFeatures = editedContent.home.features.map(feature =>
        feature.id === id ? { ...feature, [field]: value } : feature
      );
      setEditedContent({
        ...editedContent,
        home: { ...editedContent.home, features: updatedFeatures }
      });
    }
  };

  const deleteFeature = (id) => {
    if (editedContent && window.confirm('Are you sure you want to delete this feature?')) {
      setEditedContent({
        ...editedContent,
        home: {
          ...editedContent.home,
          features: editedContent.home.features.filter(f => f.id !== id)
        }
      });
    }
  };

  const addCoreValue = () => {
    if (editedContent) {
      const newValue = {
        id: Date.now().toString(),
        title: "New Value",
        description: "Value description"
      };
      setEditedContent({
        ...editedContent,
        about: {
          ...editedContent.about,
          coreValues: [...editedContent.about.coreValues, newValue]
        }
      });
    }
  };

  const updateCoreValue = (id, field, value) => {
    if (editedContent) {
      const updatedValues = editedContent.about.coreValues.map(val =>
        val.id === id ? { ...val, [field]: value } : val
      );
      setEditedContent({
        ...editedContent,
        about: { ...editedContent.about, coreValues: updatedValues }
      });
    }
  };

  const deleteCoreValue = (id) => {
    if (editedContent && window.confirm('Are you sure you want to delete this core value?')) {
      setEditedContent({
        ...editedContent,
        about: {
          ...editedContent.about,
          coreValues: editedContent.about.coreValues.filter(v => v.id !== id)
        }
      });
    }
  };

  const updateStat = (id, field, value) => {
    if (editedContent) {
      const updatedStats = editedContent.home.stats.map(stat =>
        stat.id === id ? { ...stat, [field]: value } : stat
      );
      setEditedContent({
        ...editedContent,
        home: { ...editedContent.home, stats: updatedStats }
      });
    }
  };

  const addBanner = () => {
    if (editedContent) {
      const newBanner = {
        id: Date.now().toString(),
        title: "New Banner",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
        link: "/events/new-event"
      };
      setEditedContent({
        ...editedContent,
        home: {
          ...editedContent.home,
          banners: [...editedContent.home.banners, newBanner]
        }
      });
    }
  };

  const updateBanner = (id, field, value) => {
    if (editedContent) {
      const updatedBanners = editedContent.home.banners.map(banner =>
        banner.id === id ? { ...banner, [field]: value } : banner
      );
      setEditedContent({
        ...editedContent,
        home: { ...editedContent.home, banners: updatedBanners }
      });
    }
  };

  const deleteBanner = (id) => {
    if (editedContent && window.confirm('Are you sure you want to delete this banner?')) {
      setEditedContent({
        ...editedContent,
        home: {
          ...editedContent.home,
          banners: editedContent.home.banners.filter(b => b.id !== id)
        }
      });
    }
  };

  if (!editedContent) return null;

  return (
    <AdminLayout title="Website Content Control">
      <div className="space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-6 z-50 animate-slide-in">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-lg">
              <CheckCircle className="text-green-600" size={20} />
              <div>
                <p className="font-semibold text-green-800">Content Saved!</p>
                <p className="text-sm text-green-600">Your changes have been published successfully.</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Website Content Control</h2>
              <p className="text-gray-600 mt-1">Manage homepage image sliders, update text content, add/remove banners, and update school details dynamically</p>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Edit size={18} />
                  Edit Mode
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      const savedContent = localStorage.getItem('website_content');
                      if (savedContent) setEditedContent(JSON.parse(savedContent));
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                  >
                    <Save size={18} />
                    Publish Changes
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'home'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Home size={18} />
              Home Page
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'about'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Info size={18} />
              About Page
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'contact'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Phone size={18} />
              Contact Page
            </button>
          </div>
        </div>

        {/* Home Page Content */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Hero Section</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                  <input
                    type="text"
                    value={editedContent.home.heroTitle}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      home: { ...editedContent.home, heroTitle: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                  <textarea
                    value={editedContent.home.heroSubtitle}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      home: { ...editedContent.home, heroSubtitle: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                    <input
                      type="text"
                      value={editedContent.home.heroButtonText}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        home: { ...editedContent.home, heroButtonText: e.target.value }
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                    <input
                      type="text"
                      value={editedContent.home.heroButtonLink}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        home: { ...editedContent.home, heroButtonLink: e.target.value }
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                  <div className="flex items-center gap-4">
                    <img src={editedContent.home.heroImage} alt="Hero" className="w-32 h-20 object-cover rounded-lg" />
                    {isEditing && (
                      <button
                        onClick={() => handleImageUpload('home', 'heroImage')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                        disabled={uploadingImage}
                      >
                        <Upload size={18} />
                        Change Image
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Banners Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-600 to-pink-700 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Image Sliders / Banners</h3>
                {isEditing && (
                  <button onClick={addBanner} className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded-lg flex items-center gap-2">
                    <Plus size={18} />
                    Add Banner
                  </button>
                )}
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {editedContent.home.banners.map((banner) => (
                    <div key={banner.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img src={banner.image} alt={banner.title} className="w-full h-40 object-cover" />
                      <div className="p-4 space-y-2">
                        <input
                          type="text"
                          value={banner.title}
                          onChange={(e) => updateBanner(banner.id, 'title', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Banner Title"
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm"
                        />
                        <input
                          type="text"
                          value={banner.link}
                          onChange={(e) => updateBanner(banner.id, 'link', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Link URL"
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm"
                        />
                        {isEditing && (
                          <button
                            onClick={() => deleteBanner(banner.id)}
                            className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1 mt-2"
                          >
                            <Trash2 size={14} />
                            Delete Banner
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Welcome Section</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Title</label>
                  <input
                    type="text"
                    value={editedContent.home.welcomeTitle}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      home: { ...editedContent.home, welcomeTitle: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Description</label>
                  <textarea
                    value={editedContent.home.welcomeDescription}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      home: { ...editedContent.home, welcomeDescription: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Image</label>
                  <div className="flex items-center gap-4">
                    <img src={editedContent.home.welcomeImage} alt="Welcome" className="w-32 h-20 object-cover rounded-lg" />
                    {isEditing && (
                      <button
                        onClick={() => handleImageUpload('home', 'welcomeImage')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Upload size={18} />
                        Change Image
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Features Section</h3>
                {isEditing && (
                  <button onClick={addFeature} className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded-lg flex items-center gap-2">
                    <Plus size={18} />
                    Add Feature
                  </button>
                )}
              </div>
              <div className="p-6 space-y-4">
                {editedContent.home.features.map((feature) => (
                  <div key={feature.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">Feature</h4>
                      {isEditing && (
                        <button onClick={() => deleteFeature(feature.id)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                      <textarea
                        value={feature.description}
                        onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Description"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Statistics Section</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {editedContent.home.stats.map((stat) => (
                    <div key={stat.id} className="text-center">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                        disabled={!isEditing}
                        className="w-full text-2xl font-bold text-center mb-2 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                        disabled={!isEditing}
                        className="w-full text-sm text-gray-600 text-center border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Page Content */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">About Section</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editedContent.about.title}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      about: { ...editedContent.about, title: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editedContent.about.description}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      about: { ...editedContent.about, description: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
                  <textarea
                    value={editedContent.about.mission}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      about: { ...editedContent.about, mission: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
                  <textarea
                    value={editedContent.about.vision}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      about: { ...editedContent.about, vision: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">History</label>
                  <textarea
                    value={editedContent.about.history}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      about: { ...editedContent.about, history: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Image</label>
                  <div className="flex items-center gap-4">
                    <img src={editedContent.about.image} alt="About" className="w-32 h-20 object-cover rounded-lg" />
                    {isEditing && (
                      <button
                        onClick={() => handleImageUpload('about', 'image')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Upload size={18} />
                        Change Image
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Core Values</h3>
                {isEditing && (
                  <button onClick={addCoreValue} className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded-lg flex items-center gap-2">
                    <Plus size={18} />
                    Add Value
                  </button>
                )}
              </div>
              <div className="p-6 space-y-4">
                {editedContent.about.coreValues.map((value) => (
                  <div key={value.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">Core Value</h4>
                      {isEditing && (
                        <button onClick={() => deleteCoreValue(value.id)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => updateCoreValue(value.id, 'title', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                      <textarea
                        value={value.description}
                        onChange={(e) => updateCoreValue(value.id, 'description', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Description"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Page Content */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Contact Information</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={editedContent.contact.address}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      contact: { ...editedContent.contact, address: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      value={editedContent.contact.phone}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        contact: { ...editedContent.contact, phone: e.target.value }
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={editedContent.contact.email}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        contact: { ...editedContent.contact, email: e.target.value }
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                  <textarea
                    value={editedContent.contact.workingHours}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      contact: { ...editedContent.contact, workingHours: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
                  <input
                    type="text"
                    value={editedContent.contact.mapEmbed}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      contact: { ...editedContent.contact, mapEmbed: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Social Media Links</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FacebookIcon />
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={editedContent.contact.socialLinks.facebook}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        contact: {
                          ...editedContent.contact,
                          socialLinks: { ...editedContent.contact.socialLinks, facebook: e.target.value }
                        }
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <TwitterIcon />
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={editedContent.contact.socialLinks.twitter}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        contact: {
                          ...editedContent.contact,
                          socialLinks: { ...editedContent.contact.socialLinks, twitter: e.target.value }
                        }
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <InstagramIcon />
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={editedContent.contact.socialLinks.instagram}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        contact: {
                          ...editedContent.contact,
                          socialLinks: { ...editedContent.contact.socialLinks, instagram: e.target.value }
                        }
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <LinkedinIcon />
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={editedContent.contact.socialLinks.linkedin}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        contact: {
                          ...editedContent.contact,
                          socialLinks: { ...editedContent.contact.socialLinks, linkedin: e.target.value }
                        }
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <YoutubeIcon />
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={editedContent.contact.socialLinks.youtube}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        contact: {
                          ...editedContent.contact,
                          socialLinks: { ...editedContent.contact.socialLinks, youtube: e.target.value }
                        }
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Note */}
        {!isEditing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-blue-800">View Mode</p>
                <p className="text-sm text-blue-700">Click "Edit Mode" to make changes to your website content. Don't forget to publish your changes.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </AdminLayout>
  );
};

export default Content;