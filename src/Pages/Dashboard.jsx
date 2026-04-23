import { Users, Mail, FileText, Send, TrendingUp } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
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
  // Sample data for charts
  const visitorsData = [
    { month: "Jan", visitors: 4000 },
    { month: "Feb", visitors: 3000 },
    { month: "Mar", visitors: 2000 },
    { month: "Apr", visitors: 2780 },
    { month: "May", visitors: 1890 },
    { month: "Jun", visitors: 2390 },
  ];

  const inquiriesData = [
    { day: "Mon", enquiries: 24, admissions: 15 },
    { day: "Tue", enquiries: 18, admissions: 12 },
    { day: "Wed", enquiries: 32, admissions: 22 },
    { day: "Thu", enquiries: 28, admissions: 20 },
    { day: "Fri", enquiries: 35, admissions: 25 },
    { day: "Sat", enquiries: 22, admissions: 18 },
  ];

  const stats = [
    {
      label: "Total Website Visitors",
      value: "12,450",
      icon: Users,
      color: "bg-blue-500/10 text-blue-400",
      trend: "+12% from last month",
    },
    {
      label: "Contact Enquiries",
      value: "243",
      icon: Mail,
      color: "bg-purple-500/10 text-purple-400",
      trend: "+8% from last month",
    },
    {
      label: "Contact Submissions",
      value: "89",
      icon: Send,
      color: "bg-green-500/10 text-green-400",
      trend: "+5% from last month",
    },
    {
      label: "Admission Forms",
      value: "156",
      icon: FileText,
      color: "bg-orange-500/10 text-orange-400",
      trend: "+22% from last month",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="stat-card group"
              >
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
                <p className="text-xs text-green-400">{stat.trend}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitors Chart */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Monthly Website Visitors
              </h3>
              <p className="text-sm text-sidebar-foreground/60 mt-1">
                Visitor trends over the last 6 months
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis stroke="hsl(var(--sidebar-foreground)/0.5)" />
                <YAxis stroke="hsl(var(--sidebar-foreground)/0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Inquiries vs Admissions Chart */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Weekly Inquiries & Admissions
              </h3>
              <p className="text-sm text-sidebar-foreground/60 mt-1">
                Comparison of contact enquiries and admission forms
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inquiriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis stroke="hsl(var(--sidebar-foreground)/0.5)" />
                <YAxis stroke="hsl(var(--sidebar-foreground)/0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend />
                <Bar
                  dataKey="enquiries"
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="admissions"
                  fill="hsl(var(--sidebar-accent-foreground))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
            <p className="text-sm text-sidebar-foreground/60 font-medium mb-2">
              Today's Visitors
            </p>
            <p className="text-3xl font-bold text-primary">342</p>
            <p className="text-xs text-primary/60 mt-2">+15% compared to yesterday</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg p-6">
            <p className="text-sm text-sidebar-foreground/60 font-medium mb-2">
              Pending Enquiries
            </p>
            <p className="text-3xl font-bold text-green-400">28</p>
            <p className="text-xs text-green-400/60 mt-2">Awaiting response</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-lg p-6">
            <p className="text-sm text-sidebar-foreground/60 font-medium mb-2">
              New Admissions
            </p>
            <p className="text-3xl font-bold text-orange-400">12</p>
            <p className="text-xs text-orange-400/60 mt-2">This week</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;