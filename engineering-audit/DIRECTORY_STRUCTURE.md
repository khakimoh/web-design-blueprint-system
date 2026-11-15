# Technical Audit: Directory Structure & Code Organization

## 1. Complete Repository Tree

```text
cv-webpage/
├── .browserslistrc                  # Supported target browser matrix for Autoprefixer / Babel
├── .editorconfig                    # Cross-IDE indentation and formatting rules
├── .gitignore                       # Git exclusion rules
├── .vscode/                         # Visual Studio Code workspace settings
│   ├── extensions.json              # Recommended workspace extensions
│   ├── launch.json                  # Debug launch configurations
│   └── settings.json                # Project-specific IDE preferences
├── angular.json                     # Angular CLI project, build, test, and serve configurations
├── karma.conf.js                    # Karma test runner configuration with Chrome launcher
├── package.json                     # Dependency manifests, package versions, and npm scripts
├── package-lock.json                # Deterministic dependency lockfile
├── tsconfig.json                    # Base TypeScript compiler options with strict mode
├── tsconfig.app.json                # Application build TypeScript configuration
├── tsconfig.spec.json               # Unit test TypeScript configuration
├── README.md                        # Project introductory documentation
│
├── LaTex/                           # Companion academic resume LaTeX typesetting project
│   ├── chapters_of_body/            # Modular LaTeX chapters (education, experience, publications)
│   ├── CVMohammadKhaki.pdf          # Compiled academic CV artifact
│   ├── main.tex                     # Primary LaTeX compilation entrypoint
│   └── main.pdf                     # Compiled output
│
└── src/                             # Application source code
    ├── favicon.ico                  # Browser tab icon
    ├── index.html                   # Single-page HTML host document
    ├── main.ts                      # Angular application bootstrap entrypoint
    ├── polyfills.ts                 # Polyfills for zone.js and browser shims
    ├── styles.scss                  # Global master stylesheet
    ├── test.ts                      # Angular test suite initialization entrypoint
    │
    ├── environments/                # Environment-specific configuration
    │   ├── environment.ts           # Development configuration (baseUrl: 'assets/data.json')
    │   └── environment.prod.ts      # Production build configuration
    │
    ├── assets/                      # Static assets distributed with the bundle
    │   ├── data.json                # Core data payload containing complete CV content
    │   ├── pdf/
    │   │   └── CV_Khaki.pdf         # Downloadable static resume file
    │   ├── images/
    │   │   ├── background-texture.jpg
    │   │   ├── banner_background.jpg
    │   │   ├── contact-information.png
    │   │   ├── prof.jpg
    │   │   ├── publications.png
    │   │   └── gallery/             # Photo gallery image assets (gallery_1.jpg - 9.jpg)
    │   └── styles/                  # Modular global SCSS design system
    │       ├── extra-style.scss     # Barrel style importer and Google Font loader
    │       ├── grid-custom.scss     # Custom CSS Grid utility classes
    │       ├── normalize.scss       # CSS box-sizing and tag reset declarations
    │       ├── print-size.scss      # Dedicated @media print stylesheet
    │       ├── timeLine.scss        # Timeline UI list component styling
    │       └── variable.scss        # Global design tokens and programmatic HSL variables
    │
    └── app/                         # Core Angular application module and components
        ├── app.component.html       # Root frame layout: nav-bar, router-outlet, footer
        ├── app.component.scss       # Root styling overrides
        ├── app.component.spec.ts    # Root component test suite
        ├── app.component.ts         # Root component binding socialMedia$ stream
        ├── app.module.ts            # Root NgModule declaring layout components
        ├── app-routing.module.ts    # Root routing module with lazy route declarations
        │
        ├── Model-Interface/         # Type definitions and domain contracts
        │   └── cv.model.ts          # Strongly typed interfaces (DataInterface, Cv, Article, etc.)
        │
        ├── Services/                # Singleton application services
        │   └── data.service.ts      # Single-source-of-truth cached HTTP service
        │
        ├── Layout-comp/             # Global structural frame components
        │   ├── footer/              # Global page footer with dynamic social media links
        │   ├── loader-spiner/       # Loading indicator spinner component (stub)
        │   ├── nav-bar/             # Responsive Bootstrap navbar with active route styling
        │   ├── page-not-found/      # 404 error template component
        │   └── persian-style/       # RTL / Persian localized layout foundation
        │       └── fa.json          # Persian language translation dictionary
        │
        └── Modules/                 # Feature-based modular route modules
            ├── Home/                # Primary landing and CV display feature
            │   ├── home.component.* # Container component selecting data streams
            │   ├── home.module.ts   # NgModule bundling Home feature declarations
            │   ├── home-routing.module.ts # Routing config for /Home
            │   └── Components/      # Dumb presentational child components
            │       ├── banner/      # Hero banner with dynamic viewport height calculation
            │       ├── cv/          # Core timeline presentation of roles & history
            │       ├── education/   # Academic credentials grid
            │       ├── info-indentify/ # Profile avatar, contact icons, & scholar links
            │       └── progress-skill/ # Technical skill proficiency progress indicators
            │
            ├── about/               # About me, personal commentary, and image gallery
            │   ├── about.component.*# Container component for /about route
            │   ├── about.module.ts  # NgModule bundling about declarations
            │   ├── about-routing.module.ts
            │   └── Components/
            │       ├── about-me/    # Narrative biographical text presentation
            │       ├── comment/     # Testimonials or commentary list
            │       └── gallery/     # Responsive photo portfolio grid
            │
            └── publications/        # Academic research and paper publications
                ├── publications.component.* # Container component for /Publications route
                ├── publications.module.ts
                ├── publications-routing.module.ts
                └── Components/
                    ├── article/     # Single research article abstract & journal links
                    └── publication-box/ # Aggregated publication metrics and counters
```

---

## 2. Directory Taxonomy & Layering Rules

The architecture follows a classical tiered structure adapted for Angular:

| Directory | Layer Responsibility | Architectural Constraint |
| :--- | :--- | :--- |
| `src/app/Model-Interface/` | Domain Models & Types | Zero dependencies on Angular core or services. Pure TypeScript interfaces. |
| `src/app/Services/` | Data Access & Caching | Singleton services (`providedIn: 'root'`). Communicates via RxJS streams. |
| `src/app/Layout-comp/` | Global Application Shell | Declared once in `AppModule`. Does not contain domain-specific business logic. |
| `src/app/Modules/<Feature>/` | Feature Boundaries | Encapsulated NgModules with their own routing. Loaded lazily via `loadChildren`. |
| `src/app/Modules/<Feature>/Components/` | Presentational Views | Dumb components. Strictly receive data via `@Input()` and emit `@Output()`. |
| `src/assets/styles/` | Global SCSS Design Tokens | Abstract mixins, variables, and global classes. Imported by `styles.scss`. |

---

## 3. Directory Naming Patterns & Discrepancies

A critical aspect of extracting an engineering style is auditing actual conventions versus minor inconsistencies in the codebase:

### 3.1. Observed Inconsistencies in the Existing Codebase
1. **Case Mixing in Directories**:
   - `Layout-comp` (PascalCase with hyphen).
   - `Model-Interface` (PascalCase with hyphen).
   - `Modules/Home` (PascalCase) vs `Modules/about` (lowercase) vs `Modules/publications` (lowercase).
2. **Singular vs Plural**:
   - `Services/` (Plural) vs `Model-Interface/` (Singular/Compound) vs `Layout-comp/` (Singular abbreviation).
3. **Component Folder Abbreviations**:
   - `Layout-comp` uses `comp` instead of `components`.
   - `loader-spiner` contains a minor typographical omission (`spiner` vs `spinner`).
   - `info-indentify` contains a minor typographical compound (`indentify` vs `identity` or `identification`).

### 3.2. Recommended Canonical Standard for Future Projects
For all future projects generated by AI coding agents (or migrations), adopt a strictly kebab-case, uniform organizational standard:
```text
src/app/
├── core/                       # Singleton services, interceptors, guards
│   └── services/
├── shared/                     # Reusable dumb components, pipes, directives
│   └── components/
├── models/                     # Interfaces and domain types
│   └── cv.model.ts
├── layout/                     # Header, footer, navbar, sidebar shell components
│   ├── navbar/
│   └── footer/
└── features/                   # Feature modules / standalone route trees
    ├── home/
    │   └── components/
    ├── about/
    │   └── components/
    └── publications/
        └── components/
```
