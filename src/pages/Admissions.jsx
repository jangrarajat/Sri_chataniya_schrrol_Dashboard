import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import { Phone, Eye, CheckCircle, Search, User, RefreshCw, Trash2, X } from "lucide-react";
import { getAdmissionForms, updateAdmissionStatus, deleteAdmissionForm } from "../api/api.js";

const Admissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const response = await getAdmissionForms();
      setAdmissions(response.data || []);
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsContacted = async (id) => {
    try {
      await updateAdmissionStatus(id, "Approved");
      fetchAdmissions();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleCall = (phone) => {
    if (phone) {
      window.open(`tel:${phone}`);
    }
  };

  const handleView = (admission) => {
    setSelectedAdmission(admission);
    setShowDetailsModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteAdmissionForm(deleteId);
        setShowDeleteConfirm(false);
        setDeleteId(null);
        await fetchAdmissions();
        alert("Admission form deleted successfully!");
      } catch (error) {
        console.error("Error deleting admission:", error);
        alert("Failed to delete admission form");
      }
    }
  };

  const filteredAdmissions = admissions.filter((admission) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (admission.fullName && admission.fullName.toLowerCase().includes(searchLower)) ||
      (admission.fatherName && admission.fatherName.toLowerCase().includes(searchLower)) ||
      (admission.currentClass && admission.currentClass.toLowerCase().includes(searchLower)) ||
      (admission.email && admission.email.toLowerCase().includes(searchLower))
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "New Inquiry":
        return "bg-blue-500/20 text-blue-300";
      case "Approved":
        return "bg-green-500/20 text-green-300";
      case "Rejected":
        return "bg-red-500/20 text-red-300";
      case "In Progress":
        return "bg-purple-500/20 text-purple-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const stats = {
    total: admissions.length,
    new: admissions.filter(a => a.status === "New Inquiry").length,
    approved: admissions.filter(a => a.status === "Approved").length,
    inProgress: admissions.filter(a => a.status === "In Progress").length,
    rejected: admissions.filter(a => a.status === "Rejected").length,
  };

  if (loading) {
    return (
      <AdminLayout title="Admission Forms">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sidebar-foreground/60">Loading admissions...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Admission Forms">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Total Applications</p>
            <p className="text-3xl font-bold text-foreground mt-2">{stats.total}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">New</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">{stats.new}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Approved</p>
            <p className="text-3xl font-bold text-green-400 mt-2">{stats.approved}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">In Progress</p>
            <p className="text-3xl font-bold text-purple-400 mt-2">{stats.inProgress}</p>
          </div>
        </div>

        {/* Search and Table */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-sidebar-foreground/50" size={20} />
              <input
                type="text"
                placeholder="Search by student name, parent name, class, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={fetchAdmissions}
              className="px-4 py-2 bg-sidebar-accent rounded-lg text-foreground hover:bg-sidebar-accent/80 flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Student Name</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Class</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Parent Name</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Phone</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Email</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Status</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmissions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-sidebar-foreground/60">
                      No admission forms found
                    </td>
                  </tr>
                ) : (
                  filteredAdmissions.map((admission) => (
                    <tr key={admission._id} className="border-b border-border hover:bg-sidebar-accent/30 transition-colors">
                      <td className="p-3 text-foreground font-medium flex items-center gap-2">
                        <User size={16} className="text-primary" />
                        {admission.fullName || "N/A"}
                      </td>
                      <td className="p-3 text-sidebar-foreground/80">{admission.currentClass || "N/A"}</td>
                      <td className="p-3 text-sidebar-foreground/80">{admission.fatherName || "N/A"}</td>
                      <td className="p-3 text-sidebar-foreground/80">{admission.phoneNumber || "N/A"}</td>
                      <td className="p-3 text-sidebar-foreground/80 max-w-[150px] truncate">{admission.email || "N/A"}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(admission.status)}`}>
                          {admission.status || "New Inquiry"}
                        </span>
                       </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(admission)}
                            className="p-2 bg-sidebar-accent hover:bg-primary/20 rounded-lg text-primary transition-all"
                            title="View details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleCall(admission.phoneNumber)}
                            className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-all"
                            title="Call parent"
                          >
                            <Phone size={18} />
                          </button>
                          <button
                            onClick={() => handleMarkAsContacted(admission._id)}
                            disabled={admission.status === "Approved"}
                            className={`p-2 rounded-lg transition-all ${
                              admission.status === "Approved"
                                ? "bg-green-500/20 text-green-400 opacity-50 cursor-not-allowed"
                                : "bg-sidebar-accent hover:bg-green-500/20 text-green-400"
                            }`}
                            title="Mark as approved"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(admission._id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-all"
                            title="Delete form"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                       </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedAdmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-foreground">Admission Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-sidebar-foreground/60 hover:text-foreground"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Student Name</p>
                  <p className="text-foreground font-medium">{selectedAdmission.fullName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Date of Birth</p>
                  <p className="text-foreground font-medium">
                    {selectedAdmission.dateOfBirth ? new Date(selectedAdmission.dateOfBirth).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Gender</p>
                  <p className="text-foreground font-medium">{selectedAdmission.gender || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Current Class</p>
                  <p className="text-foreground font-medium">{selectedAdmission.currentClass || "N/A"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Father's Name</p>
                  <p className="text-foreground font-medium">{selectedAdmission.fatherName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Mother's Name</p>
                  <p className="text-foreground font-medium">{selectedAdmission.motherName || "N/A"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Phone</p>
                  <p className="text-foreground font-medium">{selectedAdmission.phoneNumber || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Email</p>
                  <p className="text-foreground font-medium">{selectedAdmission.email || "N/A"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Desired Course</p>
                  <p className="text-foreground font-medium">{selectedAdmission.desiredCourse || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Previous School</p>
                  <p className="text-foreground font-medium">{selectedAdmission.previousSchoolName || "N/A"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-sidebar-foreground/60">Last Exam Percentage</p>
                <p className="text-foreground font-medium">{selectedAdmission.lastExamPercentage || "N/A"}%</p>
              </div>

              <div>
                <p className="text-sm text-sidebar-foreground/60">Address</p>
                <p className="text-foreground bg-background p-3 rounded-lg mt-2">
                  {selectedAdmission.address || "N/A"}, {selectedAdmission.city || "N/A"}, {selectedAdmission.state || "N/A"} - {selectedAdmission.pincode || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-sidebar-foreground/60">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedAdmission.status)}`}>
                  {selectedAdmission.status || "New Inquiry"}
                </span>
              </div>

              <div>
                <p className="text-sm text-sidebar-foreground/60">Applied On</p>
                <p className="text-foreground font-medium">
                  {selectedAdmission.createdAt ? new Date(selectedAdmission.createdAt).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleCall(selectedAdmission.phoneNumber)}
                className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Call Parent
              </button>
              <button
                onClick={() => handleDeleteClick(selectedAdmission._id)}
                className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={18} /> Delete Form
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 bg-background border border-border text-foreground px-4 py-2 rounded-lg font-medium hover:bg-sidebar-accent transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} className="text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Delete Admission Form</h2>
              <p className="text-sidebar-foreground/60 mb-6">
                Are you sure you want to delete this admission form? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-sidebar-accent transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Admissions;