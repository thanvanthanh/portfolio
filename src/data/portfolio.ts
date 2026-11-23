export const profile = {
  name: 'Than Van Thanh',
  displayName: 'Thân Văn Thanh',
  title: 'Mobile Engineer & AI-Native Systems Builder',
  shortRole: 'iOS Developer @ Techcombank',
  location: 'Tay Mo, Hanoi, Vietnam',
  shortLocation: 'Hanoi, Vietnam',
  email: 'thanvanthanh1909@gmail.com',
  phone: '+84 366 360 222',
  website: 'https://thanvanthanh.info.vn',
  github: 'https://github.com/thanvanthanh',
  linkedin: 'https://www.linkedin.com/in/than-van-thanh/',
  cvUrl: '/cv/',
  bio: 'Mobile Engineer with 5+ years in iOS and Flutter across fintech, banking, and super-apps. Drives AI-native engineering workflows with Claude Code, Kiro, and MCP, backed by hands-on experience building a unified LLM gateway and a read-only PostgreSQL MCP server (Go, Python, Keycloak).',
};

export const stats = [
  { value: '5+', labelEn: 'Years iOS & Flutter', labelVi: 'Năm iOS & Flutter' },
  { value: '3M+', labelEn: 'Production Users', labelVi: 'Người dùng thực tế' },
  { value: '6-Dev', labelEn: 'Team Leadership', labelVi: 'Dẫn dắt đội ngũ' },
  { value: 'MCP', labelEn: 'AI & LLM Gateway', labelVi: 'AI & LLM Gateway' },
];

export type ProjectCategory = 'banking' | 'ai' | 'consumer' | 'archive';

export type Project = {
  id: string;
  name: string;
  tagline: string;
  taglineVi: string;
  description: string;
  descriptionVi: string;
  bullets: string[];
  tech: string[];
  role: string;
  company: string;
  year: string;
  category: ProjectCategory;
  featured?: boolean;
  accent: string;
  image?: string;
  heroImage?: string;
  link?: string;
  metrics: string;
};

export const projects: Project[] = [
  {
    id: 'techcombank-mobile',
    name: 'Techcombank Mobile',
    tagline: 'Project Hyper-P — Retail banking membership tier upgrade journey.',
    taglineVi: 'Dự án Hyper-P — Hành trình nâng hạng hội viên ngân hàng bán lẻ.',
    description:
      'Next-generation retail banking app by Techcombank. Built core Hyper-P membership upgrade features including benefit calculator, tier comparison, and progress tracker powered by Adobe AEM configurations and AI-native Kiro + MCP workflows.',
    descriptionVi:
      'Ứng dụng ngân hàng bán lẻ thế hệ mới của Techcombank. Phát triển các tính năng trọng tâm của Project Hyper-P (tính toán quyền lợi, so sánh hạng hội viên, thanh tiến trình) từ cấu hình Adobe AEM cùng quy trình AI-native với Kiro & MCP.',
    bullets: [
      'Developed membership tier upgrade journey: benefit calculator, tier comparison & progress tracker.',
      'Processed dynamic data from Adobe AEM configurations and wrote comprehensive unit tests.',
      'Used Kiro for feature implementation, refactoring & unit tests following MVVM + Clean Architecture.',
      'Integrated Figma, Jira & Confluence via MCP; defined custom Agent Skills for coding, code review & unit testing.',
    ],
    tech: [
      'MVVM + Clean Architecture',
      'RxSwift',
      'RxCocoa',
      'RxDataSources',
      'Adobe AEM',
      'AppsFlyer',
      'CocoaPods Multi-Module',
      'BackBase',
      'Kiro',
      'MCP',
      'Agent Skills',
    ],
    role: 'iOS Developer (CMC Global onsite)',
    company: 'CMC GLOBAL · Techcombank',
    year: 'Aug 2026 — Present',
    category: 'banking',
    featured: true,
    accent: '#ef4444',
    metrics: 'Retail Banking Flagship',
  },
  {
    id: 'dbinc-ai-gateway',
    name: 'DBInc — LLM & MCP Gateway',
    tagline: 'Unified Go LLM Gateway & Read-Only PostgreSQL MCP Platform.',
    taglineVi: 'Nền tảng LLM Gateway (Go) & PostgreSQL MCP Server chỉ-đọc.',
    description:
      'Enterprise AI gateway platform centralizing multi-provider LLM access and enabling coding agents to safely inspect PostgreSQL schema metadata end-to-end with Keycloak authentication.',
    descriptionVi:
      'Nền tảng AI Gateway tập trung hóa truy cập đa nhà cung cấp LLM và cho phép các AI agent kiểm tra cấu trúc lược đồ PostgreSQL an toàn theo chế độ chỉ-đọc, xác thực qua Keycloak.',
    bullets: [
      'Customized Go-based Bifrost LLM gateway for unified API access across multiple model providers.',
      'Developed Python MCP gateway with FastMCP exposing deterministic tools to inspect PostgreSQL schema metadata.',
      'Enforced strict read-only PostgreSQL schema access and secured the entire gateway with Keycloak authentication.',
    ],
    tech: [
      'Go',
      'Python',
      'FastMCP',
      'MCP',
      'PostgreSQL',
      'Keycloak',
      'Bifrost',
      'LLM Gateway',
      'Claude Code',
      'Codex',
    ],
    role: 'AI Systems / Backend Engineer',
    company: 'SOTATEK, JSC',
    year: '2025 — 2026',
    category: 'ai',
    featured: true,
    accent: '#10b981',
    metrics: 'Read-Only Guarded',
  },
  {
    id: 'yogiyo',
    name: 'Yogiyo App',
    tagline: "South Korea's 2nd-largest food delivery platform with millions of active users.",
    taglineVi: 'Nền tảng giao đồ ăn lớn thứ 2 Hàn Quốc với hàng triệu người dùng.',
    description:
      'High-traffic consumer food delivery platform. Developed voucher features, maintained core iOS modules, and traced live production issues with Datadog logs to eliminate root causes.',
    descriptionVi:
      'Ứng dụng giao đồ ăn lưu lượng cao tại Hàn Quốc. Phát triển tính năng voucher, tối ưu ổn định iOS và truy vết nguyên nhân lỗi production thông qua Datadog.',
    bullets: [
      'Developed voucher features and maintained core iOS modules serving millions of users.',
      'Diagnosed and resolved production bugs to guarantee smooth user journeys.',
      'Traced live production incidents using Datadog logs to pinpoint exact root causes.',
    ],
    tech: [
      'MVVM',
      'Moya',
      'Braze',
      'AppsFlyer',
      'Datadog',
      'WKWebView',
      'Tuist',
      'RxSwift',
      'Fastlane',
    ],
    role: 'iOS Developer',
    company: 'SOTATEK, JSC',
    year: '2022 — 2024',
    category: 'consumer',
    accent: '#f43f5e',
    image: '/projects/yogiyo.jpg',
    heroImage: '/hero/yogiyo.jpg',
    link: 'https://apps.apple.com/kr/app/id543831532',
    metrics: '3M+ Active Users',
  },
  {
    id: 'vnasa',
    name: 'VNASA',
    tagline: 'Vietnam Airlines internal app for workforce operations and performance tracking.',
    taglineVi: 'Siêu ứng dụng nội bộ Vietnam Airlines cho vận hành & theo dõi KPI.',
    description:
      'Enterprise Flutter application powering SkyIdea and KPI tracking modules across Vietnam Airlines, backed by clean BLoC architecture and automated Fastlane CI/CD pipelines.',
    descriptionVi:
      'Ứng dụng Flutter doanh nghiệp của Vietnam Airlines, xây dựng các phân hệ SkyIdea và KPI cùng quy trình CI/CD tự động bằng Fastlane.',
    bullets: [
      'Built SkyIdea and KPI modules with Flutter, flutter_bloc, GetIt, and Dio.',
      'Integrated Syncfusion PDF viewer, Lottie animations, Firebase, and biometric local_auth.',
      'Maintained Fastlane CI/CD pipelines for reliable enterprise build & release cycles.',
    ],
    tech: [
      'Flutter',
      'Dart',
      'flutter_bloc',
      'GetIt',
      'Dio',
      'Firebase',
      'Lottie',
      'Syncfusion PDF',
      'local_auth',
      'Fastlane',
    ],
    role: 'Mobile Engineer / Flutter Lead',
    company: 'SOTATEK, JSC',
    year: '2025',
    category: 'consumer',
    accent: '#0ea5e9',
    image: '/projects/vnasa.jpg',
    heroImage: '/hero/vna-app.png',
    metrics: '15,000+ Staff',
  },
  {
    id: 'photoism',
    name: 'PHOTOISM',
    tagline: 'Photobooth mobile app with coupon management, custom frames, and filters.',
    taglineVi: 'Ứng dụng photobooth hàng đầu Hàn Quốc với quản lý coupon, khung hình & bộ lọc.',
    description:
      'Modern SwiftUI + The Composable Architecture (TCA) mobile app for Korea’s leading photobooth brand — delivering coupon management, custom frames, filter workflows, and social auth.',
    descriptionVi:
      'Ứng dụng iOS hiện đại xây dựng bằng SwiftUI + TCA cho thương hiệu photobooth hàng đầu Hàn Quốc với luồng coupon, khung ảnh tùy chỉnh và tích hợp Kakao/Naver SDK.',
    bullets: [
      'Implemented coupon management and custom photo frame/filter workflows.',
      'Engineered unidirectional state management using TCA and declarative SwiftUI.',
      'Integrated KakaoSDK, NaverSDK, SnapKit, Firebase, and AppAuth.',
    ],
    tech: ['TCA', 'SwiftUI', 'Firebase', 'KakaoSDK', 'NaverSDK', 'SnapKit', 'AppAuth'],
    role: 'iOS Developer',
    company: 'SOTATEK, JSC',
    year: '2024 — 2025',
    category: 'consumer',
    accent: '#14b8a6',
    image: '/projects/photoism.jpg',
    heroImage: '/hero/photoism.jpg',
    link: 'https://apps.apple.com/kr/app/id6747059622',
    metrics: 'Korea #1 Kiosk',
  },
  {
    id: 'snapism',
    name: 'SNAPISM',
    tagline: 'iOS app for custom photo creation and printing via photobooth hardware.',
    taglineVi: 'Ứng dụng iOS sáng tạo và in ảnh trực tiếp qua phần cứng máy photobooth.',
    description:
      'Built core MVP architecture, physical photobooth printing workflows, rich UI features, RESTful API integrations, and automated iOS CI/CD deployment pipelines.',
    descriptionVi:
      'Xây dựng kiến trúc lõi MVP, quy trình in ảnh kết nối máy photobooth, tích hợp RESTful API và thiết lập pipeline CI/CD tự động hóa build/release iOS.',
    bullets: [
      'Built core architecture, hardware printing workflows, UI features, and REST API integrations.',
      'Configured CI/CD pipelines to automate iOS build, signing, and deployment.',
      'Integrated KakaoSDK, NaverSDK, SnapKit, AppAuth, WKWebView, and Firebase.',
    ],
    tech: [
      'MVP',
      'Firebase',
      'KakaoSDK',
      'NaverSDK',
      'SnapKit',
      'AppAuth',
      'WKWebView',
      'RESTful API',
      'CI/CD',
    ],
    role: 'iOS Developer',
    company: 'SOTATEK, JSC',
    year: '2024 — 2025',
    category: 'consumer',
    accent: '#3b82f6',
    image: '/projects/snapism.png',
    heroImage: '/hero/snapism.png',
    link: 'https://apps.apple.com/kr/app/snapism-%EC%8A%A4%EB%82%B4%ED%94%BC%EC%A6%98/id6739771894',
    metrics: 'Hardware Print Flow',
  },
  {
    id: 'toyota-wallet',
    name: 'Toyota Wallet',
    tagline: 'Mobile payment solution integrating e-money, credit, and debit payments.',
    taglineVi: 'Ví điện tử chính thức của Toyota Nhật Bản tích hợp e-money, thẻ tín dụng & ghi nợ.',
    description:
      'Japanese enterprise mobile payment platform. Developed core financial features across the full SDLC using VIPER + Clean Architecture, RxSwift, and rigorous code review practices.',
    descriptionVi:
      'Nền tảng thanh toán di động tại Nhật Bản. Phát triển các tính năng lõi xuyên suốt vòng đời sản phẩm với VIPER + Clean Architecture và RxSwift.',
    bullets: [
      'Developed core payment features throughout the SDLC with cross-functional teams.',
      'Conducted code reviews and optimized codebase for long-term maintainability and performance.',
      'Resolved complex technical issues to strengthen transaction stability and UX.',
    ],
    tech: ['VIPER + Clean Architecture', 'RxSwift', 'RxCocoa', 'RxDataSources', 'Firebase'],
    role: 'iOS Developer',
    company: 'OPN VN',
    year: 'May 2021 — Jul 2022',
    category: 'banking',
    accent: '#6366f1',
    image: '/projects/toyota-wallet.jpg',
    heroImage: '/hero/toyota.jpg',
    link: 'https://apps.apple.com/jp/app/id1482354577',
    metrics: 'Japan Fintech',
  },
  // Archive Projects (Previous Production Products)
  {
    id: 'smartlearn',
    name: 'Smartlearn',
    tagline: 'AI-powered education platform integrating LMS and SIS.',
    taglineVi: 'Nền tảng giáo dục tích hợp AI kết hợp LMS và SIS.',
    description:
      'Contributed to the Lost & Found module enabling students and staff to report, search, and track items with real-time Socket.IO events and deep linking.',
    descriptionVi:
      'Phát triển phân hệ Lost & Found cho phép báo cáo, tìm kiếm và theo dõi đồ thất lạc thời gian thực qua Socket.IO và Deeplink.',
    bullets: [
      'Built Lost & Found workflows following MVVM + Clean Architecture with SnapKit.',
      'Integrated AppAuth, Firebase, Socket.IO real-time updates, and deep linking.',
    ],
    tech: ['MVVM', 'Clean Architecture', 'SnapKit', 'Firebase', 'AppAuth', 'SocketIO', 'Deeplink'],
    role: 'iOS Developer',
    company: 'SOTATEK, JSC',
    year: '2023',
    category: 'archive',
    accent: '#22c55e',
    image: '/projects/smartlearn.png',
    link: 'https://apps.apple.com/jp/app/smart-learn-app/id6463868037',
    metrics: 'EdTech · Japan',
  },
  {
    id: 'vyin-sdk',
    name: 'Vyin SDK',
    tagline: 'Real-time video/audio meeting iOS SDK powered by LiveKit.',
    taglineVi: 'iOS SDK gọi video/âm thanh thời gian thực xây dựng trên LiveKit.',
    description:
      'Modular iOS communications SDK delivering low-latency video/audio conferencing with LiveKit, ChatSDK multimedia messaging, CallKit, and WebSockets.',
    descriptionVi:
      'SDK iOS cung cấp cuộc gọi video/audio độ trễ thấp với LiveKit, nhắn tin đa phương tiện ChatSDK, CallKit và WebSockets.',
    bullets: [
      'Architected SDK modules with VIPER + Clean Architecture for seamless host-app embedding.',
      'Integrated LiveKit media streaming, CallKit native call UI, and low-latency WebSockets.',
    ],
    tech: ['VIPER', 'Clean Architecture', 'LiveKit', 'ChatSDK', 'CallKit', 'WebSockets', 'Firebase'],
    role: 'iOS SDK Developer',
    company: 'SOTATEK, JSC',
    year: '2023 — 2024',
    category: 'archive',
    accent: '#818cf8',
    image: '/projects/vyin.jpeg',
    metrics: 'Real-Time SDK',
  },
  {
    id: 'probit-global',
    name: 'ProBit Global',
    tagline: 'Global multi-market cryptocurrency exchange.',
    taglineVi: 'Sàn giao dịch tiền mã hóa toàn cầu đa thị trường.',
    description:
      'High-frequency crypto exchange app featuring real-time order books, TradingView charts, WebSocket price feeds, and performance tuning.',
    descriptionVi:
      'Ứng dụng sàn giao dịch crypto với sổ lệnh thời gian thực, biểu đồ TradingView, luồng giá WebSocket và tối ưu hiệu năng.',
    bullets: [
      'Delivered trading features and real-time WebSocket market stream updates.',
      'Tuned UI rendering performance for high-frequency tick updates.',
    ],
    tech: ['Swift', 'VIPER', 'TradingView', 'WebSocket', 'Alamofire'],
    role: 'iOS Developer',
    company: 'SOTATEK, JSC',
    year: '2022 — 2023',
    category: 'archive',
    accent: '#06b6d4',
    image: '/projects/probit.jpg',
    metrics: 'Crypto Exchange',
  },
];

export type ExperienceItem = {
  company: string;
  location: string;
  role: string;
  period: string;
  active?: boolean;
  summary: string;
  summaryVi: string;
  highlights: string[];
  projects?: string[];
  tech: string[];
};

export const experiences: ExperienceItem[] = [
  {
    company: 'CMC GLOBAL',
    location: 'Hanoi, Vietnam · Onsite at Techcombank',
    role: 'iOS Developer (Techcombank Mobile)',
    period: 'Aug 2026 — Present',
    active: true,
    summary:
      'Building flagship retail banking experiences for Techcombank Mobile (Project Hyper-P) while pioneering AI-native iOS engineering workflows with Kiro, MCP, and custom Agent Skills.',
    summaryVi:
      'Phát triển tính năng trọng điểm cho Techcombank Mobile (Project Hyper-P) đồng thời xây dựng quy trình kỹ thuật iOS AI-native với Kiro, MCP và Agent Skills.',
    highlights: [
      'Project Hyper-P: Developed membership tier upgrade journey (benefit calculator, tier comparison, progress tracker).',
      'Processed data from Adobe AEM configurations and authored comprehensive unit test suites.',
      'Used Kiro for feature implementation, refactoring, and unit tests following MVVM + Clean Architecture; reviewed and validated AI-generated code.',
      'Integrated Figma, Jira, and Confluence via MCP; defined reusable Agent Skills for coding, code review, and unit testing to boost UI accuracy and cut context switching.',
    ],
    projects: ['Techcombank Mobile (Hyper-P)'],
    tech: [
      'MVVM + Clean Architecture',
      'RxSwift',
      'RxCocoa',
      'RxDataSources',
      'Adobe AEM',
      'AppsFlyer',
      'CocoaPods Multi-Module',
      'BackBase',
      'Kiro',
      'MCP',
      'Agent Skills',
    ],
  },
  {
    company: 'SOTATEK, JSC',
    location: 'Hanoi, Vietnam',
    role: 'Mobile Engineer & Team Lead',
    period: 'Aug 2022 — Aug 2026',
    summary:
      'Led a 6-member cross-platform mobile team across architecture, code reviews, Fastlane CI/CD, and delivery — shipping high-traffic consumer platforms and building DBInc’s Go/Python AI & MCP Gateway.',
    summaryVi:
      'Dẫn dắt nhóm 6 kỹ sư mobile đa nền tảng (iOS & Flutter) về kiến trúc, review code, Fastlane CI/CD và bàn giao sản phẩm — đồng thời xây dựng nền tảng DBInc LLM & MCP Gateway bằng Go/Python.',
    highlights: [
      'Led a 6-member cross-platform mobile team, owning task assignments, technical decisions, code reviews, and delivery.',
      'Built DBInc LLM Gateway (customized Go Bifrost) and Python FastMCP PostgreSQL schema server secured with Keycloak.',
      'Shipped & optimized high-traffic apps: Yogiyo (Datadog tracing), PHOTOISM (TCA/SwiftUI), VNASA (Vietnam Airlines Flutter), and SNAPISM.',
      'Streamlined CI/CD pipelines with Fastlane to accelerate build signing, testing, and App Store release workflows.',
    ],
    projects: ['DBInc LLM/MCP Gateway', 'Yogiyo App', 'PHOTOISM', 'VNASA', 'SNAPISM'],
    tech: [
      'Swift',
      'SwiftUI',
      'Flutter',
      'Go',
      'Python',
      'FastMCP',
      'Keycloak',
      'TCA',
      'MVVM',
      'Tuist',
      'Fastlane',
      'Datadog',
    ],
  },
  {
    company: 'OPN VN',
    location: 'Hanoi, Vietnam',
    role: 'iOS Developer (Toyota Wallet)',
    period: 'May 2021 — Jul 2022',
    summary:
      'Engineered core payment modules for Toyota Wallet in Japan — integrating e-money, credit, and debit flows with strict financial stability.',
    summaryVi:
      'Phát triển các phân hệ thanh toán cốt lõi cho Toyota Wallet tại thị trường Nhật Bản (e-money, thẻ tín dụng và ghi nợ) đảm bảo độ ổn định cao.',
    highlights: [
      'Developed core payment features across the full SDLC in collaboration with cross-functional product and engineering teams.',
      'Conducted thorough code reviews and optimized the codebase for maintainability and runtime performance.',
      'Resolved complex technical issues to harden financial transaction reliability and user experience.',
    ],
    projects: ['Toyota Wallet'],
    tech: ['VIPER + Clean Architecture', 'RxSwift', 'RxCocoa', 'RxDataSources', 'Firebase'],
  },
];

export const education = [
  {
    school: 'Hanoi University of Business and Technology',
    degree: 'Bachelor of Information Technology',
    location: 'Hanoi, Vietnam',
    period: 'Graduated Feb 2022',
    badge: 'EDUCATION',
  },
  {
    school: 'TECHMASTER Vietnam',
    degree: 'iOS Swift Programming Training',
    location: 'Hanoi, Vietnam',
    period: 'Mar 2021 — May 2021',
    badge: 'TRAINING',
  },
];

export type SkillGroup = {
  id: string;
  index: string;
  title: string;
  titleVi: string;
  accent: 'blue' | 'emerald' | 'violet';
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'ios',
    index: '01',
    title: 'iOS Native Engineering',
    titleVi: 'Kỹ thuật iOS Native',
    accent: 'blue',
    items: [
      'Swift',
      'UIKit',
      'SwiftUI',
      'Auto Layout',
      'SnapKit',
      'Combine',
      'RxSwift',
      'RxCocoa',
      'RxDataSources',
    ],
  },
  {
    id: 'ai',
    index: '02',
    title: 'AI Engineering & Gateways',
    titleVi: 'AI Engineering & Gateway',
    accent: 'emerald',
    items: [
      'Claude Code',
      'Kiro',
      'Codex',
      'MCP',
      'FastMCP',
      'Agent Skills',
      'Go',
      'Python',
      'Bifrost',
      'PostgreSQL',
      'Keycloak',
    ],
  },
  {
    id: 'flutter-arch',
    index: '03',
    title: 'Flutter & Architecture',
    titleVi: 'Flutter & Kiến trúc Phần mềm',
    accent: 'blue',
    items: [
      'Flutter',
      'Dart',
      'BLoC / Cubit',
      'GetIt',
      'GetX',
      'Clean Architecture',
      'MVVM',
      'TCA',
      'VIPER',
      'MVP',
      'MVC',
    ],
  },
  {
    id: 'data-net',
    index: '04',
    title: 'Networking, Data & Security',
    titleVi: 'Mạng, Dữ liệu & Bảo mật',
    accent: 'violet',
    items: [
      'RESTful APIs',
      'WebSocket',
      'Dio',
      'WKWebView',
      'OAuth 2.0',
      'Realm',
      'UserDefaults',
      'Keychain',
      'Firebase',
    ],
  },
  {
    id: 'devops-sdks',
    index: '05',
    title: 'DevOps, SDKs & Delivery',
    titleVi: 'DevOps, SDK & Vận hành',
    accent: 'blue',
    items: [
      'Tuist',
      'XcodeGen',
      'SwiftGen',
      'Fastlane',
      'Jenkins',
      'CI/CD',
      'Adobe AEM',
      'BackBase',
      'Datadog',
      'Braze',
      'AppsFlyer',
      'LiveKit',
      'Lottie',
      'KakaoSDK',
      'NaverSDK',
      'Jira',
      'Confluence',
    ],
  },
];

export const skillConstellationTags = [
  'Swift',
  'SwiftUI',
  'UIKit',
  'RxSwift',
  'Combine',
  'TCA',
  'VIPER',
  'MVVM',
  'Flutter',
  'Dart',
  'BLoC',
  'Go',
  'Python',
  'FastMCP',
  'MCP',
  'Kiro',
  'Claude Code',
  'Bifrost',
  'Keycloak',
  'PostgreSQL',
  'Tuist',
  'Fastlane',
  'Datadog',
  'Adobe AEM',
];

export const skillConstellationLinks: Record<
  string,
  { related: string[]; noteEn: string; noteVi: string }
> = {
  FastMCP: {
    related: ['Python', 'MCP', 'PostgreSQL', 'Keycloak', 'Bifrost', 'Claude Code'],
    noteEn:
      'Powering DBInc MCP Gateway — exposing read-only PostgreSQL schema inspection tools under Keycloak auth.',
    noteVi:
      'Trái tim của DBInc MCP Gateway — cung cấp công cụ kiểm tra schema PostgreSQL chỉ-đọc bảo vệ bởi Keycloak.',
  },
  Kiro: {
    related: ['MCP', 'Claude Code', 'MVVM', 'Swift', 'RxSwift', 'Adobe AEM'],
    noteEn:
      'Driving Techcombank Hyper-P feature implementation, refactoring & unit tests connected to Figma/Jira/Confluence MCP.',
    noteVi:
      'Vận hành quy trình phát triển Hyper-P tại Techcombank: kết nối Figma/Jira/Confluence qua MCP & Agent Skills.',
  },
  RxSwift: {
    related: ['Swift', 'UIKit', 'MVVM', 'VIPER', 'Adobe AEM', 'Datadog'],
    noteEn:
      'Core reactive engine across Techcombank Mobile, Yogiyo food delivery, and Toyota Wallet Japan.',
    noteVi:
      'Lõi lập trình phản ứng xuyên suốt Techcombank Mobile, Yogiyo và Toyota Wallet Nhật Bản.',
  },
  TCA: {
    related: ['Swift', 'SwiftUI', 'Tuist', 'Fastlane'],
    noteEn:
      'Composable unidirectional architecture powering PHOTOISM and testable modular iOS feature suites.',
    noteVi:
      'Kiến trúc luồng dữ liệu một chiều TCA cho PHOTOISM và các module iOS dễ kiểm thử.',
  },
  Flutter: {
    related: ['Dart', 'BLoC', 'Fastlane', 'MVVM'],
    noteEn:
      'Led a 6-member cross-platform team and shipped Vietnam Airlines VNASA enterprise super-app.',
    noteVi:
      'Dẫn dắt nhóm 6 kỹ sư đa nền tảng và xây dựng siêu ứng dụng nội bộ Vietnam Airlines VNASA.',
  },
  Go: {
    related: ['Bifrost', 'Keycloak', 'PostgreSQL', 'MCP', 'Python'],
    noteEn:
      'Customized the Go-based Bifrost LLM Gateway for centralized multi-provider model routing.',
    noteVi:
      'Tùy biến Bifrost LLM Gateway viết bằng Go để định tuyến tập trung đa nhà cung cấp LLM.',
  },
};

export const techMarquee = [
  'Swift',
  'SwiftUI',
  'UIKit',
  'RxSwift',
  'Combine',
  'TCA',
  'MVVM + Clean',
  'VIPER',
  'Flutter',
  'Dart',
  'Go',
  'Python',
  'FastMCP',
  'MCP',
  'Claude Code',
  'Kiro',
  'Bifrost LLM Gateway',
  'Keycloak',
  'PostgreSQL',
  'Adobe AEM',
  'Tuist',
  'Fastlane',
  'Datadog',
];
