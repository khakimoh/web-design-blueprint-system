# Technical Audit: TypeScript & JavaScript Coding Conventions

## 1. Compiler Configuration & Type Rigor

The base compiler configuration in [tsconfig.json](file:///Volumes/Project/CV-webpage/tsconfig.json) enforces an uncompromising TypeScript strict mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "target": "es2020",
    "module": "es2020"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

### Compiler Highlights:
- `"strictTemplates": true`: Angular templates are type-checked against component properties with full TypeScript static analysis.
- `"noImplicitReturns": true`: Every code path in non-void functions must return a value.
- `"strictInputAccessModifiers": true`: Enforces access modifier consistency for `@Input()` properties.

---

## 2. Naming Conventions

The codebase exhibits clear, consistent patterns across distinct software entities:

| Entity Type | Convention | Actual Examples in Codebase |
| :--- | :--- | :--- |
| **Interfaces** | PascalCase | `DataInterface`, `Cv`, `Article`, `Publication`, `Education`, `ProgressSkill` |
| **Classes / Components** | PascalCase with suffix | `HomeComponent`, `DataService`, `CvComponent`, `NavBarComponent` |
| **Methods & Functions** | camelCase | `getData()`, `getItems()`, `isAmericanStyle()`, `normalize()`, `assetUrl()` |
| **Component Properties** | camelCase | `bannerHeight`, `githubId`, `information$`, `educations$` |
| **Observable Streams** | camelCase with `$` suffix | `data$`, `items$`, `banner$`, `socialMedias$`, `information$` |
| **JSON / Model Properties** | snake_case | `avatar_path`, `job_title`, `main_title`, `sub_title`, `journal_link` |
| **Selectors (HTML tags)** | kebab-case with prefix | `app-home`, `app-banner`, `app-cv`, `app-nav-bar` |
| **CSS Classes** | kebab-case with grid prefix | `time-line`, `content-bar`, `g-col-1-1`, `g-col-7-5` |

### Key Insight: Separation of API Properties vs Application Identifiers
Data originating from backend JSON utilizes `snake_case` (e.g. `raw.cv.avatar_path`, `d.progress_skill`), mirroring standard REST/PostgreSQL serialization conventions. Internal application variables, service methods, and component state strictly adhere to `camelCase` and Finnish notation (`$` suffix) for observables.

---

## 3. Interfaces & Type Modeling

Type contracts are centralized in [src/app/Model-Interface/cv.model.ts](file:///Volumes/Project/CV-webpage/src/app/Model-Interface/cv.model.ts):

```typescript
export interface Article {
  title: string;
  /**
   * NOTE: the JSON ships a misspelled key ("refrence").
   * We keep it optional here so raw data still type-checks, and the
   * DataService maps it onto the correctly spelled `reference` below.
   */
  refrence?: string;
  reference?: string;
  journal_link: string;
  abstract: string;
}

export interface Cv {
  american_style: boolean;
  avatar_path: string;
  name: string;
  job_title: string;
  email: string;
  linkedin_url: string;
  web_page_url: string;
  google_scholar_url: string;
  tel: string;
  location: string;
  items: Items[];
}
```

### Best Practices Observed:
1. **Model Comments with Rationale**: The developer documents intentional decisions (e.g., explaining why `refrence` and `reference` coexist to accommodate a raw data typo).
2. **Strict Object Graphing**: Interfaces cleanly nest child types (`Cv` references `Items[]`, which references `Description[]`).

### Areas with Residual Inconsistency:
In older presentational components, `@Input()` bindings occasionally retain loose types or `any`:
- [banner.component.ts](file:///Volumes/Project/CV-webpage/src/app/Modules/Home/Components/banner/banner.component.ts): `@Input() banner: Banner | any;`
- [info-indentify.component.ts](file:///Volumes/Project/CV-webpage/src/app/Modules/Home/Components/info-indentify/info-indentify.component.ts): `@Input() info: any;`

In modern projects, these union types (`| any`) should be removed in favor of strict interface types (`@Input() banner!: Banner`).

---

## 4. Class Structures & Dependency Injection

Components and services follow standard Angular class anatomy:

```typescript
// 1. Imports: Angular core -> RxJS -> App models/services -> Environments
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner, Cv, Education, Items, ProgressSkill } from 'src/app/Model-Interface/cv.model';
import { DataService } from 'src/app/Services/data.service';

// 2. Decorator Metadata
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
// 3. Class Definition
export class HomeComponent {
  // 3a. Observable State Properties
  items$: Observable<Items[]>;
  information$: Observable<Cv>;
  banner$: Observable<Banner>;
  educations$: Observable<Education[]>;
  progressSkills$: Observable<ProgressSkill[]>;

  // 3b. Constructor Dependency Injection & Stream Assignment
  constructor(private dataService: DataService) {
    this.items$ = this.dataService.getItems();
    this.information$ = this.dataService.getCv();
    this.banner$ = this.dataService.getBanner();
    this.educations$ = this.dataService.getEducation();
    this.progressSkills$ = this.dataService.getProgressSkills();
  }
}
```

---

## 5. Defensive Programming & Null Safety

The codebase uses modern TypeScript defensive patterns extensively:

### 5.1. Nullish Coalescing Operator (`??`)
Used extensively in [src/app/Services/data.service.ts](file:///Volumes/Project/CV-webpage/src/app/Services/data.service.ts) to guarantee non-null array returns:

```typescript
getItems(): Observable<Items[]> {
  return this.data$.pipe(map((d) => d.cv?.items ?? []));
}

getEducation(): Observable<Education[]> {
  return this.data$.pipe(map((d) => d.education ?? []));
}

getProgressSkills(): Observable<ProgressSkill[]> {
  return this.data$.pipe(map((d) => d.progress_skill ?? []));
}
```

If an upstream property is `undefined`, the UI receives a safe empty array `[]`, preventing `*ngFor` crashes.

### 5.2. Defensive Path Sanitization (Regex & String Slicing)
In [src/app/Services/data.service.ts](file:///Volumes/Project/CV-webpage/src/app/Services/data.service.ts#L87-L96):

```typescript
assetUrl(path: string | null | undefined): string {
  if (!path) {
    return '';
  }
  const assetsIdx = path.indexOf('assets/');
  if (assetsIdx >= 0) {
    return path.slice(assetsIdx);
  }
  return path.replace(/^(?:\.\.?\/)+/, '').replace(/^\/+/, '');
}
```

This helper defensively handles dirty paths (e.g. `../../assets/img.jpg`, `/assets/img.jpg`), normalizing them to `assets/img.jpg` so they resolve regardless of routing base hrefs.

---

## 6. Logic Predicates in Presentational Components

Presentational components encapsulate domain-specific display logic as pure methods:

In [src/app/Modules/Home/Components/cv/cv.component.ts](file:///Volumes/Project/CV-webpage/src/app/Modules/Home/Components/cv/cv.component.ts):
```typescript
isHorizontal(): boolean {
  if (this.item.main_title == "References") {
    return true;
  }
  if (this.item.main_title == "Research Interests") {
    return true;
  } else {
    return false;
  }
}

isTitleVisible(title_check: string | any): boolean {
  if (title_check.length <= 1) {
    return true;
  } else {
    return false;
  }
}
```

In [src/app/Modules/Home/Components/info-indentify/info-indentify.component.ts](file:///Volumes/Project/CV-webpage/src/app/Modules/Home/Components/info-indentify/info-indentify.component.ts):
```typescript
isAmericanStyle(americanStyleCheck: string): boolean {
  if (americanStyleCheck == "true") {
    return false;
  } else {
    return true;
  }
}
```
*Note*: These boolean conditional methods reflect domain logic (American resume standards omit headshots and personal photos to prevent hiring bias).

---

## 7. Documentation Conventions

Key architecture and sanitation modules are well documented using JSDoc block comments:

```typescript
/**
 * Central, single-source-of-truth service for the whole CV.
 *
 * Why this exists:
 *  - The JSON is fetched exactly ONCE. `shareReplay(1)` caches the emission and
 *    replays it to every later subscriber, so Home / About / Publications /
 *    Footer no longer trigger a separate HTTP request each.
 *  - All "typo" / asset-path sanitisation happens here, in one place, so the
 *    templates only ever see clean, correctly-spelled, deploy-safe data.
 */
```

Future projects should replicate this standard across all core services, guards, and complex domain models.
