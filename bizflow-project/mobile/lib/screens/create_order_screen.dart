import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/order_provider.dart';
import '../providers/customer_provider.dart';
import '../providers/product_provider.dart';

class CreateOrderScreen extends StatefulWidget {
  @override
  _CreateOrderScreenState createState() => _CreateOrderScreenState();
}

class _CreateOrderScreenState extends State<CreateOrderScreen> {
  Map<String, dynamic>? selectedCustomer;
  List<Map<String, dynamic>> selectedProducts = [];
  final TextEditingController notesController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // Load customers and products when screen opens
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final authProvider = context.read<AuthProvider>();
      final customerProvider = context.read<CustomerProvider>();
      final productProvider = context.read<ProductProvider>();

      if (authProvider.user?.businessId != null && authProvider.token != null) {
        customerProvider.loadCustomers(authProvider.user!.businessId!, authProvider.token!);
        productProvider.loadProducts(authProvider.user!.businessId!, authProvider.token!);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    final customerProvider = Provider.of<CustomerProvider>(context);
    final productProvider = Provider.of<ProductProvider>(context);
    final orderProvider = Provider.of<OrderProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Tạo đơn hàng'),
        actions: [
          TextButton(
            onPressed: _canCreateOrder() ? () => _createOrder(context) : null,
            child: Text(
              'Tạo',
              style: TextStyle(
                color: _canCreateOrder() ? Colors.white : Colors.grey,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Customer selection
            Text(
              'Chọn khách hàng',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            customerProvider.isLoading
                ? Center(child: CircularProgressIndicator())
                : customerProvider.customers.isEmpty
                    ? Text('Không có khách hàng nào. Vui lòng thêm khách hàng trước.')
                    : Container(
                        padding: EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: DropdownButton<Map<String, dynamic>>(
                          isExpanded: true,
                          hint: Text('Chọn khách hàng'),
                          value: selectedCustomer,
                          items: customerProvider.customers.map((customer) {
                            return DropdownMenuItem<Map<String, dynamic>>(
                              value: customer,
                              child: Text(customer['name']),
                            );
                          }).toList(),
                          onChanged: (value) {
                            setState(() {
                              selectedCustomer = value;
                            });
                          },
                        ),
                      ),

            SizedBox(height: 24),

            // Product selection
            Text(
              'Chọn sản phẩm',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            productProvider.isLoading
                ? Center(child: CircularProgressIndicator())
                : productProvider.products.isEmpty
                    ? Text('Không có sản phẩm nào. Vui lòng thêm sản phẩm trước.')
                    : Container(
                        padding: EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          children: [
                            DropdownButton<Map<String, dynamic>>(
                              isExpanded: true,
                              hint: Text('Thêm sản phẩm'),
                              items: productProvider.products
                                  .where((product) => !selectedProducts.any((selected) => selected['id'] == product['id']))
                                  .map((product) {
                                return DropdownMenuItem<Map<String, dynamic>>(
                                  value: product,
                                  child: Text('${product['name']} - ${product['price']} VND'),
                                );
                              }).toList(),
                              onChanged: (value) {
                                if (value != null) {
                                  _addProduct(value);
                                }
                              },
                            ),
                            if (selectedProducts.isNotEmpty) ...[
                              SizedBox(height: 16),
                              Text(
                                'Sản phẩm đã chọn:',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                              SizedBox(height: 8),
                              ...selectedProducts.map((product) => _buildSelectedProductItem(product)),
                            ],
                          ],
                        ),
                      ),

            SizedBox(height: 24),

            // Total amount
            if (selectedProducts.isNotEmpty) ...[
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.blue.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Tổng tiền:',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      '${_calculateTotal()} VND',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.green,
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 24),
            ],

            // Notes
            Text(
              'Ghi chú (tùy chọn)',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            TextField(
              controller: notesController,
              maxLines: 3,
              decoration: InputDecoration(
                hintText: 'Nhập ghi chú cho đơn hàng...',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  bool _canCreateOrder() {
    return selectedCustomer != null && selectedProducts.isNotEmpty;
  }

  int _calculateTotal() {
    return selectedProducts.fold(0.0, (total, product) {
      final quantity = product['quantity'] ?? 1;
      final price = product['price'] ?? 0;
      return total + (quantity * price);
    }).toInt();
  }

  void _addProduct(Map<String, dynamic> product) {
    setState(() {
      selectedProducts.add({
        ...product,
        'quantity': 1,
      });
    });
  }

  void _removeProduct(int index) {
    setState(() {
      selectedProducts.removeAt(index);
    });
  }

  void _updateQuantity(int index, int quantity) {
    if (quantity > 0) {
      setState(() {
        selectedProducts[index]['quantity'] = quantity;
      });
    }
  }

  Widget _buildSelectedProductItem(Map<String, dynamic> product) {
    final index = selectedProducts.indexOf(product);
    final quantity = product['quantity'] ?? 1;
    final price = product['price'] ?? 0;
    final total = quantity * price;

    return Card(
      margin: EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: EdgeInsets.all(12),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product['name'],
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Text('${price} VND x $quantity = ${total.toInt()} VND'),
                ],
              ),
            ),
            Row(
              children: [
                IconButton(
                  icon: Icon(Icons.remove),
                  onPressed: () => _updateQuantity(index, quantity - 1),
                ),
                Text('$quantity'),
                IconButton(
                  icon: Icon(Icons.add),
                  onPressed: () => _updateQuantity(index, quantity + 1),
                ),
                IconButton(
                  icon: Icon(Icons.delete, color: Colors.red),
                  onPressed: () => _removeProduct(index),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _createOrder(BuildContext context) async {
    final authProvider = context.read<AuthProvider>();
    final orderProvider = context.read<OrderProvider>();

    final items = selectedProducts.map((product) {
      return {
        'product_id': product['id'],
        'quantity': product['quantity'] ?? 1,
        'price': product['price'],
        'total': (product['quantity'] ?? 1) * (product['price'] ?? 0),
      };
    }).toList();

    final orderData = {
      'business_id': authProvider.user!.businessId,
      'customer_id': selectedCustomer!['id'],
      'employee_id': authProvider.user!.id, // Assuming current user is the employee
      'total_amount': _calculateTotal(),
      'items': items,
      'notes': notesController.text.isNotEmpty ? notesController.text : null,
    };

    final success = await orderProvider.createOrder(orderData, authProvider.token!);

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Tạo đơn hàng thành công')),
      );
      Navigator.pop(context); // Go back to dashboard
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(orderProvider.errorMessage ?? 'Lỗi tạo đơn hàng')),
      );
    }
  }
}
