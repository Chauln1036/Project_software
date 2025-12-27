import { TrendingUp, Users, Package, AlertCircle, DollarSign, ShoppingCart } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockCustomers, mockProducts, mockOrders } from '../../data/mockData';

export function OverviewPage() {
  // Calculate stats
  const totalRevenue = 45600000;
  const totalCustomers = mockCustomers.length;
  const totalProducts = mockProducts.filter(p => p.active).length;
  const totalDebt = mockCustomers.reduce((sum, c) => sum + c.outstandingDebt, 0);
  const lowStockProducts = mockProducts.filter(p => p.stock < 100 && p.active).length;

  // Revenue chart data
  const revenueData = [
    { name: 'T2', revenue: 5200000 },
    { name: 'T3', revenue: 6800000 },
    { name: 'T4', revenue: 5900000 },
    { name: 'T5', revenue: 7200000 },
    { name: 'T6', revenue: 8100000 },
    { name: 'T7', revenue: 6400000 },
    { name: 'CN', revenue: 6000000 }
  ];

  // Top products data
  const topProductsData = [
    { name: 'Xi măng', value: 15000000, color: '#4F46E5' },
    { name: 'Sắt thép', value: 12000000, color: '#06B6D4' },
    { name: 'Gạch', value: 9000000, color: '#10B981' },
    { name: 'Cát đá', value: 7000000, color: '#F59E0B' },
    { name: 'Khác', value: 2600000, color: '#6B7280' }
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Tổng quan</h2>
        <p className="text-gray-600">Dashboard kinh doanh của bạn</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Doanh thu tháng này</p>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-gray-900 text-2xl mb-1">{totalRevenue.toLocaleString('vi-VN')}đ</p>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5% so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Khách hàng</p>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-900 text-2xl mb-1">{totalCustomers}</p>
          <p className="text-gray-500 text-sm">3 khách hàng mới tuần này</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Sản phẩm</p>
            <div className="p-2 bg-green-50 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-900 text-2xl mb-1">{totalProducts}</p>
          <p className="text-orange-600 text-sm">{lowStockProducts} sản phẩm sắp hết hàng</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Công nợ</p>
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-900 text-2xl mb-1">{totalDebt.toLocaleString('vi-VN')}đ</p>
          <p className="text-gray-500 text-sm">Từ 3 khách hàng</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Doanh thu 7 ngày qua</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}tr`} />
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString('vi-VN')}đ`, 'Doanh thu']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Bar dataKey="revenue" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Sản phẩm bán chạy</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topProductsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topProductsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value.toLocaleString('vi-VN')}đ`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h3 className="text-gray-900">Cảnh báo tồn kho</h3>
          </div>
          <div className="space-y-3">
            {mockProducts.filter(p => p.stock < 100 && p.active).slice(0, 5).map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-orange-600">{product.stock} {product.unit}</p>
                  <p className="text-xs text-gray-500">Còn lại</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="text-gray-900">Khách hàng thân thiết</h3>
          </div>
          <div className="space-y-3">
            {mockCustomers.slice(0, 5).map(customer => (
              <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-indigo-600">{customer.totalPurchases.toLocaleString('vi-VN')}đ</p>
                  <p className="text-xs text-gray-500">Tổng mua</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
