import 'dart:convert';
import 'package:http/http.dart' as http;

class CustomerService {
  static const String baseUrl = 'http://10.0.2.2:9999';

  Future<Map<String, dynamic>> getCustomers(int businessId, String token) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/api/customers/?business_id=$businessId'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return {
          'success': true,
          'customers': data,
        };
      } else {
        final data = jsonDecode(response.body);
        return {
          'success': false,
          'message': data['error'] ?? 'Failed to load customers',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  Future<Map<String, dynamic>> createCustomer(Map<String, dynamic> customerData, String token) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/customers/'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(customerData),
      );

      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        return {
          'success': true,
          'customer_id': data['id'],
        };
      } else {
        final data = jsonDecode(response.body);
        return {
          'success': false,
          'message': data['error'] ?? 'Failed to create customer',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  Future<Map<String, dynamic>> updateCustomer(int customerId, Map<String, dynamic> customerData, String token) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/api/customers/$customerId'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(customerData),
      );

      if (response.statusCode == 200) {
        return {
          'success': true,
        };
      } else {
        final data = jsonDecode(response.body);
        return {
          'success': false,
          'message': data['error'] ?? 'Failed to update customer',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  Future<Map<String, dynamic>> deleteCustomer(int customerId, String token) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/api/customers/$customerId'),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        return {
          'success': true,
        };
      } else {
        final data = jsonDecode(response.body);
        return {
          'success': false,
          'message': data['error'] ?? 'Failed to delete customer',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }
}
