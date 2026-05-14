# RBC SLG LMS Implementation Plan for DCSPrep

Generated for the DCSPrep app from the local `RBC` folder, the CSE Subject Learning Guides (SLGs), the Year 1 semester folders, and current public Master of Information Technology course information.

## High-level concept

DCSPrep should gain a dedicated `RBC Learning` module that turns the La Trobe/RBC CSE SLGs and SILOs into a structured professional-development LMS for Josh's IT work at Dubbo Christian School. The module should not just list subjects. It should teach, test, coach, and evidence growth across programming, systems thinking, cybersecurity, data reasoning, AI, cloud, professional ethics, and school IT operations.

The key design principle is: every academic outcome becomes a practical DCS capability. If an SLG says "analyse a data processing problem", the DCSPrep version should ask Josh to analyse an anonymised ticket export, design a small script, explain the logic, and log a usable PD artifact.

## Core player fantasy

Josh opens DCSPrep during approved quiet PD windows and works through a serious academic-to-workplace learning pathway. Each session starts with retrieval or a problem, then teaches only what is needed, then checks understanding through questions, code, scenarios, or evidence artifacts. Over time, DCSPrep becomes a personal LMS, assessment engine, revision system, and professional evidence portfolio tied directly to the RBC SLGs, SMITB Master of Information Technology content, and daily IT work at DCS.

## Source folders reviewed

Primary local source root:

`RBC`

Key source groups:

- `RBC/Study_Plan_Guide_RBC(IBL)_2019_s2_intake.pdf`
- `RBC/CSE SLGs/*.pdf`
- `RBC/Year 1/Sem 1/**/*.pdf`

Important note: several PDFs are duplicates or newer versions of the same subject. The module should deduplicate by subject code, keep all versions as source evidence, and mark one canonical version for teaching content.

## Privacy, copyright, and safety rules

- Do not copy whole SLG PDFs into app content.
- Store local PDF references, extracted metadata, SILO summaries, week/topic summaries, assessment mappings, and Josh-created notes.
- Do not upload or process live student, parent, staff, credential, health, wellbeing, custody, incident, or network-secret data.
- Use synthetic, anonymised, or hand-written practice data for assessments.
- Treat DCS operational examples as training simulations unless Paul or leadership approves them as real SOP content.
- Keep the app local-first unless a future sync feature is explicitly designed with privacy controls.

## Current DCSPrep fit

DCSPrep already has useful foundations:

- modules, flashcards, strict quiz, scenario lab, due review, PD log, evidence pack, readiness profiles, KB lab, AI coach, and error log
- local progress storage
- question-first and spaced-repetition patterns
- DCS-specific Level 1 support themes

The RBC learning module should extend those patterns rather than becoming a second app.

## Proposed top-level UX

Add one main navigation item:

- `RBC Learning`

Suggested routes:

- `/rbc` - dashboard, study map, source health, next recommended subject
- `/rbc/subjects` - all subjects, filters by foundation, cyber, programming, data, AI, cloud, professional practice
- `/rbc/subjects/[subjectCode]` - subject home, SILO map, lessons, assessments, DCS transfer tasks, resources
- `/rbc/subjects/[subjectCode]/silos/[siloId]` - individual SILO learning path
- `/rbc/assessment` - cross-subject diagnostic and exam mode
- `/rbc/resources` - curated external resources by subject
- `/rbc/evidence` - academic-to-workplace PD evidence pack
- `/rbc/source-library` - local PDF inventory, duplicate/version map, extraction status

## Learning modes

Each subject should support five modes:

1. Diagnose
   - pre-test mapped to SILOs
   - confidence rating
   - weak area identification

2. Learn
   - concise concept lessons
   - worked examples
   - diagrams/tables where needed
   - link back to local SLG source

3. Retrieve
   - flashcards
   - short-answer questions
   - explain-back prompts
   - concept sorting

4. Apply
   - code tasks, case analysis, data tasks, workflow diagrams, DCS support scenarios
   - practical outputs suitable for the evidence pack

5. Prove
   - subject quiz
   - practical assessment
   - oral/explain-back review
   - PD log entry with evidence artifact

## Data model

Create a new academic/RBC data layer rather than forcing everything into the current `TrainingModule` shape.

Recommended files:

- `src/types/academic.ts`
- `src/data/rbcSubjects.ts`
- `src/data/rbcResources.ts`
- `src/data/rbcAssessmentItems.ts`
- `src/data/rbcPracticalTasks.ts`
- `src/lib/rbc/siloMath.ts`
- `src/lib/rbc/sourceInventory.ts`
- `src/lib/rbc/recommendations.ts`

Suggested types:

```ts
export type RbcSubject = {
  code: string;
  title: string;
  level: 'foundation' | 'undergraduate' | 'masters';
  stream: 'foundations' | 'programming' | 'systems' | 'cybersecurity' | 'data' | 'ai' | 'cloud' | 'professional-practice';
  localSources: RbcSource[];
  silos: RbcSilo[];
  topics: RbcTopic[];
  assessmentBlueprint: RbcAssessmentBlueprint;
  dcsApplications: DcsApplication[];
  resources: RbcResource[];
};

export type RbcSilo = {
  id: string;
  label: string;
  sourceTextSummary: string;
  masteryCriteria: string[];
  linkedTopics: string[];
  questionIds: string[];
  practicalTaskIds: string[];
};

export type RbcResource = {
  title: string;
  url: string;
  kind: 'official-docs' | 'course' | 'video' | 'youtube-channel' | 'pdf' | 'book' | 'tool';
  why: string;
};
```

## Source ingestion pipeline

Build a small repeatable source pipeline:

1. Scan `RBC/**/*.pdf`.
2. Generate a source manifest with file path, hash, page count, detected subject code, detected subject title, year/term, and duplicate group.
3. Extract:
   - subject details
   - about-this-subject summary
   - SILOs
   - learning schedule topics
   - assessment and feedback summary
   - LMS links if present
4. Save extracted metadata into reviewed JSON or TypeScript.
5. Mark fields as:
   - `autoExtracted`
   - `reviewed`
   - `needsManualCheck`
6. Use reviewed summaries in the app.

Recommended output:

- `RBC/generated/rbc-source-manifest.json`
- `RBC/generated/rbc-subject-extracts.json`
- `src/data/rbcSubjects.ts` after manual review

Do not make the app depend on reading PDFs at runtime. Use a curated data file for speed and stability.

## Assessment design

Every SILO should have assessment evidence. Target per subject:

- 1 diagnostic quiz
- 8-15 flashcards
- 8-12 MCQs
- 4-8 short-answer questions
- 2 explain-back prompts
- 1 concept sort or matching exercise
- 1 scenario/case task
- 1 practical output
- 1 final subject challenge

Question types to support:

- MCQ
- multiple select
- short answer
- order steps
- code tracing
- code completion
- scenario response
- concept categorisation
- data interpretation
- rubric-scored artifact
- oral/explain-back prompt

Mark every item with:

- subject code
- SILO id
- topic id
- difficulty
- DCS relevance
- expected answer
- common mistakes
- revision schedule

## Progress model

Track progress at four levels:

- subject completion
- SILO mastery
- topic retention
- DCS transfer capability

Recommended scoring:

- 40 percent retrieval/quiz performance
- 25 percent practical tasks
- 20 percent explain-back/oral responses
- 10 percent flashcard retention
- 5 percent PD log reflection

Avoid fake precision. Show "emerging", "developing", "ready for supervised use", and "strong" rather than pretending a single percentage proves competence.

## SMITB Master of Information Technology alignment

Current public La Trobe Online information describes the Master of Information Technology as 12-16 subjects, with eight core IT subjects, a 30-credit specialisation choice, and a 60-credit project/thesis/industry-based-learning stream. It names core areas including AI fundamentals, cyber security principles, database fundamentals, IT fundamentals, introduction to programming, network engineering fundamentals, professional practices/entrepreneurship, and project management.

It also names specialisation options relevant to the RBC folder:

- Artificial Intelligence: CSE5ML, CSE5DL, CSE5NLP, CSE5CV
- Cloud Analytics: CSE5BDC, CSE5DL, CSE5DMI, CSE5006
- Cybersecurity: CSE5CRM, CSE5010, CSE5CFN, CSE5PEN

Local RBC PDFs already cover several of these Master-level subjects:

- CSE4002 Artificial Intelligence Fundamentals
- CSE5006 Cloud-Based Web Application
- CSE5ML Machine Learning
- CSE5NLP Natural Language Processing
- CSE5DL Deep Learning
- CSE5CV Computer Vision
- CSE5BDC Big Data Management on the Cloud

Plan requirement: add placeholders for SMITB subjects not yet in `RBC`, but teach only from local SLGs once their source files are added.

## Source inventory and subject blueprints

### RBC study plan guide

Local source:

- [Study Plan Guide RBC IBL 2019 S2 Intake](<Study_Plan_Guide_RBC(IBL)_2019_s2_intake.pdf>)

What it contributes:

- program structure awareness
- core/elective planning
- industry-based-learning pathway
- older Bachelor of IT structure that can be linked to later SMITB progression

DCSPrep module idea:

- `Academic Pathway Map`
- show what has been studied, what relates to DCS work, what maps to SMITB, and what future source files are missing

External resources:

- La Trobe Online Master of Information Technology subjects: https://onlinecourses.latrobe.edu.au/courses/master-information-technology/subjects/
- La Trobe Master of Information Technology overview: https://onlinecourses.latrobe.edu.au/courses/master-information-technology/

### CSE1IIT - Inside Information Technology

Local sources:

- [CSE1IIT SLG in CSE SLGs](<CSE SLGs/2023 CSE1IIT BE SLG.pdf>)
- [CSE1IIT Year 1 SLG](<Year 1/Sem 1/2023-CSE1IIT(BE-1) - INSIDE INFORMATION TECHNOLOGY/2023 CSE1IIT BE SLG.pdf>)
- [CSE1IIT LMS subject snapshot](<Year 1/Sem 1/2023-CSE1IIT(BE-1) - INSIDE INFORMATION TECHNOLOGY/Subject_ 2023-CSE1IIT(BE-1) - INSIDE INFORMATION TECHNOLOGY.pdf>)

SILO capability map:

- analyse how computer hardware and input/output devices process and deliver information
- explain the digital age through computer systems, networks, the Internet, and the Web
- apply Internet, Web, and HTML knowledge to a small web system
- apply IT knowledge to real-life problems

Teaching modules:

- computer hardware and peripherals for school support
- operating systems and storage basics
- LAN, WAN, Internet, and browser concepts
- HTML and web basics
- information systems and databases at a school

DCS transfer tasks:

- draw a classroom technology path from teacher laptop to ViewBoard/projector, network, printing, and M365
- explain the difference between browser issue, network issue, account issue, and device issue
- build a simple HTML quick-reference page for a DCS support workflow

External resources:

- CS50x, for broad CS foundations and web basics: https://cs50.harvard.edu/x/
- MDN Learn Web Development, for HTML/CSS/JavaScript foundations: https://developer.mozilla.org/en-US/docs/Learn
- Microsoft 365 Education service descriptions, for school SaaS context: https://learn.microsoft.com/en-us/office365/servicedescriptions/office-365-platform-service-description/office-365-education
- Computerphile YouTube channel, for conceptual CS explanations: https://www.youtube.com/user/Computerphile

### CSE1PE - Programming Environment

Local sources:

- [CSE1PE 2025 SLG](<CSE SLGs/SLG-2025-CSE1PE-OL-1.pdf>)
- [CSE1PE 2024 SLG](<CSE SLGs/SLG-2024-CSE1PE-BE-1.pdf>)
- [CSE1PE 2023 SLG](<CSE SLGs/SLG-2023-CSE1PE-BE-1.pdf>)
- [CSE1PE Year 1 SLG](<Year 1/Sem 1/2023-CSE1PE and CSE1PES(BE-1) - PROGRAMMING ENVIRONMENTPROGRAMMING FOR ENGINEERS AND SCIENTISTS/SLG-2023-CSE1PE-BE-1.pdf>)

Canonical version:

- Use the 2025 SLG as the main blueprint, with 2023/2024 versions retained for comparison.

SILO capability map:

- analyse a data-processing problem and identify data plus high-level processing
- apply sequence, selection, and iteration
- use lists and dictionaries for batch data processing
- implement executable Python code

Teaching modules:

- algorithms and flowcharts
- statements and expressions
- booleans and conditionals
- iteration
- functions and objects
- strings and files
- lists and dictionaries
- debugging and software errors
- modules
- code structure and documentation
- algorithm design strategies

DCS transfer tasks:

- parse a synthetic ticket CSV and count categories
- clean a fake asset list and detect missing fields
- produce a small script that validates a staff onboarding checklist
- explain code clearly enough for a non-programmer colleague

External resources:

- Python for Everybody lessons: https://www.py4e.com/lessons
- CS50's Introduction to Programming with Python: https://cs50.harvard.edu/python/
- Official Python tutorial: https://docs.python.org/3/tutorial/
- freeCodeCamp YouTube channel, for long-form coding videos: https://www.youtube.com/c/Freecodecamp

### CSE1OOF - Object Oriented Programming Fundamentals

Local source:

- [CSE1OOF 2020 SLG](<CSE SLGs/2020-Sem2-CSE1OOF-BE_SLG.pdf>)

SILO capability map:

- use an OS and development environment to code, debug, and execute Java programs
- analyse problems and construct logical program solutions
- understand objects and classes
- find and use Java library components
- write Java using control structures, classes, and arrays
- design and execute test plans

Teaching modules:

- Java development environment
- Unix/Linux basics
- classes and objects
- primitive data types and flow control
- methods
- arrays
- Java libraries
- coding standards
- testing strategies

DCS transfer tasks:

- model a school asset, user, ticket, or room as an object
- write a small Java console program that groups synthetic tickets by status
- design test cases for a support checklist or small script
- compare procedural Python and object-oriented Java thinking

External resources:

- University of Helsinki Java Programming MOOC: https://java-programming.mooc.fi/
- Oracle Java tutorials: https://docs.oracle.com/javase/tutorial/
- Git official Pro Git book: https://git-scm.com/book/en/v2
- CS50 YouTube channel: https://www.youtube.com/@cs50

### CSE1IS - Information Systems

Local source:

- [CSE1IS 2018 SLG](<CSE SLGs/_.CSE1IS-BE-SLG-2018-Sem-2.pdf>)

SILO capability map:

- use an information-system model to describe real systems
- describe the systems development life cycle
- use fact-finding to elicit requirements
- use context diagrams, levelled data-flow diagrams, and a system dictionary
- use entity-relationship diagrams for database design
- critique user interfaces
- justify implementation and security requirements

Teaching modules:

- information system components
- SDLC
- requirements gathering
- DFDs and system dictionaries
- ER modelling
- UI critique
- implementation approaches
- security and support requirements

DCS transfer tasks:

- map Sentral, OurDCS/Schoolbox, M365, PaperCut, and helpdesk workflows as information systems
- produce a context diagram for a parent portal support request
- design a small ER model for a synthetic equipment-loan register
- write a requirements note before asking for a system change

External resources:

- Information Systems for Business and Beyond open textbook: https://open.umn.edu/opentextbooks/textbooks/information-systems-for-business-and-beyond
- Microsoft School Data Sync overview: https://learn.microsoft.com/en-us/schooldatasync/school-data-sync-overview
- Schoolbox Help Centre: https://support.schoolbox.education/hc/en-us
- Sentral parent portal overview: https://www.sentral.com.au/parents

### CSE1ICB - Introduction to Cybersecurity

Local sources:

- [CSE1ICB SLG](<Year 1/Sem 1/2023-CSE1ICB(BE-1) - INTRODUCTION TO CYBERSECURITY/Subject-Learning-Guide-CSE1ICB-BU-BE-2023.pdf>)
- [CSE1ICB LMS subject snapshot](<Year 1/Sem 1/2023-CSE1ICB(BE-1) - INTRODUCTION TO CYBERSECURITY/Subject_ 2023-CSE1ICB(BE-1) - INTRODUCTION TO CYBERSECURITY.pdf>)

SILO capability map:

- describe emerging cybersecurity practices, regulations, and standards
- safeguard data, systems, and networks at a foundation level
- compare cyber risk management approaches
- identify digital forensics, application security, and network security approaches
- understand data security, web security, cryptography, and possible responses to threats

Teaching modules:

- cyber story and threat landscape
- application security
- network security
- threats and risks
- cryptography
- identity and access
- data security
- secure operations
- incident response

DCS transfer tasks:

- create a privacy-safe incident triage script for a suspected compromised account
- classify a simulated issue as user error, malware risk, access-control risk, or policy issue
- map a DCS support scenario to confidentiality, integrity, and availability
- build a safe escalation template for security-sensitive tickets

External resources:

- NIST Cybersecurity Framework 2.0: https://www.nist.gov/cyberframework
- ACSC Essential Eight: https://www.cyber.gov.au/acsc/view-all-content/essential-eight
- Cisco Networking Academy Introduction to Cybersecurity: https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html
- Microsoft Intune for Education overview: https://learn.microsoft.com/en-us/intune/solutions/education/overview
- NSW Education Cyber Security Strategy PDF: https://education.nsw.gov.au/content/dam/main-education/en/home/technology/education-cyber-security-strategy/Education_Cyber_Security_Strategy.pdf

### STA1DCT - Data-Based Critical Thinking

Local sources:

- [STA1DCT SLG](<Year 1/Sem 1/2023-STA1DCT(BE-1_BU-1) - DATA-BASED CRITICAL THINKING/STA1DCT_BU_BE_SLG_2023_Sem1.pdf>)
- [STA1DCT LMS subject snapshot](<Year 1/Sem 1/2023-STA1DCT(BE-1_BU-1) - DATA-BASED CRITICAL THINKING/Subject_ 2023-STA1DCT(BE-1_BU-1) - DATA-BASED CRITICAL THINKING.pdf>)

SILO capability map:

- critique data-based conclusions in media and similar sources
- interpret and derive numeric and graphical summaries
- calculate probabilities for decision-making scenarios
- identify common probability misconceptions

Teaching modules:

- useful data and sampling
- descriptive statistics
- graph reading
- probability basics
- uncertainty and decision-making
- misleading data claims

DCS transfer tasks:

- analyse synthetic ticket-volume trends by category and term week
- spot misleading interpretations in a fake "IT incidents are up" chart
- calculate simple probability/risk examples for device failure or recurring requests
- create an evidence-backed PD reflection from DCSPrep progress data

External resources:

- OpenIntro Statistics free textbook: https://open.umn.edu/opentextbooks/textbooks/60
- OpenIntro project: https://openintro.cc/
- Khan Academy statistics and probability: https://www.khanacademy.org/kmap/measurement-and-data-h/md224-statistics-and-probability
- StatQuest: https://statquest.org/about
- 3Blue1Brown probability lesson collection: https://www.3blue1brown.com/lessons/binomial-distributions

### CSE3PE - Professional Environment

Local source:

- [CSE3PE 2018 SLG](<CSE SLGs/CSE3PE SLG_2018.pdf>)

SILO capability map:

- apply ethical theory to IT dilemmas
- develop a personal ethical framework
- investigate social, legal, and ethical IT issues
- apply critical thinking to these issues
- appreciate responsibilities to employers, clients, and society
- reflect as a professional practice habit

Teaching modules:

- ethical theories in IT
- privacy, consent, and confidentiality
- professional judgement
- stakeholder impact
- legal and policy awareness
- reflective practice

DCS transfer tasks:

- respond to an ethical scenario involving a staff request for access to information
- write a reflective PD log entry after a simulated mistake
- compare "can do technically" with "should do professionally"
- create a DCS IT professional conduct checklist

External resources:

- ACM Code of Ethics: https://www.acm.org/code-of-ethics
- ACS article on the new ACS Code of Professional Ethics: https://ia.acs.org.au/article/2024/new-acs-code-of-professional-ethics-.html
- OAIC privacy guidance: https://www.oaic.gov.au/_old/privacy/guidance-and-advice
- OAIC data breach guidance: https://www.oaic.gov.au/_old/privacy/guidance-and-advice/data-breach-preparation-and-response/part-1-data-breaches-and-the-australian-privacy-act

### CSE4002 - Artificial Intelligence Fundamentals

Local sources:

- [CSE4002 2025 SLG](<CSE SLGs/SLG-2025-CSE4002-BU-1.pdf>)
- [CSE4002 2024 BE SLG](<CSE SLGs/SLG-2024-CSE4002-BE-1.pdf>)
- [CSE4002 2024 T2 SLG](<CSE SLGs/CSE4002 2024 T2 SLG.pdf>)

Canonical version:

- Use the 2025 SLG for the main subject blueprint, and keep both 2024 versions to compare delivery patterns.

SILO capability map:

- represent state-space search and game-playing problems
- represent knowledge using semantic networks, scripts, frames, and logic mechanisms
- write simple Prolog-style reasoning programs or equivalent logic exercises
- construct simple expert systems
- analyse and design basic ML algorithms for practical cases

Teaching modules:

- AI scope and history
- blind search
- heuristic search
- game playing
- logic and knowledge representation
- automated reasoning
- expert systems
- machine learning introduction
- responsible AI
- Azure AI as an applied platform

DCS transfer tasks:

- design an expert-system decision tree for Level 1 triage boundaries
- model a classroom "no display" issue as a search/problem-solving tree
- compare rule-based support guidance with ML-based ticket categorisation
- write a responsible-AI checklist for any AI mentor inside DCSPrep

External resources:

- MIT OCW Artificial Intelligence 6.034: https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/
- AIMA resources and code: https://aima.cs.berkeley.edu/2nd-ed/index.html
- Microsoft Azure AI Fundamentals learning path: https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure
- Google Machine Learning Crash Course: https://support.google.com/machinelearningeducation/answer/7652516
- Microsoft responsible AI practices for Azure OpenAI models: https://learn.microsoft.com/en-us/legal/cognitive-services/openai/overview

### CSE5006 - Cloud-Based Web Application

Local source:

- [CSE5006 2024 SLG](<CSE SLGs/CSE5006 - SLG - 2024 - S1-BE.pdf>)

SILO capability map:

- design and develop web applications using JavaScript
- design and build stateless web servers based on cloud technologies
- design and customise backend web applications from user requirements
- use modern software engineering tools to build and deploy robust scalable sites
- investigate storage technologies and choose suitable storage for a website

Teaching modules:

- Git and version control
- Docker
- JavaScript
- React
- ORM concepts
- REST APIs
- AWS S3
- cloud containers
- CI/CD pipelines
- stateless app design
- storage choices

DCS transfer tasks:

- extend DCSPrep itself with a small RBC learning page
- build a privacy-safe internal knowledge-base prototype
- design a stateless API for synthetic training items
- compare localStorage, file-backed JSON, database, and cloud storage for DCSPrep

External resources:

- Docker Get Started docs: https://docs.docker.com/get-started/
- React Learn docs: https://react.dev/learn
- Next.js docs: https://nextjs.org/docs
- MDN Learn Web Development: https://developer.mozilla.org/en-US/docs/Learn
- AWS Cloud Practitioner Essentials: https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/
- Git Pro Book: https://git-scm.com/book/en/v2

### CSE5ML - Machine Learning

Local source:

- [CSE5ML 2024 T2 SLG](<CSE SLGs/CSE5ML 2024 T2 SLG.pdf>)

SILO capability map:

- explain machine-learning concepts and applications for data analytics
- identify components and design issues in neural networks for regression/classification
- analyse data and design, implement, and evaluate ML approaches
- implement neural-network learning algorithms for real-world time-series forecasting

Teaching modules:

- ML basics
- regression
- support vector machines
- unsupervised learning
- neural networks
- CNN basics
- RNN/LSTM basics
- evaluation metrics
- model comparison

DCS transfer tasks:

- classify synthetic ticket categories from anonymised text features
- predict demand spikes from fake helpdesk history
- evaluate why a model should not be used for sensitive school decisions without governance
- write a model card for a DCSPrep-only training model

External resources:

- scikit-learn getting started: https://sklearn.org/stable/getting_started.html
- Google Machine Learning Crash Course: https://support.google.com/machinelearningeducation/answer/7652516
- StatQuest: https://statquest.org/about
- fast.ai Practical Deep Learning for Coders: https://course.fast.ai/

### CSE5NLP - Natural Language Processing

Local source:

- [CSE5NLP 2024 T3 SLG](<CSE SLGs/CSE5NLP 2024 T3 SLG.pdf>)

SILO capability map:

- apply NLP subtasks including tokenisation, morphology, word sense, POS tagging, and sentence analysis
- describe and evaluate methods/algorithms for textual data
- devise NLP pipelines using libraries, corpora, and lexical resources
- evaluate NLP results for categorisation, clustering, recommendation, and information retrieval

Teaching modules:

- tokenisation
- text classification
- sequence labelling
- vector semantics and embeddings
- neural language models
- transfer learning
- information retrieval
- NLP on Azure or modern cloud AI services

DCS transfer tasks:

- build a privacy-safe ticket-note categoriser using synthetic examples
- compare keyword matching with ML/NLP methods
- create a summarisation rubric for support notes without exposing real tickets
- design an NLP pipeline for classifying KB articles by support theme

External resources:

- Hugging Face course: https://huggingface.co/course
- Stanford CS224N: https://web.stanford.edu/class/cs224n/index.html
- NLTK book: https://www.nltk.org/book/
- Microsoft Azure AI services overview: https://learn.microsoft.com/en-us/azure/ai-studio/concepts/what-are-ai-services

### CSE5DL - Deep Learning

Local source:

- [CSE5DL 2024 SLG](<CSE SLGs/SLG CSE5DL 2024 Bundoora.pdf>)

SILO capability map:

- compare traditional ML and deep learning for industry problems
- recommend deep-learning algorithms for problem types
- write PyTorch code for computer vision and NLP problems
- propose cloud deployment and maintenance strategies
- investigate approaches where labels are scarce
- design a GAN architecture for realistic data generation

Teaching modules:

- deep-learning foundations
- practical deep learning
- computer vision with neural networks
- NLP with neural networks
- production deployment
- unsupervised learning
- time series and reinforcement learning
- advanced computer vision
- graph neural networks and domain adaptation
- GAN concepts

DCS transfer tasks:

- build a toy classifier on non-sensitive synthetic image/text data
- explain why production AI in a school context needs oversight, bias checks, and privacy review
- design a deployment plan for a local-only AI training helper
- compare labelled, weakly labelled, and unlabelled data problems

External resources:

- fast.ai Practical Deep Learning for Coders: https://course.fast.ai/
- PyTorch tutorials: https://pytorch.org/tutorials/
- Deep Learning book: https://www.deeplearningbook.org/
- Microsoft Azure Machine Learning: https://azure.microsoft.com/en-us/products/machine-learning

### CSE5CV - Computer Vision

Local source:

- [CSE5CV 2023 SLG](<CSE SLGs/SLG-2023-CSE5CV-BU-2.pdf>)

SILO capability map:

- critique image-processing techniques for basic computer vision tasks
- implement and analyse statistical and ML models for advanced vision tasks
- design, implement, and evaluate a vision model to recognise visual concepts
- analyse a real-world problem and investigate vision approaches

Teaching modules:

- digital image fundamentals
- histograms and filtering
- feature extraction
- classification models
- CNN classification
- object detection
- face detection and recognition, with privacy warnings
- video classification
- human pose estimation
- synthetic image generation
- Azure computer vision
- AR/VR and multimedia applications

DCS transfer tasks:

- use only non-sensitive training images or public/sample data
- build a toy visual classifier for cables/ports/assets, not people
- critique why student/staff face recognition is not appropriate for casual support experiments
- create an image-troubleshooting decision aid for ViewBoard/cable symptoms

External resources:

- Stanford CS231n: https://cs231n.stanford.edu/2019/
- OpenCV Bootcamp: https://opencv.org/get-started/
- OpenCV tutorials: https://docs.opencv.org/3.4/d9/df8/tutorial_root.html
- ViewSonic ViewBoard troubleshooting: https://manuals.viewsonic.com/ViewBoard_Troubleshooting

### CSE5BDC - Big Data Management on the Cloud

Local source:

- [CSE5BDC SLG](<CSE SLGs/SLG CSE5BDC.pdf>)

Manual check required:

- The file name says `CSE5BDC`, while extracted PDF text reported `CSE3BDC`. Verify the official code during content QA and store an alias if needed.

SILO capability map:

- use AWS knowledge to design a cloud solution for a scenario
- implement fundamental cloud services with AWS interfaces
- analyse MapReduce internals
- solve big-data analytics problems using the Hadoop ecosystem
- analyse performance benefits of contrasting NoSQL stores

Teaching modules:

- cloud computing and architectures
- AWS basics
- big data and MapReduce
- Hadoop internals
- Pig and Hive
- YARN
- streams and graph analytics
- Spark and Scala
- Spark SQL
- NoSQL stores
- performance and scalability tradeoffs

DCS transfer tasks:

- design a synthetic helpdesk analytics pipeline
- compare spreadsheet, relational database, and big-data approaches for ticket analysis
- explain why most DCS Level 1 problems do not need big data, but patterns over years might
- produce a privacy-safe data retention and aggregation plan

External resources:

- Apache Spark documentation: https://spark.apache.org/documentation
- Apache Spark quick start: https://spark.apache.org/docs/3.5.7/quick-start.html
- Databricks free training: https://docs.databricks.com/aws/en/getting-started/free-training
- AWS Cloud Practitioner Essentials: https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/

## DCS operational bridge modules

The RBC module should create bridge modules that connect academic subjects with daily DCS IT support. These are not replacements for DCS policies or Paul-approved procedures; they are PD simulations and evidence tasks.

### Bridge 1: School IT systems map

Linked subjects:

- CSE1IIT
- CSE1IS
- CSE4002
- CSE1ICB

DCS focus:

- Sentral
- OurDCS/Schoolbox
- Teams
- SharePoint
- OneDrive
- PaperCut
- ViewBoard/classroom AV
- M365 identity
- Wi-Fi and filtering

Practical output:

- one-page school IT system context diagram with data, users, access, and support boundaries

### Bridge 2: Privacy-safe automation

Linked subjects:

- CSE1PE
- CSE1OOF
- CSE5006
- CSE5ML
- CSE5NLP

DCS focus:

- scripts and tools that use synthetic/anonymised data only
- ticket-note quality
- repeatable support checklists
- PD artifacts instead of risky production automations

Practical output:

- a local script or mini app that processes fake ticket data and includes a privacy note

### Bridge 3: Secure school support

Linked subjects:

- CSE1ICB
- CSE3PE
- CSE4002
- CSE5ML
- CSE5DL

DCS focus:

- account compromise triage
- least privilege
- safe escalation
- AI governance
- ethical handling of staff/student/parent information

Practical output:

- incident triage note template and ethical decision checklist

### Bridge 4: Classroom technology troubleshooting

Linked subjects:

- CSE1IIT
- CSE1IS
- CSE5CV
- CSE1ICB

DCS focus:

- ViewBoard
- display output
- audio source
- touch cable path
- room-level fault patterns
- evidence collection

Practical output:

- classroom AV troubleshooting matrix with "safe Level 1 action" and "escalate" columns

### Bridge 5: Data-informed PD and service improvement

Linked subjects:

- STA1DCT
- CSE5BDC
- CSE5ML
- CSE5006

DCS focus:

- synthetic ticket trend analysis
- reporting without sensitive detail
- evidence pack outputs
- support-quality improvement

Practical output:

- monthly PD evidence report with charts based on DCSPrep progress and synthetic support categories

## LMS feature checklist

### Core LMS

- subject catalogue
- source-linked subject pages
- SILO progress map
- topic sequence
- lesson player
- resource panel
- bookmarking
- due review
- notes
- completion status
- PD log integration

### Assessment

- diagnostic mode
- SILO quizzes
- final subject quiz
- short-answer scoring
- code tasks with model answer/rubric
- scenario rubrics
- oral explain-back
- mistake log
- spaced repetition
- readiness by subject and by DCS transfer skill

### Teaching and learning

- retrieval-first lessons
- worked examples
- "explain to Paul" prompts
- "teach a staff member" prompts
- misconceptions
- concept maps
- practical outputs
- DCS transfer tasks
- resource links

### Admin/content pipeline

- local source inventory
- extracted SLG metadata
- duplicate/version detection
- subject aliases
- source QA flags
- generated question scaffolds
- manual review status

### Evidence pack

- subject completion summaries
- SILO mastery summaries
- practical artifacts
- PD log entries
- resource completion notes
- reflection entries
- "DCS relevance" summary for supervisor discussion

## Implementation phases

### Phase 0: Source QA and schema

Build:

- `src/types/academic.ts`
- `src/data/rbcSubjects.ts`
- source manifest
- canonical subject selection
- duplicate map

Definition of done:

- every local SLG PDF appears in source library
- every unique subject has a subject entry
- every subject has at least one SILO summary
- duplicate files are linked, not ignored

### Phase 1: RBC dashboard and subject pages

Build:

- `/rbc`
- `/rbc/subjects`
- `/rbc/subjects/[subjectCode]`
- new navigation item

Definition of done:

- user can browse all subjects
- subject pages show source links, SILOs, topics, DCS transfer tasks, and resources
- no assessments yet required

### Phase 2: SILO learning engine

Build:

- lesson sections per SILO
- flashcards
- explain-back prompts
- concept sorting
- local progress storage by SILO

Definition of done:

- CSE1PE, CSE1ICB, CSE4002, and CSE5006 each have one fully working SILO path
- due review can include RBC flashcards

### Phase 3: Assessment engine expansion

Build:

- RBC assessment item types
- code-tracing/code-output questions
- data interpretation questions
- rubric-scored practical tasks
- subject final challenge

Definition of done:

- every canonical subject has at least 10 assessment items
- every item maps to a SILO
- error log and spaced repetition work for RBC items

### Phase 4: DCS transfer tasks and evidence pack

Build:

- practical output submission/checklist UI
- PD log integration
- evidence pack summary for RBC subjects
- DCS transfer capability matrix

Definition of done:

- each subject has at least one practical artifact
- evidence pack can export a summary of RBC progress and artifacts

### Phase 5: Resource library

Build:

- curated resource database
- resource type filter
- "why this resource" notes
- subject/resource mapping
- watch/read/do status

Definition of done:

- every subject has at least three external resources
- resources can be marked "queued", "in progress", "completed", or "not useful"

### Phase 6: AI coaching guardrails

Build:

- AI prompt templates that use subject/SILO summaries, not raw private data
- explain-back evaluator
- study planner
- resource recommender
- privacy reminder

Definition of done:

- AI never receives live DCS data by default
- AI can generate a 7-day RBC study plan from local progress only
- AI can score a short answer against a rubric without storing sensitive content

## First vertical slice

Build the first end-to-end slice around CSE1PE because it is concrete, useful, and easy to assess.

Scope:

- CSE1PE subject page
- 4 SILOs
- 8 topic lessons
- 20 flashcards
- 20 assessment items
- 3 code exercises
- 1 final practical: parse synthetic DCS support tickets from CSV and produce a simple summary
- evidence pack export

Why this first:

- directly builds programming confidence
- produces practical automation thinking for DCS
- validates code/task assessment before harder AI and cloud subjects

Second slice:

- CSE1ICB for secure school support

Third slice:

- CSE4002 for AI fundamentals and responsible triage helpers

Fourth slice:

- CSE5006 because it improves DCSPrep itself

## Suggested content counts

Minimum complete module:

- 14 canonical subjects/source areas
- 120+ SILO-linked lessons
- 180+ flashcards
- 160+ quiz questions
- 60+ short-answer/explain-back prompts
- 35+ practical tasks
- 14 final subject challenges
- 5 cross-subject DCS bridge capstones

Quality target:

- no subject should be only a reading list
- every subject needs a practical DCS transfer task
- every SILO needs a way to prove understanding
- every assessment item needs feedback and common mistakes

## Example subject final challenges

- CSE1IIT: explain and diagram a DCS classroom technology issue from hardware to web service.
- CSE1PE: write a Python script against synthetic ticket data.
- CSE1OOF: model support tickets/assets/users as Java classes and test basic behaviours.
- CSE1IS: produce a system context diagram and simple ER model for a DCS workflow.
- CSE1ICB: triage a simulated account compromise and write a safe escalation note.
- STA1DCT: critique a chart and produce a better evidence-backed interpretation.
- CSE3PE: write an ethical decision memo for a difficult access/privacy scenario.
- CSE4002: design a rule-based expert system for Level 1 support triage.
- CSE5006: build a small stateless web feature for DCSPrep.
- CSE5ML: train/evaluate a toy classifier on synthetic support categories.
- CSE5NLP: build a synthetic ticket categoriser or KB tagger.
- CSE5DL: implement a small PyTorch notebook and write a deployment/ethics note.
- CSE5CV: critique a computer-vision approach and build a toy non-person image classifier.
- CSE5BDC: design a privacy-safe data pipeline for aggregated support trends.

## App architecture notes

Keep the existing module engine, but add an academic layer:

- Current modules remain practical DCS Level 1 training.
- RBC subjects become academic/professional-development tracks.
- Bridge tasks connect both worlds.

Recommended approach:

- Do not rewrite current `src/data/modules.ts`.
- Add RBC-specific data and components.
- Reuse existing UI primitives and progress utilities where possible.
- Extend evidence pack rather than duplicating it.
- Add tests for source mapping, subject counts, SILO coverage, and assessment coverage.

Potential tests:

- every `RbcSubject` has at least one source
- every `RbcSubject` has at least one SILO
- every `RbcSilo` has at least one assessment item before "complete" status
- every local source path referenced by data exists
- every external resource has a URL and type
- no resource is mapped to an unknown subject

## Risks and mitigations

Risk: too much academic content becomes passive reading.

Mitigation: every lesson starts with retrieval and ends with a practical task.

Risk: DCS-specific examples expose sensitive data.

Mitigation: only use synthetic/anonymised data; add privacy reminders to every practical task.

Risk: resource links go stale.

Mitigation: store resource metadata and last-checked date; add a simple link audit script later.

Risk: duplicate SLGs create inconsistent content.

Mitigation: choose canonical version per subject and keep older versions as source history.

Risk: AI/ML subjects become disconnected from Level 1 work.

Mitigation: make every advanced subject include a "where this helps at DCS" and "where this should not be used" section.

Risk: DCSPrep turns into a full university LMS too early.

Mitigation: ship vertical slices. CSE1PE first, then cyber, AI, cloud, then advanced AI subjects.

## Current implementation status

Updated: 2026-05-08.

The Phase 0 / CSE1PE vertical slice has moved into the live app as `/academic-pd`, not `/rbc`. The app now includes the Academic PD catalogue, subject pages, weekly SLG-style module boxes, integrated AI-graded assessments, feedback history, subject progress bars, per-SILO progress, generated subject flashcards, final challenge checklists, certificates, progress backup/import/export, SLG draft import, content governance, supervisor analytics, local sync, KB export, hardware catalogue, virtual classroom troubleshooting, mobile QA, and integration export scaffolds.

Completed implementation tasks:

1. [x] Create `src/types/academic.ts`.
2. [x] Create the Academic PD subject catalogue in `src/data/academicSubjects.ts`.
3. [x] Add `/academic-pd` and `/academic-pd/subjects/[subjectCode]`.
4. [x] Build CSE1PE with working weekly modules, SILO progress, flashcards, assessment items, and practical DCS transfer tasks.
5. [x] Add tests proving subject/source/SILO links and assessment coverage are valid.
6. [x] Add a draft SLG import workflow for pasted/copied PDF text.
7. [x] Add content governance review status and admin draft export.
8. [x] Add evidence, supervisor, KB, and LMS/HRIS export scaffolds.

Next best expansion steps:

1. [ ] Add full binary PDF text extraction for SLG import.
2. [ ] Add direct admin publishing so subjects, resources, assessments, and weekly blocks can be updated without editing TypeScript.
3. [ ] Add authenticated cloud database sync across devices.
4. [ ] Run mobile/offline QA on a phone and document the install/offline behaviour.
5. [x] Add quick-fix printable cheat sheets and synthetic ticket CSV import. Implemented via `/cheat-sheets`, `/ticket-data-import`, `src/data/cheatSheets.ts`, and `src/lib/ticketCsvImport.ts`.

## Public source links checked while preparing this plan

- La Trobe Online Master of Information Technology: https://onlinecourses.latrobe.edu.au/courses/master-information-technology/
- La Trobe Online Master of Information Technology subjects: https://onlinecourses.latrobe.edu.au/courses/master-information-technology/subjects/
- Microsoft Intune for Education: https://learn.microsoft.com/en-us/intune/solutions/education/overview
- Microsoft School Data Sync: https://learn.microsoft.com/en-us/schooldatasync/school-data-sync-overview
- Microsoft Teams for Education IT admin resources: https://learn.microsoft.com/en-gb/MicrosoftTeams/expand-teams-across-your-org/teams-for-education-landing-page
- Microsoft 365 Education service description: https://learn.microsoft.com/en-us/office365/servicedescriptions/office-365-platform-service-description/office-365-education
- PaperCut secure print release: https://www.papercut.com/help/manuals/ng-mf/releasestation/rs
- ViewSonic ViewBoard troubleshooting: https://manuals.viewsonic.com/ViewBoard_Troubleshooting
- CS50x: https://cs50.harvard.edu/x/
- Python for Everybody: https://www.py4e.com/lessons
- MDN Learn Web Development: https://developer.mozilla.org/en-US/docs/Learn
- University of Helsinki Java Programming MOOC: https://java-programming.mooc.fi/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework
- ACSC Essential Eight: https://www.cyber.gov.au/acsc/view-all-content/essential-eight
- OpenIntro Statistics: https://open.umn.edu/opentextbooks/textbooks/60
- MIT OCW Artificial Intelligence 6.034: https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/
- React Learn: https://react.dev/learn
- Docker Get Started: https://docs.docker.com/get-started/
- AWS Cloud Practitioner Essentials: https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/
- scikit-learn getting started: https://sklearn.org/stable/getting_started.html
- fast.ai Practical Deep Learning for Coders: https://course.fast.ai/
- Hugging Face course: https://huggingface.co/course
- Stanford CS224N: https://web.stanford.edu/class/cs224n/index.html
- Stanford CS231n: https://cs231n.stanford.edu/2019/
- Apache Spark documentation: https://spark.apache.org/documentation
- ACM Code of Ethics: https://www.acm.org/code-of-ethics
- OAIC privacy guidance: https://www.oaic.gov.au/_old/privacy/guidance-and-advice
