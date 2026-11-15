import { Component, ElementRef, Injector, afterNextRender, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type Field = 'name' | 'email' | 'topic' | 'message' | 'terms';

/** Controls, validation states and accessible error handling. */
@Component({
  selector: 'pg-forms-page',
  imports: [ReactiveFormsModule],
  templateUrl: './forms-page.html',
})
export default class FormsPage {
  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    topic: ['', Validators.required],
    contact: ['email'],
    message: ['', [Validators.required, Validators.minLength(20)]],
    updates: [true],
    terms: [false, Validators.requiredTrue],
  });

  protected readonly submitted = signal(false);
  protected readonly sent = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  protected invalid(field: Field): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  protected valid(field: Field): boolean {
    const control = this.form.controls[field];
    return control.valid && control.touched;
  }

  protected message(field: Field): string {
    const errors = this.form.controls[field].errors ?? {};
    if (errors['required'] || errors['requiredTrue']) return 'This field is required.';
    if (errors['email']) return 'Enter an email address like name@example.com.';
    if (errors['minlength']) return `Write at least ${errors['minlength'].requiredLength} characters.`;
    if (errors['maxlength']) return `Use at most ${errors['maxlength'].requiredLength} characters.`;
    return '';
  }

  protected describedBy(field: Field, help = false): string | null {
    const ids = [help ? `${field}-help` : '', this.invalid(field) ? `${field}-error` : ''].filter(Boolean);
    return ids.length ? ids.join(' ') : null;
  }

  protected submit(): void {
    this.submitted.set(true);
    this.sent.set(false);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), {
        injector: this.injector,
      });
      return;
    }
    this.sent.set(true);
  }

  protected reset(): void {
    this.form.reset();
    this.submitted.set(false);
    this.sent.set(false);
  }
}
