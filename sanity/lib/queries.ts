import { groq } from "next-sanity";
export const SETTINGS_QUERY = groq`*[_type=="settings"][0]{siteTitle, keywords, tagline}`;
export const PROJECTS_CARD_QUERY = groq`*[_type=="project"]|order(order asc){
  title, slug, tags, hoverText
}`;

export const PROJECT_BY_SLUG = groq`*[_type=="project" && slug.current==$slug][0]{
  title, tags, overview, role, features, links,
  images[]{ image{asset->}, alt, title, text, layout }
}`;
