export const revalidate = 60;
import { HeroSection } from "./components/HeroSection";
import { Navigation } from "./components/Navigation";
import { SelectedWorks } from "./components/SelectedWorks";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { StableParticleBackground } from "./components/ParticleBackground"; // Fixed import path
import { client } from "../../sanity/lib/client";
import { SETTINGS_QUERY, PROJECTS_CARD_QUERY } from "../../sanity/lib/queries";

export default async function Page() {
  const [s, projects] = await Promise.all([
    client.fetch(SETTINGS_QUERY),
    client.fetch(PROJECTS_CARD_QUERY),
  ]);

  return (
    <>
      <StableParticleBackground />

      <main className="relative container mx-auto px-6 py-16">
        <Navigation />
        <HeroSection
          siteTitle={s?.siteTitle ?? "William Black"}
          tagline={s?.tagline}
          keywords={s?.keywords}
        />
        <SelectedWorks projects={projects} />
        <AboutSection
          title={s?.aboutTitle}
          aboutContent={s?.aboutContent}
          photo={s?.aboutPhoto}
        />
        <Footer
          email={s?.contact?.email}
          linkedin={s?.contact?.linkedin} // Fixed typo: contact not contatct
          instagram={s?.contact?.instagram}
          github={s?.contact?.github}
        />
      </main>
    </>
  );
}
