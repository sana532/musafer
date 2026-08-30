/**
 * Presentation registry.
 * Only slides with status "ready" are rendered.
 * Later slides can be added here without changing the shell.
 */
export const TOTAL_PLANNED = 13

export const SLIDES = [
  { id: 'cover', n: '01', label: 'الغلاف', status: 'ready' },
  { id: 'problem', n: '02', label: 'المشكلة', status: 'ready' },
  { id: 'requirements', n: '03', label: 'تجميع المتطلبات', status: 'ready' },
  { id: 'process', n: '04', label: 'النموذج الإجرائي', status: 'ready' },
  { id: 'solution', n: '05', label: 'أين يقف السوق اليوم؟', status: 'ready' },
  { id: 'beneficiaries', n: '06', label: 'المستفيدون من التطبيق', status: 'ready' },
  { id: 'features', n: '07', label: 'ميزات تطبيقنا', status: 'ready' },
  { id: 'challenges', n: '08', label: 'العوائق والتحديات', status: 'ready' },
  { id: 'nfr', n: '09', label: 'المتطلبات غير الوظيفية', status: 'ready' },
  { id: 'architecture', n: '10', label: 'البنية المعمارية', status: 'ready' },
  { id: 'testing', n: '11', label: 'الاختبارات والتحقق', status: 'ready' },
  { id: 'future', n: '12', label: 'الآفاق المستقبلية', status: 'ready' },
  { id: 'closing', n: '13', label: 'الخاتمة', status: 'ready' },
]

export const READY_SLIDES = SLIDES.filter((slide) => slide.status === 'ready')

export const COVER = {
  kicker: 'جامعة دمشق · هندسة البرمجيات',
  title: 'مسافر',
  tagline: 'رحلة واحدة... وراءها نظام كامل.',
  subtitle: 'منصة متكاملة لإدارة وحجز رحلات شركات النقل البري',
  faculty: 'كلية الهندسة المعلوماتية · قسم هندسة البرمجيات ونظم المعلومات',
  supervision: 'إشراف أعضاء الهيئة التدريسية في القسم',
  team: [
    'راغدة جهاد أبوزيدان',
    'روهلات شيركو متيني',
    'سنا خالد الخوص',
    'نور الدين محمد البندقجي',
    'أحمد عواد عيد',
  ],
}

export const PROBLEMS = [
  {
    id: 'unification',
    n: '01',
    label: 'غياب التنظيم الرقمي الموحد',
    highlight: 'all',
  },
  {
    id: 'booking',
    n: '02',
    label: 'صعوبة إدارة الحجوزات والرحلات',
    highlight: 'booking',
  },
  {
    id: 'tracking',
    n: '03',
    label: 'التتبع اللحظي غير متوفر',
    highlight: 'tracking',
  },
  {
    id: 'manual',
    n: '04',
    label: 'الاعتماد على الإجراءات اليدوية',
    highlight: 'manual',
    aside: 'إدارة الأسطول والتذاكر',
  },
]

export const PROBLEM_NODES = [
  { id: 'passenger', label: 'المسافر', en: 'Passenger', row: 1, col: 'center' },
  { id: 'booking', label: 'الحجز', en: 'Booking', row: 2, col: 'start' },
  { id: 'company', label: 'الشركة', en: 'Company', row: 2, col: 'end' },
  { id: 'driver', label: 'السائق', en: 'Driver', row: 3, col: 'start' },
  { id: 'ticket', label: 'التذكرة', en: 'Ticket', row: 3, col: 'end' },
  { id: 'tracking', label: 'التتبع', en: 'Tracking', row: 4, col: 'center' },
]

export const REQUIREMENTS = {
  title: 'تجميع المتطلبات',
  subtitle: 'من الواقع إلى متطلبات النظام',
  methods: [
    {
      id: 'interviews',
      label: 'مقابلات مباشرة',
      hint: 'مسؤولو الشركات · السائقون · الركاب',
    },
    {
      id: 'visits',
      label: 'جولات ميدانية',
    },
    {
      id: 'surveys',
      label: 'استبيانات ميدانية',
      hint: 'جمع توقعات المستخدمين واحتياجاتهم',
    },
  ],
  stakeholders: [
    { id: 'officials', label: 'مسؤولو الشركات', icon: 'building' },
    { id: 'drivers', label: 'السائقون', icon: 'driver' },
    { id: 'passengers', label: 'الركاب', icon: 'people' },
  ],
  stages: {
    collect: 'جمع البيانات',
    analyze: 'تحليل الاحتياجات',
    requirements: 'متطلبات النظام',
  },
  needs: [
    { id: 'seats', label: 'حجز المقاعد' },
    { id: 'maps', label: 'التتبع عبر الخرائط' },
    { id: 'qr', label: 'تذاكر QR' },
    { id: 'subs', label: 'إدارة الاشتراكات' },
  ],
}

export const SOLUTION = {
  kicker: 'أين يقف السوق اليوم؟',
  problem: 'الحلول الحالية تدير كل شركة بمعزل عن الأخرى.',
  gaps: [
    'غياب التتبع اللحظي',
    'عزلة الأنظمة — تطبيق منفصل لكل شركة',
    'غياب تذاكر وباقات اشتراك متطورة',
    'غياب لوحة تحكم مركزية',
  ],
  title: 'الحل: مسافر',
  lede: 'نظام واحد متكامل, لإدارة رحلات النقل البري.',
  bridge: 'وهنا تكمن الفجوة التي يسدها مسافر.',
}

export const BENEFICIARIES = {
  title: 'المستفيدون من التطبيق',
  subtitle: 'أربعة أطراف، كل منها يجد في مسافر ما يحتاجه.',
  cards: [
    {
      id: 'passenger',
      title: 'المسافر',
      body: 'يحجز رحلته، يتتبعها، ويدفع بسهولة، دون أي تعقيد.',
      device: 'phone',
      src: '/passenger-screenshot.jpg',
      ratio: '704 / 1518',
    },
    {
      id: 'driver',
      title: 'السائق',
      body: 'يدير رحلته ويتحقق من ركابه من واجهة واحدة بسيطة.',
      device: 'phone',
      src: '/driver-screenshot.jpg',
      ratio: '704 / 1496',
    },
    {
      id: 'company',
      title: 'الشركة',
      body: 'تدير أسطولها وحجوزاتها وسائقيها من لوحة تحكم موحّدة.',
      device: 'laptop',
      src: '/company-screenshot.png',
      ratio: '1914 / 870',
    },
    {
      id: 'admin',
      title: 'مدير المنصة (Super Admin)',
      body: 'يشرف على كل الشركات والمستخدمين والعمليات من مكان واحد.',
      device: 'laptop',
      src: '/admin-screenshot.png',
      ratio: '1918 / 876',
    },
  ],
}

export const FEATURE_SHOWCASE = [
  {
    id: 'scheduling',
    n: '01',
    title: 'جدولة الرحلات',
    body: 'جدولة سلسة ومرنة للرحلات والمواعيد.',
  },
  {
    id: 'tracking',
    n: '02',
    title: 'التتبع اللحظي',
    body: 'تتبع موقع الرحلة لحظيًا أثناء السير.',
    lede: 'وعند انقطاع الاتصال، يُقدَّر الموقع تلقائيًا حتى تعود الإشارة.',
  },
  {
    id: 'offline-booking',
    n: '03',
    title: 'الحجز الأوفلاين',
    body: 'حجز مقعد لمسافر لا يمتلك التطبيق، عبر اتصال هاتفي أو حضوري مباشر.',
  },
  {
    id: 'payment',
    n: '04',
    title: 'الدفع الإلكتروني',
    body: 'إتمام الدفع رقميًا بأمان.',
  },
  {
    id: 'qr',
    n: '05',
    title: 'تذاكر QR',
    body: 'تحقق سريع وآمن من الهوية والحجز عبر رمز QR.',
  },
  {
    id: 'plans',
    n: '06',
    title: 'باقات الاشتراك',
    body: 'خطط اشتراك مرنة للمستخدمين المتكررين.',
  },
  {
    id: 'alerts',
    n: '07',
    title: 'الإشعارات الفورية',
    body: 'تنبيه فوري بكل تحديث يهم الرحلة والحجز.',
  },
  {
    id: 'ai-reports',
    n: '08',
    title: 'تقارير مولّدة بالذكاء الاصطناعي',
    body: 'تلخيص وتحليل تلقائي لبيانات الأداء.',
  },
]

export const FEATURE_ROLES = [
  {
    id: 'passenger',
    en: 'Passenger',
    ar: 'المسافر',
    icon: 'people',
    features: [
      { id: 'seats', label: 'حجز المقاعد', icon: 'seat' },
      { id: 'track', label: 'تتبع الرحلات', icon: 'map' },
      { id: 'qr', label: 'تذاكر QR', icon: 'ticket' },
      { id: 'subs', label: 'إدارة الاشتراكات', icon: 'ticket' },
      { id: 'complaints', label: 'التقييمات والشكاوى', icon: 'seat' },
    ],
  },
  {
    id: 'driver',
    en: 'Driver',
    ar: 'السائق',
    icon: 'driver',
    features: [
      { id: 'trip', label: 'إدارة الرحلة', icon: 'bus' },
      { id: 'list', label: 'قائمة الركاب', icon: 'people' },
      { id: 'scan', label: 'التحقق عبر QR', icon: 'qr' },
      { id: 'gps', label: 'تتبع الموقع', icon: 'pin' },
    ],
  },
  {
    id: 'company',
    en: 'Company',
    ar: 'الشركة',
    icon: 'building',
    features: [
      { id: 'trips', label: 'إدارة الرحلات', icon: 'trip' },
      { id: 'fleet', label: 'إدارة السائقين والمركبات', icon: 'fleet' },
      { id: 'bookings', label: 'إدارة الحجوزات', icon: 'dashboard' },
      { id: 'seats', label: 'إدارة المقاعد', icon: 'seat' },
      { id: 'live', label: 'متابعة الرحلات', icon: 'trip' },
    ],
  },
  {
    id: 'admin',
    en: 'Super Admin',
    ar: 'مدير المنصة',
    icon: 'control',
    features: [
      { id: 'companies', label: 'إدارة الشركات', icon: 'building' },
      { id: 'users', label: 'إدارة المستخدمين', icon: 'people' },
      { id: 'watch', label: 'الرقابة على الرحلات', icon: 'monitor' },
      { id: 'ops', label: 'الإشراف على العمليات', icon: 'control' },
    ],
  },
]

export const NFR_PILLARS = [
  {
    id: 'reliability',
    n: '01',
    ar: 'الموثوقية والاتساق',
    en: 'Reliability',
    summary: 'حجز ودفع متسقان',
    tech: 'Seat locking · Consistency',
    icon: 'lock',
  },
  {
    id: 'security',
    n: '02',
    ar: 'الأمان',
    en: 'Security',
    summary: 'صلاحيات حسب الدور',
    tech: 'Role-based access',
    icon: 'shield',
  },
  {
    id: 'performance',
    n: '03',
    ar: 'الأداء',
    en: 'Performance',
    summary: 'استجابة سريعة',
    tech: 'Search · Caching · GPS',
    icon: 'gauge',
  },
  {
    id: 'availability',
    n: '04',
    ar: 'الإتاحة',
    en: 'Availability',
    summary: 'خدمة مستمرة',
    tech: 'فصل الخدمات',
    icon: 'pulse',
  },
  {
    id: 'usability',
    n: '05',
    ar: 'سهولة الاستخدام',
    en: 'Usability',
    summary: 'تجربة واضحة',
    tech: 'واجهات حسب الدور',
    icon: 'window',
  },
  {
    id: 'scalability',
    n: '06',
    ar: 'قابلية التوسع',
    en: 'Scalability',
    summary: 'نمو دون إعادة هيكلة جوهرية',
    tech: 'Users · Companies · Trips',
    icon: 'expand',
  },
]

export const PROCESS_MODEL = {
  title: 'النموذج الإجرائي المتبع',
  headline: 'Agile Incremental',
  stages: [
    {
      id: 'upfront',
      n: '01',
      en: 'Upfront Engineering',
      ar: 'تحديد النطاق + SRS + ERD + المخاطر',
      keys: ['SRS', 'ERD', 'Scope', 'Risk Planning'],
    },
    {
      id: 'increment',
      n: '02',
      en: 'Increment',
      ar: 'وحدة مكتملة وقابلة للتشغيل',
      keys: ['Feature', 'Testable', 'Operational'],
    },
    {
      id: 'sprint',
      n: '03',
      en: 'Sprint',
      ar: 'تخطيط → تنفيذ → مراجعة',
      keys: ['Plan', 'Develop', 'Review'],
    },
    {
      id: 'testing',
      n: '04',
      en: 'Testing',
      ar: 'تحقق مستمر',
      keys: ['Continuous Verification'],
    },
    {
      id: 'feedback',
      n: '05',
      en: 'Feedback',
      ar: 'Improve',
      keys: ['Improve'],
    },
  ],
}

export const ARCHITECTURE = {
  title: 'البنية المعمارية',
  claim: 'أربعة مداخل. نقطة واحدة.',
  lede: 'كل طرف يدخل من واجهته، والمنطق والبيانات في مكان واحد.',
  layers: [
    {
      id: 'clients',
      n: '01',
      ar: 'طبقة الواجهات',
      en: 'Client Layer',
      items: [
        { id: 'admin', ar: 'مدير المنصة', stack: 'React' },
        { id: 'company', ar: 'لوحة الشركة', stack: 'React' },
        { id: 'driver', ar: 'تطبيق السائق', stack: 'Flutter' },
        { id: 'passenger', ar: 'تطبيق المسافر', stack: 'Flutter' },
      ],
    },
    {
      id: 'runtime',
      n: '02',
      ar: 'طبقة التشغيل',
      en: 'Runtime · Docker',
      docker: true,
      items: [
        { id: 'nginx', ar: 'Nginx', stack: 'Proxy · SSL · :443' },
        { id: 'laravel', ar: 'Laravel', stack: 'REST API', accent: true },
        { id: 'reverb', ar: 'Reverb', stack: 'WebSockets / GPS' },
        { id: 'queue', ar: 'Queue Worker', stack: 'Async Jobs' },
        { id: 'redis', ar: 'Redis', stack: 'Cache · OTP · Locks' },
        { id: 'evolution', ar: 'Evolution API', stack: 'WhatsApp Messaging' },
      ],
    },
    {
      id: 'data',
      n: '03',
      ar: 'طبقة البيانات',
      en: 'Data Layer · Docker',
      docker: true,
      items: [{ id: 'postgres', ar: 'PostgreSQL + PostGIS' }],
    },
    {
      id: 'external',
      n: '04',
      ar: 'خدمات خارجية',
      en: 'External · SaaS',
      items: [
        { id: 'stripe', ar: 'Stripe + Webhooks', stack: 'Card Payment' },
        { id: 'r2', ar: 'Cloudflare R2', stack: 'Reports · Files' },
        { id: 'fcm', ar: 'FCM', stack: 'Push Notifications' },
      ],
    },
    {
      id: 'capabilities',
      n: '05',
      ar: 'قدرات المنصة',
      en: 'Business Capabilities',
      tags: [
        'QR Tickets',
        'Seat Locking',
        'Cash / Wallet / Card',
        'Real-time Tracking',
        'AI Trip Search',
        'AI Report Summaries',
      ],
    },
  ],
}
export const CHALLENGES = {
  title: 'العوائق والتحديات',
  claim: 'ليست تقنية فقط.',
  hub: 'مسافر',
  nodes: [
    {
      id: 'seats',
      n: '01',
      key: 'حجز المقاعد المتزامن',
      icon: 'lock',
    },
    {
      id: 'location',
      n: '02',
      key: 'استمرارية التتبع',
      icon: 'pin',
    },
    {
      id: 'digital',
      n: '03',
      key: 'التحول الرقمي بقطاع النقل',
      icon: 'building',
    },
    {
      id: 'growth',
      n: '04',
      key: 'النمو في المستخدمين والرحلات',
      icon: 'database',
    },
    {
      id: 'fraud',
      n: '05',
      key: 'الحماية من الحجوزات الوهمية',
      icon: 'shield',
    },
  ],
}

export const TESTING = {
  title: 'الاختبارات والتحقق',
  subtitle: 'حالات استخدام + اختبار تحميل لمسار البحث، عنق الزجاجة الطبيعي للمنصة.',
  metrics: [
    {
      id: 'users',
      value: 356,
      decimals: 0,
      suffix: '',
      label: 'مستخدماً افتراضياً متزامناً',
    },
    {
      id: 'requests',
      value: 18888,
      decimals: 0,
      suffix: '',
      label: 'طلب بحث تحت الضغط',
    },
    {
      id: 'success',
      value: 99.86,
      decimals: 2,
      suffix: '%',
      label: 'نسبة نجاح اختبار k6',
      accent: true,
    },
  ],
  scenarios: [
    { id: 'ts1', code: 'TS1', label: 'الحجز', weight: 'featured', tone: 'user' },
    { id: 'ts2', code: 'TS2', label: 'الإلغاء', weight: 'standard', tone: 'user' },
    { id: 'ts3', code: 'TS3', label: 'سائق / QR', weight: 'standard', tone: 'system' },
    { id: 'ts4', code: 'TS4', label: 'الإدارة', weight: 'standard', tone: 'system' },
    { id: 'ts5', code: 'TS5', label: 'الاشتراكات', weight: 'standard', tone: 'user' },
    { id: 'ts6', code: 'TS6', label: 'GPS وقفل المقاعد', weight: 'featured', tone: 'system' },
    { id: 'ts7', code: 'TS7', label: 'الشكاوى', weight: 'standard', tone: 'user' },
    { id: 'ts8', code: 'TS8', label: 'الملف الشخصي', weight: 'standard', tone: 'user' },
    { id: 'ts9', code: 'TS9', label: 'البحث', weight: 'featured', tone: 'system' },
  ],
  
}

export const FUTURE = {
  title: 'الآفاق المستقبلية',
  subtitle: 'من نظام لإدارة الرحلات، إلى منظومة تشغيل متكاملة.',
  lede: 'نحو نظام أقرب إلى ERP مخصّص لشركات النقل البري.',
  origin: 'مسافر',
  stops: [
    {
      id: 'admin',
      n: '01',
      title: 'الجانب الإداري',
      points: [
        'إدارة الموظفين (حضور، رواتب، إجازات)',
        'إدارة الفروع والصلاحيات',
        'سجل محاسبي للإيرادات والمصروفات',
      ],
    },
    {
      id: 'ops',
      n: '02',
      title: 'الجانب التشغيلي والمالي',
      points: [
        'بوابة دفع محلية',
        'نماذج تنبؤية للطلب',
        'تحليلات وتقارير أعمق',
      ],
    },
    {
      id: 'passenger',
      n: '03',
      title: 'تجربة المسافر',
      points: [
        'قائمة انتظار + نظام توصية',
        'حجوزات مؤسسية وجماعية',
        'تسعير مرن + فوترة إلكترونية',
      ],
    },
    {
      id: 'fleet',
      n: '04',
      title: 'الأسطول والخدمات',
      points: [
        'تكاليف تشغيل المركبات',
        'نقل الطرود',
        'الربط بوسائل نقل أخرى',
      ],
    },
  ],
}

export const CLOSING = {
  title: 'الرحلة اكتملت. النظام جاهز.',
  titleLines: ['الرحلة اكتملت.', 'النظام جاهز.'],
  tagline: 'من فكرة، إلى مسافر.',
  thanks: 'شكراً لحضوركم.',
}
