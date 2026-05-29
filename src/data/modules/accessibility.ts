import { mcq, shortAnswer, orderSteps, scenarioResponse, buildSections, buildFlashcards, buildScenarioPrompts, buildPracticalOutputs, createModule, reviewSchedule } from './helpers';

export const accessibilityModules = [
  createModule({
    id: 'accessibility-assistive-technology',
    title: 'Accessibility and Assistive Technology',
    description:
      'Learn Web Content Accessibility Guidelines (WCAG) fundamentals, assistive technology, and how to support users with visual, auditory, motor, or cognitive disabilities. Understand legal requirements and inclusive design principles.',
    domain: 'Endpoint Support',
    level: 'L1',
    estimatedMinutes: 24,
    tags: ['accessibility', 'WCAG', 'assistive tech', 'screen readers', 'inclusive design'],
    learningObjectives: [
      'Understand WCAG 2.1 accessibility standards and their purpose.',
      'Recognize common assistive technologies and their use cases.',
      'Support users with disabilities safely and respectfully.',
      'Identify accessibility barriers and know how to report them.'
    ],
    dcsRelevance: [
      'Schools have a legal obligation to provide accessible technology and services.',
      'Many students and staff have disabilities; supporting them is part of inclusive education.',
      'Accessible design benefits everyone, not just users with disabilities.'
    ],
    sections: buildSections('accessibility-assistive-technology', [
      {
        title: 'WCAG 2.1 and accessibility standards',
        bodyMarkdown:
          'The Web Content Accessibility Guidelines (WCAG) are international standards for accessible web and digital content. WCAG 2.1 has three levels: A (minimum), AA (standard), and AAA (enhanced). Schools should aim for AA compliance. The guidelines cover four principles: Perceivable (content can be sensed), Operable (users can navigate), Understandable (content is clear), and Robust (works with assistive tech). Examples: images need alt text (Perceivable), buttons need keyboard access (Operable), language is clear (Understandable), and code is valid (Robust).',
        takeaway: 'WCAG AA is the standard; all four principles matter.'
      },
      {
        title: 'Common assistive technologies',
        bodyMarkdown:
          'Screen readers: software that reads text aloud for blind users (NVDA, JAWS, iOS VoiceOver). Magnifiers: enlarge text for low-vision users. Speech-to-text: users speak to control devices (Windows Narrator, iOS Voice Control). Captions: text of audio for deaf or hard-of-hearing users. Switch access: allows users with limited mobility to control devices. Predictive text: helps users with dyslexia or motor disabilities. High-contrast themes: help users with low vision. Level 1 support should be familiar with these and know when to suggest them to users.',
        takeaway: 'Assistive tech is available; know what is available and how to enable it.'
      },
      {
        title: 'Supporting users with disabilities',
        bodyMarkdown:
          'Listen and ask: if a user says they have a disability or need accommodation, listen without judgment and ask what would help. Provide options: multiple ways to do the same task (keyboard, mouse, touch). Use plain language: avoid jargon and keep sentences short. Test with users: involve users with disabilities in designing and testing solutions. Avoid assumptions: do not assume all users experience technology the same way. Level 1 support can enable high-contrast themes, activate screen readers, provide captions, and connect users with accessibility resources.',
        takeaway: 'Listen, ask, and provide options.'
      },
      {
        title: 'Accessibility barriers and how to report them',
        bodyMarkdown:
          'Common barriers: no alt text on images, keyboard navigation not working, no captions on videos, poor colour contrast, inaccessible forms, confusing navigation, and missing ARIA labels. If you encounter an accessibility barrier: document what the barrier is, which device or service is affected, which user cannot complete the task, and what assistive technology they were using. Report it to the development or operations team so it can be fixed.',
        takeaway: 'Document barriers clearly; they can usually be fixed.'
      },
      {
        title: 'Legal and ethical responsibility',
        bodyMarkdown:
          'Schools have a legal obligation under disability discrimination laws to provide equal access to digital services. Beyond legal obligation, accessibility is about respect and inclusion. Students and staff with disabilities should be able to use school technology just as easily as anyone else. Making technology accessible is not "special treatment"; it is basic fairness and smart design that helps everyone.',
        takeaway: 'Accessibility is a legal requirement and a human responsibility.'
      }
    ]),
    flashcards: buildFlashcards('accessibility-assistive-technology', [
      ['What is WCAG?', 'Web Content Accessibility Guidelines—international standards for accessible web and digital content.'],
      ['What does WCAG AA mean?', 'The standard level of accessibility compliance that schools should aim for.'],
      ['What are the four WCAG principles?', 'Perceivable (content can be sensed), Operable (navigable), Understandable (clear), Robust (works with assistive tech).'],
      ['What is a screen reader?', 'Software that reads text aloud for blind or low-vision users (examples: NVDA, JAWS, VoiceOver).'],
      ['What is alt text?', 'Text description of an image that screen readers read aloud and appears if the image does not load.'],
      ['Why are captions important?', 'Captions provide the text of audio for deaf or hard-of-hearing users.'],
      ['What is high-contrast theme?', 'A visual setting that increases the contrast between text and background, helpful for low-vision users.'],
      ['What should you do if a user says they need accessibility support?', 'Listen without judgment, ask what would help, and provide options or connect them with resources.']
    ]),
    quiz: [
      mcq({
        id: 'a11y-q1',
        prompt: 'A student using a screen reader cannot access a form on the school website. The form buttons have no labels. What is the accessibility barrier?',
        domain: 'Accessibility',
        difficulty: 'foundation',
        explanation: 'Screen readers need text labels to read buttons aloud.',
        modelAnswer: 'The buttons are missing ARIA labels or text descriptions, so the screen reader cannot tell the user what each button does. This violates WCAG Operable principle.',
        commonMistakes: ['Assuming the student should "just use a mouse"', 'Blaming the user instead of the design'],
        dcsContext: 'Many students rely on screen readers; unlabeled buttons are a major barrier.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-assistive-technology',
        weakTopic: 'communication',
        options: [
          { id: 'a', label: 'The student should just use a mouse instead of a screen reader.' },
          { id: 'b', label: 'The buttons are missing text labels or ARIA descriptions; the screen reader cannot identify them.' },
          { id: 'c', label: 'Screen readers do not support forms; the student needs different software.' },
          { id: 'd', label: 'The school should disable the form for screen reader users.' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'a11y-q2',
        prompt: 'Explain the difference between alt text and a caption, and when each is used.',
        domain: 'Accessibility',
        difficulty: 'stretch',
        explanation: 'Alt text is for images; captions are for audio or video.',
        modelAnswer:
          'Alt text is a text description of an image that screen readers read aloud. Captions are the text of audio or video content for deaf or hard-of-hearing users. Use alt text on every image; use captions on every video or audio recording.',
        commonMistakes: ['Using alt text for video', 'Forgetting captions', 'Writing unhelpful alt text like "image"'],
        dcsContext: 'Both are required for WCAG AA compliance.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-assistive-technology',
        weakTopic: 'communication',
        rubric: ['Distinguishes alt text and captions', 'Explains use cases', 'Mentions WCAG compliance'],
        keywordHints: ['image', 'audio', 'screen reader', 'deaf', 'description']
      }),
      orderSteps({
        id: 'a11y-q3',
        prompt: 'Order the steps for making a simple document more accessible.',
        domain: 'Accessibility',
        difficulty: 'stretch',
        explanation: 'Perceivable and Understandable matter for documents.',
        modelAnswer: 'Use clear heading hierarchy, ensure high colour contrast, add alt text to images, use plain language, test with a screen reader, then ask a user with a disability for feedback.',
        commonMistakes: ['Skipping colour contrast', 'Not testing with assistive tech'],
        dcsContext: 'Many documents are not accessible; these steps fix most issues.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-assistive-technology',
        weakTopic: 'communication',
        steps: [
          { id: 'headings', label: 'Use clear heading hierarchy (Heading 1, 2, 3)' },
          { id: 'contrast', label: 'Ensure text and background have high colour contrast' },
          { id: 'alt', label: 'Add alt text to all images' },
          { id: 'language', label: 'Use plain language and short sentences' },
          { id: 'test', label: 'Test with a screen reader' },
          { id: 'feedback', label: 'Ask a user with a disability for feedback' }
        ],
        correctOrder: ['headings', 'contrast', 'alt', 'language', 'test', 'feedback'],
        rubric: ['Addresses Perceivable and Understandable', 'Tests with assistive tech', 'Seeks user feedback']
      }),
      scenarioResponse({
        id: 'a11y-q4',
        prompt: 'A teacher shows you a video on the school website but tells you it has no captions. A deaf student in their class cannot access the lesson. Explain what is missing and how you would report it.',
        domain: 'Accessibility',
        difficulty: 'challenge',
        explanation: 'Captions are legally required and ethically essential.',
        modelAnswer:
          'The video is missing captions, which is a WCAG Perceivable barrier. This violates accessibility standards and may violate disability law. Report it to the content team with the video link, note that it lacks captions, and escalate that a student cannot access the lesson without them. Captions should be added before the next class.',
        commonMistakes: ['Telling the student to find another video', 'Delaying the report'],
        dcsContext: 'Videos without captions lock deaf students out of learning.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-assistive-technology',
        weakTopic: 'communication',
        rubric: ['Identifies missing captions', 'Frames as legal and ethical issue', 'Escalates for urgent fix']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('accessibility-assistive-technology', [
      {
        title: 'Supporting a screen reader user',
        prompt: 'A student using a screen reader needs help accessing an online learning platform. Describe how you would support them and what you would look for in terms of accessibility.'
      },
      {
        title: 'Reporting an accessibility barrier',
        prompt: 'You find that a school form is not keyboard navigable. Write a report explaining the barrier and how it affects users.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('accessibility-assistive-technology', [
      {
        title: 'Accessibility Audit Checklist',
        description: 'Create a checklist for auditing a simple webpage or document for WCAG AA compliance (headings, alt text, contrast, captions, keyboard navigation).'
      },
      {
        title: 'Assistive Technology Quick Reference',
        description: 'Design a one-page guide listing common assistive technologies available in Windows and macOS, with instructions for enabling them.'
      }
    ])
  })
];
