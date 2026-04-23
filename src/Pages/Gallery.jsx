import React, { useState, useEffect } from 'react';
import AdminLayout from "../components/AdminLayout";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  X,
  Grid,
  List,
  Search,
  Plus,
  Users,
  Home,
  BookOpen,
  Utensils,
  Trophy,
  Music,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  School,
  UserCheck,
  BedDouble
} from 'lucide-react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    category: '',
    title: '',
    description: '',
    tags: ''
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Categories for school
  const categories = [
    { id: 'faculty', name: 'Faculty', icon: UserCheck, color: 'bg-blue-100 text-blue-600', description: 'Teachers and staff photos' },
    { id: 'students', name: 'Students', icon: Users, color: 'bg-green-100 text-green-600', description: 'Student activities and events' },
    { id: 'hostel', name: 'Hostel', icon: Home, color: 'bg-purple-100 text-purple-600', description: 'Hostel facilities and rooms' },
    { id: 'library', name: 'Library', icon: BookOpen, color: 'bg-yellow-100 text-yellow-600', description: 'Library and reading areas' },
    { id: 'campus', name: 'Campus', icon: School, color: 'bg-orange-100 text-orange-600', description: 'School campus and buildings' },
    { id: 'sports', name: 'Sports', icon: Trophy, color: 'bg-red-100 text-red-600', description: 'Sports events and grounds' },
    { id: 'events', name: 'Events', icon: Calendar, color: 'bg-pink-100 text-pink-600', description: 'School events and functions' },
    { id: 'cultural', name: 'Cultural', icon: Music, color: 'bg-indigo-100 text-indigo-600', description: 'Cultural programs and activities' }
  ];

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('school_gallery_images');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      // Add sample images for each category
      const sampleImages = [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400',
          category: 'faculty',
          title: 'Annual Teachers Meeting',
          description: 'Teachers discussing curriculum improvements for upcoming session',
          uploadDate: '2024-01-15',
          fileSize: '2.3 MB',
          tags: ['faculty', 'meeting', 'teachers']
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
          category: 'students',
          title: 'Science Exhibition',
          description: 'Students showcasing their innovative science projects',
          uploadDate: '2024-01-14',
          fileSize: '1.8 MB',
          tags: ['students', 'science', 'exhibition']
        },
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
          category: 'hostel',
          title: 'Modern Hostel Rooms',
          description: 'Newly renovated hostel rooms with modern amenities',
          uploadDate: '2024-01-13',
          fileSize: '3.1 MB',
          tags: ['hostel', 'rooms', 'facility']
        },
        {
          id: '4',
          url: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400',
          category: 'library',
          title: 'Digital Library Corner',
          description: 'Students accessing digital resources in library',
          uploadDate: '2024-01-12',
          fileSize: '2.5 MB',
          tags: ['library', 'digital', 'students']
        },
        {
          id: '5',
          url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
          category: 'campus',
          title: 'School Campus View',
          description: 'Beautiful aerial view of school campus',
          uploadDate: '2024-01-11',
          fileSize: '4.2 MB',
          tags: ['campus', 'building', 'aerial']
        },
        {
          id: '6',
          url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
          category: 'sports',
          title: 'Annual Sports Day',
          description: 'Students participating in track events',
          uploadDate: '2024-01-10',
          fileSize: '2.8 MB',
          tags: ['sports', 'athletics', 'students']
        }
      ];
      setImages(sampleImages);
      localStorage.setItem('school_gallery_images', JSON.stringify(sampleImages));
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem('school_gallery_images', JSON.stringify(images));
    }
  }, [images]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !uploadForm.category || !uploadForm.title) {
      alert('Please fill all required fields and select an image');
      return;
    }

    const newImage = {
      id: Date.now().toString(),
      url: previewUrl,
      category: uploadForm.category,
      title: uploadForm.title,
      description: uploadForm.description,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setImages([newImage, ...images]);
    resetUploadForm();
    setShowUploadModal(false);
    alert('Image uploaded successfully!');
  };

  const resetUploadForm = () => {
    setUploadForm({ category: '', title: '', description: '', tags: '' });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const deleteImage = (id) => {
    if (window.confirm('Are you sure you want to delete this image permanently?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      const IconComponent = category.icon;
      return <IconComponent size={16} />;
    }
    return <FolderOpen size={16} />;
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-100 text-gray-600';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || categoryId;
  };

  // Filter images
  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = filteredImages.slice(startIndex, endIndex);

  const categoryStats = categories.map(cat => ({
    ...cat,
    count: images.filter(img => img.category === cat.id).length
  }));

  return (
    <AdminLayout title="Gallery Management">
      <div className="space-y-6">
        {/* Header Stats - Category Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
            <p className="text-sm text-gray-500">Total {images.length} images</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              className={`p-3 rounded-xl text-center transition-all ${selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:shadow-md border border-gray-200'
                }`}
            >
              <ImageIcon className="mx-auto mb-2" size={20} />
              <p className="text-xs font-semibold">All</p>
              <p className="text-xs opacity-75">{images.length}</p>
            </button>
            {categoryStats.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                  className={`p-3 rounded-xl text-center transition-all ${selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-50 text-gray-700 hover:shadow-md border border-gray-200'
                    }`}
                >
                  <IconComponent className="mx-auto mb-2" size={20} />
                  <p className="text-xs font-semibold">{category.name}</p>
                  <p className="text-xs opacity-75">{category.count}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search images by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 transition-colors ${viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 transition-colors ${viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <List size={18} />
                </button>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                Upload Image
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid/List View */}
        {currentImages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No images found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or upload new images</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={18} />
              Upload Your First Image
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentImages.map((image) => (
              <div key={image.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedImage(image)}
                        className="p-2 bg-white rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                        title="View image"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="p-2 bg-white rounded-full hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete image"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${getCategoryColor(image.category)}`}>
                    {getCategoryIcon(image.category)}
                    <span>{getCategoryName(image.category)}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{image.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{image.description || 'No description'}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {image.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{image.uploadDate}</span>
                    <span>{image.fileSize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title & Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentImages.map((image) => (
                  <tr key={image.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img src={image.url} alt={image.title} className="w-12 h-12 rounded-lg object-cover" />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{image.title}</p>
                      <p className="text-sm text-gray-500">{image.description.substring(0, 60)}...</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(image.category)}`}>
                        {getCategoryIcon(image.category)}
                        <span>{getCategoryName(image.category)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {image.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {image.tags.length > 2 && (
                          <span className="text-xs text-gray-400">+{image.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{image.uploadDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedImage(image)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => deleteImage(image.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {page}
              </button>
            ))}
            {totalPages > 5 && (
              <>
                <span className="px-4 py-2">...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowUploadModal(false)}>
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Upload New Image</h2>
                <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setUploadForm({ ...uploadForm, category: category.id })}
                          className={`p-3 rounded-lg border-2 transition-all ${uploadForm.category === category.id
                              ? 'border-blue-500 bg-blue-50 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <IconComponent className={`mx-auto mb-2 ${uploadForm.category === category.id ? 'text-blue-600' : 'text-gray-600'}`} size={24} />
                          <p className={`text-sm font-medium ${uploadForm.category === category.id ? 'text-blue-600' : 'text-gray-700'}`}>
                            {category.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{category.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    {previewUrl ? (
                      <div className="relative inline-block">
                        <img src={previewUrl} alt="Preview" className="max-h-64 rounded-lg shadow-sm" />
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                        <p className="text-gray-600 mb-2">Click or drag and drop to upload</p>
                        <p className="text-sm text-gray-500 mb-4">PNG, JPG, GIF up to 10MB</p>
                        <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block">
                          Choose Image
                          <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image description"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={uploadForm.tags}
                    onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., annual-day, celebration, students"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    resetUploadForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Image
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>
              <img src={selectedImage.url} alt={selectedImage.title} className="w-full rounded-lg shadow-2xl" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-200 mb-2">{selectedImage.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedImage.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-white bg-opacity-20 text-white px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Gallery;