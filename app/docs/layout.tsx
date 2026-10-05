import Link from "next/link";
import { ThemePicker } from "@/app/components/theme-picker";
import { lessonGroups, lessons } from "@/lib/course";

export default function DocsLayout({
  children,
}: LayoutProps<"/docs">) {
  return (
    <div className="docs-shell">
      <header className="docs-header">
        <Link className="brand" href="/">
          <span>{"{"}</span> EPITECH <span>{"}"}</span>
        </Link>
        <Link className="docs-header-link" href="/">Documentation C</Link>
        <span className="docs-header-note">SUPPORT DE RÉVISION</span>
        <ThemePicker compact />
      </header>
      <div className="docs-frame">
        <aside className="docs-sidebar">
          <Link className="back-home" href="/">← Tous les chapitres</Link>
          <p className="sidebar-heading">PARCOURS PISCINE C</p>
          <nav aria-label="Chapitres du parcours">
            {lessonGroups.map((group) => (
              <div className="sidebar-group" key={group}>
                <p>{group}</p>
                {lessons.filter((lesson) => lesson.group === group).map((lesson) => (
                  <Link
                    className="sidebar-lesson"
                    href={`/docs/${lesson.slug}`}
                    key={lesson.slug}
                  >
                    <span>{String(lessons.indexOf(lesson) + 1).padStart(2, "0")}</span>
                    {lesson.title}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <div className="sidebar-note">
            <strong>CONSEIL</strong>
            <p>Compile tes exemples et teste aussi les cas limites.</p>
          </div>
        </aside>
        <main className="docs-main">{children}</main>
      </div>
    </div>
  );
}
