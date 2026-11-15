import { Component, input } from '@angular/core';

export type EmptyStateTone = 'neutral' | 'danger';

/**
 * Empty and error states. Styling comes from the global `.ds-empty-state`
 * pattern in src/styles/components/_empty-state.scss, so the same markup works
 * outside Angular. Content projection keeps it generic:
 *
 *   <app-empty-state title="No items yet" description="Create the first one.">
 *     <svg emptyStateIcon …></svg>
 *     <button emptyStateActions appButton>Create item</button>
 *   </app-empty-state>
 */
@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.html',
})
export class EmptyState {
  readonly title = input.required<string>();
  readonly description = input('');
  /** Heading level that fits the page outline (1 when the state is the whole page). */
  readonly headingLevel = input<1 | 2 | 3>(2);
  readonly tone = input<EmptyStateTone>('neutral');
  /** Use "alert" for errors that appear after a user action. */
  readonly role = input<'status' | 'alert' | null>(null);
}
