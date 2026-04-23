import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Phone, Eye, CheckCircle, Search, User } from "lucide-react";

const Admissions = () => {
  const [admissions, setAdmissions] = useState([
    {
      id: 1,
      studentName: "Aarav Singh",
      class: "10A",
      parentName: "Rajesh Singh",
      parentPhone: "+91-9876543210",
      address: "123 Main Street, Kotputli",
      email: "aarav.singh@email.com",
      dateApplied: "2024-01-20",
      status: "Contacted",
    },
    {
      id: 2,
      studentName: "Diya Sharma",
      class: "9B",
      parentName: "Priya Sharma",
      parentPhone: "+91-9876543211",
      address: "456 Oak Avenue, Kotputli",
      email: "diya.sharma@email.com",
      dateApplied: "2024-01-19",
      status: "New",
    },
    {
      id: 3,
      studentName: "Rohan Patel",
      class: "11C",
      parentName: "Amit Patel",
      parentPhone: "+91-9876543212",
      address: "789 Elm Street, Kotputli",
      email: "rohan.patel@email.com",
      dateApplied: "2024-01-18",
      status: "Processing",
    },
    {
      id: 4,
      studentName: "Neha Reddy",
      class: "8A",
      parentName: "Neha Reddy",
      parentPhone: "+91-9876543213",
      address: "321 Pine Lane, Kotputli",
      email: "neha.reddy@email.com",
      dateApplied: "2024-01-17",
      status: "Contacted",
    },
    {
      id: 5,
      studentName: "Arjun Verma",
      class: "10C",
      parentName: "Vikram Verma",
      parentPhone: "+91-9876543214",
      address: "654 Maple Road, Kotputli",
      email: "arjun.verma@email.com",
      dateApplied: "2024-01-16",
      status: "New",
    },
    {
      id: 6,
      studentName: "Isha Gupta",
      class: "12A",
      parentName: "Rajesh Gupta",
      parentPhone: "+91-9876543215",
      address: "987 Cedar Way, Kotputli",
      email: "isha.gupta@email.com",
      dateApplied: "2024-01-15",
      status: "Processing",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredAdmissions = admissions.filter((admission) => {
    return (
      admission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.class.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleMarkAsContacted = (id) => {
    setAdmissions((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Contacted" } : a
      )
    );
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleView = (admission) => {
    setSelectedAdmission(admission);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500/20 text-blue-300";
      case "Contacted":
        return "bg-green-500/20 text-green-300";
      case "Processing":
        return "bg-purple-500/20 text-purple-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <AdminLayout title="Admission Forms">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Total Applications</p>
            <p className="text-3xl font-bold text-foreground mt-2">{admissions.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">New</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">
              {admissions.filter((a) => a.status === "New").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Contacted</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {admissions.filter((a) => a.status === "Contacted").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Processing</p>
            <p className="text-3xl font-bold text-purple-400 mt-2">
              {admissions.filter((a) => a.status === "Processing").length}
            </p>
          </div>
        </div>

        {/* Search & Table */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 text-sidebar-foreground/50" size={20} />
            <input
              type="text"
              placeholder="Search by student name, parent name, or class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Student Name
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Class
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Parent Name
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Phone
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Status
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmissions.map((admission) => (
                  <tr
                    key={admission.id}
                    className="border-b border-border hover:bg-sidebar-accent/30 transition-colors"
                  >
                    <td className="p-3 text-foreground font-medium flex items-center gap-2">
                      <User size={16} className="text-primary" />
                      {admission.studentName}
                    </td>
                    <td className="p-3 text-sidebar-foreground/80 font-medium">
                      {admission.class}
                    </td>
                    <td className="p-3 text-sidebar-foreground/80">
                      {admission.parentName}
                    </td>
                    <td className="p-3 text-sidebar-foreground/80">{admission.parentPhone}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(admission.status)}`}>
                        {admission.status}
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
                          onClick={() => handleCall(admission.parentPhone)}
                          className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-all"
                          title="Call parent"
                        >
                          <Phone size={18} />
                        </button>
                        <button
                          onClick={() => handleMarkAsContacted(admission.id)}
                          disabled={admission.status === "Contacted"}
                          className={`p-2 rounded-lg transition-all ${
                            admission.status === "Contacted"
                              ? "bg-green-500/20 text-green-400 opacity-50 cursor-not-allowed"
                              : "bg-sidebar-accent hover:bg-green-500/20 text-green-400"
                          }`}
                          title="Mark as contacted"
                        >
                          <CheckCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedAdmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">Admission Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Student Name</p>
                  <p className="text-foreground font-medium">{selectedAdmission.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Class</p>
                  <p className="text-foreground font-medium">{selectedAdmission.class}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Parent Name</p>
                  <p className="text-foreground font-medium">{selectedAdmission.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Date Applied</p>
                  <p className="text-foreground font-medium">{selectedAdmission.dateApplied}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60 flex items-center gap-2">
                    <Phone size={16} /> Phone
                  </p>
                  <p className="text-foreground font-medium">{selectedAdmission.parentPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Email</p>
                  <p className="text-foreground font-medium">{selectedAdmission.email}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-sidebar-foreground/60">Address</p>
                <p className="text-foreground bg-background p-3 rounded-lg mt-2">
                  {selectedAdmission.address}
                </p>
              </div>

              <div>
                <p className="text-sm text-sidebar-foreground/60">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedAdmission.status)}`}>
                  {selectedAdmission.status}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleCall(selectedAdmission.parentPhone)}
                className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Call Parent
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
    </AdminLayout>
  );
};

export default Admissions;