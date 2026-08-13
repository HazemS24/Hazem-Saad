import raw from "../personal_portfolio_data.json";

export type Entry = {
  /** Full original title, e.g. "Software Engineer - eXp Realty" */
  name: string;
  /** Split out of `name` for roles so the card can weight them differently */
  role: string;
  org: string | null;
  description: string;
  start_date: string;
  end_date: string | null;
  types: string[];
  image: string;
  url?: string;
  tools: string[];
  current: boolean;
};

const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

/** "Present" sorts above everything; "May 2023" and "2019" both parse. */
function toTime(value: string | null | undefined, fallback: number): number {
  if (!value) return fallback;
  const v = value.trim();
  if (/^present$/i.test(v)) return Number.MAX_SAFE_INTEGER;

  const m = v.match(/^(?:([A-Za-z]+)\s+)?(\d{4})$/);
  if (!m) return fallback;

  const year = Number(m[2]);
  const month = m[1] ? MONTHS[m[1].toLowerCase()] ?? 0 : 0;
  return new Date(year, month, 1).getTime();
}

const ROLE_TYPES = new Set(["Work Experience", "Volunteer Experience"]);

function normalize(item: (typeof raw)[number]): Entry {
  const types = Array.isArray(item.type) ? item.type : [item.type];
  const isRole = types.some((t) => ROLE_TYPES.has(t));

  // Roles read as "Title - Organization"; split on the first separator only.
  const split = isRole ? item.name.split(/\s+-\s+/) : [];
  const role = split.length > 1 ? split[0] : item.name;
  const org = split.length > 1 ? split.slice(1).join(" - ") : null;

  return {
    name: item.name,
    role,
    org,
    description: item.description,
    start_date: item.start_date,
    end_date: item.end_date ?? null,
    types,
    image: item.image,
    ...("url" in item && item.url ? { url: item.url as string } : {}),
    tools: item.tools ?? [],
    current: /^present$/i.test(item.end_date ?? ""),
  };
}

const entries: Entry[] = raw.map(normalize);

/**
 * Reverse-chronological by start date, the way a resume reads. Sorting by end
 * date instead would float long-running side work above headline roles.
 */
function byRecency(a: Entry, b: Entry) {
  const aStart = toTime(a.start_date, 0);
  const bStart = toTime(b.start_date, 0);
  if (aStart !== bStart) return bStart - aStart;
  return (
    toTime(b.end_date, bStart) - toTime(a.end_date, aStart)
  );
}

const has = (e: Entry, t: string) => e.types.includes(t);

export const experience = entries
  .filter((e) => has(e, "Work Experience"))
  .sort(byRecency);

export const projects = entries.filter((e) => has(e, "Projects")).sort(byRecency);

export const awards = entries.filter((e) => has(e, "Awards")).sort(byRecency);

export const volunteering = entries
  .filter((e) => has(e, "Volunteer Experience"))
  .sort(byRecency);

/** Everything the Work grid can show — experience lives in its own timeline. */
export const showcase = entries
  .filter(
    (e) =>
      has(e, "Projects") || has(e, "Awards") || has(e, "Volunteer Experience")
  )
  .sort(byRecency);

export const FILTERS = [
  { id: "all", label: "Everything" },
  { id: "Projects", label: "Projects" },
  { id: "Awards", label: "Awards" },
  { id: "Volunteer Experience", label: "Volunteering" },
] as const;

export type FilterId = (typeof FILTERS)[number]["id"];

/** Tech stack, grouped to mirror the resume. */
export const STACK: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Ruby", "Python", "TypeScript", "C", "C++", "Go", "JavaScript"],
  },
  {
    group: "Frameworks",
    items: [
      "Ruby on Rails",
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "ROS2",
      "React.js",
      "Next.js",
    ],
  },
  {
    group: "Libraries & Tools",
    items: [
      "Claude Code",
      "RSpec",
      "CUDA",
      "Docker",
      "NumPy",
      "Pandas",
      "Cypress",
      "Playwright",
      "PostgreSQL",
      "GitHub",
    ],
  },
  {
    group: "Concepts",
    items: [
      "Systems Programming",
      "Concurrency",
      "Unit Testing",
      "Data Structures & Algorithms",
    ],
  },
];

/** Every distinct tool across the portfolio — feeds the marquee. */
export const ALL_TOOLS = Array.from(
  new Set(entries.flatMap((e) => e.tools))
).sort((a, b) => a.localeCompare(b));

export const STATS = [
  { value: "3.9", label: "GPA at Waterloo" },
  { value: String(experience.length), label: "Engineering roles" },
  { value: String(awards.length), label: "Awards won" },
];
