# المحقق الاجتماعي - Social Detective

لعبة تفاعلية لتطوير مهارات التحقيق الاجتماعي وحل المشكلات المدرسية.

## 🚀 النشر المباشر

التطبيق منشور ومتاح على: [https://rtl-hm86.bolt.host](https://rtl-hm86.bolt.host)

## المميزات

- 6 قضايا اجتماعية مختلفة للتحقيق فيها
- 11 شخصية متنوعة من المعلمين والتلاميذ والإدارة
- نظام تقييم شامل يقيس 5 مهارات مختلفة
- واجهة باللغة العربية مع دعم RTL
- تصميم متجاوب يعمل على جميع الأجهزة

## التقنيات المستخدمة

- React 18 مع TypeScript
- Vite للبناء والتطوير
- Tailwind CSS للتصميم
- React Router للتنقل
- Lucide React للأيقونات

## التشغيل المحلي

```bash
# تثبيت المتطلبات
npm install

# تشغيل الخادم المحلي
npm run dev

# بناء المشروع للإنتاج
npm run build
```

## 📦 النشر على Netlify

### الطريقة الأولى: النشر المباشر من GitHub

1. ادفع الكود إلى مستودع GitHub
2. اربط المستودع بـ Netlify
3. استخدم الإعدادات التالية:
   - **Build command**: `npm ci && npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `20`

### الطريقة الثانية: النشر اليدوي

```bash
# بناء المشروع
npm run build

# رفع مجلد dist إلى Netlify
# أو استخدم Netlify CLI:
# npx netlify deploy --prod --dir=dist
```

## ⚙️ إعدادات Netlify

المشروع يحتوي على:
- `netlify.toml` - إعدادات البناء والنشر
- `public/_redirects` - إعادة توجيه للـ SPA
- `public/_headers` - إعدادات الأمان والتخزين المؤقت
- `.nvmrc` - تحديد إصدار Node.js

## 🛠️ استكشاف الأخطاء

### مشاكل شائعة وحلولها:

1. **الصور لا تظهر**:
   - تأكد من وجود الصور في مجلد `public/assets/`
   - تحقق من أسماء الملفات (تجنب المسافات والأحرف الخاصة)

2. **مشاكل في البناء**:
   ```bash
   # امسح node_modules وأعد التثبيت
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

3. **مشاكل في التوجيه**:
   - تأكد من وجود ملف `public/_redirects`
   - تحقق من إعدادات `netlify.toml`

## 📁 هيكل المشروع

```
├── public/
│   ├── assets/           # الصور والملفات الثابتة
│   ├── _redirects        # إعدادات التوجيه
│   └── _headers          # إعدادات الأمان
├── src/
│   ├── components/       # المكونات المشتركة
│   ├── data/            # البيانات والثوابت
│   ├── routes/          # صفحات التطبيق
│   ├── state/           # إدارة الحالة
│   └── types.ts         # تعريفات TypeScript
├── netlify.toml         # إعدادات Netlify
└── package.json         # تبعيات المشروع
```

## المطور

من تطوير المختص الاجتماعي ذ. اوعليت محمد

## الترخيص

© 2026 جميع الحقوق محفوظة