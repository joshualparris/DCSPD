import { mcq, scenarioResponse, buildSections, buildFlashcards, buildScenarioPrompts, buildPracticalOutputs, createModule, enhanceModule, reviewSchedule, type LegacyTrainingModule, type ModuleEnhancement } from './helpers';

const baseCloud: LegacyTrainingModule = {
  id: 'cloud-models-saas-paas-iaas-daas',
  title: 'Cloud Models: SaaS, PaaS, IaaS, and DaaS',
  description:
    'Understand the main cloud service models and how they apply to modern school tools such as Teams, portals, and hosted apps.',
  domain: 'Cloud and Platforms',
  level: 'A+',
  estimatedMinutes: 20,
  tags: ['SaaS', 'PaaS', 'IaaS', 'DaaS', 'cloud basics'],
  learningObjectives: [
    'Define SaaS, PaaS, IaaS, and DaaS in plain English.',
    'Map common school tools like Teams and OneDrive to the correct cloud model.',
    'Explain the responsibility shift between the provider and the school ICT team.'
  ],
  dcsRelevance: [
    'Helps Josh explain why some tools are managed by the school while others are "just there" via the web.',
    'Supports better triage for service outages versus local connectivity issues.',
    'Builds vocabulary for modern identity and platform conversations.'
  ],
  sections: [
    {
      id: 'cloud-1',
      title: 'Cloud models at school',
      bodyMarkdown: `SaaS (Software as a Service) is the most common model for users: Teams, Outlook, and Sentral are examples where the provider runs the whole app.\n\nIaaS (Infrastructure as a Service) and PaaS (Platform as a Service) are more relevant to back-end hosting and development. DaaS (Desktop as a Service) provides a managed desktop environment through the cloud.`
    },
    {
      id: 'cloud-2',
      title: 'Who owns the fix?',
      bodyMarkdown: `In SaaS, the provider owns the application health, while the school owns identity, data, and access. In IaaS, the school ICT team owns more of the configuration and maintenance.\n\nUnderstanding this shift helps Josh route reports to the right owner.`
    },
    {
      id: 'cloud-3',
      title: 'Service health vs. local health',
      bodyMarkdown: `When a cloud tool fails, Level 1 should check the provider's status page, compare with other users, and confirm local internet path health.\n\nDon't assume a Teams outage is always a school network failure.`
    }
  ],
  flashcards: [
    { id: 'cloud-f1', front: 'What does SaaS stand for?', back: 'Software as a Service.' },
    { id: 'cloud-f2', front: 'Name a common school SaaS tool.', back: 'Teams, Outlook, or Sentral.' },
    { id: 'cloud-f3', front: 'What is the school ICT team usually responsible for in SaaS?', back: 'Identity, data, and user access.' },
    { id: 'cloud-f4', front: 'What is DaaS?', back: 'Desktop as a Service: a managed desktop environment via the cloud.' },
    { id: 'cloud-f5', front: 'Where should Josh check if a SaaS tool is down broadly?', back: "The provider's official service status page." },
    { id: 'cloud-f6', front: 'Why does cloud model knowledge help triage?', back: 'It tells you whether the issue is likely local or provider-side.' },
    { id: 'cloud-f7', front: 'Does SaaS mean the school ICT team has zero work to do?', back: 'No. Access, identity, and data still need management.' },
    { id: 'cloud-f8', front: 'What is the risk of assuming every failure is local?', back: 'Wasted time troubleshooting a provider-side outage.' }
  ],
  quiz: [
    mcq({
      id: 'cloud-q1',
      prompt: 'Which cloud model best fits a tool like Microsoft Teams or Outlook Web?',
      domain: 'Cloud models',
      difficulty: 'foundation',
      explanation: 'SaaS tools are delivered as complete applications over the web.',
      modelAnswer: 'SaaS (Software as a Service).',
      commonMistakes: ['Calling it IaaS', 'Assuming every app is PaaS'],
      dcsContext: 'Most student and staff apps at DCS are SaaS-based.',
      reviewSchedule,
      recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
      weakTopic: 'cloud-models',
      options: [
        { id: 'a', label: 'SaaS (Software as a Service)' },
        { id: 'b', label: 'IaaS (Infrastructure as a Service)' },
        { id: 'c', label: 'Local-only installation' },
        { id: 'd', label: 'Hardware as a Service' }
      ],
      correctOptionId: 'a'
    })
  ],
  scenarioPrompts: [
    {
      id: 'cloud-s1',
      title: 'Teams service outage',
      prompt: 'Work through a triage sequence when a major SaaS tool appears to be failing broadly.'
    }
  ],
  practicalOutputs: [
    {
      id: 'cloud-p1',
      title: 'Cloud service status guide',
      description: 'Build a list of official status pages for the school’s most critical cloud tools.'
    }
  ]
};

const cloudEnhancement: ModuleEnhancement = {
  estimatedMinutes: 20,
  addTags: ['DaaS', 'BYOD', 'hosted desktop', 'trade-offs'],
  addSections: buildSections('cloud-deepen', [
    {
      title: 'Where DaaS becomes practical in schools',
      bodyMarkdown:
        'DaaS thinking matters when users need a Windows-only or school-managed application from BYOD or mixed devices. Instead of giving every personal device direct local install complexity, a hosted desktop can centralise the app environment.',
      takeaway: 'DaaS is often about access design and supportability, not just cloud vocabulary.'
    },
    {
      title: 'Hosted desktop versus local install trade-offs',
      bodyMarkdown:
        'Local install plus VPN may feel simple until device diversity, support time, and data handling become messy. A hosted desktop can improve control and consistency, but it also depends on connectivity and a good user experience path.',
      takeaway: 'Cloud-model choices are support trade-offs, not one-word labels.'
    }
  ]),
  addFlashcards: buildFlashcards('cloud-deepen', [
    ['When might DaaS be attractive in a school?', 'When BYOD or mixed devices need controlled access to a desktop-style app environment.'],
    ['What is one benefit of hosted desktop over many local installs?', 'Consistency and centralised support.'],
    ['What is one cost of hosted desktop?', 'It relies heavily on connectivity and the user session path.'],
    ['Why compare hosted desktop with VPN plus local install?', 'Because the trade-off is about control, supportability, and user experience.']
  ]),
  addQuiz: [
    mcq({
      id: 'cloud-q5',
      prompt: 'Which option best fits a school that needs BYOD users to access a Windows-only app without managing many local installs?',
      domain: 'Cloud models',
      difficulty: 'stretch',
      explanation: 'DaaS becomes relevant when the desktop experience itself is the service.',
      modelAnswer:
        'A hosted desktop or DaaS-style approach may fit best because it centralises the application environment instead of depending on many local installations.',
      commonMistakes: ['Treating every app decision as SaaS by default', 'Ignoring the desktop-session layer'],
      dcsContext: 'The goal is access design that stays supportable for mixed devices.',
      reviewSchedule,
      recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
      weakTopic: 'cloud-models',
      options: [
        { id: 'a', label: 'DaaS or hosted desktop approach' },
        { id: 'b', label: 'Assume every BYOD device should install it locally' },
        { id: 'c', label: 'Guest Wi-Fi segmentation only' },
        { id: 'd', label: 'Delete the browser cache' }
      ],
      correctOptionId: 'a'
    }),
    scenarioResponse({
      id: 'cloud-q6',
      prompt: 'Explain the trade-off between VPN plus local install and a hosted desktop for a school-only application.',
      domain: 'Cloud models',
      difficulty: 'challenge',
      explanation: 'This is an architecture judgement question, not a terminology quiz.',
      modelAnswer:
        'VPN plus local install can reduce session dependency but increases variation across devices, local support effort, and data-handling complexity. A hosted desktop centralises control and consistency, but depends on stable connectivity and a usable remote session experience.',
      commonMistakes: ['Calling one option universally best', 'Ignoring support and device-diversity trade-offs'],
      dcsContext: 'The right answer depends on supportability as much as on technology preference.',
      reviewSchedule,
      recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
      weakTopic: 'cloud-models',
      rubric: ['Mentions both benefits and costs', 'Frames the decision as a trade-off', 'Uses school support context']
    })
  ]
};

export const cloudModules = [
  enhanceModule(baseCloud, cloudEnhancement)
];
