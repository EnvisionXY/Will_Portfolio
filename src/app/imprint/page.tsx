import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export default function ImpressumPage() {
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
            IMPRESSUM
          </h1>

          {/* Content Sections */}
          <div className="space-y-12 sm:space-y-16">
            {/* Section 1 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                ANGABEN GEMÄSS § 5 TMG
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
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                KONTAKT
              </h2>
              <p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Telefon: 01575 10 94 729
                <br />
                E-Mail: william@willblack.de
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                HAFTUNG FÜR INHALTE
              </h2>
              <p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light max-w-4xl"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                übernehme ich jedoch keine Gewähr. Gemäß den gesetzlichen
                Bestimmungen bin ich für eigene Inhalte auf diesen Seiten
                verantwortlich. In diesem Zusammenhang weise ich darauf hin,
                dass ich nicht verpflichtet bin, übermittelte oder gespeicherte
                fremde Informationen zu überwachen oder nach Umständen zu
                forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                Informationen nach den allgemeinen Gesetzen bleiben hiervon
                unberührt.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2
                className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold mb-4 sm:mb-6"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                HAFTUNG FÜR LINKS
              </h2>
              <p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light max-w-4xl"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Diese Website enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung
                waren keine Rechtsverstöße erkennbar. Bei Bekanntwerden von
                Rechtsverletzungen werde ich derartige Links umgehend entfernen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
