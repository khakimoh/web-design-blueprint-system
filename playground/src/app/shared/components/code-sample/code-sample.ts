import { Component, input } from '@angular/core';

/** Read-only code snippet. Always rendered left-to-right. */
@Component({
  selector: 'pg-code-sample',
  template: `<pre class="pg-code" [attr.aria-label]="label()"><code>{{ code() }}</code></pre>`,
})
export class CodeSample {
  readonly code = input.required<string>();
  readonly label = input('Code example');
}
