/**
 * Structured content for the homepage. Experience and project write-ups live in
 * Markdown under src/content/; everything here is short, list-shaped data.
 */
import type { IconName } from "../lib/icons";

export const SKILLS: { group: string; items: string[] }[] = [
  { group: "Programming", items: ["Python", "SQL", "Java"] },
  {
    group: "ML & statistics",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "statsmodels",
      "pandas",
      "NumPy",
    ],
  },
  {
    group: "Data & cloud",
    items: ["AWS", "Airflow", "BigQuery", "Looker", "Git", "Bitbucket"],
  },
  {
    group: "Methods",
    items: [
      "Recommender systems",
      "Ranking",
      "A/B testing",
      "Clustering",
      "Time series",
    ],
  },
];

export const LANGUAGES: { name: string; level: string }[] = [
  { name: "English", level: "Native" },
  { name: "Chinese", level: "Conversational" },
  { name: "Japanese", level: "Conversational" },
];

interface School {
  school: string;
  degree: string;
  period: string;
  score: { value: string; label: string };
  honours: { icon: IconName; text: string }[];
}

export const EDUCATION: School[] = [
  {
    school: "National University of Singapore",
    degree: "B.Sc. Mathematics with Computer Science (Double Major)",
    period: "Aug 2023 — May 2027 (expected)",
    score: { value: "5.00/5", label: "Cumulative GPA" },
    honours: [
      { icon: "award", text: "NUS Merit Scholar" },
      { icon: "star", text: "Dean's List — both semesters of AY2024/25" },
      { icon: "trophy", text: "Optiver Academic Prize" },
      {
        icon: "globe",
        text: "Exchange semester at the University of Toronto, Fall 2025",
      },
    ],
  },
  {
    school: "Temasek Junior College",
    degree: "GCE A-Levels",
    period: "Jan 2015 — Dec 2020",
    score: { value: "90/90", label: "A-Level rank points" },
    honours: [
      { icon: "award", text: "H3 Mathematics — Distinction" },
      {
        icon: "medal",
        text: "Singapore Mathematical Olympiad — Silver and Bronze",
      },
      { icon: "paddle", text: "Table Tennis Captain, 2019–2020" },
    ],
  },
];

interface Course {
  code: string;
  title: string;
  grade: string;
}

/** From the NUS transcript, grades as recorded. */
export const COURSEWORK: { area: string; courses: Course[] }[] = [
  {
    area: "Mathematics",
    courses: [
      { code: "MA2001", title: "Linear Algebra I", grade: "A+" },
      { code: "MA2002", title: "Calculus", grade: "A+" },
      { code: "MA2104", title: "Multivariable Calculus", grade: "A" },
      { code: "MA2108", title: "Mathematical Analysis I", grade: "A+" },
      { code: "MA2116", title: "Probability", grade: "A+" },
      { code: "MA2202", title: "Algebra I", grade: "A" },
      { code: "MA2213", title: "Numerical Analysis I", grade: "A" },
    ],
  },
  {
    area: "Computer science",
    courses: [
      { code: "CS1010S", title: "Programming Methodology", grade: "A+" },
      { code: "CS2030", title: "Programming Methodology II", grade: "A" },
      { code: "CS2040", title: "Data Structures and Algorithms", grade: "A+" },
      { code: "CS2100", title: "Computer Organisation", grade: "A+" },
    ],
  },
  {
    area: "Other modules",
    courses: [
      {
        code: "GEA1000",
        title: "Quantitative Reasoning with Data",
        grade: "A",
      },
      { code: "UTC2716", title: "Networks: Complexity and Order", grade: "A+" },
      {
        code: "HSI1000",
        title: "How Science Works, Why Science Works",
        grade: "A+",
      },
    ],
  },
];

interface Competition {
  name: string;
  track: string;
  date: string;
  result: string;
  description: string;
}

export const COMPETITIONS: Competition[] = [
  {
    name: "Jane Street Portal Program",
    track: "Quantitative Trading & Research track",
    date: "Jun 2026",
    result: "Selected participant",
    description:
      "Applied game theory and market microstructure in three days of competitive trading simulations.",
  },
  {
    name: "IMC Prosperity 4",
    track: "Global algorithmic trading competition",
    date: "Apr 2026",
    result: "#15 in Singapore · Top 900 globally",
    description:
      "Built profitable trading algorithms with my team through data analysis and backtesting.",
  },
  {
    name: "Singapore Mathematical Olympiad",
    track: "National mathematics olympiad",
    date: "2019 — 2020",
    result: "Silver 2020 · Bronze 2019",
    description:
      "Medalled in consecutive years while at Temasek Junior College.",
  },
];

/** Peak ratings on Chess.com. */
export const CHESS = { rapid: 1903, blitz: 1813 };

export const CUBE_PB = { event: "3×3", seconds: "9.97" };

export const TABLETOP = ["Floating bridge", "Codenames", "Bohnanza", "MegaGem"];

export const SPORTS = [
  "Table tennis",
  "Basketball",
  "Soccer",
  "Pickleball",
  "Bouldering",
];
