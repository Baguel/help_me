import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, lessons } from "@/lib/course";
import {
  CourseProgress,
  ExerciseHints,
  LessonQuiz,
} from "@/app/components/course-interactions";
import { LessonDetailControls } from "@/app/components/lesson-detail-controls";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);

  if (!lesson) {
    return { title: "Chapitre introuvable | Apprendre le C" };
  }

  return {
    title: `${lesson.title} | Apprendre le C`,
    description: lesson.summary,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);

  if (!lesson) {
    notFound();
  }

  const currentIndex = lessons.findIndex((item) => item.slug === slug);
  const previous = lessons[currentIndex - 1];
  const next = lessons[currentIndex + 1];

  return (
    <article className="lesson-document">
      <div className="breadcrumbs">
        <Link href="/">Accueil</Link><span>/</span><span>Piscine C</span>
        <span>/</span><span>{lesson.group}</span>
      </div>
      <header className="lesson-document-header">
        <p className="kicker">
          CHAPITRE {String(currentIndex + 1).padStart(2, "0")} · {lesson.group.toUpperCase()}
        </p>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
      </header>

      {lesson.optionalPdf && (
        <section className="pdf-resource" aria-label="Document PDF du coding style">
          <div className="pdf-resource-heading">
            <span className="pdf-icon" aria-hidden="true">PDF</span>
            <span>
              <strong>Guide C Coding Style — EPITECH</strong>
              <small>Document fourni · 30 pages</small>
            </span>
            <a href={lesson.optionalPdf} download>
              Télécharger le PDF
            </a>
          </div>
          <iframe
            className="pdf-preview"
            src={lesson.optionalPdf}
            title="Guide EPITECH C Coding Style en PDF"
          />
        </section>
      )}

      <LessonDetailControls />
      <div className="lesson-prose">
        {lesson.sections.map((section) => (
          <section className="prose-section" key={section.title}>
            <h2>{section.title}</h2>
            <p className="section-summary">{section.paragraphs[0]}</p>
            {section.code && (
              <div className="example-block">
                <div className="example-heading">
                  <span>EXEMPLE À ANALYSER</span>
                  <span>CODE SOURCE</span>
                </div>
                <pre className="lesson-code"><code>{section.code}</code></pre>
              </div>
            )}
            {(section.paragraphs.length > 1 || section.codeExplanation || section.note) && (
              <details className="section-details">
                <summary>Explication détaillée de cette notion</summary>
                {section.paragraphs.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.codeExplanation && (
                  <p className="code-explanation">{section.codeExplanation}</p>
                )}
                {section.note && (
                  <aside className="prose-note">
                    <strong>À RETENIR</strong>
                    <p>{section.note}</p>
                  </aside>
                )}
              </details>
            )}
          </section>
        ))}
      </div>

      <section className="exercise-box">
        <p className="kicker">MISE EN PRATIQUE</p>
        <h2>À toi de jouer</h2>
        <p>{lesson.exercise}</p>
        {lesson.exerciseHints && <ExerciseHints hints={lesson.exerciseHints} />}
        <p className="exercise-reminder">
          Avant de passer à la suite, explique chaque ligne avec tes mots,
          compile le code quand c’est possible et teste aussi un cas limite.
        </p>
      </section>

      {lesson.quiz && (
        <LessonQuiz
          question={lesson.quiz.question}
          options={lesson.quiz.options}
          answerIndex={lesson.quiz.answerIndex}
          explanation={lesson.quiz.explanation}
        />
      )}

      <CourseProgress
        lessons={lessons}
        currentSlug={lesson.slug}
      />

      <section className="related-resources" aria-labelledby="related-title">
        <p className="kicker">POUR APPROFONDIR</p>
        <h2 id="related-title">Lectures complémentaires</h2>
        <p className="resources-intro">
          Ces ressources externes complètent le cours ; elles sont publiées par
          leurs auteurs respectifs et ne sont pas des documents officiels d’EPITECH.
        </p>
        <div className="resource-list">
          {lesson.resources.map((resource) => (
            <a
              className="resource-link"
              href={resource.url}
              key={resource.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="resource-source">{resource.source}</span>
              <span className="resource-copy">
                <strong>{resource.title}</strong>
                <span>{resource.description}</span>
              </span>
              <span className="resource-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <nav className="chapter-navigation" aria-label="Navigation entre les chapitres">
        {previous ? (
          <Link className="chapter-link previous-link" href={`/docs/${previous.slug}`}>
            <span>← PRÉCÉDENT</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link className="chapter-link next-link" href={`/docs/${next.slug}`}>
            <span>SUIVANT →</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <Link className="chapter-link next-link" href="/">
            <span>PARCOURS TERMINÉ</span>
            <strong>Revoir les chapitres ↗</strong>
          </Link>
        )}
      </nav>
    </article>
  );
}
