import React, { useState, useEffect } from 'react';
import AdminLayout from "../components/AdminLayout.jsx";
import {
  Upload, Image as ImageIcon, Trash2, X, Grid, List, Search, Plus,
  Eye, ChevronLeft, ChevronRight, FolderOpen, Loader2
} from 'lucide-react';
import { getImages, uploadImage, deleteImage } from "../api/api";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [uploading, setUploading] = useState(false);
  const itemsPerPage = 12;

  const [uploadForm, setUploadForm] = useState({
    category: '',
    title: '',
    description: '',
    tags: ''
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const categories = [
    { id: 'School Event', name: 'School Event', color: 'bg-blue-900/50 text-blue-300 border-blue-700' },
    { id: 'Sports', name: 'Sports', color: 'bg-green-900/50 text-green-300 border-green-700' },
    { id: 'Cultural', name: 'Cultural', color: 'bg-purple-900/50 text-purple-300 border-purple-700' },
    { id: 'Academic', name: 'Academic', color: 'bg-yellow-900/50 text-yellow-300 border-yellow-700' },
    { id: 'Campus', name: 'Campus', color: 'bg-orange-900/50 text-orange-300 border-orange-700' },
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await getImages();
      setImages(response.data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleUpload = async () => {
    if (!selectedFile || !uploadForm.category || !uploadForm.title) {
      alert('Please fill all required fields and select an image');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('category', uploadForm.category);
    formData.append('title', uploadForm.title);
    formData.append('description', uploadForm.description);
    formData.append('tags', uploadForm.tags);

    try {
      await uploadImage(formData);
      await fetchImages();
      resetUploadForm();
      setShowUploadModal(false);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm('Are you sure you want to delete this image permanently?')) {
      try {
        await deleteImage(id);
        await fetchImages();
      } catch (error) {
        console.error("Delete error:", error);
        alert('Failed to delete image');
      }
    }
  };

  const resetUploadForm = () => {
    setUploadForm({ category: '', title: '', description: '', tags: '' });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <AdminLayout title="Gallery Management">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sidebar-foreground/60">Loading gallery...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Gallery Management">
      <div className="space-y-6">
        {/* Category Filters */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Media Gallery</h2>
              <p className="text-sm text-sidebar-foreground/60 mt-1">Manage and organize all your school images</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-sidebar-background rounded-lg">
              <ImageIcon size={16} className="text-primary" />
              <span className="text-sidebar-foreground/80 text-sm">Total: <span className="font-semibold text-foreground">{images.length}</span></span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-sidebar-background text-sidebar-foreground hover:bg-sidebar-accent'}`}
            >
              All ({images.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-sidebar-background text-sidebar-foreground hover:bg-sidebar-accent'}`}
              >
                {cat.name} ({images.filter(i => i.category === cat.id).length})
              </button>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-sidebar-foreground/50" size={18} />
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-background text-sidebar-foreground'}`}>
                  <Grid size={18} />
                </button>
                <button onClick={() => setViewMode('list')} className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background text-sidebar-foreground'}`}>
                  <List size={18} />
                </button>
              </div>
              <button onClick={() => setShowUploadModal(true)} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all">
                <Plus size={18} /> Upload Image
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {currentImages.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-16 text-center">
            <ImageIcon size={64} className="mx-auto text-sidebar-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No images found</h3>
            <p className="text-sidebar-foreground/60 mb-6">Try adjusting your search or upload new images</p>
            <button onClick={() => setShowUploadModal(true)} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg inline-flex items-center gap-2">
              <Plus size={18} /> Upload Your First Image
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentImages.map((image) => (
              <div key={image._id} className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all">
                <div className="relative h-52 overflow-hidden">
                  <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                    <button onClick={() => setSelectedImage(image)} className="p-2 bg-white/20 rounded-full hover:bg-primary transition-all"><Eye size={18} className="text-white" /></button>
                    <button onClick={() => handleDeleteImage(image._id)} className="p-2 bg-white/20 rounded-full hover:bg-red-600 transition-all"><Trash2 size={18} className="text-white" /></button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{image.title}</h3>
                  <p className="text-sm text-sidebar-foreground/60 line-clamp-2">{image.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {image.tags?.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-sidebar-background text-sidebar-foreground/70 px-2 py-1 rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-sidebar-background border-b border-border">
                <tr><th className="px-6 py-3 text-left text-xs font-medium text-sidebar-foreground/70">Image</th><th className="px-6 py-3 text-left text-xs font-medium text-sidebar-foreground/70">Title</th><th className="px-6 py-3 text-left text-xs font-medium text-sidebar-foreground/70">Category</th><th className="px-6 py-3 text-left text-xs font-medium text-sidebar-foreground/70">Actions</th></tr>
              </thead>
              <tbody>
                {currentImages.map((image) => (
                  <tr key={image._id} className="border-b border-border hover:bg-sidebar-accent/30">
                    <td className="px-6 py-4"><img src={image.imageUrl} alt={image.title} className="w-12 h-12 rounded-lg object-cover" /></td>
                    <td className="px-6 py-4"><p className="font-medium text-foreground">{image.title}</p></td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-sidebar-background rounded-lg text-xs">{image.category}</span></td>
                    <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => setSelectedImage(image)} className="p-2 bg-sidebar-accent rounded-lg text-primary"><Eye size={16} /></button><button onClick={() => handleDeleteImage(image._id)} className="p-2 bg-red-500/20 rounded-lg text-red-400"><Trash2 size={16} /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-card border border-border rounded-lg disabled:opacity-50"><ChevronLeft size={18} /></button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'}`}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 bg-card border border-border rounded-lg disabled:opacity-50"><ChevronRight size={18} /></button>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowUploadModal(false)}>
            <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-card border-b border-border p-5 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-foreground">Upload New Image</h2>
                <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-sidebar-accent rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Category <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <button key={cat.id} type="button" onClick={() => setUploadForm({ ...uploadForm, category: cat.id })} className={`p-3 rounded-lg border-2 transition-all ${uploadForm.category === cat.id ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}>
                        <p className={`text-sm font-medium ${uploadForm.category === cat.id ? 'text-primary' : 'text-foreground'}`}>{cat.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Image <span className="text-red-400">*</span></label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-all">
                    {previewUrl ? (
                      <div className="relative inline-block"><img src={previewUrl} alt="Preview" className="max-h-64 rounded-lg" /><button onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full"><X size={16} /></button></div>
                    ) : (
                      <>
                        <Upload className="mx-auto text-sidebar-foreground/50 mb-3" size={48} />
                        <p className="text-foreground mb-2">Click or drag and drop to upload</p>
                        <label className="bg-primary text-primary-foreground px-5 py-2 rounded-lg cursor-pointer inline-block">Choose Image<input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" /></label>
                      </>
                    )}
                  </div>
                </div>

                <div><label className="block text-sm font-medium text-foreground mb-2">Title <span className="text-red-400">*</span></label><input type="text" value={uploadForm.title} onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground" placeholder="Enter image title" /></div>
                <div><label className="block text-sm font-medium text-foreground mb-2">Description</label><textarea value={uploadForm.description} onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })} rows={3} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground" placeholder="Enter image description" /></div>
                <div><label className="block text-sm font-medium text-foreground mb-2">Tags (comma separated)</label><input type="text" value={uploadForm.tags} onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground" placeholder="e.g., annual-day, celebration" /></div>
              </div>
              <div className="sticky bottom-0 bg-card border-t border-border p-5 flex justify-end gap-3">
                <button onClick={() => { setShowUploadModal(false); resetUploadForm(); }} className="px-5 py-2 border border-border rounded-lg text-foreground hover:bg-sidebar-accent">Cancel</button>
                <button onClick={handleUpload} disabled={uploading} className="px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
                  {uploading ? <><Loader2 size={18} className="animate-spin" /> Uploading...</> : 'Upload Image'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedImage(null)} className="absolute -top-14 right-0 text-white/70 hover:text-white"><X size={28} /></button>
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="w-full rounded-xl border border-border" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-xl"><h3 className="text-white text-xl font-semibold mb-2">{selectedImage.title}</h3><p className="text-gray-300">{selectedImage.description}</p></div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Gallery;