"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

type CourseItem = {
  slug: string;
  title: string;
};

const STORAGE_KEY = "epitech-c-course-progress";
const PROGRESS_EVENT = "course-progress-change";
const EMPTY_PROGRESS: string[] = [];
let cachedStorageValue: string | null | undefined;
let cachedProgress: string[] = EMPTY_PROGRESS;

function getCompletedSnapshot() {
  let saved: string | null = null;
  try {
    saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === cachedStorageValue) {
      return cachedProgress;
    }

    cachedStorageValue = saved;
    if (!saved) {
      cachedProgress = EMPTY_PROGRESS;
      return cachedProgress;
    }

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      throw new TypeError("Saved course progress must be an array.");
    }

    cachedProgress = parsed.filter(
      (slug): slug is string => typeof slug === "string",
    );
    return cachedProgress;
  } catch (error) {
    console.error("Could not read saved course progress.", error);
    cachedStorageValue = saved;
    cachedProgress = EMPTY_PROGRESS;
    return cachedProgress;
  }
}

function subscribeToProgress(onStoreChange: () => void) {
  function handleStorageChange(event: StorageEvent) {
    if (event.key === STORAGE_KEY || event.key === null) {
      cachedStorageValue = undefined;
      onStoreChange();
    }
  }

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(PROGRESS_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(PROGRESS_EVENT, onStoreChange);
  };
}

export function CourseProgress({
  lessons,
  currentSlug,
}: {
  lessons: CourseItem[];
  currentSlug?: string;
}) {
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const validSlugs = useMemo(
    () => new Set(lessons.map((lesson) => lesson.slug)),
    [lessons],
  );
  const savedCompleted = useSyncExternalStore(
    subscribeToProgress,
    getCompletedSnapshot,
    () => EMPTY_PROGRESS,
  );
  const completed = useMemo(
    () => savedCompleted.filter((slug) => validSlugs.has(slug)),
    [savedCompleted, validSlugs],
  );
  const currentIsComplete = currentSlug
    ? completed.includes(currentSlug)
    : false;
  const nextLesson = lessons.find((lesson) => !completed.includes(lesson.slug));
  const percent = lessons.length
    ? Math.round((completed.length / lessons.length) * 100)
    : 0;

  function toggleCurrentLesson() {
    if (!currentSlug) {
      return;
    }

    const nextCompleted = currentIsComplete
      ? completed.filter((slug) => slug !== currentSlug)
      : [...completed, currentSlug];

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCompleted));
      cachedStorageValue = JSON.stringify(nextCompleted);
      cachedProgress = nextCompleted;
      window.dispatchEvent(new Event(PROGRESS_EVENT));
      setStorageUnavailable(false);
    } catch (error) {
      console.error("Could not save course progress.", error);
      setStorageUnavailable(true);
    }
  }

  return (
    <section className="course-progress" aria-label="Progression du parcours">
      <div className="course-progress-top">
        <div>
          <p className="kicker">TA PROGRESSION</p>
          <strong>{completed.length} / {lessons.length} chapitres terminés</strong>
        </div>
        <span className="progress-percent">{percent}%</span>
      </div>
      <div
        className="course-progress-track"
        role="progressbar"
        aria-label="Progression des chapitres"
        aria-valuemin={0}
        aria-valuemax={lessons.length}
        aria-valuenow={completed.length}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
      {currentSlug ? (
        <button
          className={`completion-button ${currentIsComplete ? "is-complete" : ""}`}
          type="button"
          onClick={toggleCurrentLesson}
        >
          {currentIsComplete ? "✓ Chapitre terminé — annuler" : "Marquer ce chapitre comme terminé"}
        </button>
      ) : nextLesson ? (
        <p className="progress-next">
          À suivre : <Link href={`/docs/${nextLesson.slug}`}>{nextLesson.title} →</Link>
        </p>
      ) : (
        <p className="progress-next">Bravo, tu as terminé tous les chapitres !</p>
      )}
      {storageUnavailable && (
        <p className="progress-error" role="status">
          La progression n’a pas pu être enregistrée dans ce navigateur.
        </p>
      )}
    </section>
  );
}

export function LessonQuiz({
  question,
  options,
  answerIndex,
  explanation,
}: {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === answerIndex;

  function resetQuiz() {
    setSelected(null);
    setSubmitted(false);
  }

  return (
    <section className="quiz-box" aria-labelledby="quiz-title">
      <p className="kicker">VÉRIFIE TES ACQUIS</p>
      <h2 id="quiz-title">Question rapide</h2>
      <fieldset disabled={submitted}>
        <legend>{question}</legend>
        <div className="quiz-options">
          {options.map((option, index) => (
            <label className="quiz-option" key={option}>
              <input
                type="radio"
                name="lesson-quiz"
                checked={selected === index}
                onChange={() => setSelected(index)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {submitted ? (
        <div className={`quiz-feedback ${isCorrect ? "correct" : "incorrect"}`} role="status">
          <strong>{isCorrect ? "Bonne réponse." : "Pas tout à fait."}</strong>
          <p>{explanation}</p>
          <button type="button" onClick={resetQuiz}>Recommencer</button>
        </div>
      ) : (
        <button
          className="quiz-submit"
          type="button"
          disabled={selected === null}
          onClick={() => setSubmitted(true)}
        >
          Vérifier ma réponse
        </button>
      )}
    </section>
  );
}

export function ExerciseHints({ hints }: { hints: string[] }) {
  const [visibleHints, setVisibleHints] = useState(0);

  return (
    <div className="exercise-hints">
      {visibleHints > 0 && (
        <ol>
          {hints.slice(0, visibleHints).map((hint) => <li key={hint}>{hint}</li>)}
        </ol>
      )}
      {visibleHints < hints.length && (
        <button
          className="hint-button"
          type="button"
          onClick={() => setVisibleHints((visible) => visible + 1)}
        >
          Afficher un indice ({visibleHints}/{hints.length})
        </button>
      )}
    </div>
  );
}
