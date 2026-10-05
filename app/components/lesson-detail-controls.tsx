"use client";

function setLessonDetails(open: boolean) {
  document
    .querySelectorAll<HTMLDetailsElement>(".lesson-document details.section-details")
    .forEach((details) => {
      details.open = open;
    });
}

export function LessonDetailControls() {
  return (
    <nav className="lesson-detail-controls" aria-label="Affichage des explications">
      <span>Explications détaillées</span>
      <button type="button" onClick={() => setLessonDetails(true)}>
        Tout afficher
      </button>
      <button type="button" onClick={() => setLessonDetails(false)}>
        Tout replier
      </button>
    </nav>
  );
}
