import React, { useState } from 'react';
import AdminLayout from "../components/AdminLayout.jsx";
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Search, 
  Filter, 
  Download,
  Eye,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  UserCheck,
  UserX,
  BarChart3,
  PieChart
} from 'lucide-react';

const Analytics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const itemsPerPage = 10;

  // Sample visitors data
  const visitorsData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 234 567 8901',
      purpose: 'Parent-Teacher Meeting',
      department: 'Administration',
      checkInTime: '09:15 AM',
      checkOutTime: '10:30 AM',
      status: 'checked-out',
      date: '2024-01-15',
      hostName: 'Dr. Emily Smith',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      phone: '+1 234 567 8902',
      purpose: 'Job Interview',
      department: 'HR',
      checkInTime: '10:00 AM',
      checkOutTime: '11:45 AM',
      status: 'checked-out',
      date: '2024-01-15',
      hostName: 'John Davis',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.w@email.com',
      phone: '+1 234 567 8903',
      purpose: 'School Tour',
      department: 'Admissions',
      checkInTime: '11:30 AM',
      checkOutTime: '',
      status: 'checked-in',
      date: '2024-01-15',
      hostName: 'Lisa Anderson',
      photo: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
      id: 4,
      name: 'James Taylor',
      email: 'james.t@email.com',
      phone: '+1 234 567 8904',
      purpose: 'Sports Event',
      department: 'Sports',
      checkInTime: '01:00 PM',
      checkOutTime: '03:30 PM',
      status: 'checked-out',
      date: '2024-01-14',
      hostName: 'Coach Mike',
      photo: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
      id: 5,
      name: 'Lisa Garcia',
      email: 'lisa.g@email.com',
      phone: '+1 234 567 8905',
      purpose: 'Workshop',
      department: 'Science',
      checkInTime: '02:15 PM',
      checkOutTime: '',
      status: 'checked-in',
      date: '2024-01-14',
      hostName: 'Dr. Robert Chen',
      photo: 'https://randomuser.me/api/portraits/women/5.jpg'
    },
    {
      id: 6,
      name: 'David Martinez',
      email: 'david.m@email.com',
      phone: '+1 234 567 8906',
      purpose: 'Parent-Teacher Meeting',
      department: 'Mathematics',
      checkInTime: '08:45 AM',
      checkOutTime: '09:30 AM',
      status: 'checked-out',
      date: '2024-01-13',
      hostName: 'Prof. White',
      photo: 'https://randomuser.me/api/portraits/men/6.jpg'
    },
    {
      id: 7,
      name: 'Anna Lee',
      email: 'anna.l@email.com',
      phone: '+1 234 567 8907',
      purpose: 'Library Visit',
      department: 'Library',
      checkInTime: '10:30 AM',
      checkOutTime: '12:00 PM',
      status: 'checked-out',
      date: '2024-01-13',
      hostName: 'Ms. Johnson',
      photo: 'https://randomuser.me/api/portraits/women/7.jpg'
    },
    {
      id: 8,
      name: 'Robert Kim',
      email: 'robert.k@email.com',
      phone: '+1 234 567 8908',
      purpose: 'Guest Lecture',
      department: 'Computer Science',
      checkInTime: '09:00 AM',
      checkOutTime: '11:30 AM',
      status: 'checked-out',
      date: '2024-01-12',
      hostName: 'Dr. Patel',
      photo: 'https://randomuser.me/api/portraits/men/8.jpg'
    }
  ];

  // Analytics data
  const totalVisitors = visitorsData.length;
  const checkedIn = visitorsData.filter(v => v.status === 'checked-in').length;
  const checkedOut = visitorsData.filter(v => v.status === 'checked-out').length;
  const todayVisitors = visitorsData.filter(v => v.date === '2024-01-15').length;

  // Filter visitors
  const filteredVisitors = visitorsData.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || visitor.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort visitors
  const sortedVisitors = [...filteredVisitors].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedVisitors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVisitors = sortedVisitors.slice(startIndex, endIndex);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'checked-in':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Checked In</span>;
      case 'checked-out':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Checked Out</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  const content = (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Visitors</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalVisitors}</p>
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp size={14} />
                +12% from last month
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Currently Inside</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{checkedIn}</p>
              <p className="text-blue-600 text-sm mt-2 flex items-center gap-1">
                <UserCheck size={14} />
                Active visitors
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <UserCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Checked Out</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{checkedOut}</p>
              <p className="text-gray-600 text-sm mt-2">Completed visits</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <UserX className="text-gray-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Today's Visitors</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{todayVisitors}</p>
              <p className="text-purple-600 text-sm mt-2 flex items-center gap-1">
                <Calendar size={14} />
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Visitor Trends</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 size={48} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would appear here</p>
              <p className="text-sm text-gray-400">Using Recharts or Chart.js library</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Purpose Distribution</h3>
            <PieChart size={20} className="text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <PieChart size={48} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would appear here</p>
              <p className="text-sm text-gray-400">Using Recharts or Chart.js library</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search visitors by name, email, or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="checked-in">Checked In</option>
                <option value="checked-out">Checked Out</option>
                <option value="pending">Pending</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter size={18} />
                More Filters
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Visitors Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">
                    Visitor
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('purpose')}>
                  <div className="flex items-center gap-1">
                    Purpose
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('department')}>
                  <div className="flex items-center gap-1">
                    Department
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">
                    Date
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={visitor.photo} alt={visitor.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-gray-900">{visitor.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail size={12} />
                          <span>{visitor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone size={12} />
                          <span>{visitor.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{visitor.purpose}</p>
                    <p className="text-sm text-gray-500">Host: {visitor.hostName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{visitor.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock size={14} />
                      <span>{visitor.checkInTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(visitor.status)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {visitor.date}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedVisitors.length)} of {sortedVisitors.length} visitors
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            {totalPages > 5 && <span className="px-3 py-1">...</span>}
            {totalPages > 5 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Visitors Analytics">
      {content}
    </AdminLayout>
  );
};

export default Analytics;