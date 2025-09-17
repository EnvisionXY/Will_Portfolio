export const revalidate = 60;
import { HeroSection } from "./components/HeroSection";
import { Navigation } from "./components/Navigation";
import { SelectedWorks } from "./components/SelectedWorks";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { client } from "../../sanity/lib/client";
import { SETTINGS_QUERY, PROJECTS_CARD_QUERY } from "../../sanity/lib/queries";

export default async function Page() {
  const [s, projects] = await Promise.all([
    client.fetch(SETTINGS_QUERY),
    client.fetch(PROJECTS_CARD_QUERY),
  ]);

  return (
    <main className="container mx-auto px-6 py-16">
      <Navigation />
      <HeroSection
        siteTitle={s?.siteTitle ?? "William Black"}
        tagline={s?.tagline}
        keywords={s?.keywords}
      />
      <SelectedWorks projects={projects} />
      <AboutSection
        title={s?.aboutTitle}
        aboutContent={s?.aboutContent} // New Portable Text field
        photo={s?.aboutPhoto}
      />
      <Footer
        email={s?.contact?.email}
        linkedin={s?.contatct?.linkedin}
        instagram={s?.contact?.instagram}
        github={s?.contact?.github}
      />
    </main>
  );
}
