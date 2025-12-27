import { Product, Customer, Order, Employee, StockTransaction, BusinessAccount, SubscriptionPlan } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Xi măng Portland PCB40',
    category: 'Xi măng',
    price: 95000,
    unit: 'bao',
    stock: 250,
    active: true,
    alternativeUnits: [
      { unit: 'tấn', price: 1900000, conversionRate: 20 }
    ]
  },
  {
    id: 'p2',
    name: 'Sắt thép D10',
    category: 'Sắt thép',
    price: 180000,
    unit: 'kg',
    stock: 1500,
    active: true,
    alternativeUnits: [
      { unit: 'tấn', price: 18000000, conversionRate: 1000 },
      { unit: 'cây', price: 126000, conversionRate: 0.7 }
    ]
  },
  {
    id: 'p3',
    name: 'Gạch ống đỏ 4x8x19',
    category: 'Gạch',
    price: 1800,
    unit: 'viên',
    stock: 5000,
    active: true,
    alternativeUnits: [
      { unit: 'ngàn viên', price: 1750000, conversionRate: 1000 }
    ]
  },
  {
    id: 'p4',
    name: 'Cát xây dựng',
    category: 'Cát đá',
    price: 350000,
    unit: 'm³',
    stock: 80,
    active: true
  },
  {
    id: 'p5',
    name: 'Đá 1x2',
    category: 'Cát đá',
    price: 420000,
    unit: 'm³',
    stock: 60,
    active: true
  },
  {
    id: 'p6',
    name: 'Thép D8',
    category: 'Sắt thép',
    price: 175000,
    unit: 'kg',
    stock: 800,
    active: true
  },
  {
    id: 'p7',
    name: 'Gạch block 7x19x39',
    category: 'Gạch',
    price: 4500,
    unit: 'viên',
    stock: 3000,
    active: true
  },
  {
    id: 'p8',
    name: 'Sơn nước Dulux ngoại thất',
    category: 'Sơn',
    price: 1250000,
    unit: 'thùng',
    stock: 45,
    active: true,
    alternativeUnits: [
      { unit: 'lít', price: 85000, conversionRate: 0.067 }
    ]
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Anh Ba',
    phone: '0901234567',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    totalPurchases: 45600000,
    outstandingDebt: 5400000,
    lastPurchase: '2025-12-24',
    notes: 'Khách quen, thường mua sỉ'
  },
  {
    id: 'c2',
    name: 'Chị Hương',
    phone: '0912345678',
    address: '456 Nguyễn Trãi, Quận 5, TP.HCM',
    totalPurchases: 23400000,
    outstandingDebt: 0,
    lastPurchase: '2025-12-23'
  },
  {
    id: 'c3',
    name: 'Công ty TNHH Xây dựng Minh Anh',
    phone: '0923456789',
    address: '789 Võ Văn Tần, Quận 3, TP.HCM',
    totalPurchases: 156700000,
    outstandingDebt: 12300000,
    lastPurchase: '2025-12-25',
    notes: 'Công ty xây dựng lớn, thanh toán cuối tháng'
  },
  {
    id: 'c4',
    name: 'Anh Tuấn',
    phone: '0934567890',
    address: '321 Lý Thường Kiệt, Quận 10, TP.HCM',
    totalPurchases: 8900000,
    outstandingDebt: 1200000,
    lastPurchase: '2025-12-20'
  },
  {
    id: 'c5',
    name: 'Chị Mai',
    phone: '0945678901',
    address: '654 Điện Biên Phủ, Bình Thạnh, TP.HCM',
    totalPurchases: 34500000,
    outstandingDebt: 0,
    lastPurchase: '2025-12-22'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    orderNumber: 'DH-2025-001',
    customerId: 'c1',
    customerName: 'Anh Ba',
    items: [
      { productId: 'p1', productName: 'Xi măng Portland PCB40', quantity: 50, unit: 'bao', price: 95000, total: 4750000 },
      { productId: 'p4', productName: 'Cát xây dựng', quantity: 10, unit: 'm³', price: 350000, total: 3500000 }
    ],
    subtotal: 8250000,
    total: 8250000,
    paymentMethod: 'debt',
    debtAmount: 8250000,
    status: 'confirmed',
    createdBy: 'Trần Thị B',
    createdAt: '2025-12-26T09:30:00',
    source: 'phone'
  },
  {
    id: 'o2',
    orderNumber: 'DH-2025-002',
    items: [
      { productId: 'p3', productName: 'Gạch ống đỏ 4x8x19', quantity: 500, unit: 'viên', price: 1800, total: 900000 }
    ],
    subtotal: 900000,
    total: 900000,
    paymentMethod: 'cash',
    status: 'confirmed',
    createdBy: 'Trần Thị B',
    createdAt: '2025-12-26T10:15:00',
    source: 'counter'
  },
  {
    id: 'o3',
    orderNumber: 'AI-DRAFT-003',
    customerId: 'c1',
    customerName: 'Anh Ba',
    items: [
      { productId: 'p1', productName: 'Xi măng Portland PCB40', quantity: 5, unit: 'bao', price: 95000, total: 475000 }
    ],
    subtotal: 475000,
    total: 475000,
    paymentMethod: 'debt',
    debtAmount: 475000,
    status: 'draft',
    createdBy: 'AI Assistant',
    createdAt: '2025-12-26T11:20:00',
    source: 'ai',
    aiTranscript: 'Lấy 5 bao xi măng cho anh Ba, ghi nợ'
  }
];

export const mockEmployees: Employee[] = [
  {
    id: 'e1',
    name: 'Nguyễn Văn A',
    email: 'owner@example.com',
    phone: '0909123456',
    role: 'owner',
    active: true,
    createdAt: '2025-01-01'
  },
  {
    id: 'e2',
    name: 'Trần Thị B',
    email: 'employee@example.com',
    phone: '0909123457',
    role: 'employee',
    active: true,
    createdAt: '2025-03-15'
  },
  {
    id: 'e3',
    name: 'Lê Văn C',
    email: 'lvc@example.com',
    phone: '0909123458',
    role: 'employee',
    active: false,
    createdAt: '2025-02-10'
  }
];

export const mockStockTransactions: StockTransaction[] = [
  {
    id: 't1',
    productId: 'p1',
    productName: 'Xi măng Portland PCB40',
    type: 'import',
    quantity: 200,
    unit: 'bao',
    notes: 'Nhập hàng từ nhà cung cấp ABC',
    createdBy: 'Nguyễn Văn A',
    createdAt: '2025-12-20T14:00:00'
  },
  {
    id: 't2',
    productId: 'p2',
    productName: 'Sắt thép D10',
    type: 'import',
    quantity: 500,
    unit: 'kg',
    notes: 'Nhập thép mới',
    createdBy: 'Nguyễn Văn A',
    createdAt: '2025-12-22T09:00:00'
  },
  {
    id: 't3',
    productId: 'p1',
    productName: 'Xi măng Portland PCB40',
    type: 'export',
    quantity: 50,
    unit: 'bao',
    notes: 'Xuất theo đơn hàng DH-2025-001',
    createdBy: 'Trần Thị B',
    createdAt: '2025-12-26T09:30:00'
  }
];

export const mockBusinessAccounts: BusinessAccount[] = [
  {
    id: 'b1',
    businessName: 'Cửa hàng Vật liệu Xây dựng An Phát',
    ownerName: 'Nguyễn Văn A',
    email: 'owner@example.com',
    phone: '0909123456',
    address: '100 Đường Cách Mạng Tháng 8, Quận 3, TP.HCM',
    subscriptionPlan: 'pro',
    subscriptionStatus: 'active',
    registeredAt: '2025-01-01',
    lastActive: '2025-12-26T11:30:00'
  },
  {
    id: 'b2',
    businessName: 'Cửa hàng Sắt thép Thành Công',
    ownerName: 'Trần Văn B',
    email: 'thanh.cong@example.com',
    phone: '0919234567',
    address: '200 Lê Văn Sỹ, Quận Phú Nhuận, TP.HCM',
    subscriptionPlan: 'basic',
    subscriptionStatus: 'active',
    registeredAt: '2025-02-15',
    lastActive: '2025-12-25T16:20:00'
  },
  {
    id: 'b3',
    businessName: 'Vật liệu Xây dựng Hòa Bình',
    ownerName: 'Lê Thị C',
    email: 'hoa.binh@example.com',
    phone: '0929345678',
    address: '300 Nguyễn Thị Minh Khai, Quận 1, TP.HCM',
    subscriptionPlan: 'trial',
    subscriptionStatus: 'trial',
    registeredAt: '2025-12-20',
    lastActive: '2025-12-26T10:00:00'
  }
];

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan1',
    name: 'Cơ bản',
    price: 199000,
    duration: 'monthly',
    features: [
      'Quản lý tối đa 500 sản phẩm',
      'Tối đa 2 nhân viên',
      'Báo cáo cơ bản',
      'Hỗ trợ qua email'
    ],
    maxEmployees: 2,
    maxProducts: 500
  },
  {
    id: 'plan2',
    name: 'Chuyên nghiệp',
    price: 399000,
    duration: 'monthly',
    features: [
      'Quản lý không giới hạn sản phẩm',
      'Tối đa 10 nhân viên',
      'AI trợ lý tạo đơn hàng',
      'Báo cáo chi tiết & phân tích',
      'Tự động kế toán theo Thông tư 88',
      'Hỗ trợ ưu tiên 24/7'
    ],
    maxEmployees: 10,
    maxProducts: -1
  },
  {
    id: 'plan3',
    name: 'Doanh nghiệp',
    price: 799000,
    duration: 'monthly',
    features: [
      'Tất cả tính năng Chuyên nghiệp',
      'Không giới hạn nhân viên',
      'Tùy chỉnh báo cáo',
      'API integration',
      'Quản lý đa chi nhánh',
      'Đào tạo và tư vấn riêng'
    ],
    maxEmployees: -1,
    maxProducts: -1
  }
];
