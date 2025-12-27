import 'package:flutter/material.dart';

class OrderProvider with ChangeNotifier {
  List<Map<String, dynamic>> _orders = [];
  bool _isLoading = false;

  List<Map<String, dynamic>> get orders => _orders;
  bool get isLoading => _isLoading;

  Future<void> loadOrders() async {
    _isLoading = true;
    notifyListeners();

    // TODO: Implement API call to load orders
    // For now, using mock data
    await Future.delayed(Duration(seconds: 1));
    _orders = [
      {
        'id': 1,
        'customer_name': 'Nguyễn Văn A',
        'total_amount': 1500000,
        'status': 'completed',
        'created_at': '2024-01-15',
      },
      {
        'id': 2,
        'customer_name': 'Trần Thị B',
        'total_amount': 2300000,
        'status': 'pending',
        'created_at': '2024-01-16',
      },
    ];

    _isLoading = false;
    notifyListeners();
  }

  Future<bool> createOrder(Map<String, dynamic> orderData) async {
    _isLoading = true;
    notifyListeners();

    try {
      // TODO: Implement API call to create order
      await Future.delayed(Duration(seconds: 1));

      final newOrder = {
        'id': DateTime.now().millisecondsSinceEpoch,
        'customer_name': orderData['customer_name'],
        'total_amount': orderData['total_amount'],
        'status': 'pending',
        'created_at': DateTime.now().toString().split(' ')[0],
      };

      _orders.insert(0, newOrder);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
}
