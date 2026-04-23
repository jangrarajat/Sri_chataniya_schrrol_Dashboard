import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import { Mail, Phone, Send, Search, Eye, RefreshCw } from "lucide-react";
import { getContacts, deleteContact } from "../api/api";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [showReplyModal, setShowReplyModal] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await getContacts();
      setEnquiries(response.data || []);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await deleteContact(id);
        fetchEnquiries();
      } catch (error) {
        console.error("Error deleting enquiry:", error);
      }
    }
  };

  const handleReply = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setReplyMessage("");
    setShowReplyModal(true);
  };

  const sendReply = () => {
    if (selectedEnquiry && replyMessage.trim()) {
      // In production, you would send an email here
      alert(`Reply sent to ${selectedEnquiry.email}:\n\n${replyMessage}`);
      setShowReplyModal(false);
      setSelectedEnquiry(null);
      setReplyMessage("");
    }
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.subject?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  if (loading) {
    return (
      <AdminLayout title="Contact Enquiries">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sidebar-foreground/60">Loading enquiries...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Contact Enquiries">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Total Enquiries</p>
            <p className="text-3xl font-bold text-foreground mt-2">{enquiries.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">Total Messages</p>
            <p className="text-3xl font-bold text-purple-400 mt-2">{enquiries.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-sidebar-foreground/60 font-medium">To Reply</p>
            <p className="text-3xl font-bold text-orange-400 mt-2">{enquiries.length}</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-sidebar-foreground/50" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={fetchEnquiries}
              className="px-4 py-2 bg-sidebar-accent rounded-lg text-foreground hover:bg-sidebar-accent/80 flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Name</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Email</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Phone</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Subject</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Date</th>
                  <th className="text-left p-3 text-sm font-semibold text-sidebar-foreground/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="border-b border-border hover:bg-sidebar-accent/30 transition-colors">
                    <td className="p-3 text-foreground font-medium">{enquiry.fullName}</td>
                    <td className="p-3 text-sidebar-foreground/80">{enquiry.email}</td>
                    <td className="p-3 text-sidebar-foreground/80">{enquiry.phoneNumber}</td>
                    <td className="p-3 text-sidebar-foreground/80">{enquiry.subject}</td>
                    <td className="p-3 text-sidebar-foreground/80">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
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
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-foreground mb-4">Enquiry Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Name</p>
                  <p className="text-foreground font-medium">{selectedEnquiry.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-sidebar-foreground/60">Date</p>
                  <p className="text-foreground font-medium">{new Date(selectedEnquiry.createdAt).toLocaleDateString()}</p>
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
                  <p className="text-foreground font-medium">{selectedEnquiry.phoneNumber}</p>
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
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleReply(selectedEnquiry)}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} /> Reply
              </button>
              <button
                onClick={() => handleDelete(selectedEnquiry._id)}
                className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg font-medium transition-all"
              >
                Delete
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
              Reply to {selectedEnquiry.fullName}
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