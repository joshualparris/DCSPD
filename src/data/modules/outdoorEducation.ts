import type { TrainingModule } from '../../types/training';
import { mcq, scenarioResponse, reviewSchedule, type LegacyTrainingModule } from './helpers';

function createOutdoorModule(base: LegacyTrainingModule): TrainingModule {
  return {
    ...base,
    modulePattern: {
      diagnosticQuestions: base.quiz.slice(0, 2).map((question, index) => ({
        id: `${base.id}-diagnostic-${index + 1}`,
        prompt: question.prompt,
        expectedFocus: question.modelAnswer
      })),
      explainBackPrompt: {
        id: `${base.id}-explain-back`,
        title: 'Teach it back',
        prompt: `Explain ${base.title} in plain English as though you were briefing another outdoor educator before a field day.`,
        supportText: 'Use one concrete field example. Avoid hiding behind terminology.'
      },
      cornellPrompt: {
        id: `${base.id}-cornell`,
        title: 'Field notebook reflection',
        prompt: `Write three cue questions, a five-sentence summary, and one practical field application for ${base.title}.`,
        supportText: 'Keep it short enough to revisit before an outdoor programme.'
      },
      sq3rPrompt: {
        id: `${base.id}-sq3r`,
        title: 'Revisit the original subject',
        prompt: `Survey the source material for ${base.title}, write three questions, read for answers, recite the ideas from memory, then review what you missed.`,
        supportText: 'The goal is active recall, not rereading everything.'
      },
      memoryPrompt: {
        id: `${base.id}-memory`,
        title: 'One-minute field card',
        prompt: `Make a one-minute field card for ${base.title}: three core ideas, one common mistake, one decision cue, and one example.`,
        mnemonicHint: base.tags.slice(0, 3).join(' / ')
      }
    }
  };
}

const environmentalInterpretation: LegacyTrainingModule = {
  id: 'outdoor-ed-environmental-interpretation',
  title: 'Outdoor Ed: Environmental Interpretation',
  description: 'Revisit OED2EI: turn natural and cultural information into meaningful, audience-centred learning experiences.',
  domain: 'Foundations',
  level: 'L2',
  targetEnvironment: 'Generic',
  estimatedMinutes: 25,
  tags: ['Outdoor Education', 'OED2EI', 'interpretation', 'place', 'learning'],
  learningObjectives: [
    'Distinguish interpretation from simply delivering environmental facts.',
    'Design an interpretive activity around a clear theme, audience and place.',
    'Connect interpretation with learning theory and visitor experience.',
    'Critique your own interpretation practice and identify how to improve it.'
  ],
  dcsRelevance: [
    'Useful for excursions, camps, environmental education and any learning experience where place itself becomes teaching material.'
  ],
  sections: [
    {
      id: 'oe-ei-1',
      title: 'Information is not yet interpretation',
      bodyMarkdown: `Environmental interpretation is not a data dump. The educator selects a meaningful idea about a place and helps learners make a connection with it. A useful sequence is **place → theme → audience → experience → reflection**.\n\nA fact such as “river red gums tolerate flooding” becomes interpretation when learners are invited to notice evidence, connect it with the river's behaviour, and ask what life here demands of a tree.\n\nSource spine: La Trobe OED2EI (2018), which focused on interpretation in education and nature tourism, natural and cultural settings, interpretive skill, and critical evaluation of practice.\n\nhttps://www.latrobe.edu.au/students/your-course/subjects/2018/oed2ei-environ-interpretation`
    },
    {
      id: 'oe-ei-2',
      title: 'Theme, audience and provocation',
      bodyMarkdown: `Strong interpretation has a point. Before choosing facts, decide what you want people to leave **thinking or noticing**. Then fit the experience to the audience's age, prior knowledge, interests and context.\n\nUseful test: can you finish the sentence **“After this, I want the group to see this place as…”**? If not, the activity probably has information but no interpretive theme.`
    },
    {
      id: 'oe-ei-3',
      title: 'Natural and cultural stories belong together',
      bodyMarkdown: `Landscapes are ecological and cultural at the same time. Interpretation can connect vegetation, water, geology and wildlife with human histories, land use and relationships to place.\n\nGood practice avoids pretending that one short explanation exhausts the meaning of a place. Ask whose knowledge is being presented, what is uncertain, and when local or First Nations knowledge requires appropriate authority rather than casual retelling.`
    }
  ],
  flashcards: [
    { id: 'oe-ei-f1', front: 'What is the difference between environmental information and interpretation?', back: 'Information supplies facts; interpretation organises selected facts into meaning and connection for a particular audience in a particular place.' },
    { id: 'oe-ei-f2', front: 'What four things should be clear before an interpretive activity?', back: 'The place or resource, the audience, the central theme, and the experience or method.' },
    { id: 'oe-ei-f3', front: 'Why evaluate your own interpretation?', back: 'To test whether learners actually connected with the intended meaning, not merely whether you delivered the content.' },
    { id: 'oe-ei-f4', front: 'Why combine natural and cultural interpretation?', back: 'Because landscapes are shaped by both ecological processes and human relationships, histories and decisions.' }
  ],
  quiz: [
    mcq({
      id: 'oe-ei-q1',
      prompt: 'Which activity best demonstrates environmental interpretation rather than simple information delivery?',
      domain: 'Outdoor Education - Interpretation',
      difficulty: 'foundation',
      explanation: 'Interpretation connects evidence in the place with a meaningful idea and invites the learner to think.',
      modelAnswer: 'Using features at the site to help learners discover and discuss a central meaning about the place.',
      commonMistakes: ['Equating more facts with better interpretation', 'Choosing an activity before identifying the audience or theme'],
      reviewSchedule,
      recommendedModuleId: 'outdoor-ed-environmental-interpretation',
      weakTopic: 'communication',
      options: [
        { id: 'a', label: 'Read a list of ten species names aloud' },
        { id: 'b', label: 'Use what learners can see at the site to reveal a theme about how the ecosystem works' },
        { id: 'c', label: 'Give everyone a glossary to memorise' },
        { id: 'd', label: 'Avoid questions so the facts remain accurate' }
      ],
      correctOptionId: 'b'
    })
  ],
  scenarioPrompts: [
    {
      id: 'oe-ei-s1',
      title: 'Two minutes beside a river red gum',
      prompt: 'You have Year 8 students beside an inland river. Build a two-minute interpretive experience around a river red gum without starting with a lecture.'
    }
  ],
  practicalOutputs: [
    {
      id: 'oe-ei-p1',
      title: 'Two-minute interpretation',
      description: 'Write and rehearse one short place-based interpretation for a feature you could actually encounter around Dubbo.'
    }
  ]
};

const leadershipAndSafety: LegacyTrainingModule = {
  id: 'outdoor-ed-leadership-safety',
  title: 'Outdoor Ed: Leadership, Groups & Safety',
  description: 'Revisit OED2OLA and OED2OLB themes: leadership, facilitation, judgement, group process and ethical safety decisions.',
  domain: 'Foundations',
  level: 'L2',
  targetEnvironment: 'Generic',
  estimatedMinutes: 30,
  tags: ['Outdoor Education', 'OED2OLA', 'leadership', 'facilitation', 'risk'],
  learningObjectives: [
    'Distinguish leadership, instruction and facilitation in an outdoor setting.',
    'Choose leadership behaviour in response to group capability, task and environment.',
    'Use judgement to balance learning opportunity with physical and psychological safety.',
    'Recognise how self-efficacy, motivation and attribution can shape group behaviour.'
  ],
  dcsRelevance: ['Transferable to camps, excursions, group supervision and experiential learning activities.'],
  sections: [
    {
      id: 'oe-ls-1',
      title: 'Leadership is a relationship, not a personality trait',
      bodyMarkdown: `Outdoor leadership is not simply “being confident”. The leader reads the **people, task, environment and learning purpose**, then chooses how much direction, coaching, facilitation or autonomy the group needs.\n\nLa Trobe's OED2OLA explicitly linked outdoor leadership with communication, facilitation, instruction, experiential learning and group development.\n\nhttps://www.latrobe.edu.au/students/your-course/subjects/2018/oed2ola-leading-groups-in-outdoor-environments`
    },
    {
      id: 'oe-ls-2',
      title: 'Safety and learning are not opposites',
      bodyMarkdown: `Outdoor education deliberately includes uncertainty and challenge, but the educational value does not come from unmanaged danger. Good judgement asks: **What is the learning value? What can go wrong? How capable is this group? What has changed? What margin do we have?**\n\nA plan made yesterday is not enough when weather, water, fatigue, behaviour or equipment changes today.`
    },
    {
      id: 'oe-ls-3',
      title: 'What people believe changes what they attempt',
      bodyMarkdown: `Self-efficacy, motivation and attribution affect participation. A learner who interprets one failed attempt as “I am bad at this” needs a different intervention from someone who is reckless because success has felt easy.\n\nOutdoor leaders can shape learning by framing challenge, giving useful feedback, adjusting task difficulty and helping people attribute outcomes to controllable strategies rather than fixed identity.`
    }
  ],
  flashcards: [
    { id: 'oe-ls-f1', front: 'What four things should an outdoor leader continually read?', back: 'People, task, environment and learning purpose.' },
    { id: 'oe-ls-f2', front: 'Instruction vs facilitation?', back: 'Instruction directly teaches or directs; facilitation structures conditions and questions so the group can make meaning or decisions.' },
    { id: 'oe-ls-f3', front: 'What makes a risk educationally defensible?', back: 'A worthwhile learning purpose, proportionate controls, suitable participant capability, ongoing monitoring and an adequate safety margin.' },
    { id: 'oe-ls-f4', front: 'What is self-efficacy?', back: 'A person’s belief in their capability to perform a task or meet a challenge.' }
  ],
  quiz: [
    scenarioResponse({
      id: 'oe-ls-q1',
      prompt: 'A capable group is becoming tired, weather is deteriorating, and the planned activity is no longer necessary to meet the learning goal. What should guide your decision?',
      domain: 'Outdoor Education - Leadership',
      difficulty: 'stretch',
      explanation: 'Leadership judgement is dynamic. The plan is subordinate to current conditions, participant capability and the educational purpose.',
      modelAnswer: 'Reassess current hazards, fatigue, group capability, remaining margins and the learning purpose; modify or abandon the activity if the additional exposure no longer has sufficient value.',
      commonMistakes: ['Continuing because the itinerary says so', 'Treating cancellation as leadership failure'],
      reviewSchedule,
      recommendedModuleId: 'outdoor-ed-leadership-safety',
      weakTopic: 'security-risk-judgement',
      rubric: ['Reassesses changing conditions', 'References learning purpose', 'Protects safety margin', 'Allows modification or cancellation']
    })
  ],
  scenarioPrompts: [
    { id: 'oe-ls-s1', title: 'The plan is no longer the best plan', prompt: 'Work through a decision when weather, fatigue and group confidence have all changed since the morning briefing.' }
  ],
  practicalOutputs: [
    { id: 'oe-ls-p1', title: 'Leadership decision card', description: 'Write a pocket-sized PEOPLE / TASK / ENVIRONMENT / PURPOSE decision prompt.' }
  ]
};

const ecologiesAndPlace: LegacyTrainingModule = {
  id: 'outdoor-ed-ecologies-place',
  title: 'Outdoor Ed: Ecologies, Place & Programme Design',
  description: 'Revisit OED3TPD and OED3EO: ecological approaches to learning, place, culture, curriculum and coherent programme design.',
  domain: 'Foundations',
  level: 'L2',
  targetEnvironment: 'Generic',
  estimatedMinutes: 30,
  tags: ['Outdoor Education', 'OED3TPD', 'OED3EO', 'ecology', 'place', 'programme design'],
  learningObjectives: [
    'Explain an ecological view of learning as relationships among people, place, culture and activity.',
    'Design an outdoor programme whose activities serve a coherent educational purpose.',
    'Critique common cultural assumptions about “the outdoors” and “the bush”.',
    'Evaluate an outdoor programme using evidence rather than memorable moments alone.'
  ],
  dcsRelevance: ['Useful for designing camps and place-responsive learning rather than activity lists.'],
  sections: [
    {
      id: 'oe-ep-1',
      title: 'Learning happens in relationships',
      bodyMarkdown: `An ecological approach asks more than “what did the individual learn?” It pays attention to relationships among learners, educators, place, culture, programme structures, materials and histories. Change one part and the learning ecology changes.\n\nOED3TPD used ecological approaches to examine curriculum, programme development, implementation and evaluation.\n\nhttps://www.latrobe.edu.au/students/your-course/subjects/2019/oed3tpd-ecologies-of-outdoor-learning`
    },
    {
      id: 'oe-ep-2',
      title: 'A programme is not an itinerary',
      bodyMarkdown: `A coherent programme begins with educational intentions and then chooses places, activities, sequencing and facilitation that serve them. “Four days outdoors” is logistics; a programme explains **why these experiences, in this order, with these learners, here**.\n\nEvaluation should look for evidence of intended and unintended outcomes, not only enjoyment or completion.`
    },
    {
      id: 'oe-ep-3',
      title: 'Question the idea of “the bush”',
      bodyMarkdown: `OED3EO examined social and cultural ideas about outdoor education, including discourses around “the outdoors” and “the bush”, curriculum and global citizenship.\n\nThe useful revision question is: **what assumptions are hidden inside the way this programme describes nature, adventure, remoteness, competence or belonging?**\n\nhttps://www.latrobe.edu.au/students/your-course/subjects/2019/oed3eo-education-in-the-outdoors`
    }
  ],
  flashcards: [
    { id: 'oe-ep-f1', front: 'What does an ecological view of learning draw attention to?', back: 'Relationships among learner, group, educator, place, culture, activity, materials and wider systems.' },
    { id: 'oe-ep-f2', front: 'What makes an outdoor programme coherent?', back: 'Clear educational purposes linked deliberately to place, activities, sequence, facilitation and evaluation.' },
    { id: 'oe-ep-f3', front: 'Why critique the idea of “the bush”?', back: 'Because apparently neutral outdoor language can carry cultural assumptions about nature, history, belonging, remoteness and whose knowledge matters.' },
    { id: 'oe-ep-f4', front: 'What should programme evaluation ask besides “did they enjoy it”?', back: 'Whether intended learning occurred, what evidence supports that, what unintended outcomes occurred, and what should change next time.' }
  ],
  quiz: [
    mcq({
      id: 'oe-ep-q1',
      prompt: 'Which statement best describes an educationally coherent outdoor programme?',
      domain: 'Outdoor Education - Ecologies',
      difficulty: 'foundation',
      explanation: 'Programme coherence comes from alignment between purpose, learners, place, activities, facilitation and evaluation.',
      modelAnswer: 'Activities and places are deliberately selected and sequenced to serve clear learning purposes and are evaluated against them.',
      commonMistakes: ['Equating busyness with learning', 'Treating a memorable trip as proof of educational effectiveness'],
      reviewSchedule,
      recommendedModuleId: 'outdoor-ed-ecologies-place',
      weakTopic: 'soft-skills',
      options: [
        { id: 'a', label: 'The programme contains as many adventure activities as possible' },
        { id: 'b', label: 'Every day is full from breakfast until dinner' },
        { id: 'c', label: 'Activities, place, sequencing and facilitation are aligned with explicit educational purposes' },
        { id: 'd', label: 'Participants report that the trip was fun' }
      ],
      correctOptionId: 'c'
    })
  ],
  scenarioPrompts: [
    { id: 'oe-ep-s1', title: 'Design backwards from learning', prompt: 'Design a one-day programme whose goal is for learners to notice how people and river systems shape one another. Choose activities only after stating the learning goal.' }
  ],
  practicalOutputs: [
    { id: 'oe-ep-p1', title: 'One-page programme logic', description: 'Create Purpose → Place → Experience → Facilitation → Evidence for one outdoor learning day.' }
  ]
};

const bushAndRiverTeaching: LegacyTrainingModule = {
  id: 'outdoor-ed-bush-river-teaching',
  title: 'Outdoor Ed: Teaching in Bush & River Environments',
  description: 'Revisit OED3TBE, OED2REF and OED3TRE: teach with the environment while integrating travel skill, interpretation, group management and safety.',
  domain: 'Foundations',
  level: 'L2',
  targetEnvironment: 'Generic',
  estimatedMinutes: 35,
  tags: ['Outdoor Education', 'OED3TBE', 'OED3TRE', 'OED2REF', 'bush', 'river'],
  learningObjectives: [
    'Use the local environment itself as primary learning material.',
    'Integrate technical skill, environmental knowledge, pedagogy and group management.',
    'Plan for dynamic environmental hazards without reducing the experience to hazard avoidance.',
    'Use cautious self-appraisal to improve field teaching.'
  ],
  dcsRelevance: ['Relevant to field teaching, bushwalking, paddling, excursion planning and environmental learning.'],
  sections: [
    {
      id: 'oe-br-1',
      title: 'The place is part of the curriculum',
      bodyMarkdown: `OED3TBE emphasised building relevant local knowledge and using the area itself as primary learning material. Before teaching, learn the place: ecology, landform, weather patterns, cultural context, access, hazards and the stories that can responsibly be told there.\n\nhttps://www.latrobe.edu.au/students/your-course/subjects/2019/oed3tbe-teaching-in-bush-env`
    },
    {
      id: 'oe-br-2',
      title: 'River competence is more than paddling',
      bodyMarkdown: `Your river subjects combined technical paddling with hydrology, ecology, natural and cultural history, interpretation, rescue, reflection and group leadership. OED3TRE then shifted toward **teaching** in the river environment: pedagogy, interpretation, group management and safe conduct.\n\nhttps://www.latrobe.edu.au/students/your-course/subjects/2019/oed2ref-river-environments-flat-water\n\nhttps://www.latrobe.edu.au/students/your-course/subjects/2019/oed3tre-teaching-in-river-enviro-flat`
    },
    {
      id: 'oe-br-3',
      title: 'Technical, pedagogical and environmental judgement interact',
      bodyMarkdown: `A technically skilled educator can still teach poorly; a gifted teacher can still make an unsafe field decision. Outdoor teaching requires these domains to operate together.\n\nBefore and during a session ask: **Do I understand this place? Can I perform and teach the required skills? Can this group do what I am asking? Is the method producing the intended learning? What has changed?**`
    }
  ],
  flashcards: [
    { id: 'oe-br-f1', front: 'What does it mean to use the environment as primary learning material?', back: 'Learners investigate and make meaning from the actual features, processes, histories and conditions of the place rather than treating it as scenery.' },
    { id: 'oe-br-f2', front: 'What domains come together in river teaching?', back: 'Technical paddling/rescue, environmental understanding, pedagogy, interpretation, group management and safety judgement.' },
    { id: 'oe-br-f3', front: 'Why does local knowledge matter to safety as well as teaching?', back: 'The same knowledge of terrain, water, weather, access and environmental patterns informs both educational opportunities and risk decisions.' },
    { id: 'oe-br-f4', front: 'What is cautious self-appraisal?', back: 'Critically reviewing your own competence and teaching without assuming that successful completion means every decision was good.' }
  ],
  quiz: [
    scenarioResponse({
      id: 'oe-br-q1',
      prompt: 'You are teaching on flat water. The group is technically coping, but they are so focused on paddling that the river has become merely a backdrop. How could you restore the environmental education purpose without compromising safety?',
      domain: 'Outdoor Education - Field Teaching',
      difficulty: 'challenge',
      explanation: 'The subject integrates technical travel with environmental interpretation and pedagogy; the solution should reconnect learners with place while retaining safe group control.',
      modelAnswer: 'Choose a safe pause or low-demand section, use an observable river feature to pose a focused interpretive question, connect it to hydrology/ecology/cultural context, then resume travel with a simple observation task.',
      commonMistakes: ['Adding a long lecture while boats drift', 'Assuming technical participation automatically creates environmental learning'],
      reviewSchedule,
      recommendedModuleId: 'outdoor-ed-bush-river-teaching',
      weakTopic: 'security-risk-judgement',
      rubric: ['Maintains group safety', 'Uses the actual place as learning material', 'Connects technical experience to environmental meaning', 'Uses an appropriate teaching moment']
    })
  ],
  scenarioPrompts: [
    { id: 'oe-br-s1', title: 'The environment has become scenery', prompt: 'Redesign a travel segment so learners still move efficiently but actively read the landscape or river as they go.' }
  ],
  practicalOutputs: [
    { id: 'oe-br-p1', title: 'Field teaching plan', description: 'Choose a local bush or river setting and write one objective, one environmental cue, one teaching method, one safety concern and one reflection question.' }
  ]
};

export const outdoorEducationModules: TrainingModule[] = [
  createOutdoorModule(environmentalInterpretation),
  createOutdoorModule(leadershipAndSafety),
  createOutdoorModule(ecologiesAndPlace),
  createOutdoorModule(bushAndRiverTeaching)
];
