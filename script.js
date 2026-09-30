/* ============================================================
   Adwerto — Main Script
   Author: samrel
   ============================================================ */
(() => {
  'use strict';

  const html = document.documentElement;
  const root = document.body;

  /* =========================================================
     1) THEME (Dark / Light)
     ========================================================= */
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'adwerto_theme';

  const getSavedTheme = () => localStorage.getItem(THEME_KEY);
  const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#07070d' : '#fbfbfe');
  };

  // init
  applyTheme(getSavedTheme() || 'dark');

  themeToggle?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* =========================================================
     2) LANGUAGE (fa / en)
     ========================================================= */
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const LANG_KEY = 'adwerto_lang';

  // translations
  const I18N = {
    fa: {
      'nav.home': 'خانه',
      'nav.services': 'خدمات',
      'nav.how': 'چگونه کار می‌کند',
      'nav.pricing': 'تعرفه‌ها',
      'nav.faq': 'سوالات',
      'nav.contact': 'تماس',
      'nav.cta': 'شروع کنید',

      'hero.badge': 'به‌زودی — نسخه رسمی Adwerto',
      'hero.title1': 'تبلیغات هوشمند،',
      'hero.title2': 'رشد انفجاری کسب‌وکار',
      'hero.subtitle': 'Adwerto پلتفرم خرید و فروش فضای تبلیغاتی در پیج‌های شبکه‌های اجتماعی و وب‌سایت‌هاست. تبلیغ خود را هدفمند پخش کنید یا فضای تبلیغاتی خود را به بهترین قیمت بفروشید.',
      'hero.cta1': 'رزرو فضای تبلیغاتی',
      'hero.cta2': 'مشاهده خدمات',
      'hero.countdownLabel': 'تا رونمایی رسمی Adwerto',
      'hero.days': 'روز',
      'hero.hours': 'ساعت',
      'hero.minutes': 'دقیقه',
      'hero.seconds': 'ثانیه',
      'hero.imageHint': 'تصویر سایت را اینجا قرار دهید',
      'hero.float1': '+۲۴۸٪ بازدید',
      'hero.float2': '۱۲۴ کمپین فعال',

      'stats.publishers': 'ناشر فعال',
      'stats.campaigns': 'کمپین موفق',
      'stats.satisfaction': 'رضایت مشتریان',
      'stats.support': 'پشتیبانی',

      'services.eyebrow': 'خدمات ما',
      'services.title': 'هر آنچه برای تبلیغات دیجیتال نیاز دارید',
      'services.desc': 'از انتخاب پیج مناسب تا انتشار و گزارش‌گیری لحظه‌ای.',
      'services.c1.title': 'تبلیغات در پیج‌ها',
      'services.c1.text': 'استوری و پست تبلیغاتی در پیج‌های پرمخاطب اینستاگرام، تلگرام و توییتر.',
      'services.c2.title': 'تبلیغات در وب‌سایت‌ها',
      'services.c2.text': 'بنر، رپورتاژ آگهی و تبلیغات نمایشی در سایت‌های پربازدید.',
      'services.c3.title': 'تحلیل و گزارش‌گیری',
      'services.c3.text': 'داشبورد زنده با آمار بازدید، کلیک و نرخ تبدیل هر کمپین.',
      'services.c4.title': 'هدف‌گذاری هوشمند',
      'services.c4.text': 'الگوریتم Adwerto بهترین پیج‌ها را پیشنهاد می‌دهد.',
      'services.c5.title': 'مدیریت کمپین',
      'services.c5.text': 'تیم متخصص ما کل فرآیند تبلیغات شما را مدیریت می‌کند.',
      'services.c6.title': 'پرداخت امن',
      'services.c6.text': 'پرداخت‌ها تا تأیید نهایی در حساب امن Adwerto می‌ماند.',

      'how.eyebrow': 'فرآیند کار',
      'how.title': 'فقط در ۳ قدم ساده',
      'how.desc': 'بدون پیچیدگی، بدون واسطه.',
      'how.s1.title': 'ثبت درخواست',
      'how.s1.text': 'بودجه، حوزه و هدف تبلیغاتی خود را مشخص کنید.',
      'how.s2.title': 'انتخاب پیج مناسب',
      'how.s2.text': 'پیشنهادهای هوشمند Adwerto را بررسی کنید.',
      'how.s3.title': 'انتشار و گزارش',
      'how.s3.text': 'تبلیغ منتشر و آمار زنده در داشبورد نمایش داده می‌شود.',

      'pricing.eyebrow': 'تعرفه‌ها',
      'pricing.title': 'پلنی متناسب با کسب‌وکار شما',
      'pricing.desc': 'بدون هزینه پنهان.',
      'pricing.currency': 'تومان / ماه',
      'pricing.custom': 'قیمت اختصاصی',
      'pricing.popular': 'پرطرفدارترین',
      'pricing.select': 'انتخاب پلن',
      'pricing.contact': 'تماس با فروش',
      'pricing.p1.name': 'استارتر',
      'pricing.p1.desc': 'مناسب کسب‌وکارهای نوپا',
      'pricing.p1.price': '۲٫۵ میلیون',
      'pricing.p1.f1': '۳ کمپین فعال',
      'pricing.p1.f2': 'تبلیغ در ۵ پیج',
      'pricing.p1.f3': 'گزارش هفتگی',
      'pricing.p1.f4': 'پشتیبانی ایمیلی',
      'pricing.p2.name': 'حرفه‌ای',
      'pricing.p2.desc': 'برای رشد سریع و پایدار',
      'pricing.p2.price': '۶٫۹ میلیون',
      'pricing.p2.f1': '۱۵ کمپین فعال',
      'pricing.p2.f2': 'تبلیغ در ۲۵ پیج',
      'pricing.p2.f3': 'داشبورد تحلیل زنده',
      'pricing.p2.f4': 'هدف‌گذاری پیشرفته',
      'pricing.p2.f5': 'پشتیبانی اختصاصی',
      'pricing.p3.name': 'سازمانی',
      'pricing.p3.desc': 'راهکار سفارشی برای برندها',
      'pricing.p3.price': 'تماس بگیرید',
      'pricing.p3.f1': 'کمپین نامحدود',
      'pricing.p3.f2': 'دسترسی API',
      'pricing.p3.f3': 'مدیر حساب اختصاصی',
      'pricing.p3.f4': 'گزارش‌های سفارشی',
      'pricing.p3.f5': 'SLA تضمین‌شده',

      'faq.eyebrow': 'سوالات متداول',
      'faq.title': 'پاسخ سوال‌های شما',
      'faq.q1': 'Adwerto دقیقاً چه کاری انجام می‌دهد؟',
      'faq.a1': 'Adwerto بازار آنلاین تبلیغاتی است که تبلیغ‌دهندگان را به صاحبان پیج و سایت متصل می‌کند.',
      'faq.q2': 'حداقل بودجه برای شروع چقدر است؟',
      'faq.a2': 'برای شروع از ۵۰۰ هزار تومان کافی است. پلن استارتر برای تست مناسب است.',
      'faq.q3': 'چطور از واقعی بودن بازدیدها مطمئن شوم؟',
      'faq.a3': 'تمام پیج‌ها و سایت‌ها قبل از تأیید توسط تیم فنی Adwerto بررسی و ترافیک آن‌ها اعتبارسنجی می‌شود.',
      'faq.q4': 'پرداخت‌ها چگونه انجام می‌شود؟',
      'faq.a4': 'پرداخت‌ها از طریق درگاه امن انجام و تا پایان موفق کمپین در حساب امانی Adwerto نگهداری می‌شود.',
      'faq.q5': 'چه زمانی سایت به‌طور کامل راه‌اندازی می‌شود؟',
      'faq.a5': 'نسخه رسمی Adwerto تا کمتر از ۲ ماه دیگر رونمایی می‌شود.',

      'cta.title': 'آماده‌اید کسب‌وکارتان را رشد دهید؟',
      'cta.text': 'ایمیل خود را وارد کنید تا در زمان رونمایی، اول از همه باخبر شوید و از تخفیف پیش‌فروش بهره‌مند شوید.',
      'cta.placeholder': 'ایمیل شما',
      'cta.button': 'اطلاع بده',
      'cta.success': '✓ ثبت شد! به‌زودی خبرهای خوبی دریافت می‌کنید.',
      'cta.error': 'لطفاً یک ایمیل معتبر وارد کنید.',

      'footer.desc': 'پلتفرم هوشمند تبلیغات دیجیتال — اتصال تبلیغ‌دهندگان به بهترین فضاهای تبلیغاتی ایران.',
      'footer.links': 'دسترسی سریع',
      'footer.legal': 'قوانین',
      'footer.privacy': 'حریم خصوصی',
      'footer.terms': 'شرایط استفاده',
      'footer.report': 'گزارش مشکل',
      'footer.social': 'شبکه‌های اجتماعی',
      'footer.rights': 'تمام حقوق محفوظ است.',
      'footer.made': 'طراحی و توسعه توسط',

      'privacy.title': 'سیاست حریم خصوصی',
      'privacy.p1': 'Adwerto متعهد به حفاظت از اطلاعات کاربران خود است.',
      'privacy.h1': 'اطلاعات جمع‌آوری‌شده',
      'privacy.p2': 'نام، ایمیل، شماره تماس و اطلاعات کمپین‌های تبلیغاتی شما.',
      'privacy.h2': 'نحوه استفاده',
      'privacy.p3': 'اطلاعات شما صرفاً برای اجرای کمپین‌ها و پشتیبانی استفاده می‌شود.',
      'privacy.h3': 'امنیت',
      'privacy.p4': 'تمام داده‌ها با رمزنگاری SSL/TLS منتقل و در سرورهای امن ذخیره می‌شوند.',
      'privacy.h4': 'حقوق شما',
      'privacy.p5': 'شما حق حذف، اصلاح یا دریافت اطلاعات خود را دارید.',
      'privacy.h5': 'کوکی‌ها',
      'privacy.p6': 'ما از کوکی‌ها برای ذخیره تنظیمات زبان و تم استفاده می‌کنیم.',

      'terms.title': 'شرایط استفاده',
      'terms.p1': 'با استفاده از Adwerto، شما با شرایط زیر موافقت می‌کنید.',
      'terms.h1': 'استفاده مجاز',
      'terms.p2': 'سرویس فقط برای اهداف تبلیغاتی قانونی قابل استفاده است.',
      'terms.h2': 'مسئولیت محتوا',
      'terms.p3': 'مسئولیت صحت محتوای تبلیغاتی بر عهده تبلیغ‌دهنده است.',
      'terms.h3': 'پرداخت و بازگشت وجه',
      'terms.p4': 'در صورت عدم اجرای کامل، مبلغ باقی‌مانده بازگردانده می‌شود.',
      'terms.h4': 'تغییرات',
      'terms.p5': 'Adwerto حق تغییر این شرایط را در هر زمان محفوظ می‌دارد.'
    },
    en: {
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.how': 'How it works',
      'nav.pricing': 'Pricing',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'nav.cta': 'Get started',

      'hero.badge': 'Coming soon — Official Adwerto',
      'hero.title1': 'Smart Advertising,',
      'hero.title2': 'Explosive Business Growth',
      'hero.subtitle': 'Adwerto is a marketplace for buying and selling ad space across social media pages and websites. Target your audience or monetize your traffic at the best price.',
      'hero.cta1': 'Book ad space',
      'hero.cta2': 'View services',
      'hero.countdownLabel': 'Until the official Adwerto launch',
      'hero.days': 'Days',
      'hero.hours': 'Hours',
      'hero.minutes': 'Minutes',
      'hero.seconds': 'Seconds',
      'hero.imageHint': 'Place your website image here',
      'hero.float1': '+248% visits',
      'hero.float2': '124 active campaigns',

      'stats.publishers': 'Active publishers',
      'stats.campaigns': 'Successful campaigns',
      'stats.satisfaction': 'Client satisfaction',
      'stats.support': 'Support',

      'services.eyebrow': 'Our Services',
      'services.title': 'Everything you need for digital advertising',
      'services.desc': 'From picking the right page to publishing and real-time reporting.',
      'services.c1.title': 'Social media ads',
      'services.c1.text': 'Promotional stories and posts on high-traffic Instagram, Telegram and Twitter pages.',
      'services.c2.title': 'Website advertising',
      'services.c2.text': 'Banners, advertorials and display ads on high-traffic websites.',
      'services.c3.title': 'Analytics & reporting',
      'services.c3.text': 'Live dashboard with views, clicks and conversion rate per campaign.',
      'services.c4.title': 'Smart targeting',
      'services.c4.text': 'Adwerto algorithm recommends the best pages for your budget.',
      'services.c5.title': 'Campaign management',
      'services.c5.text': 'Our expert team manages your entire advertising process.',
      'services.c6.title': 'Secure payment',
      'services.c6.text': 'Funds stay in Adwerto\u2019s secure account until final delivery.',

      'how.eyebrow': 'Process',
      'how.title': 'Just 3 simple steps',
      'how.desc': 'No complexity, no middleman.',
      'how.s1.title': 'Submit request',
      'how.s1.text': 'Define your budget, niche and advertising goal.',
      'how.s2.title': 'Pick the right page',
      'how.s2.text': 'Review Adwerto\u2019s smart recommendations.',
      'how.s3.title': 'Publish & report',
      'how.s3.text': 'Your ad goes live and real-time stats show in your dashboard.',

      'pricing.eyebrow': 'Pricing',
      'pricing.title': 'A plan that fits your business',
      'pricing.desc': 'No hidden fees.',
      'pricing.currency': 'Toman / month',
      'pricing.custom': 'Custom price',
      'pricing.popular': 'Most popular',
      'pricing.select': 'Choose plan',
      'pricing.contact': 'Contact sales',
      'pricing.p1.name': 'Starter',
      'pricing.p1.desc': 'Perfect for new businesses',
      'pricing.p1.price': '2.5M',
      'pricing.p1.f1': '3 active campaigns',
      'pricing.p1.f2': 'Ads on 5 pages',
      'pricing.p1.f3': 'Weekly report',
      'pricing.p1.f4': 'Email support',
      'pricing.p2.name': 'Professional',
      'pricing.p2.desc': 'For fast and steady growth',
      'pricing.p2.price': '6.9M',
      'pricing.p2.f1': '15 active campaigns',
      'pricing.p2.f2': 'Ads on 25 pages',
      'pricing.p2.f3': 'Live analytics dashboard',
      'pricing.p2.f4': 'Advanced targeting',
      'pricing.p2.f5': 'Dedicated support',
      'pricing.p3.name': 'Enterprise',
      'pricing.p3.desc': 'Custom solution for brands',
      'pricing.p3.price': 'Contact us',
      'pricing.p3.f1': 'Unlimited campaigns',
      'pricing.p3.f2': 'API access',
      'pricing.p3.f3': 'Dedicated account manager',
      'pricing.p3.f4': 'Custom reports',
      'pricing.p3.f5': 'Guaranteed SLA',

      'faq.eyebrow': 'FAQ',
      'faq.title': 'Your questions, answered',
      'faq.q1': 'What exactly does Adwerto do?',
      'faq.a1': 'Adwerto is an online ad marketplace connecting advertisers with page and website owners.',
      'faq.q2': 'What is the minimum budget to start?',
      'faq.a2': 'You can start from 500K Toman. The Starter plan is perfect for testing.',
      'faq.q3': 'How do I know the traffic is real?',
      'faq.a3': 'All pages and websites are vetted and their traffic validated by Adwerto\u2019s technical team.',
      'faq.q4': 'How are payments handled?',
      'faq.a4': 'Payments go through a secure gateway and are held in Adwerto\u2019s escrow until the campaign completes successfully.',
      'faq.q5': 'When will the full site launch?',
      'faq.a5': 'The official Adwerto version launches in less than 2 months.',

      'cta.title': 'Ready to grow your business?',
      'cta.text': 'Drop your email to be the first to know when we launch and grab the pre-sale discount.',
      'cta.placeholder': 'Your email',
      'cta.button': 'Notify me',
      'cta.success': '\u2713 Done! You\u2019ll hear from us soon.',
      'cta.error': 'Please enter a valid email.',

      'footer.desc': 'Smart digital advertising platform — connecting advertisers to the best ad spaces in Iran.',
      'footer.links': 'Quick links',
      'footer.legal': 'Legal',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Use',
      'footer.report': 'Report an issue',
      'footer.social': 'Social media',
      'footer.rights': 'All rights reserved.',
      'footer.made': 'Designed & developed by',

      'privacy.title': 'Privacy Policy',
      'privacy.p1': 'Adwerto is committed to protecting user data.',
      'privacy.h1': 'Data we collect',
      'privacy.p2': 'Name, email, phone number and your campaign details.',
      'privacy.h2': 'How we use it',
      'privacy.p3': 'Your data is only used to run campaigns and provide support.',
      'privacy.h3': 'Security',
      'privacy.p4': 'All data is transmitted via SSL/TLS and stored on secure servers.',
      'privacy.h4': 'Your rights',
      'privacy.p5': 'You have the right to delete, correct, or export your data.',
      'privacy.h5': 'Cookies',
      'privacy.p6': 'We use cookies to store language and theme preferences.',

      'terms.title': 'Terms of Use',
      'terms.p1': 'By using Adwerto you agree to the following terms.',
      'terms.h1': 'Permitted use',
      'terms.p2': 'The service may only be used for lawful advertising purposes.',
      'terms.h2': 'Content responsibility',
      'terms.p3': 'The advertiser is responsible for the accuracy of ad content.',
      'terms.h3': 'Payment & refunds',
      'terms.p4': 'If a campaign is not fully delivered, the remaining amount is refunded.',
      'terms.h4': 'Changes',
      'terms.p5': 'Adwerto may update these terms at any time.'
    }
  };

  const applyLang = (lang) => {
    const dict = I18N[lang] || I18N.fa;

    // html attributes
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');

    // toggle button label
    if (langLabel) langLabel.textContent = lang === 'fa' ? 'EN' : 'فا';

    // translate [data-i18n] text nodes
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    // update page title + description dynamically
    if (lang === 'fa') {
      document.title = 'Adwerto | پلتفرم تبلیغات دیجیتال و بازاریابی آنلاین';
      document.querySelector('meta[name="description"]')
        ?.setAttribute('content', 'پلتفرم هوشمند خرید و فروش فضای تبلیغاتی در شبکه‌های اجتماعی و وب‌سایت‌ها.');
    } else {
      document.title = 'Adwerto | Digital Advertising Platform';
      document.querySelector('meta[name="description"]')
        ?.setAttribute('content', 'Smart marketplace for buying and selling ad space on social media and websites.');
    }
  };

  // init language
  const savedLang = localStorage.getItem(LANG_KEY) || 'fa';
  applyLang(savedLang);

  langToggle?.addEventListener('click', () => {
    const next = html.getAttribute('lang') === 'fa' ? 'en' : 'fa';
    applyLang(next);
    localStorage.setItem(LANG_KEY, next);
  });

  /* =========================================================
     3) COUNTDOWN
     ========================================================= */
  const cd = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds')
  };

  // Set target: 2 months from first visit (persisted)
  const LAUNCH_KEY = 'adwerto_launch_at';
  let launchAt = parseInt(localStorage.getItem(LAUNCH_KEY) || '0', 10);
  if (!launchAt || launchAt < Date.now()) {
    launchAt = Date.now() + (60 * 24 * 60 * 60 * 1000); // 60 days
    localStorage.setItem(LAUNCH_KEY, launchAt.toString());
  }

  const toPersianDigit = (n) => {
    const fa = '۰۱۲۳۴۵۶۷۸۹';
    return String(n).padStart(2, '0').replace(/\d/g, (d) => fa[d]);
  };
  const pad = (n) => String(n).padStart(2, '0');

  const renderCountdown = () => {
    const now = Date.now();
    const diff = Math.max(0, launchAt - now);

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const isFa = html.getAttribute('lang') === 'fa';
    const fmt = (v) => (isFa ? toPersianDigit(v) : pad(v));

    if (cd.days) cd.days.textContent = fmt(d);
    if (cd.hours) cd.hours.textContent = fmt(h);
    if (cd.minutes) cd.minutes.textContent = fmt(m);
    if (cd.seconds) cd.seconds.textContent = fmt(s);
  };

  renderCountdown();
  setInterval(renderCountdown, 1000);

  // re-render countdown digits on language change
  langToggle?.addEventListener('click', renderCountdown);

  /* =========================================================
     4) REVEAL ON SCROLL
     ========================================================= */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* =========================================================
     5) COUNTER ANIMATION (stats)
     ========================================================= */
  const counters = document.querySelectorAll('[data-count]');
  const formatNum = (n, isFa) => {
    const s = String(Math.floor(n));
    if (!isFa) return s;
    const fa = '۰۱۲۳۴۵۶۷۸۹';
    return s.replace(/\d/g, (d) => fa[d]);
  };

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const isFa = html.getAttribute('lang') === 'fa';
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = formatNum(val, isFa) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = formatNum(target, isFa) + suffix;
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => co.observe(c));
  }

  /* =========================================================
     6) HEADER SCROLL STATE
     ========================================================= */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 12) header?.classList.add('is-scrolled');
    else header?.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* =========================================================
     7) MOBILE MENU
     ========================================================= */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(!!open));
  });
  nav?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger?.classList.remove('is-open');
      burger?.setAttribute('aria-expanded', 'false');
    });
  });

  /* =========================================================
     8) SUBSCRIBE FORM
     ========================================================= */
  const form = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('emailInput');
  const msg = document.getElementById('subscribeMsg');
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = html.getAttribute('lang') || 'fa';
    const value = (emailInput?.value || '').trim();

    if (!EMAIL_RE.test(value)) {
      msg.textContent = I18N[lang]['cta.error'];
      msg.classList.remove('is-success');
      msg.classList.add('is-error');
      return;
    }

    // simulate request
    msg.textContent = I18N[lang]['cta.success'];
    msg.classList.remove('is-error');
    msg.classList.add('is-success');
    form.reset();

    // store locally (replace with real API later)
    try {
      const list = JSON.parse(localStorage.getItem('adwerto_waitlist') || '[]');
      list.push({ email: value, at: Date.now() });
      localStorage.setItem('adwerto_waitlist', JSON.stringify(list));
    } catch (_) {}
  });

  /* =========================================================
     9) MODALS (Privacy / Terms)
     ========================================================= */
  const openModal = (id) => {
    const m = document.getElementById(id);
    if (!m) return;
    m.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const closeModal = (m) => {
    m.hidden = true;
    document.body.style.overflow = '';
  };

  document.getElementById('privacyLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('privacyModal');
  });
  document.getElementById('termsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('termsModal');
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.querySelectorAll('[data-close]').forEach((btn) => {
      btn.addEventListener('click', () => closeModal(modal));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
    }
  });

  /* =========================================================
     10) FOOTER YEAR
     ========================================================= */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();