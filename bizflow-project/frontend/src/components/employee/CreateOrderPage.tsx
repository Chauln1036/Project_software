import { useState } from 'react';
import { Search, Plus, Minus, Trash2, Printer, X } from 'lucide-react';
import { mockProducts, mockCustomers } from '../../data/mockData';
import { Product, Customer, OrderItem } from '../../types';

export function CreateOrderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer' | 'debt'>('cash');
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);

  const filteredProducts = mockProducts.filter(p =>
    p.active && p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unit: product.unit,
        price: product.price,
        total: product.price
      }]);
    }
    setSearchQuery('');
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      ));
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      alert('Vui lòng thêm sản phẩm vào đơn hàng');
      return;
    }

    if (paymentMethod === 'debt' && !selectedCustomer) {
      alert('Vui lòng chọn khách hàng để ghi nợ');
      return;
    }

    alert('Đơn hàng đã được tạo thành công!');
    // Reset form
    setCartItems([]);
    setSelectedCustomer(null);
    setPaymentMethod('cash');
  };

  const handlePrint = () => {
    alert('Đang in hóa đơn...');
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Tạo đơn hàng</h2>
        <p className="text-gray-600">Tạo đơn hàng nhanh tại quầy</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Product Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Chọn sản phẩm</h3>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm (tên, mã)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
          </div>

          {/* Product List */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {searchQuery && filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-600">{product.price.toLocaleString('vi-VN')}đ</p>
                    <p className="text-xs text-gray-500">/{product.unit}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Tồn kho: {product.stock} {product.unit}</p>
              </button>
            ))}
            {!searchQuery && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Nhập tên sản phẩm để tìm kiếm</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Cart & Order Details */}
        <div className="space-y-6">
          {/* Customer Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Thông tin khách hàng</h3>
            {selectedCustomer ? (
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-start">
                <div>
                  <p className="text-gray-900">{selectedCustomer.name}</p>
                  <p className="text-sm text-gray-600">{selectedCustomer.phone}</p>
                  {selectedCustomer.outstandingDebt > 0 && (
                    <p className="text-sm text-orange-600 mt-1">
                      Công nợ: {selectedCustomer.outstandingDebt.toLocaleString('vi-VN')}đ
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm khách hàng..."
                  onFocus={() => setShowCustomerSearch(true)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {showCustomerSearch && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {mockCustomers.map(customer => (
                      <button
                        key={customer.id}
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowCustomerSearch(false);
                        }}
                        className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <p className="text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.phone}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Giỏ hàng ({cartItems.length})</h3>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Chưa có sản phẩm nào</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {cartItems.map(item => (
                  <div key={item.productId} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-900 flex-1">{item.productName}</p>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-1 hover:bg-gray-200 rounded ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                          className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-gray-600">{item.unit}</span>
                      </div>
                      <p className="text-indigo-600">{item.total.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Payment Method */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <p className="text-gray-700 mb-2">Phương thức thanh toán</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`px-3 py-2 rounded-lg border ${
                    paymentMethod === 'cash'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  Tiền mặt
                </button>
                <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`px-3 py-2 rounded-lg border ${
                    paymentMethod === 'transfer'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  Chuyển khoản
                </button>
                <button
                  onClick={() => setPaymentMethod('debt')}
                  className={`px-3 py-2 rounded-lg border ${
                    paymentMethod === 'debt'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  Ghi nợ
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Tạm tính:</p>
                <p className="text-gray-900">{subtotal.toLocaleString('vi-VN')}đ</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-900">Tổng cộng:</p>
                <p className="text-indigo-600 text-2xl">{subtotal.toLocaleString('vi-VN')}đ</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={cartItems.length === 0}
              >
                <Printer className="w-5 h-5" />
                <span>In hóa đơn</span>
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
                Xác nhận đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
