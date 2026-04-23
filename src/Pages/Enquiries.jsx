import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Mail, Phone, MessageCircle, Send, Search, Eye } from "lucide-react";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91-9876543210",
      subject: "Admission Query",
      message: "I want to know about the admission process for class 10",
      date: "2024-01-15",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@example.com",
      phone: "+91-9876543211",
      subject: "Fee Structure",
      message: "Can you provide the complete fee structure for all classes?",
      date: "2024-01-14",
      status: "Replied",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91-9876543212",
      subject: "Scholarship Program",
      message: "Is there any scholarship available for merit students?",
      date: "2024-01-13",
      status: "Pending",
    },
    {
      id: 4,
      name: "Neha Sharma",
      email: "neha@example.com",
      phone: "+91-9876543213",
      subject: "Hostel Facilities",
      message: "What are the hostel facilities available on campus?",
      date: "2024-01-12",
      status: "Replied",
    },
    {
      id: 5,
      name: "Vikram Das",
      email: "vikram@example.com",
      phone: "+91-9876543214",
      subject: "General Inquiry",
      message: "I would like to visit the campus and see the facilities.",
      date: "2024-01-11",
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [showReplyModal, setShowReplyModal] = useState(false);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || enquiry.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleReply = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setReplyMessage("");
    setShowReplyModal(true);
  };

  const sendReply = () => {
    if (selectedEnquiry && replyMessage.trim()) {
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === selectedEnquiry.id ? { ...e, status: "Replied" } : e
        )
      );
      setShowReplyModal(false);
      setSelectedEnquiry(null);
      setReplyMessage("");
    }
  };

  return (
    <AdminLayout title="Contact Enquiries">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Total Enquiries</p>
            <p className="text-3xl font-bold text-foreground mt-2">{enquiries.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Pending</p>
            <p className="text-3xl font-bold text-orange-400 mt-2">
              {enquiries.filter((e) => e.status === "Pending").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Replied</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {enquiries.filter((e) => e.status === "Replied").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-sidebar-foreground/50" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              {(["All", "Pending", "Replied"]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Name
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Email
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Phone
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">
                    Subject
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
                {filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="border-b border-border hover:bg-sidebar-accent/30 transition-colors"
                  >
                    <td className="p-3 text-foreground font-medium">{enquiry.name}</td>
                    <td className="p-3 text-sidebar-foreground/80">{enquiry.email}</td>
                    <td className="p-3 text-sidebar-foreground/80">{enquiry.phone}</td>
                    <td className="p-3 text-sidebar-foreground/80 max-w-xs truncate">
                      {enquiry.subject}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          enquiry.status === "Pending"
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="p-2 bg-sidebar-accent hover:bg-primary/20 rounded-lg text-primary transition-all"
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleReply(enquiry)}
                          className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-primary transition-all"
                          title="Reply to enquiry"
                        >
                          <Send size={18} />
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

      {/* View Details Modal */}
      {selectedEnquiry && !showReplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">Enquiry Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Name</p>
                  <p className="text-foreground font-medium">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Date</p>
                  <p className="text-foreground font-medium">{selectedEnquiry.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60 flex items-center gap-2">
                    <Mail size={16} /> Email
                  </p>
                  <p className="text-foreground font-medium">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60 flex items-center gap-2">
                    <Phone size={16} /> Phone
                  </p>
                  <p className="text-foreground font-medium">{selectedEnquiry.phone}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-sidebar-foreground/60">Subject</p>
                <p className="text-foreground font-medium">{selectedEnquiry.subject}</p>
              </div>

              <div>
                <p className="text-sm text-sidebar-foreground/60">Message</p>
                <p className="text-foreground bg-background p-3 rounded-lg mt-2">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div>
                <p className="text-sm text-sidebar-foreground/60">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    selectedEnquiry.status === "Pending"
                      ? "bg-orange-500/20 text-orange-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {selectedEnquiry.status}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleReply(selectedEnquiry)}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} /> Reply
              </button>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="flex-1 bg-background border border-border text-foreground px-4 py-2 rounded-lg font-medium hover:bg-sidebar-accent transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Reply to {selectedEnquiry.name}
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-sidebar-foreground/60">To:</p>
                <p className="text-foreground font-medium">{selectedEnquiry.email}</p>
              </div>

              <div>
                <label className="text-sm text-sidebar-foreground/60 block mb-2">
                  Your Reply
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply message here..."
                  rows={6}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={sendReply}
                disabled={!replyMessage.trim()}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} /> Send Reply
              </button>
              <button
                onClick={() => setShowReplyModal(false)}
                className="flex-1 bg-background border border-border text-foreground px-4 py-2 rounded-lg font-medium hover:bg-sidebar-accent transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Enquiries;