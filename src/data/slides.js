/**
 * Presentation registry.
 * Only slides with status "ready" are rendered.
 * Later slides can be added here without changing the shell.
 */
export const TOTAL_PLANNED = 11

export const SLIDES = [
  { id: 'cover', n: '01', label: 'الغلاف', status: 'ready' },
  { id: 'problem', n: '02', label: 'المشكلة', status: 'ready' },
  { id: 'requirements', n: '03', label: 'تجميع المتطلبات', status: 'ready' },
  { id: 'features', n: '04', label: 'ميزات تطبيقنا', status: 'ready' },
  { id: 'nfr', n: '05', label: 'المتطلبات غير الوظيفية', status: 'ready' },
  { id: 'process', n: '06', label: 'النموذج الإجرائي', status: 'ready' },
  { id: 'architecture', n: '07', label: 'البنية المعمارية', status: 'ready' },
  { id: 'challenges', n: '08', label: 'العوائق والتحديات', status: 'ready' },
  { id: 'testing', n: '09', label: 'الاختبارات والتحقق', status: 'ready' },
  { id: 'future', n: '10', label: 'الآفاق المستقبلية', status: 'ready' },
  { id: 'closing', n: '11', label: 'الخاتمة', status: 'ready' },
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

export const FEATURE_SHOWCASE = [
  {
    id: 'tracking',
    n: '01',
    title: 'التتبع اللحظي',
    body: 'تتبع موقع الرحلة لحظيًا أثناء السير.',
    lede: 'وعند انقطاع الاتصال، يُقدَّر الموقع تلقائيًا حتى تعود الإشارة.',
  },
  {
    id: 'qr',
    n: '02',
    title: 'تذاكر QR',
    body: 'تحقق سريع وآمن من الهوية والحجز عبر رمز QR.',
  },
  {
    id: 'ai-reports',
    n: '03',
    title: 'تقارير مولّدة بالذكاء الاصطناعي',
    body: 'تلخيص وتحليل تلقائي لبيانات الأداء.',
  },
  {
    id: 'scheduling',
    n: '04',
    title: 'جدولة الرحلات',
    body: 'جدولة سلسة ومرنة للرحلات والمواعيد.',
  },
  {
    id: 'seats',
    n: '05',
    title: 'اختيار مقعد محدد',
    body: 'حجز مقعد بعينه عند إتمام العملية.',
  },
  {
    id: 'payment',
    n: '06',
    title: 'الدفع الإلكتروني',
    body: 'إتمام الدفع رقميًا بأمان.',
  },
  {
    id: 'plans',
    n: '07',
    title: 'باقات الاشتراك',
    body: 'خطط اشتراك مرنة للمستخدمين المتكررين.',
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
  clients: [
    { id: 'passenger', ar: 'تطبيق المسافر', stack: 'Passenger App · Flutter', icon: 'people' },
    { id: 'driver', ar: 'تطبيق السائق', stack: 'Driver App · Flutter', icon: 'driver' },
    { id: 'company', ar: 'لوحة الشركة', stack: 'Company Dashboard · React', icon: 'building' },
    { id: 'admin', ar: 'مدير المنصة', stack: 'Super Admin · React / Filament', icon: 'control' },
  ],
  backend: { label: 'Backend / API', stack: 'Laravel', icon: 'server' },
  database: { label: 'Database', stack: 'MySQL', icon: 'database' },
  services: [
    'Queues · Caching',
    'Seat Locking',
    'QR Tickets',
    'Payment · نقدي / إلكتروني',
    'Notifications · FCM',
    'GPS / WebSockets',
  ],
}

export const CHALLENGES = {
  title: 'العوائق والتحديات',
  claim: 'أصعب جزء لم يكن الواجهة.',
  subtitle: 'ثلاثة مخاطر هندسية حُسمت مبكراً: القفل، التتبع، والبحث.',
  cards: [
    {
      id: 'locking',
      n: '01',
      title: 'حجز المقاعد المتزامن',
      body: 'Seat Locking يمنع تعارض مستخدمين على المقعد نفسه، مع قيود صارمة في قاعدة البيانات.',
    },
    {
      id: 'tracking',
      n: '02',
      title: 'التتبع اللحظي',
      body: 'السائق يرسل الموقع عبر WebSockets. إذا انقطع التحديث لأكثر من دقيقة، تعالج الخلفية الحالة تلقائيًا.',
    },
    {
      id: 'search',
      n: '03',
      title: 'أداء البحث',
      body: 'فهرسة + Caching. اختبار 18,888 طلباً: نجاح 99.86% · متوسط 259ms داخل الخادم.',
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
