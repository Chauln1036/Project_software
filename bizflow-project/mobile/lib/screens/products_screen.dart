import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/product_provider.dart';

class ProductsScreen extends StatefulWidget {
  @override
  _ProductsScreenState createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  @override
  void initState() {
    super.initState();
    // Load products when screen opens
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final authProvider = context.read<AuthProvider>();
      final productProvider = context.read<ProductProvider>();

      if (authProvider.user?.businessId != null && authProvider.token != null) {
        productProvider.loadProducts(authProvider.user!.businessId!, authProvider.token!);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final productProvider = Provider.of<ProductProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Quản lý sản phẩm'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              _showAddProductDialog(context);
            },
          ),
        ],
      ),
      body: productProvider.isLoading
          ? Center(child: CircularProgressIndicator())
          : productProvider.products.isEmpty
              ? Center(
                  child: Text(
                    'Chưa có sản phẩm nào',
                    style: TextStyle(color: Colors.grey),
                  ),
                )
              : ListView.builder(
                  itemCount: productProvider.products.length,
                  itemBuilder: (context, index) {
                    final product = productProvider.products[index];
                    return Card(
                      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                      child: ListTile(
                        title: Text(product['name']),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Giá: ${product['price']} VND'),
                            if (product['description'] != null)
                              Text('Mô tả: ${product['description']}'),
                            if (product['category'] != null)
                              Text('Danh mục: ${product['category']}'),
                          ],
                        ),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: Icon(Icons.edit, color: Colors.blue),
                              onPressed: () {
                                _showEditProductDialog(context, product);
                              },
                            ),
                            IconButton(
                              icon: Icon(Icons.delete, color: Colors.red),
                              onPressed: () {
                                _showDeleteProductDialog(context, product);
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

  void _showAddProductDialog(BuildContext context) {
    final nameController = TextEditingController();
    final priceController = TextEditingController();
    final descriptionController = TextEditingController();
    final categoryController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Thêm sản phẩm'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Tên sản phẩm *'),
            ),
            TextField(
              controller: priceController,
              decoration: InputDecoration(labelText: 'Giá *'),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: descriptionController,
              decoration: InputDecoration(labelText: 'Mô tả'),
            ),
            TextField(
              controller: categoryController,
              decoration: InputDecoration(labelText: 'Danh mục'),
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
              if (nameController.text.isNotEmpty && priceController.text.isNotEmpty) {
                final authProvider = context.read<AuthProvider>();
                final productProvider = context.read<ProductProvider>();

                final productData = {
                  'business_id': authProvider.user!.businessId,
                  'name': nameController.text,
                  'price': double.parse(priceController.text),
                  'description': descriptionController.text.isNotEmpty ? descriptionController.text : null,
                  'category': categoryController.text.isNotEmpty ? categoryController.text : null,
                };

                final success = await productProvider.createProduct(
                  productData,
                  authProvider.token!,
                );

                if (success) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Thêm sản phẩm thành công')),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(productProvider.errorMessage ?? 'Lỗi thêm sản phẩm')),
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

  void _showEditProductDialog(BuildContext context, Map<String, dynamic> product) {
    final nameController = TextEditingController(text: product['name']);
    final priceController = TextEditingController(text: product['price'].toString());
    final descriptionController = TextEditingController(text: product['description']);
    final categoryController = TextEditingController(text: product['category']);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Sửa sản phẩm'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Tên sản phẩm *'),
            ),
            TextField(
              controller: priceController,
              decoration: InputDecoration(labelText: 'Giá *'),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: descriptionController,
              decoration: InputDecoration(labelText: 'Mô tả'),
            ),
            TextField(
              controller: categoryController,
              decoration: InputDecoration(labelText: 'Danh mục'),
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
              if (nameController.text.isNotEmpty && priceController.text.isNotEmpty) {
                final authProvider = context.read<AuthProvider>();
                final productProvider = context.read<ProductProvider>();

                final productData = {
                  'business_id': authProvider.user!.businessId,
                  'name': nameController.text,
                  'price': double.parse(priceController.text),
                  'description': descriptionController.text.isNotEmpty ? descriptionController.text : null,
                  'category': categoryController.text.isNotEmpty ? categoryController.text : null,
                };

                final success = await productProvider.updateProduct(
                  product['id'],
                  productData,
                  authProvider.token!,
                );

                if (success) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Sửa sản phẩm thành công')),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(productProvider.errorMessage ?? 'Lỗi sửa sản phẩm')),
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

  void _showDeleteProductDialog(BuildContext context, Map<String, dynamic> product) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Xóa sản phẩm'),
        content: Text('Bạn có chắc muốn xóa sản phẩm "${product['name']}"?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Hủy'),
          ),
          TextButton(
            onPressed: () async {
              final authProvider = context.read<AuthProvider>();
              final productProvider = context.read<ProductProvider>();

              final success = await productProvider.deleteProduct(
                product['id'],
                authProvider.user!.businessId!,
                authProvider.token!,
              );

              Navigator.pop(context);

              if (success) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Xóa sản phẩm thành công')),
                );
              } else {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(productProvider.errorMessage ?? 'Lỗi xóa sản phẩm')),
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
