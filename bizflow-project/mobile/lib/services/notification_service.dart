import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _notificationsPlugin =
      FlutterLocalNotificationsPlugin();

  static Future<void> initialize() async {
    const AndroidInitializationSettings androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const DarwinInitializationSettings iosSettings =
        DarwinInitializationSettings();

    const InitializationSettings settings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );

    await _notificationsPlugin.initialize(settings);
  }

  static Future<void> showNotification({
    required String title,
    required String body,
    String? payload,
  }) async {
    const AndroidNotificationDetails androidDetails =
        AndroidNotificationDetails(
      'bizflow_channel',
      'BizFlow Notifications',
      channelDescription: 'Thông báo từ BizFlow',
      importance: Importance.high,
      priority: Priority.high,
    );

    const DarwinNotificationDetails iosDetails = DarwinNotificationDetails();

    const NotificationDetails details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );

    await _notificationsPlugin.show(
      DateTime.now().millisecondsSinceEpoch ~/ 1000,
      title,
      body,
      details,
      payload: payload,
    );
  }

  static Future<void> showOrderNotification(String orderInfo) async {
    await showNotification(
      title: 'Đơn hàng mới',
      body: 'Có đơn hàng mới: $orderInfo',
      payload: 'order',
    );
  }

  static Future<void> showDraftOrderNotification() async {
    await showNotification(
      title: 'Đơn nháp AI',
      body: 'AI đã tạo đơn hàng nháp. Vui lòng kiểm tra.',
      payload: 'draft_order',
    );
  }
}
