import 'package:flutter/material.dart';
import '../services/customer_service.dart';

class CustomerProvider with ChangeNotifier {
  List<Map<String, dynamic>> _customers = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<Map<String, dynamic>> get customers => _customers;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  final CustomerService _customerService = CustomerService();

  Future<void> loadCustomers(int businessId, String token) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final result = await _customerService.getCustomers(businessId, token);
      if (result['success']) {
        _customers = List<Map<String, dynamic>>.from(result['customers']);
      } else {
        _errorMessage = result['message'];
      }
    } catch (e) {
      _errorMessage = 'Failed to load customers: $e';
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<bool> createCustomer(Map<String, dynamic> customerData, String token) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final result = await _customerService.createCustomer(customerData, token);
      if (result['success']) {
        // Reload customers after creating new one
        if (customerData.containsKey('business_id')) {
          await loadCustomers(customerData['business_id'], token);
        }
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _errorMessage = result['message'];
        _isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      _errorMessage = 'Failed to create customer: $e';
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> updateCustomer(int customerId, Map<String, dynamic> customerData, String token) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final result = await _customerService.updateCustomer(customerId, customerData, token);
      if (result['success']) {
        // Reload customers after updating
        if (customerData.containsKey('business_id')) {
          await loadCustomers(customerData['business_id'], token);
        }
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _errorMessage = result['message'];
        _isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      _errorMessage = 'Failed to update customer: $e';
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> deleteCustomer(int customerId, int businessId, String token) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final result = await _customerService.deleteCustomer(customerId, token);
      if (result['success']) {
        // Reload customers after deleting
        await loadCustomers(businessId, token);
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _errorMessage = result['message'];
        _isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      _errorMessage = 'Failed to delete customer: $e';
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
