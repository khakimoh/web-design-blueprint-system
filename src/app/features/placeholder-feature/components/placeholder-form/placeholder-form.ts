import { Component, ElementRef, Injector, afterNextRender, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppError } from '../../../../core/errors/app-error';
import { Button } from '../../../../shared/components/button/button';
import { ItemDraft } from '../../models/item.model';

type FieldName = 'title' | 'summary';

let nextId = 0;

/**
 * Form with validation states (presentational): typed reactive form, labels,
 * help text, inline errors linked with aria-describedby, server-side field
 * errors, focus on the first invalid field, and a loading submit button.
 * Emits a draft; the container decides what to do with it.
 */
@Component({
  selector: 'app-placeholder-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './placeholder-form.html',
})
export class PlaceholderForm {
  readonly saving = input(false);
  readonly serverError = input<AppError | null>(null);
  readonly submitDraft = output<ItemDraft>();

  protected readonly id = `item-form-${nextId++}`;
  protected readonly limits = { title: 80, summary: 280 } as const;
  protected readonly form = inject(NonNullableFormBuilder).group({
    title: ['', [Validators.required, Validators.maxLength(this.limits.title)]],
    summary: ['', [Validators.maxLength(this.limits.summary)]],
  });

  private readonly submitted = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  protected showError(name: FieldName): boolean {
    const control = this.form.controls[name];
    const clientInvalid = control.invalid && (control.touched || this.submitted());
    return clientInvalid || this.serverMessages(name).length > 0;
  }

  protected errorMessage(name: FieldName): string {
    const server = this.serverMessages(name)[0];
    if (server) return server;
    const errors = this.form.controls[name].errors;
    if (errors?.['required']) return 'This field is required.';
    if (errors?.['maxlength']) return `Use at most ${this.limits[name]} characters.`;
    return '';
  }

  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), {
        injector: this.injector,
      });
      return;
    }
    this.submitDraft.emit(this.form.getRawValue());
  }

  /** Called by the container after a successful save. */
  reset(): void {
    this.form.reset();
    this.submitted.set(false);
  }

  private serverMessages(name: FieldName): readonly string[] {
    return this.serverError()?.fieldErrors[name] ?? [];
  }
}
