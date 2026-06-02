export const profile = {
  name: 'Thân Van Thanh',
  title: 'Senior iOS / Mobile Developer',
  location: 'Hà Nội, Việt Nam',
  email: 'thanvanthanh1909@gmail.com',
  phone: '0366 360 222',
  github: 'https://github.com/thanvanthanh',
  linkedin: 'https://www.linkedin.com/in/than-van-thanh/',
  bio: 'iOS Developer hơn 6 năm kinh nghiệm với Swift, Objective-C và Flutter. Đã ship hàng loạt app từ super-app doanh nghiệp tới fintech, food delivery, và crypto exchange — luôn ám ảnh với UI mượt, kiến trúc sạch và hiệu năng thực.',
};

export const stats = [
  { value: '5+', label: 'Năm kinh nghiệm' },
  { value: '11+', label: 'Apps đã ship' },
  { value: '5M+', label: 'Người dùng cuối' },
  { value: '4.5', label: 'Rating trung bình' },
];

export const skills = [
  { name: 'Swift / SwiftUI', level: 'Expert', emoji: '🍎' },
  { name: 'Objective-C / UIKit', level: 'Expert', emoji: '🧱' },
  { name: 'Flutter & Dart', level: 'Advanced', emoji: '💙' },
  { name: 'TCA / VIPER / MVVM', level: 'Expert', emoji: '🏛' },
  { name: 'RxSwift & Combine', level: 'Advanced', emoji: '🌊' },
  { name: 'Firebase / Realm / CoreData', level: 'Advanced', emoji: '🔥' },
  { name: 'CI/CD · Fastlane · Jenkins', level: 'Advanced', emoji: '🚀' },
  { name: 'LiveKit · WebSocket · SDK', level: 'Strong', emoji: '📡' },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  role: string;
  year: string;
  emoji: string;
  gradient: [string, string];
  accent: string;
  image?: string;
};

export const projects: Project[] = [
  {
    name: 'VNASA',
    tagline: 'Vietnam Airlines super-app cho nhân viên.',
    description:
      'Mobile super-app nội bộ của Vietnam Airlines — gộp SkyIdea, KPI, Newsfeed, Notifications và các dịch vụ doanh nghiệp vào một nền tảng duy nhất cho hơn 15.000 nhân viên.',
    tech: ['Flutter', 'BLoC', 'Dio', 'Firebase', 'Fastlane'],
    role: 'Mobile Developer Leader (Flutter)',
    year: '2025',
    emoji: '✈️',
    gradient: ['#0071e3', '#91a5dc'],
    accent: '#0071e3',
    image: '/projects/vnasa.jpg',
  },
  {
    name: 'Yogiyo',
    tagline: 'Food delivery số 1 Hàn Quốc.',
    description:
      'Một trong những nền tảng đặt đồ ăn lớn nhất Hàn Quốc, được Delivery Hero mua lại. Phát triển và bảo trì các luồng UI/UX phức tạp, tối ưu hiệu năng và tích hợp các dịch vụ marketing-tech.',
    tech: ['Swift', 'TCA', 'MVVM', 'Tuist', 'Braze', 'AppsFlyer'],
    role: 'iOS Developer',
    year: '2022 — 2024',
    emoji: '🍱',
    gradient: ['#FF0844', '#FFB199'],
    accent: '#FF0844',
    image: '/projects/yogiyo.jpg',
  },
  {
    name: 'Toyota Wallet',
    tagline: 'Ví điện tử chính chủ của Toyota Nhật Bản.',
    description:
      'Giải pháp thanh toán di động myTOYOTA Wallet với e-money, thẻ tín dụng và thẻ ghi nợ. Phát triển, review code, tối ưu kiến trúc và đảm bảo bảo mật các luồng giao dịch tài chính.',
    tech: ['Swift', 'VIPER', 'RxSwift', 'RxCocoa', 'Firebase'],
    role: 'iOS Developer',
    year: '2020 — 2022',
    emoji: '💳',
    gradient: ['#9e6264', '#1281db'],
    accent: '#517FA4',
    image: '/projects/toyota-wallet.jpg',
  },
  {
    name: 'ProBit Global',
    tagline: 'Sàn giao dịch crypto toàn cầu.',
    description:
      'Sàn giao dịch tiền mã hoá Coin-to-Coin với hiện diện ở nhiều thị trường. Tham gia phát triển, tối ưu hiệu năng và xử lý các luồng realtime với WebSocket / Socket.io.',
    tech: ['Swift', 'VIPER', 'TradingView', 'WebSocket', 'Alamofire'],
    role: 'iOS Developer',
    year: '2022 — 2023',
    emoji: '📈',
    gradient: ['#1d6ee0', '#326ba4'],
    accent: '#11998E',
    image: '/projects/probit.jpg',
  },
];

export const experiences = [
  {
    company: 'SOTATEK., JSC',
    role: 'Mobile Developer (iOS / Flutter)',
    period: '08/2022 — Hiện tại',
    summary:
      'Tham gia và dẫn dắt mobile cho các sản phẩm outsourcing quy mô lớn — từ super-app doanh nghiệp tới fintech, food delivery, photobooth và edtech.',
    bullets: [
      'Lead Flutter cho VNASA — super-app nội bộ của Vietnam Airlines (15+ thành viên).',
      'iOS Developer cho Photoism / Snapism (Hàn Quốc) với TCA + SwiftUI và tích hợp Kakao/Naver SDK.',
      'Phát triển Yogiyo App (Hàn Quốc) — MVVM + TCA, Tuist, Fastlane CI/CD.',
      'Phát triển Merchant App cho chuỗi cửa hàng tại Hàn Quốc.',
      'Phát triển GIM SDK video/audio meeting trên LiveKit + ChatSDK + WebSocket.',
      'Đóng góp ProBit Global, Smart Learn (GIIS) — VIPER + Clean Architecture.',
    ],
  },
  {
    company: 'OPN VN',
    role: 'iOS Developer',
    period: '06/2020 — 07/2022',
    summary:
      'Xây dựng các sản phẩm fintech cho thị trường Nhật Bản.',
    bullets: [
      'Phát triển Toyota Wallet — VIPER + Clean Architecture, RxSwift, đảm bảo an toàn giao dịch.',
    ],
  },
  {
    company: 'VNPAY',
    role: 'Intern iOS Developer',
    period: '03/2020 — 05/2020',
    summary:
      'Bắt đầu sự nghiệp iOS với mảng mobile banking — học tốt nền móng UIKit, bảo mật và quy trình release.',
    bullets: [
      'Tham gia phát triển Co-opBank Mobile Banking (UIKit, VIP pattern).',
      'Đóng góp module KYC SDK và các tính năng bảo mật giao dịch.',
    ],
  },
];

export const education = [
  {
    school: 'Hanoi University of Business and Technology',
    major: 'Bachelor of Information Technology',
    period: '10/2017 — 12/2021',
  },
  {
    school: 'TECHMASTER Vietnam',
    major: 'iOS Swift Programming',
    period: '03/2020 — 05/2020',
  },
];

export const techMarquee = [
  'Swift',
  'Objective-C',
  'SwiftUI',
  'UIKit',
  'TCA',
  'VIPER',
  'MVVM',
  'RxSwift',
  'Combine',
  'Flutter',
  'Dart',
  'BLoC',
  'Dio',
  'Firebase',
  'Realm',
  'CoreData',
  'KeyChain',
  'LiveKit',
  'WebSocket',
  'Fastlane',
  'Tuist',
  'Jenkins',
];
