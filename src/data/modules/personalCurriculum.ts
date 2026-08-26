import type { TrainingModule } from '../../types/training';
import { buildDefaultPattern, mcq, reviewSchedule, type LegacyTrainingModule } from './helpers';

type Item = [code: string, title: string, result?: string, status?: string];
type Group = { stream: string; qualification: string; year?: number; evidence: string; defaultStatus: string; items: Item[] };

const groups: Group[] = [
  { stream: 'Christian Studies', qualification: 'Certificate IV in Christian Studies (91529NSW)', year: 2013, evidence: 'Cornerstone transcript', defaultStatus: 'completed', items: [
    ['AB401A','Interpret & Apply the Book of Genesis Today','90% HD'],['AB402A','Interpret & Apply the Old Testament Prophets & Writings Today','83% D'],['AB403A','Interpret & Apply the New Testament Gospels Today','81% D'],['AB404A','Interpret & Apply the New Testament Acts & Letters Today','70% C'],['CC301A','Respond Biblically to Contemporary Challenges','75% D'],['CC401A','Respond to Contemporary Apologetic Issues','73% C'],['CC402A','Respond to Contemporary Social Issues','84% D'],['CS301A','Develop Foundations for Christian Spirituality','Pass'],['CS401A','Develop Christian Spirituality in Personal Life & Relationships','Pass'],['CS402A','Develop Christian Spirituality in Our World & Work','Pass'],['MS301A','Develop Biblical Perspectives for Christian Missional Life','Pass'],['MS401A','Develop Personal Christian Mission Skills','Pass'],['MS402A','Develop Vocational Christian Mission Skills','Pass'],['MISSION1A','Personal Mission Fieldwork','Pass'],['MISSION1B','Personal Mission Project','Pass']
  ]},
  { stream: 'Christian Studies', qualification: 'Diploma of Christian Studies (91528NSW)', year: 2015, evidence: 'Cornerstone prospectus and retained course material', defaultStatus: 'historical-course-material', items: [
    ['AB501A','Interpret & Apply Biblical Principles & Models for Mission Today'],['AB502A','Interpret & Apply the Bible to Christian Experience Today'],['CS501A','Develop Christian Spirituality in Missional Community'],['CC501A','Engage with Popular Culture'],['CC502A','Engage with Apologetic Challenges in Christian Mission'],['CC503A','Engage with Social Issues in Christian Mission'],['MS501A','Disciple Others Individually & in Small Groups'],['MS502A','Participate in Christian Mission to Youth'],['MS503A','Teach Scripture in Schools'],['ABL','Adventure-Based Learning'],['GROUP-FACILITATION','Group Facilitation']
  ]},
  { stream: 'Outdoor Education', qualification: 'Bachelor of Outdoor Education (Extended)', evidence: 'La Trobe academic record', defaultStatus: 'completed', items: [
    ['ABS0WOM','Wominjeka La Trobe: Indigenous Cultural Literacy for Higher Education','P'],['OED1AFE','Field Experience A','52 D'],['OED1AOL','Outdoor Living & Travel Skills','71 B'],['OED1RAL','Reading Australian Landscapes','58 D'],['OED1WKN','Ways of Knowing Nature','58 D'],['OED1BFE','Introduction to Winter Environments','71 B'],['OED1NS','Naturalist Studies','65 C'],['OED1OEE','Outdoor Environments','62 C'],['OED1WE','World Views and the Environment','68 C'],['OED2FEC','Field Experience C','75 B'],['OED2RCS','Regional Catchment Studies: Resources & Management','51 D'],['OED3OPF','Outdoor Environmental Practical Extension F (Double)','56 D'],['OED2OLB','Safety in Outdoor Environments','52 D after repeat','completed-after-repeat'],['OED2R','Rock Environments','0 N','attempted-not-completed'],['EDU1CC','Concepts of Communities','62 C'],['EDU1CCT','Childhood in Contemporary Times','77 B'],['OED2ACL','Australian Culture and Land','60 C'],['EDU3CTE','Connections Through Expression','81 A'],['OED2BE','Bush Environments','63 C'],['OED2EI','Environmental Interpretation','65 C'],['OED3CSE','City Studio & Environmental Dialogue','82 A'],['OED2OLA','Leading Groups in Outdoor Environments','81 A'],['OED2REF','River Environments (Flat Water)','72 B'],['OED3EO','Education in the Outdoors','76 B'],['OED3FED','Field Experience D','78 B'],['OED3TBE','Teaching in Bush Environments','55 D'],['OED3TRE','Teaching in River Environments (Flat Water)','72 B'],['OED3FEE','Field Experience E','80 A'],['OED3TPD','Ecologies of Outdoor Learning','79 B']
  ]},
  { stream: 'Teaching & Human Development', qualification: 'Bachelor of Education (Secondary)', evidence: 'La Trobe academic record', defaultStatus: 'advanced-standing', items: [['EDU1CAD','Child and Adolescent Development'],['EDU1DLC','Diverse Learning Communities']] },
  { stream: 'IT & Computing', qualification: 'Bachelor of Information Technology', year: 2020, evidence: 'La Trobe academic record', defaultStatus: 'completed', items: [['CSE1ITF','Information Technology Fundamentals','67 C'],['CSE1PE','Programming Environment','92 A'],['MAT1MIT','Mathematics for IT','71 B']] },
  { stream: 'Information, Library & Workplace Skills', qualification: 'TAFE NSW / VET', year: 2017, evidence: 'Authenticated USI VET transcript', defaultStatus: 'completed', items: [['BSBLIB304','Develop & Use Information Literacy Skills'],['BSBCUS201','Deliver a Service to Customers'],['ICTICT203','Operate Application Software Packages'],['BSBWOR203','Work Effectively With Others'],['BSBWHS302','Apply Knowledge of WHS Legislation in the Workplace',undefined,'credit-transfer'],['CUAIND202','Develop & Apply Knowledge of Information & Cultural Services Organisations',undefined,'withdrawn']] },
  { stream: 'Safety & Emergency Response', qualification: 'VET / Short Courses', evidence: 'Authenticated USI VET transcript', defaultStatus: 'completed', items: [['HLTAID001','Provide Cardiopulmonary Resuscitation'],['HLTAID003','Provide First Aid'],['SISOOPS305A','Provide First Aid in a Remote Location'],['SISXEMR001','Respond to Emergency Situations'],['SISXEMR002','Coordinate Emergency Responses'],['VU22927/VU21658','Manage Asthma Risks & Emergencies'],['VU23090/VU21800','Provide First Aid Management of Anaphylaxis'],['VU23091','Develop Risk-Minimisation Strategies for Anaphylaxis'],['SISXOHS101A','Follow Occupational Health & Safety Policies'],['SITHFAB021','Responsible Service of Alcohol']] },
  { stream: 'HSC Foundations', qualification: 'Higher School Certificate', year: 2012, evidence: 'Consolidated education profile', defaultStatus: 'completed', items: [['HSC-ENG-ADV','English Advanced'],['HSC-ENG-EXT1','English Extension 1'],['HSC-ENG-EXT2','English Extension 2'],['HSC-CAFS','Community & Family Studies'],['HSC-GEN-MATH','General Mathematics'],['HSC-VIS-ART','Visual Arts']] }
];

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const pretty = (value: string) => value.replaceAll('-', ' ');

const legacyModules: LegacyTrainingModule[] = groups.flatMap((group) => group.items.map(([code, title, result, statusOverride]) => {
  const status = statusOverride ?? group.defaultStatus;
  const id = `personal-${slug(code)}`;
  return {
    id,
    title: `${code} · ${title}`,
    description: `${group.stream} archive module from ${group.qualification}. Recorded status: ${pretty(status)}${result ? ` · ${result}` : ''}.`,
    domain: 'Foundations',
    level: 'L2',
    targetEnvironment: 'Generic',
    estimatedMinutes: 20,
    tags: ['Personal Curriculum', group.stream, code, status],
    learningObjectives: [
      `Reconstruct the central ideas and skills from ${title} before rereading source material.`,
      `Connect ${title} to present-day practice and adjacent subjects.`,
      'Distinguish remembered evidence from uncertainty and identify the next source to reopen.'
    ],
    dcsRelevance: ['Builds transferable judgement, communication, reflection or subject knowledge from prior formal study.'],
    mspRelevance: ['Use the same retrieval-first method to retain useful knowledge instead of relying on recognition alone.'],
    sections: [
      { id: `${id}-source`, title: 'Source-anchored restart', bodyMarkdown: `### ${title}\n\n**Study context:** ${group.qualification}${group.year ? ` (${group.year})` : ''}  \n**Status:** ${pretty(status)}${result ? ` · ${result}` : ''}  \n**Evidence:** ${group.evidence}\n\nThis module intentionally starts from the archive record. It does **not** invent the original subject content. Recall first; then deepen it from retained notes, readings, assignments and official records.` },
      { id: `${id}-recall`, title: 'Recall before rereading', bodyMarkdown: `Answer from memory: what were the three main ideas or skills in **${title}**? What concrete assignment, field experience, problem, text, discussion or practical task do you remember? What changed in your thinking or behaviour? Mark uncertain memories explicitly before checking the source.` },
      { id: `${id}-transfer`, title: 'Transfer it', bodyMarkdown: `Name one current situation where **${title}** still matters. Explain the connection, then write one retrieval question that would reveal whether you truly understand the subject rather than merely recognise its title.` }
    ],
    flashcards: [
      { id: `${id}-f1`, front: `Which stream contains “${title}”?`, back: group.stream },
      { id: `${id}-f2`, front: `Where was “${title}” studied?`, back: group.qualification },
      { id: `${id}-f3`, front: `What is its archive status?`, back: `${pretty(status)}${result ? ` · ${result}` : ''}` }
    ],
    quiz: [mcq({
      id: `${id}-q1`, prompt: `What is the strongest way to restart your knowledge of “${title}”?`, domain: group.stream,
      difficulty: 'foundation', explanation: 'Retrieval before rereading exposes real memory strength and makes later source review more useful.',
      modelAnswer: 'Attempt active recall, mark uncertainty, then compare with the original source material and correct the model.',
      commonMistakes: ['Rereading immediately and mistaking familiarity for recall', 'Inventing missing detail instead of marking uncertainty'],
      reviewSchedule, recommendedModuleId: id, weakTopic: 'communication',
      options: [
        { id: 'a', label: 'Reread everything before trying to remember anything' },
        { id: 'b', label: 'Recall first, mark uncertainty, then check the original sources' },
        { id: 'c', label: 'Assume the subject title is enough to prove mastery' },
        { id: 'd', label: 'Replace old course material with generic internet summaries' }
      ], correctOptionId: 'b'
    })],
    scenarioPrompts: [{ id: `${id}-s1`, title: 'Explain it from memory', prompt: `You have five minutes to brief someone on ${title}. State what you confidently remember, what you only partly remember, and which original source you would check next.` }],
    practicalOutputs: [{ id: `${id}-p1`, title: 'One-page memory reconstruction', description: `Create a one-page recall sheet for ${title}: key ideas, one concrete example, one present-day application, and three unanswered questions.` }]
  };
}));

export const personalCurriculumModules: TrainingModule[] = legacyModules.map((module) => ({
  ...module,
  modulePattern: buildDefaultPattern(module)
}));
