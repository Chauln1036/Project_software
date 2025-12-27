import { useState } from 'react';
import { Plus, Search, Edit2, Eye, AlertCircle, X } from 'lucide-react';
import { mockCustomers } from '../../data/mockData';
import { Customer } from '../../types';

export function CustomersPage() {
  const [customers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  const customersWithDebt = customers.filter(c => c.outstandingDebt > 0);
  const totalDebt = customersWithDebt.reduce((sum, c) => sum + c.outstandingDebt, 0);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Quản lý khách hàng</h2>
          <p className="text-gray-600">Danh sách khách hàng và công nợ</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm khách hàng</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Tổng khách hàng</p>
          <p className="text-gray-900 text-2xl">{customers.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Khách hàng có nợ</p>
          <p className="text-orange-600 text-2xl">{customersWithDebt.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Tổng công nợ</p>
          <p className="text-red-600 text-2xl">{totalDebt.toLocaleString('vi-VN')}đ</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng theo tên hoặc số điện thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Khách hàng</th>
                <th className="px-6 py-3 text-left text-gray-700">Liên hệ</th>
                <th className="px-6 py-3 text-right text-gray-700">Tổng mua</th>
                <th className="px-6 py-3 text-right text-gray-700">Công nợ</th>
                <th className="px-6 py-3 text-left text-gray-700">Mua gần nhất</th>
                <th className="px-6 py-3 text-center text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{customer.name}</p>
                    {customer.notes && (
                      <p className="text-sm text-gray-500 mt-1">{customer.notes}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{customer.phone}</p>
                    <p className="text-sm text-gray-500 mt-1">{customer.address}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-indigo-600">{customer.totalPurchases.toLocaleString('vi-VN')}đ</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {customer.outstandingDebt > 0 ? (
                      <div className="flex items-center justify-end gap-1">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <p className="text-orange-600">{customer.outstandingDebt.toLocaleString('vi-VN')}đ</p>
                      </div>
                    ) : (
                      <p className="text-gray-400">-</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">
                      {new Date(customer.lastPurchase).toLocaleDateString('vi-VN')}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">Chi tiết khách hàng</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-gray-900 mb-3">Thông tin cơ bản</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tên khách hàng</p>
                    <p className="text-gray-900">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="text-gray-900">{selectedCustomer.phone}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-600">Địa chỉ</p>
                    <p className="text-gray-900">{selectedCustomer.address}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h4 className="text-gray-900 mb-3">Thống kê</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-indigo-600 mb-1">Tổng mua hàng</p>
                    <p className="text-indigo-900 text-xl">{selectedCustomer.totalPurchases.toLocaleString('vi-VN')}đ</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-600 mb-1">Công nợ hiện tại</p>
                    <p className="text-orange-900 text-xl">{selectedCustomer.outstandingDebt.toLocaleString('vi-VN')}đ</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">Mua gần nhất</p>
                    <p className="text-green-900">{new Date(selectedCustomer.lastPurchase).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              </div>

              {/* Purchase History (Mock) */}
              <div>
                <h4 className="text-gray-900 mb-3">Lịch sử mua hàng</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-gray-900">Đơn hàng #DH-2025-001</p>
                      <p className="text-sm text-gray-600">24/12/2025</p>
                    </div>
                    <p className="text-indigo-600">8,250,000đ</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-gray-900">Đơn hàng #DH-2024-987</p>
                      <p className="text-sm text-gray-600">15/12/2025</p>
                    </div>
                    <p className="text-indigo-600">12,500,000đ</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Chỉnh sửa thông tin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">Thêm khách hàng mới</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Tên khách hàng *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="VD: Anh Ba"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0901234567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Địa chỉ</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Địa chỉ khách hàng"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Ghi chú</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Ghi chú về khách hàng..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    alert('Khách hàng đã được thêm!');
                    setShowAddModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Thêm khách hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
