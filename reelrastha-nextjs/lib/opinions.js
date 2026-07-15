import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const OPINIONS_DIR = path.join(process.cwd(), "content", "opinions");

function readAll() {
  if (!fs.existsSync(OPINIONS_DIR)) return [];
  return fs
    .readdirSync(OPINIONS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(OPINIONS_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      return { slug, frontmatter: data, content };
    });
}

function readingTime(content) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllOpinions() {
  return readAll()
    .map(({ slug, frontmatter, content }) => ({
      slug,
      title: frontmatter.title || slug,
      take: frontmatter.take || "",
      film: frontmatter.film || frontmatter.title || "",
      language: frontmatter.language || "",
      year: frontmatter.year || "",
      genre: frontmatter.genre || "",
      spoilers: frontmatter.spoilers || "No spoilers",
      series: frontmatter.series || "ReelRastha Opinion",
      date: frontmatter.date ? String(frontmatter.date) : "",
      updated: frontmatter.updated ? String(frontmatter.updated) : "",
      instagram: frontmatter.instagram || "",
      excerpt: frontmatter.excerpt || frontmatter.take || "",
      readingTime: readingTime(content),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getOpinionSlugs() {
  return readAll().map(({ slug }) => slug);
}

export async function getOpinion(slug) {
  const all = readAll();
  const found = all.find((o) => o.slug === slug);
  if (!found) return null;

  const processed = await remark().use(html).process(found.content);
  const meta = getAllOpinions().find((o) => o.slug === slug);

  return {
    ...meta,
    html: processed.toString(),
  };
}
