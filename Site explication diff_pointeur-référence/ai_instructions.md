Take content from content.md to create a single HTML file and a CSS file
that implements the specified design from content.md. Comments are put
as quotes (> comment) in content.md and are directed for the AI agent.
They should NOT appear in the final HTML file. The explanations put in
content.md should not be reworded or changed, unless they are blatantly
wrong or not clear enough. If that is the case, content.md itself should
also be modified by the AI agent, but never without the explicit
permission of the user.

All code snippets must have basic syntax highlighting. Indentation is
4 spaces.

For the first section, Syntaxe, only one version of the code should be 
visible on screen at a time, and it should stay fixed in place while the
user scrolls through it. CSS animations should be used to smoothly
highlight certain parts of the code while scrolling, and tooltips will
appear close to the highlighted parts to explain what is happening.
The contents of the tooltips are put in content.md and should not be
modified.

## User Directives Summary

!! All further user directives from chat window must be summarized here.

- **General**:
    - Dark mode should be the default.
- **Syntaxe Section**:
    - Add intro text from `content.md` at the top.
    - **Tooltips**: Should appear animated above the code (tied to scroll), not as scrolling background elements.
    - **Initial State**: Top of page has no highlights. First highlight/tooltip appears only after scrolling down.
- **Valeurs Section**:
    - **"We need to go deeper"**: This text should be in its own sticky/fullscreen section, isolated from the memory visualization.
    - **Aesthetics**: Add faint water-themed effects and a bluer background tint during the "diving" phase.
- **Implémentation Assembleur**:
    - Add full syntax highlighting to the Assembly code (not just the diff highlights).
- **Highlighting & Colors**:
    - Primary highlight color: Blue.
    - Secondary highlight color: Light Green (same opacity as blue).
    - Ensure `&value` highlights correctly in the pointer section.
    - Improve overall syntax highlighting variety.
