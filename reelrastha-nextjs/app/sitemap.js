import { getAllOpinions } from "@/lib/opinions";
import { site } from "@/lib/site";

export default function sitemap() {
  const staticPages = ["", "/opinions", "/about", "/studio", "/work", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    changeFrequency: p === "" || p === "/opinions" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  const opinionPages = getAllOpinions().map((o) => ({
    url: `${site.url}/opinions/${o.slug}`,
    lastModified: o.updated || o.date ? new Date(o.updated || o.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...opinionPages];
}
