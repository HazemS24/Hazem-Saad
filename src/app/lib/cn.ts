/** Tiny classname joiner — keeps JSX readable without pulling in a dependency. */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
