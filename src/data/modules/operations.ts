import { mcq, shortAnswer, orderSteps, scenarioResponse, buildSections, buildFlashcards, buildScenarioPrompts, buildPracticalOutputs, createModule, reviewSchedule } from './helpers';

export const operationsModules = [
  createModule({
    id: 'parent-portal-registration',
    title: 'Parent Portal Registration',
    description: 'Support parents through the Sentral portal registration process, including access keys and account setup.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 15,
    tags: ['Sentral', 'Parent Portal', 'registration', 'access keys'],
    learningObjectives: [
      'Explain the registration flow to parents.',
      'Troubleshoot common access key and email issues.',
      'Maintain a helpful and professional tone with parents.'
    ],
    dcsRelevance: [
      'Primary point of contact for parent technical issues.',
      'Ensures parents can access critical school information.'
    ],
    sections: buildSections('parent-portal-reg', [
      {
        title: 'The Registration Flow',
        bodyMarkdown: 'Parents must first create an account with their email, then use a school-provided access key to link to their children.',
        takeaway: 'Account first, access key second.'
      }
    ]),
    flashcards: buildFlashcards('parent-portal-reg', [
      ['What is the first step for a parent?', 'Create a portal account with their email address.'],
      ['What links a parent to their child?', 'The unique access key provided by the school.']
    ]),
    quiz: [
      mcq({
        id: 'ppr-q1',
        prompt: 'A parent says their access key "isn\'t working." What is the first check?',
        domain: 'Operations',
        difficulty: 'foundation',
        explanation: 'Check the simple things first.',
        modelAnswer: 'Verify the key matches exactly and they have already created a portal account.',
        commonMistakes: ['Resetting the whole system'],
        dcsContext: 'Parents often skip the account creation step.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'communication',
        options: [
          { id: 'a', label: 'Verify the key and account status.' },
          { id: 'b', label: 'Tell them to call the developer.' },
          { id: 'c', label: 'Assume the server is down.' },
          { id: 'd', label: 'Give them a different child\'s key.' }
        ],
        correctOptionId: 'a'
      })
    ],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'parent-portal-details-updates',
    title: 'Parent Portal Details Updates',
    description: 'How to help parents update their contact and medical details via the portal.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 12,
    tags: ['Sentral', 'Parent Portal', 'data updates'],
    learningObjectives: [
      'Guide parents to the correct update forms.',
      'Explain the approval process for data changes.',
      'Understand the privacy implications of parent data.'
    ],
    dcsRelevance: [
      'Ensures school records stay accurate for safety and communication.'
    ],
    sections: [],
    flashcards: [],
    quiz: [],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'sentral-support',
    title: 'Sentral Support Basics',
    description: 'Core support tasks for the Sentral school management system used by staff.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 20,
    tags: ['Sentral', 'staff support', 'attendance', 'reports'],
    learningObjectives: [
      'Troubleshoot basic login and permission issues.',
      'Guide staff to common modules like Attendance and Wellbeing.',
      'Understand the escalation path for Sentral system errors.'
    ],
    dcsRelevance: [
      'Sentral is the backbone of daily school operations.'
    ],
    sections: [],
    flashcards: [],
    quiz: [],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'ourdcs-schoolbox-support',
    title: 'OurDCS (Schoolbox) Support',
    description: 'Support for the OurDCS learning management system for staff and students.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 20,
    tags: ['OurDCS', 'Schoolbox', 'LMS', 'student support'],
    learningObjectives: [
      'Assist with login and dashboard navigation.',
      'Help staff manage class pages and resources.',
      'Understand the integration between OurDCS and other school systems.'
    ],
    dcsRelevance: [
      'Central hub for learning and communication at DCS.'
    ],
    sections: [],
    flashcards: [],
    quiz: [],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'login-and-password-support',
    title: 'Login and Password Support',
    description: 'Best practices for assisting users with password resets and login issues across DCS systems.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 15,
    tags: ['passwords', 'MFA', 'identity', 'support'],
    learningObjectives: [
      'Verify user identity safely before resetting passwords.',
      'Guide users through the self-service password reset (SSPR) process.',
      'Explain the role of MFA in securing school accounts.'
    ],
    dcsRelevance: [
      'One of the most frequent support requests at DCS.'
    ],
    sections: [],
    flashcards: [],
    quiz: [],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'permissions-and-access-requests',
    title: 'Permissions and Access Requests',
    description: 'How to handle and escalate requests for folder access, group membership, and system permissions.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 15,
    tags: ['permissions', 'access', 'security', 'escalation'],
    learningObjectives: [
      'Identify who has the authority to approve access requests.',
      'Gather necessary information (who, what, why) before escalating.',
      'Understand the "least privilege" principle.'
    ],
    dcsRelevance: [
      'Balances security with staff operational needs.'
    ],
    sections: [],
    flashcards: [],
    quiz: [],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'website-filtering-and-unblock-requests',
    title: 'Website Filtering and Unblock Requests',
    description: 'Triage and escalate requests to unblock websites for educational use.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 12,
    tags: ['filtering', 'security', 'unblock requests', 'firewall'],
    learningObjectives: [
      'Verify the educational need for a blocked site.',
      'Gather the exact URL and the "category" of the block.',
      'Explain why certain categories remain blocked for safety.'
    ],
    dcsRelevance: [
      'Ensures a safe but functional browsing environment for learning.'
    ],
    sections: [],
    flashcards: [],
    quiz: [],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'new-user-onboarding',
    title: 'New User Onboarding',
    description: 'The IT steps for welcoming new staff and students to the DCS network.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 20,
    tags: ['onboarding', 'new users', 'account setup', 'induction'],
    learningObjectives: [
      'Follow the onboarding checklist for accounts and devices.',
      'Provide a clear "Welcome to IT" orientation for new staff.',
      'Ensure all necessary permissions are in place from day one.'
    ],
    dcsRelevance: [
      'Sets the tone for a positive IT experience for new members of the community.'
    ],
    sections: [],
    flashcards: [],
    quiz: [],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'teams-sharepoint-onedrive-support',
    title: 'Teams, SharePoint, and OneDrive Support',
    description: 'Support for the core Microsoft 365 collaboration and storage tools.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 25,
    tags: ['M365', 'Teams', 'SharePoint', 'OneDrive', 'sync'],
    learningObjectives: [
      'Troubleshoot file sync issues in OneDrive and SharePoint.',
      'Assist staff with Teams channel management and meetings.',
      'Explain the difference between "My Files" (OneDrive) and "Shared Files" (SharePoint/Teams).'
    ],
    dcsRelevance: [
      'Critical for staff collaboration and document management.'
    ],
    sections: [],
    flashcards: [],
    quiz: [],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'ipad-jamf-workflow-basics',
    title: 'iPad and Jamf Workflow Basics',
    description: 'An introduction to how iPads are managed at DCS using Jamf Pro.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 20,
    tags: ['iPad', 'Jamf', 'MDM', 'Apple'],
    learningObjectives: [
      'Understand the "Self Service" app and how to push apps to devices.',
      'Troubleshoot basic enrolment and configuration profile issues.',
      'Recognise when an iPad needs to be re-enrolled or factory reset.'
    ],
    dcsRelevance: [
      'DCS uses many iPads in Junior School and specialized areas.'
    ],
    sections: [],
    flashcards: [],
    quiz: [],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'soft-skills-dcs-support',
    title: 'Soft Skills for DCS Support',
    description:
      'Master the empathy, communication, and de-escalation skills needed to support staff and students under pressure at DCS.',
    domain: 'Foundations',
    level: 'L1',
    estimatedMinutes: 15,
    tags: ['communication', 'empathy', 'soft-skills', 'de-escalation'],
    learningObjectives: [
      'Apply active listening to understand the teacher’s actual classroom pain.',
      'Communicate technical fixes and limitations in plain English.',
      'Maintain a calm, helpful posture during high-pressure classroom outages.'
    ],
    dcsRelevance: [
      'Technical skills are only half the job; the other half is making people feel heard.',
      'Reduces the "IT vs Teachers" friction that can happen during busy periods.',
      'Ensures that Josh is seen as a supportive partner in the learning environment.'
    ],
    sections: buildSections('soft-skills-dcs-support', [
      {
        title: 'Empathy-First Support',
        bodyMarkdown:
          'When a teacher calls with a display issue, they aren\'t just reporting a technical fault; they are reporting a block to their lesson and a disruption for 30 students. Acknowledge the urgency first: "I can see this is holding up your lesson, let\'s look at the source first." This small phrase changes the interaction from a "ticket" to a partnership.',
        takeaway: 'Acknowledge the classroom pain before the technical check.'
      },
      {
        title: 'Plain English Translation',
        bodyMarkdown:
          'Avoid technical jargon that shuts down conversation. Instead of "DHCP lease failure", say "The laptop isn\'t picking up an address from the school network." Instead of "SSID mismatch", say "It\'s trying to connect to the wrong Wi-Fi." Your goal is to be understood, not to sound like an expert.',
        takeaway: 'Being understood is more important than sounding like an expert.'
      },
      {
        title: 'De-escalation and Boundaries',
        bodyMarkdown:
          'If a user is frustrated, stay calm and factual. Don\'t take it personally. If you can\'t fix it immediately, give a clear "Next Step" rather than a vague "I\'ll look into it." Example: "I can\'t get this display back in the next two minutes. I\'ll grab a loaner laptop for you and then call Paul to look at the room fault so you can keep teaching."',
        takeaway: 'Calm facts and clear workarounds beat vague promises.'
      }
    ]),
    flashcards: buildFlashcards('soft-skills-dcs-support', [
      ['What is the first step in empathetic support?', 'Acknowledge the user\'s problem and its impact on their work.'],
      ['Why should you avoid jargon in the classroom?', 'It can be confusing or alienating for staff under pressure.'],
      ['What is a "clear next step" in support?', 'A specific action you will take and a timeframe for follow-up.'],
      ['How do you handle an angry user?', 'Stay calm, listen actively, and focus on the technical resolution and workarounds.'],
      ['What should you do before explaining the technical fix?', 'Confirm you understand the user\'s immediate teaching or work impact.'],
      ['What is a good support boundary phrase?', 'I can help with the device issue, and I will escalate the access decision to the right approver.'],
      ['Why should you offer a workaround?', 'A workaround keeps learning or work moving while the root cause is investigated.'],
      ['What makes a follow-up promise useful?', 'It names the next action, owner, and approximate timeframe.']
    ]),
    quiz: [
      mcq({
        id: 'ss-q1',
        prompt: 'A teacher is visibly stressed because the printer isn\'t working for their next lesson. What is the best opening line?',
        domain: 'Soft Skills',
        difficulty: 'foundation',
        explanation: 'Empathy and acknowledgement should come before the technical check.',
        modelAnswer: 'Acknowledge the impact on their class first to build a partnership.',
        commonMistakes: ['Ignoring the teacher and touching the printer', 'Saying "It works for me"'],
        dcsContext: 'Teachers are under tight time pressure between lessons.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'communication',
        options: [
          { id: 'a', label: '"Did you send it to the right queue? Check your settings."' },
          { id: 'b', label: '"I can see this is a problem for your next lesson. Let\'s check the queue together."' },
          { id: 'c', label: '"I\'m busy right now, put a ticket in."' },
          { id: 'd', label: '"Printers are always doing this, it\'s not my fault."' }
        ],
        correctOptionId: 'b'
      }),
      scenarioResponse({
        id: 'ss-q2',
        prompt: 'You can\'t fix a classroom display issue within the 5 minutes before a lesson starts. Write your response to the teacher.',
        domain: 'Soft Skills',
        difficulty: 'stretch',
        explanation: 'Provide a workaround and a clear escalation path.',
        modelAnswer: 'Acknowledge the failure, provide a workaround (like a loaner), and explain the next technical step you will take.',
        commonMistakes: ['Staying and trying to fix it while the lesson is supposed to start', 'Leaving without saying anything'],
        dcsContext: 'Keeping the lesson moving is the priority.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'communication',
        rubric: ['Acknowledges the block', 'Provides a workaround', 'Sets a clear next step']
      }),
      mcq({
        id: 'ss-q3',
        prompt: 'A staff member says, "This system always breaks when I need it." What should you do first?',
        domain: 'Soft Skills',
        difficulty: 'foundation',
        explanation: 'Acknowledge the frustration before moving into diagnosis.',
        modelAnswer: 'Acknowledge the frustration and impact, then ask one focused diagnostic question.',
        commonMistakes: ['Defending the system', 'Blaming the user', 'Starting with jargon'],
        dcsContext: 'Support conversations often happen while staff are under time pressure.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'communication',
        options: [
          { id: 'a', label: 'Tell them the system is usually reliable.' },
          { id: 'b', label: 'Acknowledge the frustration and ask what they were trying to do.' },
          { id: 'c', label: 'Tell them to restart and walk away.' },
          { id: 'd', label: 'Explain the backend architecture.' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'ss-q4',
        prompt: 'Write a one-sentence plain-English explanation for a Wi-Fi authentication issue.',
        domain: 'Soft Skills',
        difficulty: 'foundation',
        explanation: 'Plain English helps users understand the issue without exposing unnecessary technical detail.',
        modelAnswer: 'Your device is reaching the school Wi-Fi, but it is not being accepted with the current sign-in details, so I will check the account and connection steps.',
        commonMistakes: ['Using unexplained acronyms', 'Blaming the user', 'Mentioning private network details'],
        dcsContext: 'Staff need clear next steps, not internal network jargon.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'communication',
        keywordHints: ['plain English', 'sign-in', 'next step', 'no blame'],
        rubric: ['Plain English', 'No blame', 'Clear next step']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('soft-skills-dcs-support', [
      {
        title: 'Communicating a delay',
        prompt: 'Practice telling a staff member their device needs to be sent away for repair while managing their expectations.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('soft-skills-dcs-support', [
      {
        title: 'Communication Cheat Sheet',
        description: 'Create a list of "Plain English" alternatives for 5 common technical phrases.'
      }
    ])
  }),
  createModule({
    id: 'cybersecurity-basics',
    title: 'Cybersecurity Awareness and Incident Response',
    description:
      'Understand modern school cyber threats, phishing tactics, and the NIST 800-61 incident response framework.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 20,
    tags: ['phishing', 'passwords', 'NIST 800-61', 'incident response'],
    learningObjectives: [
      'Recognise common phishing tactics and social engineering signals.',
      'Explain the importance of password hygiene and MFA in a school context.',
      'Map the four phases of the NIST 800-61 incident response framework.'
    ],
    dcsRelevance: [
      'Protects student and staff data from evolving social engineering threats.',
      'Aligns with the Texas School Safety Center recommendations for K-12 districts.',
      'Builds a safer "before, during, and after" posture for school cyber incidents.'
    ],
    sections: buildSections('cybersecurity-basics', [
      {
        title: 'Phishing and Social Engineering',
        bodyMarkdown: `Phishing is an attempt to trick users into revealing credentials or downloading malware. In schools, this often looks like fake "urgent" IT alerts, spoofed principal emails, or fraudulent invoice requests.\n\nStaff should pause before clicking links, verify the sender's actual email address (not just the display name), and report suspicious messages immediately instead of deleting them.`
      },
      {
        title: 'Password Hygiene and MFA',
        bodyMarkdown: `Strong passwords and Multi-Factor Authentication (MFA) are the first line of defense. Reusing passwords across personal and school accounts creates a significant risk.\n\nMFA adds a second layer that prevents many credential-based attacks even if a password is leaked. At DCS, MFA is a critical requirement for protecting the M365 tenant.`
      },
      {
        title: 'NIST 800-61 Incident Response',
        bodyMarkdown: `The NIST 800-61 framework defines four phases: Preparation, Detection & Analysis, Containment, Eradication & Recovery, and Post-Incident Activity.\n\nLevel 1 support focuses heavily on Detection and early Containment (e.g., isolating a device) while preserving evidence for senior ICT staff.`
      }
    ]),
    flashcards: buildFlashcards('cybersecurity-basics', [
      ['What is the goal of phishing?', 'To trick users into revealing credentials or installing malware.'],
      ['What should a staff member check before clicking a link?', "The sender's actual email address and the target URL destination."],
      ['Why is MFA important?', 'It provides a second layer of security beyond just a password.'],
      ['What are the four phases of NIST 800-61?', 'Preparation, Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident Activity.'],
      ['What is Josh’s primary role in a cyber incident?', 'Early detection, basic containment, and evidence-safe escalation.'],
      ['Should Josh delete a suspicious email for a user?', 'No. Report it through official channels to preserve the evidence for analysis.'],
      ['What should Level 1 support capture for a suspected compromise?', 'Time reported, symptoms, affected device/account, actions already taken, and who has been notified.'],
      ['Why should a potentially infected device be isolated before deeper troubleshooting?', 'Isolation limits spread while preserving the device state for senior ICT review.']
    ]),
    quiz: [
      mcq({
        id: 'cyber-q1',
        prompt: 'A staff member receives an email from the "Principal" asking for an urgent bank transfer. What is the best first step?',
        domain: 'Cybersecurity',
        difficulty: 'foundation',
        explanation: 'Business Email Compromise (BEC) often uses authority to create false urgency.',
        modelAnswer: 'Verify the sender independently and report it as a potential phishing attempt. Do not act on the request.',
        commonMistakes: ['Replying to the email', 'Assuming the Principal is really asking', 'Not verifying the sender'],
        dcsContext: 'DCS Principal will never ask for urgent bank transfers via email.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-basics',
        weakTopic: 'security-risk-judgement',
        options: [
          { id: 'a', label: 'Reply immediately to show efficiency' },
          { id: 'b', label: 'Verify the sender and report the email' },
          { id: 'c', label: 'Delete the email so no one else sees it' },
          { id: 'd', label: 'Forward it to the whole staff as a warning' }
        ],
        correctOptionId: 'b'
      })
    ],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'device-imaging-deployment',
    title: 'Device Imaging and Deployment Workflows',
    description:
      'Learn device imaging fundamentals: planning, base images, reference image creation, deployment methods, and when to use imaging vs. provisioning. Understand the role of imaging in school device fleet management.',
    domain: 'Endpoint Support',
    level: 'L2',
    estimatedMinutes: 26,
    tags: ['imaging', 'deployment', 'Windows Deployment Services', 'provisioning', 'device fleet'],
    learningObjectives: [
      'Understand why schools use device imaging.',
      'Explain the difference between a base image and a reference image.',
      'Describe when imaging is appropriate vs. when provisioning is better.',
      'Recognize common imaging failures and safe escalation points.'
    ],
    dcsRelevance: [
      'Device imaging is a foundational IT operation that enables bulk device deployment.',
      'Understanding imaging helps support staff assist with device onboarding and troubleshoot deployment issues.',
      'Schools with efficient imaging workflows deploy updates faster and more safely.'
    ],
    sections: buildSections('device-imaging-deployment', [
      {
        title: 'What is device imaging and why schools use it',
        bodyMarkdown:
          'Device imaging is the process of creating a standardized copy of a configured device and deploying that copy to many devices. Instead of manually configuring 50 Windows laptops, a school creates one "base image" with all required software, settings, and configurations, then deploys it to all 50 devices at once. This saves time, reduces errors, and ensures consistency. Imaging is used for initial device setup and for bulk updates.',
        takeaway: 'Imaging is about speed, consistency, and scalability.'
      },
      {
        title: 'Base image vs. reference image vs. golden image',
        bodyMarkdown:
          'A base image is a clean Windows or macOS install with no custom settings or applications. A reference image is a base image plus all required applications, settings, patches, and configurations. A golden image is a validated reference image that is used for production deployment. The workflow: start with base (clean OS), add software and settings (create reference), test it thoroughly (validate), then use it for deployment (golden).',
        takeaway: 'Keep the base generic; all school-specific work goes into the reference image.'
      },
      {
        title: 'Deployment methods: imaging vs. provisioning',
        bodyMarkdown:
          'Imaging deploys a full image to a device, erasing its current state. Provisioning uses a script or automation to configure a device without completely replacing it. Imaging is faster for initial setup; provisioning is gentler for devices that already have user data. Windows Deployment Services (WDS) is a common imaging tool; Intune or other MDM tools can handle provisioning. Level 1 support should understand which method is being used for each fleet.',
        takeaway: 'Imaging is for blank devices; provisioning is for updates or devices with data.'
      },
      {
        title: 'Safe imaging workflow and testing',
        bodyMarkdown:
          'A safe workflow: build the reference image, test it on a sample device thoroughly (all applications, network shares, printers, device management), document the testing results, then deploy to the wider fleet. Never image a device without a backup of user data. If imaging fails (device does not boot, driver issues, application conflicts), the device can usually be reimaged, but testing beforehand catches most issues.',
        takeaway: 'Test thoroughly before deployment; preserve user data before imaging.'
      },
      {
        title: 'Common imaging issues and safe escalation',
        bodyMarkdown:
          'Common failures: network connectivity during imaging (device disconnects), driver incompatibilities (wrong hardware model for the image), application conflicts (software fails to install or activate), and boot failures (device will not start after imaging). Level 1 support should capture: which device, which image name, at what stage it failed, and any error codes. Do not attempt to fix imaging failures yourself; escalate to the imaging or device management team with these details.',
        takeaway: 'Document the failure clearly; the team can then troubleshoot from there.'
      }
    ]),
    flashcards: buildFlashcards('device-imaging-deployment', [
      ['What is device imaging?', 'The process of creating a standardized copy of a configured device and deploying it to many devices.'],
      ['What is a base image?', 'A clean Windows or macOS install with no custom settings or applications.'],
      ['What is a reference image?', 'A base image plus all required applications, settings, patches, and configurations for the school.'],
      ['What is a golden image?', 'A validated reference image that is tested and approved for production deployment.'],
      ['What is the difference between imaging and provisioning?', 'Imaging replaces the entire device; provisioning configures a device without completely replacing it.'],
      ['When should you use imaging vs. provisioning?', 'Use imaging for blank devices; use provisioning for updates or devices with existing data.'],
      ['What is Windows Deployment Services (WDS)?', 'A Windows Server role that enables network-based imaging and deployment of operating systems.'],
      ['What should you do before reimaging a device with user data?', 'Preserve or back up the user data first, then image the device.']
    ]),
    quiz: [
      mcq({
        id: 'imaging-q1',
        prompt: 'A school needs to deploy Windows to 30 new laptops. What is the most efficient approach?',
        domain: 'Device Imaging',
        difficulty: 'foundation',
        explanation: 'Imaging is faster than manual setup.',
        modelAnswer: 'Create a reference image with all required software and settings, test it on a sample device, then deploy it to all 30 laptops at once using imaging.',
        commonMistakes: ['Manually configuring each device', 'Skipping the testing phase'],
        dcsContext: 'Bulk deployment is a core IT operation in schools.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment',
        weakTopic: 'hardware-troubleshooting',
        options: [
          { id: 'a', label: 'Manually set up each of the 30 laptops individually.' },
          { id: 'b', label: 'Create a reference image, test it on one sample device, then deploy to all 30.' },
          { id: 'c', label: 'Ask the vendor to pre-load the image.' },
          { id: 'd', label: 'Image the first 10, then manually configure the rest.' }
        ],
        correctOptionId: 'b'
      })
    ],
    scenarioPrompts: [],
    practicalOutputs: []
  }),
  createModule({
    id: 'cloud-fundamentals',
    title: 'Cloud Fundamentals',
    description:
      'Understand cloud computing basics: what the cloud is, cloud service models (IaaS, PaaS, SaaS), deployment models (public, private, hybrid), and how to troubleshoot cloud service issues at Level 1.',
    domain: 'Cloud and Platforms',
    level: 'L1',
    estimatedMinutes: 22,
    tags: ['cloud', 'SaaS', 'PaaS', 'IaaS', 'Office 365', 'Azure'],
    learningObjectives: [
      'Define cloud computing and its benefits.',
      'Distinguish between IaaS, PaaS, and SaaS.',
      'Understand public, private, and hybrid cloud models.',
      'Troubleshoot common cloud service issues safely.'
    ],
    dcsRelevance: [
      'Schools increasingly rely on cloud services like Office 365, Google Workspace, and Intune.',
      'Understanding cloud models helps staff use services correctly and troubleshoot issues.',
      'Cloud services shift some IT operations but require new support skills.'
    ],
    sections: buildSections('cloud-fundamentals', [
      {
        title: 'What is cloud computing?',
        bodyMarkdown:
          'Cloud computing is on-demand access to computing resources—servers, storage, databases, software—delivered over the internet. Instead of owning servers and storage, schools "rent" these resources from providers like Microsoft, Google, or Amazon. Benefits: reduced upfront cost, automatic updates and patches, access from anywhere, and scalability. The trade-off: reliance on internet connectivity and the provider\'s security and availability.',
        takeaway: 'Cloud = rented computing power delivered over the internet.'
      },
      {
        title: 'Three cloud service models: IaaS, PaaS, SaaS',
        bodyMarkdown:
          'Infrastructure as a Service (IaaS): the provider manages servers and storage; you configure the operating system and applications. Example: Azure Virtual Machines. Platform as a Service (PaaS): the provider manages infrastructure and tools; you write applications. Example: Azure App Service. Software as a Service (SaaS): the provider manages everything; you use the application via a browser. Example: Office 365, Google Workspace. Think: IaaS is "rent the hardware", PaaS is "rent the platform", SaaS is "rent the application".',
        takeaway: 'IaaS = infrastructure, PaaS = platform, SaaS = software.'
      },
      {
        title: 'Cloud deployment models: public, private, hybrid',
        bodyMarkdown:
          'Public cloud: the provider\'s infrastructure is shared by many organizations. Lower cost but less control. Example: Microsoft Office 365. Private cloud: dedicated infrastructure for one organization. Higher cost but more control. Example: on-premises Intune or SharePoint. Hybrid cloud: combination of public and private, with integration between them. Example: local file servers plus cloud Office 365. Schools often use hybrid: some services in the cloud, some on-premises.',
        takeaway: 'Public = shared and cheaper, Private = dedicated and controlled, Hybrid = both.'
      },
      {
        title: 'Common cloud service blockers at Level 1',
        bodyMarkdown:
          'Common issues: no internet connection (cannot access cloud services at all), account access problems (user cannot sign in), data sync issues (files not appearing across devices), and service outages (the provider\'s service is down). Level 1 triage: confirm the internet connection is working, confirm the user can sign in, check whether other users are experiencing the same issue, then check the provider\'s status page. Escalate if the issue is on the provider\'s side or requires account/permission changes.',
        takeaway: 'Internet, authentication, sync, and availability are the main failure points.'
      },
      {
        title: 'Safe Level 1 cloud troubleshooting',
        bodyMarkdown:
          'Do not attempt to change cloud settings, permissions, or configurations without guidance. Instead: confirm internet connectivity, verify the user can authenticate, check for service outages, compare with other users to establish scope, and escalate with this context. Cloud service troubleshooting often requires Level 2 or vendor support because settings and data are managed in the cloud, not on the local device.',
        takeaway: 'Cloud issues often need cloud-side investigation; gather context and escalate.'
      }
    ]),
    flashcards: buildFlashcards('cloud-fundamentals', [
      ['What is cloud computing?', 'On-demand access to computing resources (servers, storage, software) delivered over the internet.'],
      ['What does IaaS stand for?', 'Infrastructure as a Service—the provider manages servers and storage; you manage the operating system and applications.'],
      ['What does PaaS stand for?', 'Platform as a Service—the provider manages infrastructure and tools; you write applications.'],
      ['What does SaaS stand for?', 'Software as a Service—the provider manages everything; you use the application via a browser.'],
      ['What is an example of SaaS?', 'Office 365, Google Workspace, Teams, SharePoint Online.'],
      ['What is public cloud?', 'Shared infrastructure managed by a provider and used by many organizations.'],
      ['What is private cloud?', 'Dedicated infrastructure for one organization, with more control but higher cost.'],
      ['What is the difference between public and hybrid cloud?', 'Public is entirely cloud-based; hybrid combines on-premises and cloud services with integration between them.']
    ]),
    quiz: [
      mcq({
        id: 'cloud-q1',
        prompt: 'A staff member cannot access their Office 365 email from home. The internet connection is working. What should you check next?',
        domain: 'Cloud Fundamentals',
        difficulty: 'foundation',
        explanation: 'Authentication is the gateway to cloud services.',
        modelAnswer: 'Confirm they can sign in to the Office 365 portal with their credentials. If sign-in fails, the issue is authentication; if it succeeds, the issue may be browser, cache, or client setup.',
        commonMistakes: ['Assuming it is internet connectivity', 'Trying to change cloud settings without guidance'],
        dcsContext: 'Office 365 is a SaaS—sign-in is the key.',
        reviewSchedule,
        recommendedModuleId: 'cloud-fundamentals',
        weakTopic: 'cloud-models',
        options: [
          { id: 'a', label: 'Verify they can sign in to the Office 365 portal with their username and password.' },
          { id: 'b', label: 'Tell them to restart their computer and try again.' },
          { id: 'c', label: 'Assume their account is disabled.' },
          { id: 'd', label: 'Try to reset their cloud permissions.' }
        ],
        correctOptionId: 'a'
      })
    ],
    scenarioPrompts: [],
    practicalOutputs: []
  })
];
