import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export default function DatenschutzPage() {
  return (
    <>
      <Navigation />
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 mt-32 sm:mt-36">
          {/* Main Heading */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl mb-16 sm:mb-20 text-crank-orange-1 font-bold"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            DATENSCHUTZ
          </h1>

          {/* Content Sections */}
          <div className="space-y-12 sm:space-y-16">
            {/* Section 1 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                DATENSCHUTZERKLÄRUNG
              </h2>
              <p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light max-w-4xl"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Der Schutz Ihrer persönlichen Daten ist mir ein besonderes
                Anliegen. Ich verarbeite Ihre Daten daher ausschließlich auf
                Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In
                dieser Datenschutzerklärung informiere ich Sie über die
                wichtigsten Aspekte der Datenverarbeitung im Rahmen meiner
                Website.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                KONTAKT MIT UNS
              </h2>
              <p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light max-w-4xl"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Wenn Sie per E-Mail Kontakt mit mir aufnehmen, werden Ihre
                angegebenen Daten zwecks Bearbeitung der Anfrage und für den
                Fall von Anschlussfragen bei mir gespeichert. Diese Daten gebe
                ich nicht ohne Ihre Einwilligung weiter.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                COOKIES
              </h2>
              <p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light max-w-4xl"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Meine Website verwendet keine Cookies.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                WEB-ANALYSE
              </h2>
              <p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light max-w-4xl"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Diese Website verwendet keine Analyse-Tools oder
                Tracking-Dienste.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                IHRE RECHTE
              </h2>
              <p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light max-w-4xl"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Ihnen stehen grundsätzlich die Rechte auf Auskunft,
                Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit,
                Widerruf und Widerspruch zu. Wenn Sie glauben, dass die
                Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt
                oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise
                verletzt worden sind, können Sie sich bei der Aufsichtsbehörde
                beschweren. In Österreich ist dies die Datenschutzbehörde.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                SIE ERREICHEN MICH UNTER FOLGENDEN KONTAKTDATEN
              </h2>
              <p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                <strong className="text-gray-300">William Black</strong>
                <br />
                Kronberger Str 22|H
                <br />
                65812 Bad Soden am Taunus
                <br />
                <br />
                E-Mail: william@willblack.de
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
