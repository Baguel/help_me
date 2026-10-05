import Link from "next/link";
import { lessonGroups, lessons } from "@/lib/course";
import { CourseProgress } from "@/app/components/course-interactions";
import { ThemePicker } from "@/app/components/theme-picker";

export default function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <Link className="brand" href="/" aria-label="Accueil documentation C">
          <span>{"{"}</span> EPITECH <span>{"}"}</span>
        </Link>
        <span className="header-label">GUIDE D&apos;APPRENTISSAGE · C</span>
      </header>

      <section className="home-intro">
        <p className="kicker">PROGRAMMATION · UNIX · MÉMOIRE</p>
        <h1>La Piscine C,<br />notion par notion.</h1>
        <p className="intro-copy">
          Un guide de révision pour avancer en C : du terminal aux pointeurs,
          puis aux outils et structures de données utilisés dans les projets.
          Chaque page présente une notion, un exemple et un exercice à faire.
        </p>
        <div className="intro-actions">
          <Link className="primary-link" href={`/docs/${lessons[0].slug}`}>
            Commencer le parcours <span aria-hidden="true">→</span>
          </Link>
          <span className="course-facts">{lessons.length} CHAPITRES <i /> EXEMPLES C <i /> EXERCICES</span>
        </div>
        <ThemePicker />
        <p className="scope-note">
          Ce support est un guide pédagogique indépendant, pas un document
          officiel ni une reproduction des sujets EPITECH. Les consignes du
          sujet de ta Piscine restent prioritaires.
        </p>
        <CourseProgress lessons={lessons} />
      </section>

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <div>
            <p className="kicker">LE PARCOURS</p>
            <h2 id="catalog-title">Choisis un chapitre</h2>
          </div>
          <span>{String(lessons.length).padStart(2, "0")} LEÇONS</span>
        </div>

        {lessonGroups.map((group, groupIndex) => {
          const groupedLessons = lessons.filter((lesson) => lesson.group === group);

          return (
            <section className="catalog-group" key={group}>
              <div className="group-heading">
                <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                <h3>{group}</h3>
                <span className="group-rule" />
              </div>
              <div className="lesson-cards">
                {groupedLessons.map((lesson) => {
                  const index = lessons.indexOf(lesson);

                  return (
                    <Link
                      className="catalog-card"
                      href={`/docs/${lesson.slug}`}
                      key={lesson.slug}
                    >
                      <span className="card-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="card-content">
                        <strong>{lesson.title}</strong>
                        <span>{lesson.summary}</span>
                      </span>
                      <span className="card-arrow" aria-hidden="true">↗</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </section>

      <footer className="home-footer">
        <span>EPITECH · SUPPORT DE RÉVISION C</span>
        <span>APPRENDS EN PRATIQUANT</span>
      </footer>
    </main>
  );
}
