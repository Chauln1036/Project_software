import { useState } from 'react';
import { Plus, Edit2, X } from 'lucide-react';
import { mockSubscriptionPlans } from '../../data/mockData';
import { SubscriptionPlan } from '../../types';

export function SubscriptionPlansPage() {
  const [plans, setPlans] = useState(mockSubscriptionPlans);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Quản lý gói dịch vụ</h2>
          <p className="text-gray-600">Cấu hình giá và tính năng các gói</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm gói mới</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden ${
              index === 1 ? 'border-indigo-500' : 'border-gray-200'
            }`}
          >
            {index === 1 && (
              <div className="bg-indigo-500 text-white text-center py-2 text-sm">
                Phổ biến nhất
              </div>
            )}
            <div className="p-6">
              <h3 className="text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-indigo-600 text-3xl">{plan.price.toLocaleString('vi-VN')}đ</span>
                <span className="text-gray-600">/{plan.duration === 'monthly' ? 'tháng' : 'năm'}</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                  <span className="text-gray-700">
                    {plan.maxProducts === -1 ? 'Không giới hạn' : `Tối đa ${plan.maxProducts}`} sản phẩm
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                  <span className="text-gray-700">
                    {plan.maxEmployees === -1 ? 'Không giới hạn' : `Tối đa ${plan.maxEmployees}`} nhân viên
                  </span>
                </div>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setEditingPlan(plan)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Edit2 className="w-4 h-4" />
                <span>Chỉnh sửa</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-1">Gói Cơ bản</p>
          <p className="text-green-600 text-2xl mb-2">12 tài khoản</p>
          <p className="text-sm text-gray-500">2,388,000đ/tháng</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-1">Gói Chuyên nghiệp</p>
          <p className="text-indigo-600 text-2xl mb-2">38 tài khoản</p>
          <p className="text-sm text-gray-500">15,162,000đ/tháng</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-1">Gói Doanh nghiệp</p>
          <p className="text-orange-600 text-2xl mb-2">8 tài khoản</p>
          <p className="text-sm text-gray-500">6,392,000đ/tháng</p>
        </div>
      </div>

      {/* Edit Modal */}
      {(editingPlan || showAddModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">
                {editingPlan ? 'Chỉnh sửa gói dịch vụ' : 'Thêm gói dịch vụ mới'}
              </h3>
              <button
                onClick={() => {
                  setEditingPlan(null);
                  setShowAddModal(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Tên gói *</label>
                  <input
                    type="text"
                    defaultValue={editingPlan?.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="VD: Chuyên nghiệp"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Giá (VNĐ) *</label>
                  <input
                    type="number"
                    defaultValue={editingPlan?.price}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="399000"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Thời hạn</label>
                  <select
                    defaultValue={editingPlan?.duration}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="monthly">Tháng</option>
                    <option value="yearly">Năm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Số nhân viên tối đa</label>
                  <input
                    type="number"
                    defaultValue={editingPlan?.maxEmployees}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="-1 = không giới hạn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Số sản phẩm tối đa</label>
                <input
                  type="number"
                  defaultValue={editingPlan?.maxProducts}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="-1 = không giới hạn"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Tính năng</label>
                <textarea
                  defaultValue={editingPlan?.features.join('\n')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={6}
                  placeholder="Mỗi tính năng 1 dòng"
                />
                <p className="text-sm text-gray-500 mt-1">Nhập mỗi tính năng trên một dòng riêng</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setEditingPlan(null);
                    setShowAddModal(false);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    alert('Đã lưu thay đổi!');
                    setEditingPlan(null);
                    setShowAddModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  {editingPlan ? 'Cập nhật' : 'Thêm gói'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
