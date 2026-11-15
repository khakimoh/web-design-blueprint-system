# Agent Kickoff Prompt

Paste this at the start of the first session in a **new, empty project
directory**. Replace the angle-bracket placeholders. It works with any coding
agent that can read local files (Claude Code, Codex, and others).

```text
We are starting a new web project. Follow the Web Design & Engineering
Blueprint located at <path-or-URL-of-blueprint>, version <x.y.z>.

1. Read <blueprint>/AGENTS.md first and follow its reading order.
2. Read the project brief below. List missing or ambiguous requirements and
   ask me about them before proposing anything. Do not invent requirements.
3. Create project.config.yaml from <blueprint>/templates/project.config.yaml
   and validate it.
4. Propose the architecture (structure, dependencies, design configuration,
   feature plan) following docs/workflows/project-initialization.md.
   Wait for my approval before generating the application.
5. After approval: initialize with the official CLI, apply the design
   foundation, then implement incrementally, one feature at a time, validating
   each step.
6. Never modify the blueprint itself. Record every intentional deviation in
   project.config.yaml → customizations.deviations.

Project brief:
<paste the completed templates/project-brief.md here, or give its path>
```

## Follow-up prompts

- **Next feature:** "Implement feature `<id>` from project.config.yaml following
  docs/workflows/feature-development.md. Propose the file list first."
- **Review:** "Review the current changes using docs/workflows/code-review.md
  and report findings by severity."
- **Design pass:** "Check the UI against docs/workflows/design-system-application.md:
  token usage, states, responsiveness, RTL, contrast."
