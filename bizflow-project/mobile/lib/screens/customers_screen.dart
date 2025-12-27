import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/customer_provider.dart';

class CustomersScreen extends StatefulWidget {
  @override
  _CustomersScreenState createState() => _CustomersScreenState();
}

class _CustomersScreenState extends State<CustomersScreen> {
  @override
  void initState() {
    super.initState();
    // Load customers when screen opens
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final authProvider = context.read<AuthProvider>();
      final customerProvider = context.read<CustomerProvider>();

      if (authProvider.user?.businessId != null && authProvider.token != null) {
        customerProvider.loadCustomers(authProvider.user!.businessId!, authProvider.token!);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final customerProvider = Provider.of<CustomerProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Quản lý khách hàng'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              _showAddCustomerDialog(context);
            },
          ),
        ],
      ),
      body: customerProvider.isLoading
          ? Center(child: CircularProgressIndicator())
          : customerProvider.customers.isEmpty
              ? Center(
                  child: Text(
                    'Chưa có khách hàng nào',
                    style: TextStyle(color: Colors.grey),
                  ),
                )
              : ListView.builder(
                  itemCount: customerProvider.customers.length,
                  itemBuilder: (context, index) {
                    final customer = customerProvider.customers[index];
                    return Card(
                      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                      child: ListTile(
                        title: Text(customer['name']),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if (customer['phone'] != null)
                              Text('SĐT: ${customer['phone']}'),
                            if (customer['address'] != null)
                              Text('Địa chỉ: ${customer['address']}'),
                            if (customer['debt'] != null && customer['debt'] > 0)
                              Text(
                                'Nợ: ${customer['debt']} VND',
                                style: TextStyle(color: Colors.red),
                              ),
                          ],
                        ),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: Icon(Icons.edit, color: Colors.blue),
                              onPressed: () {
                                _showEditCustomerDialog(context, customer);
                              },
                            ),
                            IconButton(
                              icon: Icon(Icons.delete, color: Colors.red),
                              onPressed: () {
                                _showDeleteCustomerDialog(context, customer);
                              },
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
    );
  }

  void _showAddCustomerDialog(BuildContext context) {
    final nameController = TextEditingController();
    final phoneController = TextEditingController();
    final addressController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Thêm khách hàng'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Tên khách hàng *'),
            ),
            TextField(
              controller: phoneController,
              decoration: InputDecoration(labelText: 'Số điện thoại'),
            ),
            TextField(
              controller: addressController,
              decoration: InputDecoration(labelText: 'Địa chỉ'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Hủy'),
          ),
          TextButton(
            onPressed: () async {
              if (nameController.text.isNotEmpty) {
                final authProvider = context.read<AuthProvider>();
                final customerProvider = context.read<CustomerProvider>();

                final customerData = {
                  'business_id': authProvider.user!.businessId,
                  'name': nameController.text,
                  'phone': phoneController.text.isNotEmpty ? phoneController.text : null,
                  'address': addressController.text.isNotEmpty ? addressController.text : null,
                };

                final success = await customerProvider.createCustomer(
                  customerData,
                  authProvider.token!,
                );

                if (success) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Thêm khách hàng thành công')),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(customerProvider.errorMessage ?? 'Lỗi thêm khách hàng')),
                  );
                }
              }
            },
            child: Text('Thêm'),
          ),
        ],
      ),
    );
  }

  void _showEditCustomerDialog(BuildContext context, Map<String, dynamic> customer) {
    final nameController = TextEditingController(text: customer['name']);
    final phoneController = TextEditingController(text: customer['phone']);
    final addressController = TextEditingController(text: customer['address']);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Sửa khách hàng'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Tên khách hàng *'),
            ),
            TextField(
              controller: phoneController,
              decoration: InputDecoration(labelText: 'Số điện thoại'),
            ),
            TextField(
              controller: addressController,
              decoration: InputDecoration(labelText: 'Địa chỉ'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Hủy'),
          ),
          TextButton(
            onPressed: () async {
              if (nameController.text.isNotEmpty) {
                final authProvider = context.read<AuthProvider>();
                final customerProvider = context.read<CustomerProvider>();

                final customerData = {
                  'business_id': authProvider.user!.businessId,
                  'name': nameController.text,
                  'phone': phoneController.text.isNotEmpty ? phoneController.text : null,
                  'address': addressController.text.isNotEmpty ? addressController.text : null,
                };

                final success = await customerProvider.updateCustomer(
                  customer['id'],
                  customerData,
                  authProvider.token!,
                );

                if (success) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Sửa khách hàng thành công')),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(customerProvider.errorMessage ?? 'Lỗi sửa khách hàng')),
                  );
                }
              }
            },
            child: Text('Lưu'),
          ),
        ],
      ),
    );
  }

  void _showDeleteCustomerDialog(BuildContext context, Map<String, dynamic> customer) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Xóa khách hàng'),
        content: Text('Bạn có chắc muốn xóa khách hàng "${customer['name']}"?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Hủy'),
          ),
          TextButton(
            onPressed: () async {
              final authProvider = context.read<AuthProvider>();
              final customerProvider = context.read<CustomerProvider>();

              final success = await customerProvider.deleteCustomer(
                customer['id'],
                authProvider.user!.businessId!,
                authProvider.token!,
              );

              Navigator.pop(context);

              if (success) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Xóa khách hàng thành công')),
                );
              } else {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(customerProvider.errorMessage ?? 'Lỗi xóa khách hàng')),
                );
              }
            },
            child: Text('Xóa', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }
}
