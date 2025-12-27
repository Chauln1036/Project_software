import { useState } from 'react';
import { Plus, Package, TrendingUp, TrendingDown, X } from 'lucide-react';
import { mockProducts, mockStockTransactions } from '../../data/mockData';
import { StockTransaction } from '../../types';

export function InventoryPage() {
  const [stockTransactions] = useState(mockStockTransactions);
  const [showImportModal, setShowImportModal] = useState(false);

  const totalStockValue = mockProducts.reduce((sum, p) => sum + (p.stock * p.price), 0);
  const lowStockCount = mockProducts.filter(p => p.stock < 100 && p.active).length;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Quản lý kho hàng</h2>
          <p className="text-gray-600">Theo dõi tồn kho và nhập xuất hàng</p>
        </div>
        <button
          onClick={() => setShowImportModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nhập hàng</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-indigo-600" />
            <p className="text-gray-600">Giá trị tồn kho</p>
          </div>
          <p className="text-gray-900 text-2xl">{totalStockValue.toLocaleString('vi-VN')}đ</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <p className="text-gray-600">Nhập tháng này</p>
          </div>
          <p className="text-gray-900 text-2xl">150 SP</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-orange-600" />
            <p className="text-gray-600">Sản phẩm sắp hết</p>
          </div>
          <p className="text-orange-600 text-2xl">{lowStockCount}</p>
        </div>
      </div>

      {/* Current Stock Levels */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Tồn kho hiện tại</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Sản phẩm</th>
                <th className="px-6 py-3 text-left text-gray-700">Danh mục</th>
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
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className={`${isLowStock ? 'text-orange-600' : 'text-gray-900'}`}>
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

      {/* Stock Transaction History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Lịch sử nhập xuất</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {stockTransactions.map(transaction => (
            <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'import' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    {transaction.type === 'import' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900">{transaction.productName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {transaction.type === 'import' ? 'Nhập kho' : 'Xuất kho'}: {' '}
                      <span className={transaction.type === 'import' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'import' ? '+' : '-'}{transaction.quantity} {transaction.unit}
                      </span>
                    </p>
                    {transaction.notes && (
                      <p className="text-sm text-gray-500 mt-1">{transaction.notes}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Bởi {transaction.createdBy} • {new Date(transaction.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Import Stock Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">Nhập hàng vào kho</h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Chọn sản phẩm *</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">-- Chọn sản phẩm --</option>
                  {mockProducts.filter(p => p.active).map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - Tồn hiện tại: {product.stock} {product.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Số lượng nhập *</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="100"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Đơn vị</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    value="bao"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Ghi chú</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="VD: Nhập hàng từ nhà cung cấp ABC"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    alert('Đã nhập hàng thành công!');
                    setShowImportModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Xác nhận nhập hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
