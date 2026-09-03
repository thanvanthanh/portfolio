export const profile = {
  name: 'Than Van Thanh',
  title: 'Senior iOS / Mobile Developer',
  location: 'Hanoi, Vietnam',
  email: 'thanvanthanh1909@gmail.com',
  phone: '0366 360 222',
  github: 'https://github.com/thanvanthanh',
  linkedin: 'https://www.linkedin.com/in/than-van-thanh/',
  bio: 'iOS Developer with 5+ years building production apps in Swift, Objective-C and Flutter. Shipped everything from enterprise super-apps to fintech, food delivery and crypto exchange — obsessed with smooth UI, clean architecture and real performance.',
};

export const stats = [
  { value: '5+', label: 'Years of experience' },
  { value: '10+', label: 'Apps shipped' },
  { value: '3M+', label: 'End users' },
  { value: '4.5', label: 'Average rating' },
];

export const skills = [
  { name: 'Swift / SwiftUI', level: 'Expert', emoji: '🍎', icon: '/icons/swift.png' },
  { name: 'Objective-C / UIKit', level: 'Expert', emoji: '🧱', icon: '/icons/uikit.png' },
  { name: 'Flutter & Dart', level: 'Advanced', emoji: '💙', icon: '/icons/flutter.png' },
  { name: 'TCA / VIPER / MVVM', level: 'Expert', emoji: '🏛' },
  { name: 'RxSwift & Combine', level: 'Advanced', emoji: '🌊', icon: '/icons/rxswift.png' },
  { name: 'Firebase / Realm / CoreData', level: 'Advanced', emoji: '🔥', icon: '/icons/firebase.png' },
  { name: 'CI/CD · Fastlane · Jenkins', level: 'Advanced', emoji: '🚀', icon: '/icons/fastlane.png' },
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
  link?: string;
};

export const projects: Project[] = [
  {
    name: 'Snapism',
    tagline: 'Create, customize, and print photos via photobooth machines.',
    description:
      'iOS app enabling users to create, customize, and print photos via photobooth machines. Built core architecture and key photo-printing features with complex UI/UX and RESTful API integration. Integrated payment, QR code, WKWebView, Firebase, KakaoSDK, NaverSDK, and AppAuth.',
    tech: ['MVP', 'Firebase', 'KakaoSDK', 'NaverSDK', 'SnapKit', 'AppAuth', 'WKWebView', 'RESTful API'],
    role: 'iOS Developer',
    year: '2024 — 2025',
    emoji: '🎞️',
    gradient: ['#0071e3', '#1d4ed8'],
    accent: '#2997ff',
    image: '/projects/snapism.png',
    link: 'https://apps.apple.com/kr/app/snapism-%EC%8A%A4%EB%82%B4%ED%94%BC%EC%A6%98/id6739771894',
  },
  {
    name: 'VNASA',
    tagline: 'Vietnam Airlines internal super-app.',
    description:
      'Internal mobile super-app for Vietnam Airlines — bundling SkyIdea, KPI, Newsfeed, Notifications and other enterprise services into a single platform for 15,000+ employees.',
    tech: ['Flutter', 'BLoC', 'Dio', 'Firebase', 'Fastlane'],
    role: 'Mobile Developer Leader (Flutter)',
    year: '2025',
    emoji: '✈️',
    gradient: ['#0071e3', '#91a5dc'],
    accent: '#0071e3',
    image: '/projects/vnasa.jpg',
  },
  {
    name: 'Photoism',
    tagline: 'Korea’s #1 photobooth app.',
    description:
      'Retail photobooth app in Korea — capture, edit and share photos right at the kiosk. Built SwiftUI + TCA flows, integrated Kakao / Naver SDKs and real-time photo sync.',
    tech: ['Swift', 'SwiftUI', 'TCA', 'Kakao SDK', 'Naver SDK'],
    role: 'iOS Developer',
    year: '2024 — 2025',
    emoji: '📸',
    gradient: ['#11998E', '#38EF7D'],
    accent: '#11998E',
    image: '/projects/photoism.jpg',
    link: 'https://apps.apple.com/kr/app/id6747059622',
  },
  {
    name: 'Yogiyo',
    tagline: 'Korea’s leading food delivery platform.',
    description:
      'One of Korea’s largest food delivery platforms, acquired by Delivery Hero. Built and maintained complex UI/UX flows, optimized performance and integrated marketing-tech services.',
    tech: ['Swift', 'TCA', 'MVVM', 'Tuist', 'Braze', 'AppsFlyer'],
    role: 'iOS Developer',
    year: '2022 — 2024',
    emoji: '🍱',
    gradient: ['#FF0844', '#FFB199'],
    accent: '#FF0844',
    image: '/projects/yogiyo.jpg',
    link: 'https://apps.apple.com/kr/app/id543831532',
  },
  {
    name: 'Smartlearn',
    tagline: 'AI-powered education platform integrating LMS and SIS.',
    description:
      'Smartlearn is an AI-powered education platform integrating LMS and SIS functionalities. I contributed to the development of the Lost & Found module, which enables users to report, search, and manage lost or found items efficiently within the platform.',
    tech: [
      'MVVM',
      'Clean Architecture',
      'SnapKit',
      'Firebase',
      'AppAuth',
      'SocketIO',
      'Deeplink',
    ],
    role: 'iOS Developer',
    year: '2023',
    emoji: '🎓',
    gradient: ['#30d158', '#0071e3'],
    accent: '#30d158',
    image: '/projects/smartlearn.png',
    link: 'https://apps.apple.com/jp/app/smart-learn-app/id6463868037',
  },
  {
    name: 'Vyin SDK',
    tagline: 'Real-time video/audio meeting iOS SDK.',
    description:
      'This project develops an iOS SDK for meeting applications, providing seamless video/audio calls and real-time communication. It leverages LiveKit for high-quality media streaming, ChatSdk for text and multimedia messaging, and sockets for low-latency interactions.',
    tech: [
      'VIPER',
      'Clean Architecture',
      'LiveKit',
      'ChatSDK',
      'Firebase',
      'CallKit',
      'WebSockets',
    ],
    role: 'iOS SDK Developer',
    year: '2023 — 2024',
    emoji: '📹',
    gradient: ['#6366f1', '#a855f7'],
    accent: '#818cf8',
    image: '/projects/vyin.jpeg',
  },
  {
    name: 'Toyota Wallet',
    tagline: 'Toyota Japan’s official e-wallet.',
    description:
      'myTOYOTA Wallet mobile payment solution with e-money, credit and debit cards. Built features, reviewed code, refined architecture and hardened the security of all financial flows.',
    tech: ['Swift', 'VIPER', 'RxSwift', 'RxCocoa', 'Firebase'],
    role: 'iOS Developer',
    year: '2021 — 2022',
    emoji: '💳',
    gradient: ['#9e6264', '#1281db'],
    accent: '#517FA4',
    image: '/projects/toyota-wallet.jpg',
    link: 'https://apps.apple.com/jp/app/id1482354577',
  },
  {
    name: 'ProBit Global',
    tagline: 'Global crypto exchange.',
    description:
      'Coin-to-coin crypto exchange operating across multiple markets. Worked on feature development, performance tuning and real-time flows over WebSocket / Socket.io.',
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
    period: '08/2022 — Present',
    summary:
      'Build and lead mobile for large outsourcing products — from enterprise super-apps to fintech, food delivery, photobooth and edtech.',
    bullets: [
      'Flutter lead on VNASA — Vietnam Airlines’ internal super-app (15+ team members).',
      'iOS Developer on Photoism / Snapism (Korea) with TCA + SwiftUI and Kakao / Naver SDK integrations.',
      'Built the Yogiyo App (Korea) — MVVM + TCA, Tuist, Fastlane CI/CD.',
      'Built the Merchant App for a retail chain in Korea.',
      'Built the GIM SDK for video / audio meetings on top of LiveKit + ChatSDK + WebSocket.',
      'Contributed to ProBit Global and Smart Learn (GIIS) — VIPER + Clean Architecture.',
    ],
  },
  {
    company: 'OPN VN',
    role: 'iOS Developer',
    period: '06/2021 — 07/2022',
    summary:
      'Built fintech products for the Japanese market.',
    bullets: [
      'Built Toyota Wallet — VIPER + Clean Architecture, RxSwift, with strong transaction safety.',
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
    period: '03/2021 — 05/2021',
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
