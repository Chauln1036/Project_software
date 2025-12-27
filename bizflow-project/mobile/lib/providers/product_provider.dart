import 'package:flutter/material.dart';
import '../services/product_service.dart';

class ProductProvider with ChangeNotifier {
  List<Map<String, dynamic>> _products = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<Map<String, dynamic>> get products => _products;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  final ProductService _productService = ProductService();

  Future<void> loadProducts(int businessId, String token) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final result = await _productService.getProducts(businessId, token);
      if (result['success']) {
        _products = List<Map<String, dynamic>>.from(result['products']);
      } else {
        _errorMessage = result['message'];
      }
    } catch (e) {
      _errorMessage = 'Failed to load products: $e';
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<bool> createProduct(Map<String, dynamic> productData, String token) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final result = await _productService.createProduct(productData, token);
      if (result['success']) {
        // Reload products after creating new one
        if (productData.containsKey('business_id')) {
          await loadProducts(productData['business_id'], token);
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
      _errorMessage = 'Failed to create product: $e';
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> updateProduct(int productId, Map<String, dynamic> productData, String token) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final result = await _productService.updateProduct(productId, productData, token);
      if (result['success']) {
        // Reload products after updating
        if (productData.containsKey('business_id')) {
          await loadProducts(productData['business_id'], token);
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
      _errorMessage = 'Failed to update product: $e';
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> deleteProduct(int productId, int businessId, String token) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final result = await _productService.deleteProduct(productId, token);
      if (result['success']) {
        // Reload products after deleting
        await loadProducts(businessId, token);
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
      _errorMessage = 'Failed to delete product: $e';
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
