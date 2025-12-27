class User {
  final int id;
  final String username;
  final String? name;
  final String role;
  final int? businessId;
  final String? phone;
  final String? email;

  User({
    required this.id,
    required this.username,
    this.name,
    required this.role,
    this.businessId,
    this.phone,
    this.email,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
      name: json['name'],
      role: json['role'],
      businessId: json['business_id'],
      phone: json['phone'],
      email: json['email'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'name': name,
      'role': role,
      'business_id': businessId,
      'phone': phone,
      'email': email,
    };
  }
}
