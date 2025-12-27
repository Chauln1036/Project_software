import { useState } from 'react';
import { Save, FileText, Bell, Database, Shield } from 'lucide-react';

export function SystemSettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Cấu hình hệ thống</h2>
        <p className="text-gray-600">Quản lý cài đặt toàn hệ thống</p>
      </div>

      <div className="space-y-6">
        {/* Accounting Report Templates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Mẫu báo cáo kế toán</h3>
              <p className="text-sm text-gray-600">Cấu hình mẫu theo Thông tư 88/2021/TT-BTC</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-900">Sổ chi tiết doanh thu</p>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  ✓ Đã cập nhật
                </span>
              </div>
              <p className="text-sm text-gray-600">Phiên bản: 2.1 - Cập nhật: 01/01/2025</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-900">Sổ công nợ phải thu</p>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  ✓ Đã cập nhật
                </span>
              </div>
              <p className="text-sm text-gray-600">Phiên bản: 2.1 - Cập nhật: 01/01/2025</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-900">Báo cáo kết quả HĐKD</p>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  ✓ Đã cập nhật
                </span>
              </div>
              <p className="text-sm text-gray-600">Phiên bản: 2.1 - Cập nhật: 01/01/2025</p>
            </div>
          </div>

          <button className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cập nhật mẫu mới từ Bộ Tài chính
          </button>
        </div>

        {/* AI Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Cấu hình AI</h3>
              <p className="text-sm text-gray-600">Thiết lập trợ lý AI tạo đơn hàng</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">AI Model</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>GPT-4</option>
                <option>Gemini Pro</option>
                <option>Custom Model</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Embedding Model</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>text-embedding-3-small</option>
                <option>text-embedding-3-large</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Speech-to-Text Engine</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Google Speech-to-Text</option>
                <option>OpenAI Whisper</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
                <span className="text-gray-700">Bật tự động phê duyệt đơn hàng AI (độ tin cậy &gt; 95%)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Thông báo hệ thống</h3>
              <p className="text-sm text-gray-600">Gửi thông báo đến tất cả người dùng</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Tiêu đề thông báo</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="VD: Cập nhật tính năng mới"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Nội dung</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
                placeholder="Nội dung thông báo..."
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Gửi đến</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Tất cả người dùng</option>
                <option>Chỉ gói Pro và Enterprise</option>
                <option>Chỉ tài khoản dùng thử</option>
              </select>
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Gửi thông báo
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Bảo mật & Quyền riêng tư</h3>
              <p className="text-sm text-gray-600">Cài đặt bảo mật hệ thống</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded" />
              <span className="text-gray-700">Yêu cầu xác thực 2 yếu tố cho Admin</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded" />
              <span className="text-gray-700">Mã hóa dữ liệu nhạy cảm</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded" />
              <span className="text-gray-700">Tự động sao lưu dữ liệu hàng ngày</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
              <span className="text-gray-700">Chế độ bảo trì (tạm ngừng truy cập)</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Lưu tất cả thay đổi</span>
          </button>
          
          {saveSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
              ✓ Đã lưu thành công!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
