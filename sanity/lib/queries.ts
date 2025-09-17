import { groq } from "next-sanity";

// Make sure this is in your live query:
export const SETTINGS_QUERY = groq`*[_type=="settings"][0]{
  siteTitle, 
  keywords, 
  tagline, 
  aboutTitle,
  aboutContent,  // ← This line is crucial
  aboutPhoto, 
  contact {
    email, 
    linkedin, 
    cvUrl
  }, 
  cvFile {
    asset->
  }
}`;

export const PROJECTS_CARD_QUERY = groq`*[_type=="project"]|order(order asc){
  title, 
  slug, 
  tags, 
  hoverText
}`;

export const PROJECT_BY_SLUG = groq`*[_type=="project" && slug.current==$slug][0]{
  title, 
  tags, 
  overview, 
  role, 
  features, 
  links,
  images[]{
    image{
      asset->
    }, 
    alt, 
    title, 
    text, 
    layout 
  }
}`;

// Optional: Blog queries for future use
export const BLOG_POSTS_QUERY = groq`*[_type=="post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  author->{
    name,
    image
  },
  mainImage,
  categories[]->
}`;

export const BLOG_POST_BY_SLUG = groq`*[_type=="post" && slug.current==$slug][0]{
  title,
  slug,
  publishedAt,
  mainImage,
  author->{
    name,
    image,
    bio
  },
  categories[]->,
  body,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
}`;
