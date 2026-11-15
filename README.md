# Web Design & Engineering Blueprint

> یک سامانهٔ مرجعِ قابل‌استفادهٔ مجدد برای طراحی و مهندسی وب‌سایت‌ها و Web Applicationها، ویژهٔ توسعه با کمک AI Coding Agentها (Claude Code، Codex و دیگران).

| | |
| --- | --- |
| نسخه | `1.0.0` (جزئیات در [CHANGELOG.md](CHANGELOG.md)) |
| Technology profile اصلی | Angular 22 · TypeScript · SCSS (Dart Sass) · Bootstrap 5.3 |
| استاندارد دسترس‌پذیری | WCAG 2.2 AA |
| نقطهٔ ورود Agentها | [AGENTS.md](AGENTS.md) |
| مجوز | [MIT](LICENSE) |

---

## فهرست

1. [معرفی](#۱-معرفی)
2. [قابلیت‌های اصلی](#۲-قابلیتهای-اصلی)
3. [معماری](#۳-معماری)
4. [ساختار Repository](#۴-ساختار-repository)
5. [استفاده از این Repository برای یک پروژهٔ جدید](#۵-استفاده-از-این-repository-برای-یک-پروژهٔ-جدید)
6. [استفاده با AI Agentها](#۶-استفاده-با-ai-agentها)
7. [قابلیت استفادهٔ مجدد و توسعه‌پذیری](#۷-قابلیت-استفادهٔ-مجدد-و-توسعهپذیری)
8. [نسخه‌بندی و نگهداری](#۸-نسخهبندی-و-نگهداری)
9. [اعتبارسنجی](#۹-اعتبارسنجی)
10. [محدودیت‌ها و تصمیم‌های باز](#۱۰-محدودیتها-و-تصمیمهای-باز)

---

## ۱. معرفی

### این Repository چیست؟

این Repository یک **Blueprint مهندسی و طراحی وب** است: مجموعه‌ای از اصول مهندسی، یک Design System عمومی، راهنمای پیاده‌سازی برای فناوری‌های مشخص، دستورالعمل‌های AI Agentها و قالب‌های پیکربندی پروژه. این Repository **یک وب‌سایت یا محصول خاص نیست** و هیچ فرض تجاری، دامنه‌ای یا هویت برند ثابتی در آن وجود ندارد.

### چرا وجود دارد و چه مشکلی را حل می‌کند؟

در شروع هر پروژهٔ وب، تصمیم‌های پایه‌ای یکسانی دوباره گرفته می‌شوند: رنگ‌ها چطور سازمان‌دهی شوند، فاصله‌گذاری بر چه مبنایی باشد، Bootstrap چطور سفارشی شود، فایل‌های SCSS کجا قرار بگیرند، ساختار پوشه‌های Angular چه باشد، و AI Agent چطور این ترجیحات را بفهمد. بدون یک مرجع مشترک:

- هر پروژه سبک و ساختار متفاوتی پیدا می‌کند؛
- مقادیر رنگ و فاصله به‌صورت پراکنده و تکراری در کد نوشته می‌شوند؛
- AI Agentها در هر پروژه از صفر و بر اساس پیش‌فرض‌های خودشان تصمیم می‌گیرند؛
- دسترس‌پذیری، RTL و Dark Mode به مراحل پایانی موکول می‌شوند.

این Blueprint این تصمیم‌ها را **یک بار، به‌صورت مستند و قابل‌اعتبارسنجی** می‌گیرد و به هر پروژه اجازه می‌دهد فقط هویت و نیازهای خودش (رنگ برند، فونت، تم، ویژگی‌ها) را مشخص کند.

### چه کسانی باید از آن استفاده کنند؟

- توسعه‌دهندگان Frontend که پروژهٔ جدیدی را شروع می‌کنند؛
- تیم‌هایی که می‌خواهند چند پروژه با پایهٔ مهندسی و بصری یکسان داشته باشند؛
- طراحان و صاحبان برند که می‌خواهند هویت بصری را از طریق چند پارامتر مشخص تعریف کنند؛
- هر کسی که با Claude Code، Codex یا Agentهای مشابه پروژه توسعه می‌دهد.

### چگونه به AI Agentها کمک می‌کند؟

به‌جای توضیح دوبارهٔ ترجیحات در هر گفتگو، Agent فایل کوتاه [AGENTS.md](AGENTS.md) را می‌خواند، سپس فایل `project.config.yaml` پروژه را، و فقط اسنادی را که برای کار جاری لازم است. Workflowهای گام‌به‌گام (شروع پروژه، توسعهٔ Feature، Code Review، اعتبارسنجی) و **Golden Example**های واقعی و تست‌شده، سبک پیاده‌سازی را برای Agent عینی می‌کنند. نقاط تأیید انسانی (Approval Gates) مشخص‌اند تا تصمیم‌های مهم معماری بدون تأیید گرفته نشوند.

### تفاوت با یک UI Component Library معمولی

| UI Component Library | این Blueprint |
| --- | --- |
| مجموعه‌ای از کامپوننت‌های آماده برای import | مجموعه‌ای از **استانداردها، توکن‌ها، الگوها و Workflowها** |
| ظاهر و برند خودش را دارد | برند را از پروژه می‌گیرد (Brand-neutral) |
| به یک Framework وابسته است | اصول و Design System مستقل از Framework؛ پیاده‌سازی در Technology Profileها |
| فقط لایهٔ UI | از اصول کدنویسی و امنیت تا معماری، تست و نحوهٔ کار Agentها |
| کامپوننت‌ها را بازسازی می‌کند | از HTML بومی و Bootstrap استفاده می‌کند و فقط خلأها را پر می‌کند |

---

## ۲. قابلیت‌های اصلی

| قابلیت | توضیح | مرجع |
| --- | --- | --- |
| **Design System عمومی** | Foundation مستقل از برند برای هویت بصری هر وب‌سایت | [docs/design-system](docs/design-system/README.md) |
| **Design Tokens** | سه سطح Primitive → Semantic → Component؛ یک منبع واحد (Sass maps) که CSS Custom Properties و متغیرهای Bootstrap از آن تولید می‌شوند | [design-tokens.md](docs/design-system/design-tokens.md) |
| **معماری رنگ** | تولید Palette از یک رنگ پایه در فضای OKLCH با روشنایی ثابت برای هر Step؛ رنگ‌های Semantic؛ بررسی خودکار Contrast طبق WCAG در زمان Compile | [color-system.md](docs/design-system/color-system.md) |
| **تم‌ها** | Light، Dark و تم‌های سفارشی پروژه؛ تعویض در Runtime با یک Attribute | [themes.md](docs/design-system/themes.md) |
| **Typography** | مقیاس ثابت rem، Roleهای متنی، Headingهای Fluid، فونت جداگانه برای هر زبان (مثلاً فارسی و انگلیسی) | [typography.md](docs/design-system/typography.md) |
| **Spacing و Sizing** | مقیاس 4px، Aliasهای معنایی، ارتفاع کنترل‌ها بر اساس Density | [spacing-and-sizing.md](docs/design-system/spacing-and-sizing.md) |
| **Layout واکنش‌گرا** | Breakpointهای Mobile-first، App Shell، Auto-grid، Container Query | [layout-and-responsive.md](docs/design-system/layout-and-responsive.md) |
| **استانداردهای SCSS** | سیستم ماژول Sass (`@use`/`@forward`)، ترتیب Import مستند، قوانینی که خودکار اعمال می‌شوند | [technologies/scss](docs/technologies/scss/README.md) |
| **یکپارچه‌سازی Bootstrap** | پیکربندی Bootstrap 5.3 از روی توکن‌ها با `@use … with`؛ Bridge برای تم‌های Runtime | [technologies/bootstrap](docs/technologies/bootstrap/README.md) |
| **معماری Frontend** | Angular 22 با Standalone Components، Signals، Zoneless، ساختار Feature-based | [technologies/angular](docs/technologies/angular/README.md) |
| **اصول مهندسی** | خوانایی، ماژولار بودن، مدیریت خطا، پیکربندی، امنیت، تست، Performance، مستندسازی | [docs/principles](docs/principles/README.md) |
| **دستورالعمل AI Agent** | `AGENTS.md` مستقل از ابزار + Adapterهای نازک | [AGENTS.md](AGENTS.md) |
| **Workflow شروع پروژه** | نُه مرحلهٔ مستقل از دامنهٔ کسب‌وکار، با Checklist | [project-initialization.md](docs/workflows/project-initialization.md) |
| **پیکربندی پروژه** | `project.config.yaml` با JSON Schema و Validator | [docs/configuration](docs/configuration/README.md) |

---

## ۳. معماری

Blueprint در **پنج لایهٔ مفهومی** سازمان‌دهی شده است. هر لایه فقط به لایه‌های بالاتر از خودش تکیه می‌کند؛ بنابراین اصول عمومی هرگز به یک فناوری یا پروژهٔ خاص آلوده نمی‌شوند.

```text
┌───────────────────────────────────────────────────────────────────────────┐
│ 1. Engineering Principles        docs/principles, docs/api                │ مستقل از فناوری
├───────────────────────────────────────────────────────────────────────────┤
│ 2. Generic Design System         docs/design-system  +  src/styles        │ مستقل از برند
├───────────────────────────────────────────────────────────────────────────┤
│ 3. Technology Blueprints         docs/technologies/{angular,scss,bootstrap}│ پیاده‌سازی لایه‌های ۱ و ۲
│                                  + src/app (Golden Examples)              │
├───────────────────────────────────────────────────────────────────────────┤
│ 4. AI Agent Instructions         AGENTS.md, CLAUDE.md, docs/workflows     │ نحوهٔ به‌کارگیری
│    & Workflows                                                            │
├───────────────────────────────────────────────────────────────────────────┤
│ 5. Project-Specific              templates/, schemas/ → project.config.yaml│ تصمیم‌های یک پروژه
│    Configuration                 src/styles/config/_project.scss (در پروژه)│
└───────────────────────────────────────────────────────────────────────────┘
```

| لایه | مسئولیت | نباید شامل شود |
| --- | --- | --- |
| **۱. Engineering Principles** | قوانین کیفیت کد، نام‌گذاری، ماژولار بودن، Separation of Concerns، مدیریت خطا، پیکربندی، امنیت، تست، Performance، دسترس‌پذیری، مستندسازی و وابستگی‌ها | API هیچ Frameworkی |
| **۲. Generic Design System** | معماری توکن، رنگ، تم، Typography، Spacing، Layout، Breakpoint، Radius، Shadow، Z-index، Motion، Iconography، مشخصات کامپوننت‌ها، Interaction Stateها، RTL/LTR، دسترس‌پذیری — و پیاده‌سازی SCSS آن‌ها | کد Framework، برند یک پروژهٔ خاص |
| **۳. Technology Blueprints** | نگاشت لایه‌های ۱ و ۲ به Angular، SCSS و Bootstrap؛ دستورات راه‌اندازی؛ قراردادها؛ Golden Examples | تغییر اصول؛ کد محصول‌محور |
| **۴. AI Agent Instructions & Workflows** | روال‌های گام‌به‌گام، Approval Gateها، مراحل اعتبارسنجی | توضیحات مرجع مفصل (به لایه‌های ۱ تا ۳ لینک می‌دهد) |
| **۵. Project-Specific Configuration** | قالب‌ها و Schema برای ثبت تصمیم‌های یک پروژه | توضیحات (در docs قرار دارند) |

جریان استفاده در یک پروژه:

```text
Project Brief ──▶ project.config.yaml (لایه ۵، اعتبارسنجی با Schema)
                        │ انتخاب Technology Profile
                        ▼
        Angular / SCSS / Bootstrap profiles (لایه ۳) ──▶ اصول (۱) + Design System (۲)
                        │
            Agent طبق Workflowها (لایه ۴) ──▶ کد برنامه + کپی src/styles
                        │
             Deviationها ──▶ دوباره در project.config.yaml ثبت می‌شوند
```

جزئیات بیشتر: [docs/architecture](docs/architecture/README.md) و [ADR-0001](docs/decisions/0001-five-layer-architecture.md).

---

## ۴. ساختار Repository

```text
web-design-blueprint-system/
├── README.md                 همین سند
├── AGENTS.md                 دستورالعمل مستقل از ابزار برای AI Agentها (نقطهٔ ورود)
├── CLAUDE.md                 Adapter نازک برای Claude Code (فقط AGENTS.md را import می‌کند)
├── CHANGELOG.md              تاریخچهٔ نسخه‌ها
├── LICENSE
├── package.json              ابزار اعتبارسنجی همین Repository (فقط devDependencies)
├── .editorconfig             تنظیمات مشترک ویرایشگر
│
├── docs/                     مستندات مرجع، بر اساس لایه‌ها
│   ├── architecture/         معماری پنج‌لایه و نحوهٔ ارتباط لایه‌ها
│   ├── principles/           لایه ۱: استانداردهای کدنویسی، نام‌گذاری، کیفیت، امنیت
│   ├── api/                  لایه ۱: اصول یکپارچه‌سازی با API
│   ├── design-system/        لایه ۲: توکن‌ها، رنگ، تم، Typography، Layout، کامپوننت‌ها، RTL، دسترس‌پذیری
│   ├── technologies/         لایه ۳: Technology Profileها
│   │   ├── angular/          معماری، قراردادها، تست Angular
│   │   ├── scss/             معماری و قوانین SCSS
│   │   └── bootstrap/        سیاست نسخه و یکپارچه‌سازی Bootstrap
│   ├── workflows/            لایه ۴: شروع پروژه، Design System، Feature، Review، Refactoring، Validation، مستندسازی
│   ├── configuration/        لایه ۵: راهنمای project.config.yaml و Deviationها
│   ├── decisions/            Architecture Decision Records (ADR 0001 تا 0006)
│   ├── development/          نگهداری و توسعهٔ همین Repository، سیاست نسخه‌بندی
│   └── deployment/           استانداردهای عمومی Build و Deployment
│
├── templates/                قالب‌هایی که در پروژهٔ جدید کپی می‌شوند
│   ├── project.config.yaml   ثبت ماشین‌خوان تصمیم‌های پروژه
│   ├── project-brief.md      توصیف پروژه برای Agent
│   ├── initialization-checklist.md
│   ├── agent-kickoff-prompt.md
│   ├── deviations.md
│   └── adr.md
├── schemas/                  JSON Schema برای project.config.yaml
├── scripts/                  Validatorها: build-styles، validate-config، check-docs
│
├── src/                      پیاده‌سازی مرجع (Workspace قابل‌اجرا نیست)
│   ├── styles/               ★ Design System در SCSS — در هر پروژه کپی می‌شود
│   │   ├── main.scss             Entry با Bootstrap
│   │   ├── main-standalone.scss  Entry بدون CSS Framework
│   │   ├── config/               تنظیمات پروژه (_project.scss)
│   │   ├── abstracts/            API عمومی Sass: توکن، تابع، Mixin (بدون خروجی CSS)
│   │   ├── tokens/               تعریف مرجع توکن‌ها
│   │   ├── themes/               مقادیر Semantic هر تم + اعتبارسنجی
│   │   ├── base/                 Custom Properties، رفتار سراسری، Roleهای متنی
│   │   ├── layout/               App Shell و Layout Primitives
│   │   ├── components/           الگوهایی که Bootstrap ندارد (Empty State)
│   │   ├── utilities/            Helperها برای حالت بدون Bootstrap
│   │   ├── vendors/bootstrap/    پیکربندی Bootstrap از توکن‌ها + Theme Bridge
│   │   └── project/              CSS متعلق به پروژه (مثلاً @font-face)
│   ├── app/                  ساختار مرجع Angular + Golden Examples
│   │   ├── core/                 Singletonهای سطح برنامه (config، errors، interceptors، services …)
│   │   ├── shared/               کامپوننت‌ها، مدل‌ها و Utilityهای عمومی
│   │   ├── layout/               Shell، Header، Navigation، Sidebar، Footer، Not-found
│   │   └── features/             یک پوشه برای هر Feature (نمونه: placeholder-feature)
│   ├── assets/               قرارداد فایل‌های ایستا
│   ├── environments/         قرارداد Flagهای زمان Build
│   └── testing/              قرارداد ابزارهای مشترک تست
│
└── engineering-audit/        ممیزی پروژهٔ Angular قبلی — مرجع تاریخی، بدون تغییر، استاندارد نیست
```

هر پوشه یک `README.md` دارد که مسئولیت آن را توضیح می‌دهد (به‌صورت خودکار بررسی می‌شود).

> **دربارهٔ `engineering-audit/`:** این اسناد یک برنامهٔ مشخص را توصیف می‌کنند. اصول قابل‌تعمیم از آن استخراج و دسته‌بندی شده‌اند (اصل عمومی، الگوی طراحی، قرارداد Angular، تصمیم خاص پروژه، جزئیات Legacy، مواردی که باید بهبود یابند) — جزئیات در [ADR-0006](docs/decisions/0006-audit-as-reference-not-standard.md). خود اسناد دست‌نخورده باقی مانده‌اند.

---

## ۵. استفاده از این Repository برای یک پروژهٔ جدید

### اصل کلی: چه چیزی کپی می‌شود و چه چیزی نه

| مورد | روش | دلیل |
| --- | --- | --- |
| `docs/`، `AGENTS.md`، Workflowها، Schema | **ارجاع** به نسخهٔ Pin‌شدهٔ Blueprint | یک منبع واحد؛ بدون تکثیر مستندات |
| `src/styles/` | **کپی** در پروژه | کد واقعی Build پروژه است |
| `templates/project.config.yaml`، `project-brief.md`، Checklist | **کپی** در پروژه | تصمیم‌های خود پروژه |
| `src/app/` (Golden Examples) | **الگوبرداری**، نه کپی | الگو هستند، نه کتابخانه |
| `engineering-audit/`، `scripts/`، `package.json` | **کپی نمی‌شوند** | مخصوص همین Repository |

### گام ۱ — دریافت یا ارجاع به Repository

دو روش رایج (روش اول ساده‌تر است):

```bash
# روش A: Checkout کنار پروژه (یک بار برای همهٔ پروژه‌ها)
git clone <repository-url> ~/blueprints/web-design-blueprint-system
```

```bash
# روش B: به‌عنوان Submodule داخل پروژه (نسخه همراه پروژه ثبت می‌شود)
git submodule add <repository-url> .blueprint
```

### گام ۲ — بررسی استانداردها

پیش از شروع، این‌ها را مرور کنید: همین README، [AGENTS.md](AGENTS.md)، [اصول](docs/principles/README.md)، [Design System](docs/design-system/README.md)، [Angular Profile](docs/technologies/angular/README.md) و [Workflow شروع پروژه](docs/workflows/project-initialization.md). در Repository خود Blueprint می‌توانید سلامت همه‌چیز را بررسی کنید:

```bash
cd ~/blueprints/web-design-blueprint-system
npm install
npm run validate
```

### گام ۳ — Pin کردن نسخهٔ Blueprint

نسخه‌ها با Git Tag به شکل `vMAJOR.MINOR.PATCH` منتشر می‌شوند.

```bash
git -C ~/blueprints/web-design-blueprint-system checkout v1.0.0
```

```bash
# اگر از Submodule استفاده می‌کنید
git -C .blueprint checkout v1.0.0 && git add .blueprint
```

همین نسخه را در `project.config.yaml` → `blueprint.version` ثبت کنید.

### گام ۴ — توصیف وب‌سایت جدید برای Agent

[templates/project-brief.md](templates/project-brief.md) را کپی و پر کنید: هدف، نوع وب‌سایت، کاربران هدف، زبان‌ها و جهت متن، Featureها با اولویت، Integrationها، ترجیحات فناوری و طراحی، محدودیت‌ها. جاهایی را که نمی‌دانید «Unknown» بنویسید تا Agent سؤال کند، نه حدس بزند.

### گام ۵ — ساخت پیکربندی پروژه

```bash
mkdir my-project && cd my-project
cp ~/blueprints/web-design-blueprint-system/templates/project.config.yaml .
mkdir -p docs && cp ~/blueprints/web-design-blueprint-system/templates/project-brief.md docs/
```

فایل را پر کنید (یا اجازه دهید Agent از روی Brief پر کند) و اعتبارسنجی کنید:

```bash
npm --prefix ~/blueprints/web-design-blueprint-system run validate:config -- "$PWD/project.config.yaml"
```

Validator علاوه بر Schema، قواعد بین‌فیلدی را هم بررسی می‌کند (مثلاً تم پیش‌فرض باید فعال باشد و زبان پیش‌فرض باید در فهرست زبان‌ها باشد).

### گام ۶ — ساخت برنامهٔ Frontend

فقط با CLI رسمی (دستور با Angular CLI 22.2 بررسی شده است):

```bash
npx @angular/cli@22 new my-project --style=scss --routing --ssr=false --prefix=app --ai-config=none
```

پیش‌فرض‌های CLI (Standalone، Zoneless، OnPush، Vitest، Strict) را حفظ کنید. `--ai-config=none` به این دلیل است که دستورالعمل Agent از همین Blueprint می‌آید. سپس ابزار کیفیت:

```bash
cd my-project
npx ng add angular-eslint
npm install --save-dev prettier
```

### گام ۷ — اعمال Design Tokens

```bash
cp -R ~/blueprints/web-design-blueprint-system/src/styles ./src/styles
rm src/styles.scss
```

در `angular.json` → `projects.<name>.architect.build.options`:

```json
"styles": ["src/styles/main.scss"],
"stylePreprocessorOptions": { "includePaths": ["src/styles"] }
```

از این پس در هر Stylesheet کامپوننت:

```scss
@use "abstracts" as ds;

.panel {
  padding: ds.space(4);
  color: ds.color-token("text-secondary");
  @include ds.media-up("md") { padding: ds.space(6); }
}
```

پروژه فقط `src/styles/config/_project.scss` (تنظیمات) و `src/styles/project/` (CSS اختصاصی پروژه) را ویرایش می‌کند.

### گام ۸ — تنظیم رنگ‌های Primary و Secondary

در `src/styles/config/_project.scss`:

```scss
$brand-primary: #0f766e;     // دقیقاً همین رنگ روی دکمه‌های اصلی در تم Light استفاده می‌شود
$brand-secondary: #475569;
$neutral-seed: #64748b;      // خانوادهٔ خاکستری (گرم یا سرد)
```

از همین دو مقدار، Paletteهای ۵۰ تا ۹۵۰، حالت‌های Hover/Active، رنگ متن روی رنگ برند (سفید یا تیره بر اساس Contrast)، مقادیر تم Dark و متغیرهای Bootstrap ساخته می‌شوند. اگر رنگ انتخابی در جایی Contrast کافی نداشته باشد، Build هشدار می‌دهد (یا با `$contrast-check: "error"` متوقف می‌شود). برای اصلاح، از `$semantic-overrides` استفاده کنید. همین مقادیر را در `project.config.yaml` → `design.colors` هم ثبت کنید.

### گام ۹ — تنظیم Typography و Spacing

```scss
$font-family-base: (Inter, system-ui, sans-serif);
$font-families-by-lang: ("fa": ("Vazirmatn", Tahoma, system-ui, sans-serif));
$radius-scale-factor: 1;     // 0 تیز · 0.5 ملایم · 1 پیش‌فرض · 1.5 گرد
$density: "comfortable";     // compact · comfortable · spacious
```

- فونت‌های وب را Self-host کنید و `@font-face` را در `src/styles/project/_fonts.scss` بنویسید.
- برای محتوای فارسی: `<html lang="fa" dir="rtl">`؛ letter-spacing و uppercase به‌طور خودکار برای خط فارسی/عربی خنثی می‌شوند.
- مقیاس Spacing ثابت و بر پایهٔ 4px است (`space(4)` = 16px). Density فقط ارتفاع کنترل‌ها و Padding کامپوننت‌ها را تغییر می‌دهد.

### گام ۱۰ — یکپارچه‌سازی Bootstrap

```bash
npm install bootstrap@~5.3.9
```

`main.scss` خودش Bootstrap را از روی توکن‌ها پیکربندی می‌کند؛ کار دیگری لازم نیست. نکات:

- کلاس‌های Spacing بر حسب واحد 4px هستند: `.p-4` = 16px (برخلاف Bootstrap پیش‌فرض).
- تم با `data-bs-theme` روی `<html>` عوض می‌شود و هم Bootstrap و هم توکن‌های `--ds-*` را تغییر می‌دهد.
- اگر `direction` برابر `rtl` یا `both` است، `postcss-rtlcss` را نصب و `postcss.config.json` را با گزینهٔ `safeBothPrefix: true` اضافه کنید ([جزئیات](docs/design-system/rtl-ltr.md#3-bootstrap-and-rtl)).
- برای پروژهٔ بدون Bootstrap، `main-standalone.scss` را به‌جای `main.scss` استفاده کنید.

### گام ۱۱ — سازمان‌دهی ساختار پوشه‌ها

```text
src/app/
├── core/       Singletonهای سطح برنامه: config، errors، interceptors، guards، services
├── shared/     اجزای عمومی و مستقل از Feature
├── layout/     قاب برنامه: shell، header، navigation، sidebar، footer، not-found
└── features/   یک پوشه برای هر Feature که به‌صورت Lazy بارگذاری می‌شود
```

هیچ Featureی از Feature دیگر import نمی‌کند. توضیح کامل: [Angular Architecture](docs/technologies/angular/architecture.md). الگوی عملی: [src/app](src/app/README.md).

### گام ۱۲ — پیاده‌سازی اولین Feature

طبق [Feature Development Workflow](docs/workflows/feature-development.md):

1. Model و DTO + تابع نگاشت (با تست)؛
2. API Client (`…-api.ts`) با نرمال‌سازی در مرز سیستم؛
3. Store (`…-store.ts`) با Signals و `LoadState`؛
4. کامپوننت‌های Presentational با همهٔ Stateها؛
5. کامپوننت Container (صفحه)؛
6. Route تنبل (`<feature>.routes.ts`) و Providerهای مخصوص Feature.

```bash
npx ng generate component features/items/components/item-list-page
npx ng generate service features/items/services/item-api
```

نمونهٔ کامل این زنجیره در `src/app/features/placeholder-feature/` موجود است.

### گام ۱۳ — اعتبارسنجی برنامه

```bash
npx ng build
npx ng test --watch=false
npx ng lint
npx prettier --check .
```

سپس بررسی دستی: عرض‌های 320/768/1280 پیکسل، پیمایش کامل با صفحه‌کلید، تم Light و Dark، RTL (در صورت نیاز)، و حالت‌های Loading/Empty/Error. چک‌لیست کامل: [validation.md](docs/workflows/validation.md).

### گام ۱۴ — مستندسازی Deviationها

هر تفاوت آگاهانه با استانداردهای Blueprint در `project.config.yaml` ثبت می‌شود:

```yaml
customizations:
  deviations:
    - id: DEV-001
      standard: docs/technologies/angular/architecture.md#5-state-management
      decision: Use a state library for one complex feature
      rationale: Cross-feature workflows need devtools and time-travel debugging
      approved_by: Tech lead
      date: 2026-11-15
```

فایل‌های Blueprint را در پروژه برای پنهان کردن Deviation تغییر ندهید. اگر الگویی ارزش عمومی دارد، آن را برای ورود به Blueprint پیشنهاد کنید ([بخش ۷](#۷-قابلیت-استفادهٔ-مجدد-و-توسعهپذیری)).

---

## ۶. استفاده با AI Agentها

### اصل کار

[AGENTS.md](AGENTS.md) مستقل از ابزار است و کوتاه نگه داشته شده؛ جزئیات در اسناد مرجع و Workflowها قرار دارد. فایل‌های مخصوص هر ابزار فقط **Adapter نازک** هستند:

| Agent | نحوهٔ اتصال |
| --- | --- |
| **Codex** و Agentهایی که `AGENTS.md` را می‌خوانند | مستقیماً `AGENTS.md` |
| **Claude Code** | `CLAUDE.md` که با `@AGENTS.md` همان فایل را import می‌کند |
| سایر Agentها | فایل دستورالعمل همان ابزار، با یک خط ارجاع به `AGENTS.md`؛ یا اشاره در اولین پیام |

### در پروژهٔ جدید

یک `AGENTS.md` کوچک در ریشهٔ پروژه بگذارید که به Blueprint ارجاع دهد (برای Claude Code، `CLAUDE.md` با محتوای `@AGENTS.md` هم اضافه کنید):

```markdown
# AGENTS.md
This project follows the Web Design & Engineering Blueprint v1.0.0 at <path-or-url>.
Read <blueprint>/AGENTS.md first, then ./project.config.yaml.
Project-specific notes: <only what is unique to this project>.
```

### نمونهٔ اطلاعات اولیه برای Agent

قالب کامل در [templates/agent-kickoff-prompt.md](templates/agent-kickoff-prompt.md). نمونه (عمومی و بدون دامنهٔ کسب‌وکار خاص):

```text
We are starting a new web project. Follow the Web Design & Engineering
Blueprint at ~/blueprints/web-design-blueprint-system, version 1.0.0.

1. Read its AGENTS.md first and follow its reading order.
2. Read the brief below. List missing or ambiguous requirements and ask
   before proposing anything. Do not invent requirements.
3. Create project.config.yaml from the template and validate it.
4. Propose the architecture; wait for my approval before generating code.
5. Then initialize with the official CLI, apply the design foundation and
   implement one feature at a time, validating each step.
6. Never modify the blueprint. Record deviations in project.config.yaml.

Brief:
- Type: web application with an authenticated area and a public landing page
- Users: staff on desktop, occasional mobile use
- Locales: en and fa (both directions)
- Features: overview page (must), record list with filters (must), settings (should)
- Design: calm, neutral, data-dense; primary #0f766e, secondary #475569;
  subtle corners; compact density; light + dark, follow system
- Technology: blueprint defaults (Angular, Bootstrap, client-side rendering)
- Integrations: one REST API (OpenAPI document available)
- Constraints: WCAG 2.2 AA; must work under a sub-path
```

### رفتاری که از Agent انتظار می‌رود

| مرحله | رفتار Agent |
| --- | --- |
| **خواندن `AGENTS.md`** | ترتیب مطالعه را رعایت می‌کند و فقط اسناد مرتبط با کار را باز می‌کند |
| **بررسی پیکربندی** | `project.config.yaml` را می‌خواند؛ اگر نبود، Workflow شروع پروژه را اجرا می‌کند |
| **خواندن Technology Profile** | بر اساس `frontend.*` پروفایل‌های Angular/SCSS/Bootstrap را انتخاب می‌کند؛ اگر پروفایلی نبود، صریحاً اعلام می‌کند |
| **پیروی از Design System** | فقط توکن‌ها؛ ابتدا HTML بومی و Bootstrap؛ همهٔ Interaction Stateها؛ RTL و Dark |
| **پیشنهاد معماری** | ساختار پوشه، وابستگی‌ها با دلیل، پیکربندی طراحی، ترتیب Featureها |
| **درخواست تأیید** | پیش از: معماری، وابستگی Runtime جدید، Deviation، حذف فایل |
| **پیاده‌سازی تدریجی** | یک Feature یا یک موضوع در هر تغییر؛ تولید فایل با CLI |
| **اعتبارسنجی** | اجرای Build/Lint/Test و بررسی‌های دستی؛ گزارش دقیق آنچه اجرا شد — هرگز ادعای موفقیت بدون اجرا |

---

## ۷. قابلیت استفادهٔ مجدد و توسعه‌پذیری

| هدف | روش | مرجع |
| --- | --- | --- |
| **افزودن تم برند جدید** | در `$custom-themes` تمی بسازید که از `light` یا `dark` ارث می‌برد و فقط توکن‌های لازم را تغییر می‌دهد؛ Build کامل بودن و Contrast را بررسی می‌کند | [themes.md](docs/design-system/themes.md) |
| **افزودن Technology Profile جدید** (مثلاً React یا Vue) | پوشهٔ `docs/technologies/<name>/` طبق «Profile Contract»؛ Golden Examples در `examples/<name>/`؛ استفاده از همان `src/styles`؛ ADR | [technologies/README.md](docs/technologies/README.md) |
| **گسترش سیستم توکن** | سطح درست را انتخاب کنید (Primitive / Semantic / Component)؛ توکن Semantic باید در همهٔ تم‌ها مقدار داشته باشد (وگرنه Build شکست می‌خورد) | [design-tokens.md](docs/design-system/design-tokens.md#6-extending-the-token-system-blueprint-maintainers) |
| **افزودن Golden Example** | حداقلی، عمومی، در پوشه‌ای که الگویش را نشان می‌دهد؛ ثبت در README پروفایل؛ Stylesheet آن با `npm run build:styles` Compile می‌شود | [development](docs/development/README.md) |
| **افزودن استاندارد مهندسی جدید** | اگر مستقل از فناوری است در `docs/principles/`، وگرنه در Profile؛ افزودن آیتم به Checklist بازبینی؛ ADR در صورت تغییر رویه | [development](docs/development/README.md#adding-to-the-blueprint) |
| **ارتقای یک الگوی پروژه به سیستم مشترک** | ثبت به‌عنوان Deviation یا کاندید در پروژه → حذف واژگان پروژه → بیان با توکن‌ها → مستندات، مثال، CHANGELOG | [Promoting a project pattern](docs/development/README.md#promoting-a-project-pattern) |

---

## ۸. نسخه‌بندی و نگهداری

### سیاست نسخه‌بندی (Semantic Versioning)

| نوع تغییر | نسخه | نمونه |
| --- | --- | --- |
| Patch | `x.y.Z` | اصلاح متن، لینک خراب، رفع اشکال SCSS بدون تغییر عمدی مقادیر |
| Minor | `x.Y.0` | توکن جدید، فیلد اختیاری جدید در Config، Golden Example، Workflow یا Technology Profile جدید |
| Major | `X.0.0` | تغییر نام یا حذف توکن/کلاس، تغییر مقادیر مقیاس، فیلد اجباری جدید در Schema، تغییر فناوری پیش‌فرض (مثلاً Bootstrap 6)، تغییر قرارداد پوشه‌ها |

### به‌روزرسانی استانداردها

- هر تغییر با ADR (در صورت تأثیر ماندگار) و ورودی CHANGELOG همراه است.
- `npm run validate` باید پیش از انتشار بدون خطا اجرا شود.
- نسخه با `git tag vX.Y.Z` منتشر می‌شود و `version` در `package.json` با آن یکسان است.

### Pin کردن نسخه در پروژه‌ها

پروژه نسخه را در `project.config.yaml` → `blueprint.version` ثبت و Checkout/Submodule را روی همان Tag نگه می‌دارد. انتشار نسخهٔ جدید هیچ پروژهٔ موجودی را تغییر نمی‌دهد مگر خود پروژه ارتقا دهد.

### مستندسازی Breaking Changeها

در CHANGELOG زیر عنوان **Breaking** با بخش Migration: چه چیزی تغییر نام داده، کدام مقادیر عوض شده، و چگونه دوباره اعتبارسنجی شود.

### ورود بازخورد پروژه‌ها

Deviationهای پروژه‌ها مهم‌ترین منبع بهبود هستند. هنگام ارتقای نسخه، Deviationهای پروژه مرور می‌شوند؛ موارد عمومی پیشنهاد و پس از تعمیم وارد Blueprint می‌شوند.

### سازگاری با نسخه‌های قبل

- قبل از حذف، Deprecate: نگه‌داشتن نام قدیمی برای یک Minor، با علامت `@deprecated`، و حذف در Major بعدی.
- مراحل ارتقای پروژه: خواندن CHANGELOG ← کپی دوبارهٔ `src/styles/` به‌جز `config/_project.scss` و `project/` ← اعتبارسنجی Config ← Build ← مرور Deviationها.

---

## ۹. اعتبارسنجی

### ابزار این Repository

```bash
npm install
npm run validate
```

| بررسی | دستور | آنچه تضمین می‌کند |
| --- | --- | --- |
| Styles | `npm run build:styles` | Compile هر دو Entry و همهٔ Stylesheetهای کامپوننت در `src/app/`؛ صفر هشدار Sass از کد این Repository؛ ممنوعیت `@import`، `!important` و رنگ خام خارج از فایل‌های توکن؛ عدم تولید CSS توسط `abstracts/`؛ بررسی Contrast در همهٔ تم‌ها |
| Config | `npm run validate:config` | اعتبار قالب در برابر JSON Schema و قواعد بین‌فیلدی |
| Docs | `npm run check:docs` | وجود README معنادار در هر پوشه، سالم بودن لینک‌های نسبی، نبود واژگان دامنه‌ای در فایل‌های قابل‌استفادهٔ مجدد |

### نتیجهٔ بررسی Golden Exampleها

این Repository Workspace قابل‌اجرای Angular ندارد، بنابراین «Build برنامه» در خود آن معنا ندارد. برای اعتبارسنجی واقعی، Golden Exampleها در یک Workspace تازه با Angular CLI 22.2.7 (خارج از این Repository) طبق همین راهنما قرار گرفتند و نتیجه چنین بود:

- `ng build` (Production، AOT با Strict Templates): موفق، بدون خطا یا هشدار Compile؛ تنها هشدار، عبور از Budget پیش‌فرض ۵۰۰ کیلوبایت بود (Initial ۵۶۷ کیلوبایت خام / ۱۰۷ کیلوبایت انتقالی، که ۲۷۲ کیلوبایت آن CSS کامل Bootstrap است). به همین دلیل Budget قالب به ۷۰۰ کیلوبایت تنظیم و موضوع در Angular Profile مستند شد.
- `ng test` (Vitest): ۷ تست از ۷ تست موفق.
- بررسی در مرورگر: Shell واکنش‌گرا در عرض ۳۷۵ پیکسل و Desktop، Sidebar کشویی با انتقال و بازگرداندن Focus، Escape، اعتبارسنجی فرم و Focus روی اولین فیلد نامعتبر، تم Dark (هم Bootstrap و هم توکن‌ها)، و `dir="rtl"` (Sidebar از سمت راست).
- RTL برای Bootstrap: پردازش CSS خروجی با `postcss-rtlcss` فقط برای کلاس‌های Bootstrap Override تولید کرد؛ هیچ کلاس `ds-` نیازی به آن نداشت.

---

## ۱۰. محدودیت‌ها و تصمیم‌های باز

- **رنگ برند در Bootstrap در زمان Compile ثابت است.** تم‌های Runtime رنگ‌های خنثی و سطوح را تغییر می‌دهند؛ برای رنگ برند متفاوت به ازای هر Tenant، Build جداگانه لازم است ([ADR-0003](docs/decisions/0003-bootstrap-via-sass-module-configuration.md)).
- **Bootstrap 5.3 هنوز از `@import` استفاده می‌کند.** هشدارهای Deprecation آن با `quietDeps` پنهان می‌شوند (Angular این کار را خودکار انجام می‌دهد). مهاجرت به Bootstrap 6 (فعلاً Alpha) یک نسخهٔ Major خواهد بود.
- **فقط Technology Profile مربوط به Angular** پیاده‌سازی شده است؛ React و Vue نقطه‌های توسعهٔ مستندشده هستند.
- **توکن‌ها فقط در Sass تعریف شده‌اند.** خروجی برای ابزارهای طراحی (مثلاً قالب DTCG) در صورت نیاز در آینده اضافه می‌شود ([ADR-0002](docs/decisions/0002-sass-tokens-canonical-source.md)).
- **حجم CSS کامل Bootstrap** حدود ۲۷۰ کیلوبایت خام است؛ راه‌های کاهش در Angular Profile آمده است.
- **Authentication، Backend و Business Logic** عمداً پیاده‌سازی نشده‌اند و کار هر پروژه هستند.
- **انتشار نسخه:** Tag `v1.0.0` پس از Commit این تغییرات باید توسط نگهدارنده ساخته شود.
