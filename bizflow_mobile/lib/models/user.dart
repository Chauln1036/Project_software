enum UserRole { employee, owner, admin }

class User {
  final int? id;
  final String username;
  final String? name;
  final String? phone;
  final String? email;
  final UserRole? role;
  final int? businessId;

  User({
    this.id,
    required this.username,
    this.name,
    this.phone,
    this.email,
    this.role,
    this.businessId,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
      name: json['name'],
      phone: json['phone'],
      email: json['email'],
      role: json['role'] != null ? UserRole.values.firstWhere(
        (e) => e.toString().split('.').last == json['role']
      ) : null,
      businessId: json['business_id'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'name': name,
      'phone': phone,
      'email': email,
      'role': role?.toString().split('.').last,
      'business_id': businessId,
    };
  }
}
