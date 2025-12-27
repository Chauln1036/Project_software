import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, DollarSign, Users, Package } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockCustomers, mockProducts } from '../../data/mockData';

export function ReportsPage() {
  const [reportType, setReportType] = useState<'revenue' | 'debt' | 'inventory' | 'accounting'>('revenue');
  const [dateRange, setDateRange] = useState('month');

  // Mock data for charts
  const revenueByMonth = [
    { month: 'T1', revenue: 42000000, cost: 28000000, profit: 14000000 },
    { month: 'T2', revenue: 38000000, cost: 25000000, profit: 13000000 },
    { month: 'T3', revenue: 45000000, cost: 30000000, profit: 15000000 },
    { month: 'T4', revenue: 48000000, cost: 32000000, profit: 16000000 },
    { month: 'T5', revenue: 52000000, cost: 35000000, profit: 17000000 },
    { month: 'T6', revenue: 46000000, cost: 31000000, profit: 15000000 }
  ];

  const topSellingProducts = [
    { name: 'Xi măng Portland', sales: 15000000 },
    { name: 'Sắt thép D10', sales: 12000000 },
    { name: 'Gạch ống đỏ', sales: 9000000 },
    { name: 'Cát xây dựng', sales: 7000000 },
    { name: 'Đá 1x2', sales: 6500000 }
  ];

  const totalDebt = mockCustomers.reduce((sum, c) => sum + c.outstandingDebt, 0);
  const customersWithDebt = mockCustomers.filter(c => c.outstandingDebt > 0);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Báo cáo & Phân tích</h2>
        <p className="text-gray-600">Xem báo cáo kinh doanh và tài chính</p>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setReportType('revenue')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            reportType === 'revenue'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <DollarSign className="w-4 h-4 inline mr-2" />
          Doanh thu
        </button>
        <button
          onClick={() => setReportType('debt')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            reportType === 'debt'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Công nợ
        </button>
        <button
          onClick={() => setReportType('inventory')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            reportType === 'inventory'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Package className="w-4 h-4 inline mr-2" />
          Tồn kho
        </button>
        <button
          onClick={() => setReportType('accounting')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            reportType === 'accounting'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Kế toán
        </button>
      </div>

      {/* Revenue Report */}
      {reportType === 'revenue' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <p className="text-gray-600 mb-1">Doanh thu tháng này</p>
              <p className="text-indigo-600 text-2xl">52,000,000đ</p>
              <p className="text-sm text-green-600 mt-1">+8.7% so với tháng trước</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <p className="text-gray-600 mb-1">Chi phí</p>
              <p className="text-orange-600 text-2xl">35,000,000đ</p>
              <p className="text-sm text-gray-500 mt-1">67.3% doanh thu</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <p className="text-gray-600 mb-1">Lợi nhuận</p>
              <p className="text-green-600 text-2xl">17,000,000đ</p>
              <p className="text-sm text-green-600 mt-1">+12.5% so với tháng trước</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <p className="text-gray-600 mb-1">Tỷ suất LN</p>
              <p className="text-gray-900 text-2xl">32.7%</p>
              <p className="text-sm text-gray-500 mt-1">Margin</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Biểu đồ doanh thu 6 tháng gần đây</h3>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Xuất Excel</span>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" tickFormatter={(value) => `${(value / 1000000)}tr`} />
                <Tooltip 
                  formatter={(value: number) => `${value.toLocaleString('vi-VN')}đ`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Legend />
                <Bar dataKey="revenue" name="Doanh thu" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                <Bar dataKey="cost" name="Chi phí" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                <Bar dataKey="profit" name="Lợi nhuận" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Sản phẩm bán chạy nhất</h3>
            <div className="space-y-3">
              {topSellingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <p className="text-gray-900">{product.name}</p>
                  </div>
                  <p className="text-indigo-600">{product.sales.toLocaleString('vi-VN')}đ</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Debt Report */}
      {reportType === 'debt' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 mb-2">Tổng công nợ phải thu</p>
              <p className="text-orange-600 text-3xl mb-4">{totalDebt.toLocaleString('vi-VN')}đ</p>
              <p className="text-gray-600">Từ {customersWithDebt.length} khách hàng</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 mb-2">Công nợ quá hạn</p>
              <p className="text-red-600 text-3xl mb-4">2,400,000đ</p>
              <p className="text-gray-600">Quá hạn &gt; 30 ngày</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-gray-900">Chi tiết công nợ khách hàng</h3>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Xuất báo cáo</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700">Khách hàng</th>
                    <th className="px-6 py-3 text-left text-gray-700">Liên hệ</th>
                    <th className="px-6 py-3 text-right text-gray-700">Tổng mua</th>
                    <th className="px-6 py-3 text-right text-gray-700">Công nợ</th>
                    <th className="px-6 py-3 text-left text-gray-700">Mua gần nhất</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customersWithDebt.map(customer => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{customer.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{customer.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-gray-900">{customer.totalPurchases.toLocaleString('vi-VN')}đ</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-orange-600">{customer.outstandingDebt.toLocaleString('vi-VN')}đ</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">
                          {new Date(customer.lastPurchase).toLocaleDateString('vi-VN')}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Report */}
      {reportType === 'inventory' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 mb-2">Giá trị tồn kho</p>
              <p className="text-indigo-600 text-3xl">
                {mockProducts.reduce((sum, p) => sum + (p.stock * p.price), 0).toLocaleString('vi-VN')}đ
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 mb-2">Sản phẩm đang bán</p>
              <p className="text-green-600 text-3xl">{mockProducts.filter(p => p.active).length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 mb-2">Sản phẩm sắp hết</p>
              <p className="text-orange-600 text-3xl">
                {mockProducts.filter(p => p.stock < 100 && p.active).length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Báo cáo tồn kho chi tiết</h3>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Xuất Excel</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700">Sản phẩm</th>
                    <th className="px-6 py-3 text-right text-gray-700">Tồn kho</th>
                    <th className="px-6 py-3 text-right text-gray-700">Đơn giá</th>
                    <th className="px-6 py-3 text-right text-gray-700">Giá trị</th>
                    <th className="px-6 py-3 text-center text-gray-700">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockProducts.filter(p => p.active).map(product => {
                    const stockValue = product.stock * product.price;
                    const isLowStock = product.stock < 100;
                    
                    return (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className={isLowStock ? 'text-orange-600' : 'text-gray-900'}>
                            {product.stock} {product.unit}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="text-gray-600">{product.price.toLocaleString('vi-VN')}đ</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="text-gray-900">{stockValue.toLocaleString('vi-VN')}đ</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {isLowStock ? (
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                              Sắp hết
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                              Đủ hàng
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Accounting Report */}
      {reportType === 'accounting' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="text-indigo-900 mb-2">Báo cáo kế toán tự động</h3>
                <p className="text-indigo-800 mb-4">
                  Hệ thống tự động tạo và cập nhật các báo cáo kế toán theo Thông tư 88/2021/TT-BTC 
                  của Bộ Tài chính Việt Nam. Tất cả giao dịch bán hàng, nhập kho, và công nợ được 
                  tự động ghi sổ và tổng hợp theo đúng quy định.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                    ✓ Tuân thủ Thông tư 88/2021/TT-BTC
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    ✓ Tự động cập nhật
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Accounting Reports List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-gray-900">Sổ chi tiết doanh thu</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Ghi chép chi tiết toàn bộ các giao dịch bán hàng theo thời gian
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Tải xuống</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="text-gray-900">Sổ công nợ phải thu</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Theo dõi công nợ khách hàng, thanh toán và số dư
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Tải xuống</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="text-gray-900">Sổ chi tiết vật tư hàng hóa</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Nhập, xuất, tồn kho theo từng sản phẩm
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Tải xuống</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="text-gray-900">Báo cáo kết quả HĐKD</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Tổng hợp doanh thu, chi phí, lợi nhuận theo kỳ
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Tải xuống</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <h4 className="text-gray-900">Bảng cân đối kế toán</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Tài sản, nguồn vốn tại thời điểm báo cáo
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Tải xuống</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <h4 className="text-gray-900">Báo cáo thuế</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Tờ khai thuế GTGT, thuế TNDN cho cơ quan thuế
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Tải xuống</span>
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h4 className="text-yellow-900 mb-2">⚠️ Lưu ý quan trọng</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Tất cả báo cáo được tạo tự động từ dữ liệu giao dịch thực tế</li>
              <li>• Mẫu báo cáo tuân thủ 100% Thông tư 88/2021/TT-BTC</li>
              <li>• Hệ thống tự động cập nhật khi có thay đổi quy định từ cơ quan thuế</li>
              <li>• Bạn có thể xem lại và chỉnh sửa trước khi nộp cho cơ quan thuế</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
