# playground/src/app/shared/components/theme-controls/

`ThemeControls` renders two Bootstrap button groups: Light / Dark / System and LTR / RTL.

Each button exposes its state with `aria-pressed`; each group has an accessible label. State lives
in `PreferencesStore`, so every instance stays in sync.
