import { useState } from "react";
import { Plus, ToggleLeft, ToggleRight, Edit2, Key, X } from "lucide-react";
import { mockEmployees } from "../../data/mockData";
import { Employee } from "../../types";

export function EmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleEmployeeStatus = (employeeId: string) => {
    setEmployees(
      employees.map((e) =>
        e.id === employeeId ? { ...e, active: !e.active } : e
      )
    );
  };

  const activeEmployees = employees.filter((e) => e.active);

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Quản lý nhân viên</h2>
          <p className="text-gray-600">
            Quản lý tài khoản và phân quyền nhân viên
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm nhân viên</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Tổng nhân viên</p>
          <p className="text-gray-900 text-2xl">{employees.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Đang hoạt động</p>
          <p className="text-green-600 text-2xl">{activeEmployees.length}</p>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Nhân viên</th>
                <th className="px-6 py-3 text-left text-gray-700">Liên hệ</th>
                <th className="px-6 py-3 text-left text-gray-700">Vai trò</th>
                <th className="px-6 py-3 text-left text-gray-700">Ngày tạo</th>
                <th className="px-6 py-3 text-center text-gray-700">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-center text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className={`hover:bg-gray-50 ${
                    !employee.active ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{employee.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{employee.email}</p>
                    <p className="text-sm text-gray-500">{employee.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        employee.role === "owner"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {employee.role === "owner" ? "Chủ cửa hàng" : "Nhân viên"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">
                      {employee.createdAt
                        ? new Date(employee.createdAt).toLocaleDateString(
                            "vi-VN"
                          )
                        : "N/A"}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {employee.role !== "owner" && (
                      <button
                        onClick={() => toggleEmployeeStatus(employee.id)}
                        className="inline-flex items-center gap-1"
                      >
                        {employee.active ? (
                          <>
                            <ToggleRight className="w-6 h-6 text-green-600" />
                            <span className="text-sm text-green-600">
                              Hoạt động
                            </span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Vô hiệu hóa
                            </span>
                          </>
                        )}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {employee.role !== "owner" && (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                          title="Đổi mật khẩu"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="text-blue-900 mb-2">ℹ️ Phân quyền</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • <strong>Chủ cửa hàng:</strong> Toàn quyền quản lý hệ thống, sản
            phẩm, kho, khách hàng, nhân viên và báo cáo
          </li>
          <li>
            • <strong>Nhân viên:</strong> Tạo đơn hàng, xem và xác nhận đơn hàng
            AI, in hóa đơn, ghi nợ khách hàng
          </li>
        </ul>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">Thêm nhân viên mới</h3>
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
                  <label className="block text-gray-700 mb-2">Họ tên *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0909123456"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Mật khẩu *</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Lưu ý:</strong> Nhân viên mới sẽ có quyền tạo đơn
                  hàng, xem đơn hàng AI và quản lý các đơn hàng tại quầy. Họ
                  không có quyền quản lý sản phẩm, kho, khách hàng hay báo cáo.
                </p>
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
                    alert("Nhân viên đã được thêm!");
                    setShowAddModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Thêm nhân viên
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
