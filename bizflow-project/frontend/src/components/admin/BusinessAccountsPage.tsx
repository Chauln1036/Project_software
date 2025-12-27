import { useState } from 'react';
import { Search, Eye, ToggleLeft, ToggleRight, X } from 'lucide-react';
import { mockBusinessAccounts } from '../../data/mockData';
import { BusinessAccount } from '../../types';

export function BusinessAccountsPage() {
  const [accounts, setAccounts] = useState(mockBusinessAccounts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<BusinessAccount | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'trial' | 'inactive'>('all');

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || account.subscriptionStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleAccountStatus = (accountId: string) => {
    setAccounts(accounts.map(a =>
      a.id === accountId
        ? { 
            ...a, 
            subscriptionStatus: a.subscriptionStatus === 'active' ? 'inactive' : 'active' 
          }
        : a
    ));
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Quản lý tài khoản doanh nghiệp</h2>
        <p className="text-gray-600">Danh sách các hộ kinh doanh đã đăng ký</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Tổng số</p>
          <p className="text-gray-900 text-2xl">{accounts.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Hoạt động</p>
          <p className="text-green-600 text-2xl">
            {accounts.filter(a => a.subscriptionStatus === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Dùng thử</p>
          <p className="text-yellow-600 text-2xl">
            {accounts.filter(a => a.subscriptionStatus === 'trial').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Ngừng</p>
          <p className="text-gray-600 text-2xl">
            {accounts.filter(a => a.subscriptionStatus === 'inactive').length}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tên doanh nghiệp, chủ sở hữu, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg border ${
                statusFilter === 'all'
                  ? 'bg-purple-50 border-purple-500 text-purple-600'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 rounded-lg border ${
                statusFilter === 'active'
                  ? 'bg-green-50 border-green-500 text-green-600'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              Hoạt động
            </button>
            <button
              onClick={() => setStatusFilter('trial')}
              className={`px-4 py-2 rounded-lg border ${
                statusFilter === 'trial'
                  ? 'bg-yellow-50 border-yellow-500 text-yellow-600'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              Dùng thử
            </button>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Doanh nghiệp</th>
                <th className="px-6 py-3 text-left text-gray-700">Liên hệ</th>
                <th className="px-6 py-3 text-left text-gray-700">Gói dịch vụ</th>
                <th className="px-6 py-3 text-left text-gray-700">Đăng ký</th>
                <th className="px-6 py-3 text-left text-gray-700">Hoạt động cuối</th>
                <th className="px-6 py-3 text-center text-gray-700">Trạng thái</th>
                <th className="px-6 py-3 text-center text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAccounts.map(account => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{account.businessName}</p>
                    <p className="text-sm text-gray-500">Chủ: {account.ownerName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 text-sm">{account.email}</p>
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
                    <p className="text-gray-600 text-sm">
                      {new Date(account.registeredAt).toLocaleDateString('vi-VN')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">
                      {new Date(account.lastActive).toLocaleString('vi-VN')}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleAccountStatus(account.id)}
                      className="inline-flex items-center gap-1"
                    >
                      {account.subscriptionStatus === 'active' ? (
                        <>
                          <ToggleRight className="w-6 h-6 text-green-600" />
                          <span className="text-sm text-green-600">Active</span>
                        </>
                      ) : account.subscriptionStatus === 'trial' ? (
                        <>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                            Trial
                          </span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-6 h-6 text-gray-400" />
                          <span className="text-sm text-gray-500">Inactive</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedAccount(account)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Detail Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">Chi tiết tài khoản</h3>
              <button
                onClick={() => setSelectedAccount(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Business Info */}
              <div>
                <h4 className="text-gray-900 mb-3">Thông tin doanh nghiệp</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tên doanh nghiệp</p>
                    <p className="text-gray-900">{selectedAccount.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chủ sở hữu</p>
                    <p className="text-gray-900">{selectedAccount.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{selectedAccount.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="text-gray-900">{selectedAccount.phone}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-600">Địa chỉ</p>
                    <p className="text-gray-900">{selectedAccount.address}</p>
                  </div>
                </div>
              </div>

              {/* Subscription Info */}
              <div>
                <h4 className="text-gray-900 mb-3">Thông tin gói dịch vụ</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Gói đang dùng</p>
                    <p className="text-gray-900">
                      {selectedAccount.subscriptionPlan === 'basic' ? 'Cơ bản' :
                       selectedAccount.subscriptionPlan === 'pro' ? 'Chuyên nghiệp' : 'Doanh nghiệp'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Trạng thái</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      selectedAccount.subscriptionStatus === 'active' ? 'bg-green-100 text-green-700' :
                      selectedAccount.subscriptionStatus === 'trial' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedAccount.subscriptionStatus === 'active' ? 'Hoạt động' :
                       selectedAccount.subscriptionStatus === 'trial' ? 'Dùng thử' : 'Ngừng'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày đăng ký</p>
                    <p className="text-gray-900">
                      {new Date(selectedAccount.registeredAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hoạt động cuối</p>
                    <p className="text-gray-900">
                      {new Date(selectedAccount.lastActive).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage Stats (Mock) */}
              <div>
                <h4 className="text-gray-900 mb-3">Thống kê sử dụng</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-indigo-600 mb-1">Số sản phẩm</p>
                    <p className="text-indigo-900 text-xl">142</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">Đơn hàng/tháng</p>
                    <p className="text-green-900 text-xl">87</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-600 mb-1">Nhân viên</p>
                    <p className="text-orange-900 text-xl">3</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Vô hiệu hóa tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
