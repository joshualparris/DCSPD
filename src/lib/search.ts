import { modules as baseModules } from '../data/modules';
import { scenarios as baseScenarios } from '../data/scenarios';
import { academicSubjects as baseAcademicSubjects } from '../data/academicSubjects';
import { roleplayScenarios as baseRoleplays } from '../data/roleplayScenarios';
import { getCustomModules, getCustomRoleplays, getCustomScenarios, getCustomAcademic } from './customModules';
import { AcademicSubject } from '../types/academic';
import { Scenario } from '../types/scenarios';
import { TrainingModule } from '../types/training';

export type SearchResultType = 'module' | 'scenario' | 'academic' | 'flashcard' | 'question' | 'roleplay';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  tags?: string[];
  context?: string; // e.g., 'From Cybersecurity module'
}

export function globalSearch(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  // Get all data including custom uploads
   const modules = [...baseModules, ...getCustomModules()];
   const scenarios = [...baseScenarios, ...getCustomScenarios()];
   const academicSubjects = [...baseAcademicSubjects, ...getCustomAcademic()];
   const roleplays = [...baseRoleplays, ...getCustomRoleplays()];

  // Search Modules
  modules.forEach((m) => {
    if (
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q)) ||
      m.sections.some((s) => s.title.toLowerCase().includes(q) || s.bodyMarkdown.toLowerCase().includes(q))
    ) {
      results.push({
        id: m.id,
        type: 'module',
        title: m.title,
        description: m.description,
        href: `/modules/${m.id}`,
        tags: m.tags
      });
    }

    // Search Flashcards within modules
    m.flashcards.forEach((f, idx) => {
      if (f.front.toLowerCase().includes(q) || f.back.toLowerCase().includes(q)) {
        results.push({
          id: `${m.id}-f-${idx}`,
          type: 'flashcard',
          title: `Flashcard: ${f.front.substring(0, 50)}${f.front.length > 50 ? '...' : ''}`,
          description: f.back.substring(0, 100) + (f.back.length > 100 ? '...' : ''),
          href: `/modules/${m.id}?tab=flashcards`,
          context: `From module: ${m.title}`
        });
      }
    });

    // Search Questions within modules
    m.quiz.forEach((qItem) => {
      if (qItem.prompt.toLowerCase().includes(q) || (qItem.explanation && qItem.explanation.toLowerCase().includes(q))) {
        results.push({
          id: qItem.id,
          type: 'question',
          title: `Question: ${qItem.prompt.substring(0, 50)}${qItem.prompt.length > 50 ? '...' : ''}`,
          description: qItem.explanation || 'Module assessment question.',
          href: `/modules/${m.id}?tab=quiz`,
          context: `From module: ${m.title}`
        });
      }
    });
  });

  // Search Scenarios
  scenarios.forEach((s) => {
    if (
      s.title.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.initialReport.toLowerCase().includes(q) ||
      s.focus.some((f) => f.toLowerCase().includes(q))
    ) {
      results.push({
        id: s.id,
        type: 'scenario',
        title: s.title,
        description: s.summary,
        href: `/scenarios/${s.id}`,
        tags: s.focus
      });
    }
  });

  // Search Academic Subjects
  academicSubjects.forEach((sub) => {
    const topicMatch = sub.topics.some(t => t.title.toLowerCase().includes(q) || t.dcsConnection.toLowerCase().includes(q));
    const siloMatch = sub.silos.some(s => s.text.toLowerCase().includes(q) || s.plainEnglish.toLowerCase().includes(q));
    const weeklyMatch = sub.weeklyModules?.some(w => w.title.toLowerCase().includes(q) || w.overview.toLowerCase().includes(q));

    if (
      sub.title.toLowerCase().includes(q) ||
      sub.code.toLowerCase().includes(q) ||
      sub.summary.toLowerCase().includes(q) ||
      topicMatch ||
      siloMatch ||
      weeklyMatch
    ) {
      results.push({
        id: sub.id,
        type: 'academic',
        title: `${sub.code}: ${sub.title}`,
        description: sub.summary,
        href: `/academic-pd/subjects/${sub.id}`,
        context: `${sub.track} track - ${sub.provider}`
      });
    }
  });

  // Search Roleplays
  roleplays.forEach((r) => {
    if (
      r.persona.toLowerCase().includes(q) ||
      r.issueTitle.toLowerCase().includes(q) ||
      r.scenario.toLowerCase().includes(q) ||
      r.archetype.toLowerCase().includes(q) ||
      r.focus.some((f) => f.toLowerCase().includes(q))
    ) {
      results.push({
        id: r.id,
        type: 'roleplay',
        title: `Roleplay: ${r.persona}`,
        description: r.issueTitle,
        href: `/simulations/roleplay`,
        tags: r.focus,
        context: r.archetype
      });
    }
  });

  return results;
}
