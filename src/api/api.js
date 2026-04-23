// API Base URL
const API_BASE_URL = 'https://sri-chataniya-schrrol-server.onrender.com/api';

// Helper function to get token
const getToken = () => localStorage.getItem('adminToken');

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers,
  };
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Auth APIs
export const loginAPI = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// Admission Form APIs
export const getAdmissionForms = async () => {
  return apiCall('/admin-forms');
};

export const getAdmissionFormById = async (id) => {
  return apiCall(`/admin-forms/${id}`);
};

export const updateAdmissionStatus = async (id, status) => {
  return apiCall(`/admin-forms/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

export const updateAdmissionForm = async (id, data) => {
  return apiCall(`/admin-forms/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteAdmissionForm = async (id) => {
  return apiCall(`/admin-forms/${id}`, {
    method: 'DELETE',
  });
};

// Contact APIs
export const getContacts = async () => {
  return apiCall('/contacts');
};

export const getContactById = async (id) => {
  return apiCall(`/contacts/${id}`);
};

export const deleteContact = async (id) => {
  return apiCall(`/contacts/${id}`, {
    method: 'DELETE',
  });
};

// Image APIs
export const getImages = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const url = params ? `/images?${params}` : '/images';
  return apiCall(url, { method: 'GET' });
};

export const uploadImage = async (formData) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/images/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const updateImage = async (id, data) => {
  return apiCall(`/images/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteImage = async (id) => {
  return apiCall(`/images/${id}`, {
    method: 'DELETE',
  });
};

// Stats API (Dashboard)
export const getDashboardStats = async () => {
  const [forms, contacts] = await Promise.all([
    getAdmissionForms(),
    getContacts(),
  ]);
  
  return {
    totalEnquiries: contacts.data?.length || 0,
    totalSubmissions: contacts.data?.length || 0,
    totalAdmissions: forms.data?.length || 0,
    pendingEnquiries: contacts.data?.filter(c => c.status === 'New Inquiry')?.length || 0,
    newAdmissions: forms.data?.filter(f => f.status === 'New Inquiry')?.length || 0,
    contactedAdmissions: forms.data?.filter(f => f.status === 'Approved')?.length || 0,
    processingAdmissions: forms.data?.filter(f => f.status === 'In Progress')?.length || 0,
  };
};