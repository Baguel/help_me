import Link from "next/link";
import { lessons } from "@/lib/course";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-topbar">
        <Link className="brand" href="/" aria-label="Accueil documentation C">
          <span>{"{"}</span> EPITECH <span>{"}"}</span>
        </Link>
        <span>ERREUR · 404</span>
      </div>

      <section className="not-found-content" aria-labelledby="not-found-title">
        <p className="kicker">SEGMENTATION FAULT · PAGE INTROUVABLE</p>
        <h1 id="not-found-title">Oups, mauvaise adresse.</h1>
        <p className="not-found-description">
          Le chemin demandé ne pointe vers aucune page. Vérifie l’URL ou reprends
          le parcours depuis le début.
        </p>

        <div className="not-found-terminal" aria-label="Sortie du terminal">
          <div className="terminal-titlebar">
            <span aria-hidden="true"><i /><i /><i /></span>
            <span>bash — erreur de navigation</span>
            <span>×</span>
          </div>
          <pre><code><span className="terminal-prompt">etu@piscine</span>:<span className="terminal-path">~/c</span>$ ./ouvrir_page{"\n"}<span className="terminal-error">erreur: page introuvable (404)</span>{"\n"}<span className="terminal-prompt">etu@piscine</span>:<span className="terminal-path">~/c</span>$ <span className="terminal-cursor" aria-hidden="true">▌</span></code></pre>
        </div>

        <div className="not-found-actions">
          <Link className="primary-link" href="/">
            <span aria-hidden="true">←</span> Retour à l’accueil
          </Link>
          <Link className="not-found-secondary" href={`/docs/${lessons[0].slug}`}>
            Reprendre le parcours <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className="not-found-footer">
        <span>STATUS: 404</span>
        <span>NO SUCH PAGE IN THIS DIRECTORY</span>
      </footer>
    </main>
  );
}
