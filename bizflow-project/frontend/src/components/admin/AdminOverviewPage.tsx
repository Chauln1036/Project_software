import { TrendingUp, Users, DollarSign, Activity, CheckCircle, Clock, XCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockBusinessAccounts } from '../../data/mockData';

export function AdminOverviewPage() {
  const totalAccounts = mockBusinessAccounts.length;
  const activeAccounts = mockBusinessAccounts.filter(a => a.subscriptionStatus === 'active').length;
  const trialAccounts = mockBusinessAccounts.filter(a => a.subscriptionStatus === 'trial').length;
  const monthlyRevenue = activeAccounts * 350000;

  // Growth data
  const growthData = [
    { month: 'T1', accounts: 12, revenue: 4200000 },
    { month: 'T2', accounts: 18, revenue: 6300000 },
    { month: 'T3', accounts: 25, revenue: 8750000 },
    { month: 'T4', accounts: 34, revenue: 11900000 },
    { month: 'T5', accounts: 45, revenue: 15750000 },
    { month: 'T6', accounts: 58, revenue: 20300000 }
  ];

  // Subscription distribution
  const subscriptionData = [
    { name: 'Basic', value: 12, color: '#10B981' },
    { name: 'Pro', value: 38, color: '#4F46E5' },
    { name: 'Enterprise', value: 8, color: '#F59E0B' }
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Tổng quan hệ thống</h2>
        <p className="text-gray-600">Dashboard quản trị BizFlow Platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Tổng tài khoản</p>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-gray-900 text-2xl mb-1">{totalAccounts}</p>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+28% tháng này</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Đang hoạt động</p>
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-900 text-2xl mb-1">{activeAccounts}</p>
          <p className="text-gray-500 text-sm">{((activeAccounts / totalAccounts) * 100).toFixed(0)}% tổng số</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Dùng thử</p>
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-900 text-2xl mb-1">{trialAccounts}</p>
          <p className="text-gray-500 text-sm">Chuyển đổi: 65%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Doanh thu/tháng</p>
            <div className="p-2 bg-purple-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-900 text-2xl mb-1">{monthlyRevenue.toLocaleString('vi-VN')}đ</p>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+18.5%</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Tăng trưởng tài khoản</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Line type="monotone" dataKey="accounts" stroke="#4F46E5" strokeWidth={2} name="Tài khoản" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Phân bố gói dịch vụ</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Accounts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Tài khoản đăng ký gần đây</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Doanh nghiệp</th>
                <th className="px-6 py-3 text-left text-gray-700">Chủ sở hữu</th>
                <th className="px-6 py-3 text-left text-gray-700">Liên hệ</th>
                <th className="px-6 py-3 text-left text-gray-700">Gói dịch vụ</th>
                <th className="px-6 py-3 text-left text-gray-700">Trạng thái</th>
                <th className="px-6 py-3 text-left text-gray-700">Đăng ký</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockBusinessAccounts.map(account => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{account.businessName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{account.ownerName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">{account.email}</p>
                    <p className="text-gray-500 text-sm">{account.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      account.subscriptionPlan === 'basic' ? 'bg-green-100 text-green-700' :
                      account.subscriptionPlan === 'pro' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {account.subscriptionPlan === 'basic' ? 'Cơ bản' :
                       account.subscriptionPlan === 'pro' ? 'Chuyên nghiệp' : 'Doanh nghiệp'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      account.subscriptionStatus === 'active' ? 'bg-green-100 text-green-700' :
                      account.subscriptionStatus === 'trial' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {account.subscriptionStatus === 'active' ? 'Hoạt động' :
                       account.subscriptionStatus === 'trial' ? 'Dùng thử' : 'Ngừng'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">
                      {new Date(account.registeredAt).toLocaleDateString('vi-VN')}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
