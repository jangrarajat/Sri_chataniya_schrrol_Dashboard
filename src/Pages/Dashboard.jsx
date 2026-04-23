import { useEffect, useState } from "react";
import { Users, Mail, FileText, TrendingUp, Send } from "lucide-react";
import AdminLayout from "../components/AdminLayout.jsx";
import { getDashboardStats, getAdmissionForms, getContacts } from "../api/api";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    totalSubmissions: 0,
    totalAdmissions: 0,
    pendingEnquiries: 0,
    newAdmissions: 0,
    contactedAdmissions: 0,
    processingAdmissions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [formsData, contactsData] = await Promise.all([
        getAdmissionForms(),
        getContacts(),
      ]);

      const forms = formsData.data || [];
      const contacts = contactsData.data || [];

      // Stats
      setStats({
        totalEnquiries: contacts.length,
        totalSubmissions: contacts.length,
        totalAdmissions: forms.length,
        pendingEnquiries: contacts.filter(c => c.status === 'New Inquiry').length,
        newAdmissions: forms.filter(f => f.status === 'New Inquiry').length,
        contactedAdmissions: forms.filter(f => f.status === 'Approved').length,
        processingAdmissions: forms.filter(f => f.status === 'In Progress').length,
      });

      // Weekly data (last 7 days)
      const last7Days = [...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const weekly = last7Days.map(date => ({
        day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        enquiries: contacts.filter(c => c.createdAt?.split('T')[0] === date).length,
        admissions: forms.filter(f => f.createdAt?.split('T')[0] === date).length,
      }));
      setWeeklyData(weekly);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Contact Enquiries",
      value: stats.totalEnquiries,
      icon: Mail,
      color: "bg-purple-500/10 text-purple-400",
      trend: "Total enquiries received",
    },
    {
      label: "Contact Submissions",
      value: stats.totalSubmissions,
      icon: Send,
      color: "bg-green-500/10 text-green-400",
      trend: "Total contact forms",
    },
    {
      label: "Admission Forms",
      value: stats.totalAdmissions,
      icon: FileText,
      color: "bg-orange-500/10 text-orange-400",
      trend: "Total applications",
    },
  ];

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sidebar-foreground/60">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sidebar-foreground/60 text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <p className="text-xs text-sidebar-foreground/50">{stat.trend}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Weekly Activity
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--sidebar-foreground)/0.5)" />
                <YAxis stroke="hsl(var(--sidebar-foreground)/0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend />
                <Bar dataKey="enquiries" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                <Bar dataKey="admissions" fill="hsl(var(--sidebar-accent-foreground))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-sidebar-background rounded-lg">
                <span className="text-sidebar-foreground/70">New Admissions</span>
                <span className="text-2xl font-bold text-blue-400">{stats.newAdmissions}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-sidebar-background rounded-lg">
                <span className="text-sidebar-foreground/70">Approved/Contacted</span>
                <span className="text-2xl font-bold text-green-400">{stats.contactedAdmissions}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-sidebar-background rounded-lg">
                <span className="text-sidebar-foreground/70">In Progress</span>
                <span className="text-2xl font-bold text-orange-400">{stats.processingAdmissions}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-sidebar-background rounded-lg">
                <span className="text-sidebar-foreground/70">Pending Enquiries</span>
                <span className="text-2xl font-bold text-purple-400">{stats.pendingEnquiries}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;