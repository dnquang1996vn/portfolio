## Virtualise rows, and only rows

The first version virtualised rows and columns. Column virtualisation bought little on real screens, broke horizontal scroll smoothness, and made sticky columns a nightmare. We removed it. Row virtualisation alone, with a fixed row height and a small overscan, took the DOM from ten thousand rows to about forty and solved most of the performance problem in one move.

## Separate layout state from data state

Column widths, order, pinning and visibility are user preferences. Row data, sorting and grouping are query state. Mixing them in one store meant that dragging a column boundary re-rendered every cell. Splitting them, with the layout store subscribed only by headers and the cell renderer subscribed only by data, made resize a header-only operation.

```ts
// Two stores, two subscriptions. Resizing a column never touches the body.
const width = useLayoutStore(s => s.columns[colId].width);
const cell  = useDataStore(s => s.rows[rowIndex]?.[colId]);
```

## Freeze and reorder with CSS, not maths

Frozen columns use position: sticky with a computed left offset per pinned column. Reorder is a change to the column order array; the grid re-renders headers and the visible forty rows. We never move DOM nodes around by hand, and there is no absolute positioning anywhere in the table body.

## Grouping and trees are the same feature

A grouped table is a tree with generated parent rows. Once we modelled both as a flat list of visible rows with a depth and an expanded flag, the renderer stopped caring which one it was drawing. Expanding a node inserts its children into the flat list; the virtualiser does the rest.

- Cell renderers are pure and memoised on (row, column). Formatting is done once per visible cell, not once per keystroke in the filter box.
- Filters run in a worker when the row count crosses a threshold, so typing never blocks the frame.
- Every interaction is measured in CI with a synthetic ten-thousand-row dataset. A regression fails the build before a user feels it.

## Why it is still the most reused component

Because it is boring to use. A team declares columns, points it at data, and gets resize, freeze, group and tree for free. Years later the same component sits in Portal, Trace and Sales with one design language, and new features still land in one place.
