import { useState } from 'react';
import { Plus, Search, Edit2, ToggleLeft, ToggleRight, X } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { Product } from '../../types';

export function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleProductStatus = (productId: string) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, active: !p.active } : p
    ));
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Quản lý sản phẩm</h2>
          <p className="text-gray-600">Quản lý danh mục sản phẩm của cửa hàng</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Sản phẩm</th>
                <th className="px-6 py-3 text-left text-gray-700">Danh mục</th>
                <th className="px-6 py-3 text-right text-gray-700">Giá</th>
                <th className="px-6 py-3 text-right text-gray-700">Tồn kho</th>
                <th className="px-6 py-3 text-center text-gray-700">Trạng thái</th>
                <th className="px-6 py-3 text-center text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product.id} className={`hover:bg-gray-50 ${!product.active ? 'opacity-50' : ''}`}>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{product.name}</p>
                    {product.alternativeUnits && product.alternativeUnits.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Đơn vị phụ: {product.alternativeUnits.map(u => u.unit).join(', ')}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-gray-900">{product.price.toLocaleString('vi-VN')}đ</p>
                    <p className="text-sm text-gray-500">/{product.unit}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className={`${product.stock < 100 ? 'text-orange-600' : 'text-gray-900'}`}>
                      {product.stock} {product.unit}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleProductStatus(product.id)}
                      className="inline-flex items-center gap-1"
                    >
                      {product.active ? (
                        <>
                          <ToggleRight className="w-6 h-6 text-green-600" />
                          <span className="text-sm text-green-600">Đang bán</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-6 h-6 text-gray-400" />
                          <span className="text-sm text-gray-500">Ngừng bán</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">
                {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Tên sản phẩm *</label>
                  <input
                    type="text"
                    defaultValue={editingProduct?.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="VD: Xi măng Portland PCB40"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Danh mục *</label>
                  <input
                    type="text"
                    defaultValue={editingProduct?.category}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="VD: Xi măng"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Giá bán *</label>
                  <input
                    type="number"
                    defaultValue={editingProduct?.price}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="95000"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Đơn vị *</label>
                  <input
                    type="text"
                    defaultValue={editingProduct?.unit}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="VD: bao"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Tồn kho</label>
                  <input
                    type="number"
                    defaultValue={editingProduct?.stock}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-gray-900 mb-3">Đơn vị tính phụ (tùy chọn)</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Thêm các đơn vị tính khác cho sản phẩm (VD: tấn, ngàn viên, cây...)
                </p>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">
                  + Thêm đơn vị phụ
                </button>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    alert('Sản phẩm đã được lưu!');
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
