import { useState } from "react";
import { MessageSquare, Check, X, Edit2 } from "lucide-react";
import { mockOrders } from "../../data/mockData";
import { Order } from "../../types";

export function DraftOrdersPage() {
  const [draftOrders, setDraftOrders] = useState(
    mockOrders.filter((o) => o.status === "draft")
  );

  const handleConfirmOrder = (orderId: string) => {
    setDraftOrders(draftOrders.filter((o) => o.id !== orderId));
    alert("Đơn hàng đã được xác nhận!");
  };

  const handleRejectOrder = (orderId: string) => {
    setDraftOrders(draftOrders.filter((o) => o.id !== orderId));
    alert("Đơn hàng đã bị từ chối");
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Đơn hàng từ AI</h2>
        <p className="text-gray-600">
          Xem và xác nhận đơn hàng được tạo bởi trợ lý AI
        </p>
      </div>

      {draftOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-gray-900 mb-2">Không có đơn hàng nào</h3>
          <p className="text-gray-600">
            Khi AI nhận được yêu cầu qua tin nhắn hoặc giọng nói, đơn hàng sẽ
            xuất hiện ở đây
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {draftOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      <h3 className="text-gray-900">{order.orderNumber}</h3>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        AI Draft
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Tạo lúc{" "}
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-600 text-xl">
                      {order.total.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Transcript */}
              {order.aiTranscript && (
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Yêu cầu gốc:</p>
                  <p className="text-gray-900 italic">
                    &ldquo;{order.aiTranscript}&rdquo;
                  </p>
                </div>
              )}

              {/* Order Details */}
              <div className="px-6 py-4">
                {/* Customer Info */}
                {order.customerName && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-600">Khách hàng:</p>
                    <p className="text-gray-900">{order.customerName}</p>
                  </div>
                )}

                {/* Items */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Sản phẩm:</p>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="text-gray-900">{item.productName}</p>
                          <p className="text-sm text-gray-600">
                            {item.quantity} {item.unit} ×{" "}
                            {item.price.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                        <p className="text-indigo-600">
                          {item.total.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-sm text-gray-600">Thanh toán:</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.paymentMethod === "debt"
                        ? "bg-orange-100 text-orange-700"
                        : order.paymentMethod === "transfer"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.paymentMethod === "debt"
                      ? "Ghi nợ"
                      : order.paymentMethod === "transfer"
                      ? "Chuyển khoản"
                      : "Tiền mặt"}
                  </span>
                  {order.debtAmount && (
                    <span className="text-sm text-gray-600">
                      ({order.debtAmount.toLocaleString("vi-VN")}đ)
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => handleRejectOrder(order.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Từ chối</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Edit2 className="w-4 h-4" />
                  <span>Chỉnh sửa</span>
                </button>
                <button
                  onClick={() => handleConfirmOrder(order.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Xác nhận</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="text-blue-900 mb-2">💡 Cách hoạt động</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Khách hàng gửi tin nhắn hoặc gọi điện yêu cầu đặt hàng</li>
          <li>• AI tự động chuyển đổi yêu cầu thành đơn hàng nháp</li>
          <li>• Nhân viên kiểm tra và xác nhận đơn hàng</li>
          <li>• Đơn hàng được lưu vào hệ thống và tự động cập nhật kho</li>
        </ul>
      </div>
    </div>
  );
}
