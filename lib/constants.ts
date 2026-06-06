export type CodeToken = { text: string; color: string };

export const CODE_TOKENS: CodeToken[] = [
  { text: "const ", color: "#a78bfa" },
  { text: "riya", color: "#eeeaff" },
  { text: " = {", color: "#c4badb" },
  { text: "\n", color: "" },
  { text: "  role:", color: "#f472b6" },
  { text: "      ", color: "" },
  { text: '"Full-Stack Dev + ML Engineer"', color: "#86efac" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  education:", color: "#f472b6" },
  { text: " ", color: "" },
  { text: '"B.Tech, Computer Science"', color: "#86efac" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  stack:", color: "#f472b6" },
  { text: "     [", color: "#c4badb" },
  { text: '"Angular"', color: "#fbbf24" },
  { text: ", ", color: "#6b7280" },
  { text: '"React"', color: "#fbbf24" },
  { text: ", ", color: "#6b7280" },
  { text: '"Python"', color: "#fbbf24" },
  { text: ", ", color: "#6b7280" },
  { text: '"Node"', color: "#fbbf24" },
  { text: "]", color: "#c4badb" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  loves:", color: "#f472b6" },
  { text: "     [", color: "#c4badb" },
  { text: '"clean APIs"', color: "#fbbf24" },
  { text: ", ", color: "#6b7280" },
  { text: '"great UX"', color: "#fbbf24" },
  { text: ", ", color: "#6b7280" },
  { text: '"fast UIs"', color: "#fbbf24" },
  { text: "]", color: "#c4badb" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  currently:", color: "#f472b6" },
  { text: " ", color: "" },
  { text: '"open to full-time roles"', color: "#86efac" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "};", color: "#c4badb" },
];

export const TOKEN_RANGES = (() => {
  let pos = 0;
  return CODE_TOKENS.map((t) => {
    const start = pos;
    const end = pos + t.text.length;
    pos = end;
    return { ...t, start, end };
  });
})();

export const TOTAL_CHARS = TOKEN_RANGES[TOKEN_RANGES.length - 1].end;

export const LINE_COUNT = 7;
