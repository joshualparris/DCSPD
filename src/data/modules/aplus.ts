import { mcq, shortAnswer, orderSteps, categorization, buildSections, buildFlashcards, buildScenarioPrompts, buildPracticalOutputs, createModule, enhanceModule, reviewSchedule, type LegacyTrainingModule, type ModuleEnhancement } from './helpers';

export const aplusModules = [
  createModule({
    id: 'a-plus-laptop-hardware-core1',
    title: 'A+ Core 1: Laptop hardware',
    description:
      'Laptop components, ports, upgrades, and common hardware symptoms. Focus on parts recognition and safe, evidence-driven troubleshooting.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 30,
    tags: ['A+ 220-1201', 'laptop', 'battery', 'SSD', 'ports', 'repair'],
    learningObjectives: [
      'Identify common laptop hardware parts and their purpose.',
      'Choose a safe upgrade path (RAM/storage) based on the symptom and device constraints.',
      'Describe a Level 1-safe first response for power, battery, and overheating symptoms.'
    ],
    dcsRelevance: [
      'Maps to student and staff laptop triage without turning PD notes into ticket archives.',
      'Supports faster identification of "battery/power vs performance vs thermal" symptom patterns.'
    ],
    sections: buildSections('a-plus-laptop-hardware-core1', [
      {
        title: 'Laptop parts you must recognise',
        bodyMarkdown:
          'Laptop support is mostly evidence and constraint handling: form factor limits, integrated parts, and time pressure.\n\nCore parts: battery, AC adapter/charger, DC jack, keyboard/trackpad, display panel, webcam/mic, storage (2.5" SATA, M.2 NVMe), RAM (SO-DIMM), Wi-Fi/Bluetooth card, fans and heat sinks.\n\nA safe first check is usually: power source, charger state, visible damage, and whether the symptom is power, display, storage, or thermal.',
        takeaway: 'Classify the symptom (power/display/storage/thermal) before changing settings.'
      },
      {
        title: 'Upgrades: SSDs, RAM, and what they change',
        bodyMarkdown:
          'Storage upgrades change perceived speed and reliability. RAM upgrades mainly help multitasking and memory pressure.\n\nIf the device is sluggish:\n- Check storage health and free space first.\n- SSD vs HDD matters dramatically.\n\nIf the device freezes under load:\n- Memory pressure (RAM) is likely.\n\nAlways confirm form factor (SO-DIMM vs soldered) and interface (SATA vs NVMe) before ordering parts.',
        takeaway: 'Choose upgrades based on symptom + constraints, not guesswork.'
      },
      {
        title: 'Battery and thermal symptoms (Level 1-safe)',
        bodyMarkdown:
          'Battery symptoms: won’t charge, drains fast, shuts down under load, or runs only on AC.\n\nThermal symptoms: fan noise, throttling/slow performance, shutdowns, or very hot chassis.\n\nSafe actions: check adapter, confirm charging state, check vents/airflow, and document reproducibility. Avoid disassembly unless authorised.',
        takeaway: 'Capture evidence and escalate rather than experimenting under time pressure.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-laptop-hardware-core1', [
      ['What does an M.2 slot commonly host in modern laptops?', 'An SSD (often NVMe PCIe, sometimes SATA depending on the device).'],
      ['What kind of RAM is common in laptops?', 'SO-DIMM (or soldered LPDDR in some ultrabooks).'],
      ['What symptom often suggests thermal throttling?', 'Performance slows significantly under load and improves after cooling.'],
      ['What is a safe first step for a laptop that will not power on?', 'Confirm power source/charger state and compare with known-good if available.'],
      ['SSD vs HDD: which gives the biggest everyday speed improvement?', 'SSD.'],
      ['Name two common laptop radios.', 'Wi-Fi and Bluetooth.'],
      ['What is the DC jack?', 'The laptop power input port where the charger connects.'],
      ['Why avoid disassembly as Level 1 without approval?', 'It increases risk and may exceed role boundaries.'],
      ['What does “runs only on AC” often point to?', 'Battery failure or power-path/battery connection issues.'],
      ['What is one evidence item to capture before escalation for power issues?', 'Exact symptom + charger/LED state + AC vs battery behaviour.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-laptop-hardware-q1',
        prompt: 'A laptop is extremely slow when launching apps and opening files, but it does not freeze. Which upgrade most directly improves this symptom on an older device?',
        domain: 'A+ Core 1 laptop hardware',
        difficulty: 'foundation',
        explanation: 'Storage speed is a dominant factor for app launch and file access.',
        modelAnswer: 'Replace an HDD with an SSD (or upgrade to a faster SSD if applicable).',
        commonMistakes: ['Assuming RAM is always the first upgrade', 'Skipping evidence about disk behaviour'],
        dcsContext: 'Many “slow laptop” reports are storage-bound. Preserve evidence and choose the smallest safe fix.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-laptop-hardware-core1',
        weakTopic: 'laptop-mobile-hardware',
        options: [
          { id: 'a', label: 'Upgrade from HDD to SSD' },
          { id: 'b', label: 'Increase screen resolution' },
          { id: 'c', label: 'Add an external keyboard' },
          { id: 'd', label: 'Disable Wi-Fi to improve performance' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-laptop-hardware-q2',
        prompt: 'A laptop becomes slow and then suddenly shuts down during a video call. The chassis feels very hot. What is the strongest first classification?',
        domain: 'A+ Core 1 laptop hardware',
        difficulty: 'foundation',
        explanation: 'Heat + shutdown strongly suggests a thermal path issue.',
        modelAnswer: 'Thermal issue (overheating / throttling leading to shutdown).',
        commonMistakes: ['Calling it a network issue', 'Jumping to OS reinstall'],
        dcsContext: 'Classroom pressure can push devices into thermal limits. Classify the symptom before deeper work.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-laptop-hardware-core1',
        weakTopic: 'laptop-mobile-hardware',
        options: [
          { id: 'a', label: 'Thermal/overheating path issue' },
          { id: 'b', label: 'DNS resolution failure' },
          { id: 'c', label: 'Printer queue issue' },
          { id: 'd', label: 'VLAN segmentation issue' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-laptop-hardware-q3',
        prompt: 'List three laptop items you should confirm before ordering a storage upgrade.',
        domain: 'A+ Core 1 laptop hardware',
        difficulty: 'stretch',
        explanation: 'Correct parts depend on form factor and interface.',
        modelAnswer: 'Confirm interface (SATA vs NVMe), form factor (2.5" vs M.2), and device compatibility/available slots/capacity.',
        commonMistakes: ['Buying the wrong interface', 'Assuming all M.2 drives are the same'],
        dcsContext: 'Wrong parts waste time and budget; evidence-based ordering matters.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-laptop-hardware-core1',
        weakTopic: 'laptop-mobile-hardware',
        rubric: ['Names interface', 'Names form factor', 'Mentions compatibility/slots/capacity'],
        keywordHints: ['SATA', 'NVMe', 'M.2', '2.5', 'slot', 'model']
      }),
      orderSteps({
        id: 'a-plus-laptop-hardware-q4',
        prompt: 'Order the safest Level 1 response for “laptop will not power on.”',
        domain: 'A+ Core 1 laptop hardware',
        difficulty: 'stretch',
        explanation: 'Start with power evidence before deeper changes.',
        modelAnswer: 'Confirm power source, check adapter/indicator, try known-good outlet/adapter, then escalate with evidence.',
        commonMistakes: ['Disassembling immediately', 'Changing BIOS settings without power evidence'],
        dcsContext: 'The priority is safe triage and minimal disruption.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-laptop-hardware-core1',
        weakTopic: 'laptop-mobile-hardware',
        steps: [
          { id: 'source', label: 'Confirm outlet / power source is working' },
          { id: 'adapter', label: 'Check adapter/charger connection and indicators' },
          { id: 'known', label: 'Test a known-good adapter or outlet if available' },
          { id: 'escalate', label: 'Escalate with evidence if still no power' }
        ],
        correctOrder: ['source', 'adapter', 'known', 'escalate'],
        rubric: ['Power evidence first', 'Uses known-good comparison', 'Escalates instead of guessing']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-laptop-hardware-core1', [
      {
        title: 'Sluggish laptop triage note (privacy-safe)',
        prompt: 'Write the note that separates storage-bound slowness from RAM pressure and thermal throttling.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-laptop-hardware-core1', [
      {
        title: 'Laptop symptom classification cheat sheet',
        description: 'Create a one-page cheat sheet: power vs display vs storage vs thermal, with safe first checks.'
      }
    ])
  }),
  createModule({
    id: 'a-plus-mobile-connectivity-mdm-core1',
    title: 'A+ Core 1: Mobile connectivity and MDM basics',
    description:
      'Mobile connections (USB, Bluetooth, NFC, tethering/hotspots) and MDM ownership models (BYOD/COPE) with safe support boundaries.',
    domain: 'Operations',
    level: 'A+',
    estimatedMinutes: 26,
    tags: ['A+ 220-1201', 'mobile', 'USB', 'Bluetooth', 'NFC', 'tethering', 'MDM'],
    learningObjectives: [
      'Choose the right connection method for the goal (charge, data, audio, internet).',
      'Explain common mobile connectivity terms simply.',
      'Describe what MDM does and how ownership models change support boundaries.'
    ],
    dcsRelevance: [
      'Useful for staff BYOD realities and school-managed iPads without mixing real data into PD notes.',
      'Builds safer judgement around “what Level 1 can do” versus “what needs an MDM owner”.'
    ],
    sections: buildSections('a-plus-mobile-connectivity-mdm-core1', [
      {
        title: 'Connection methods: what they’re for',
        bodyMarkdown:
          'Mobile devices connect in multiple layers:\n- USB/USB-C/Lightning: charging + data + sometimes video/audio.\n- Bluetooth: pairing accessories and short-range data.\n- NFC: extremely short-range tap interactions.\n- Hotspot/tethering: using a phone as an internet connection.\n\nClarify the goal before choosing the connection path.',
        takeaway: 'Clarify goal first: charging, data, audio, or internet.'
      },
      {
        title: '“It won’t connect” triage patterns',
        bodyMarkdown:
          'Wi-Fi/mobile: capture SSID, signal, error/symptom, and scope (one device or many).\n\nBluetooth: confirm pairing mode, remove/re-pair, and check it is not paired elsewhere.\n\nHotspot: confirm hotspot is enabled and the client is authenticating to the right SSID.',
        takeaway: 'Evidence beats guessing: SSID/scope for Wi-Fi and pairing state for Bluetooth.'
      },
      {
        title: 'MDM and ownership boundaries',
        bodyMarkdown:
          'MDM is central configuration/app/policy management.\n\nOwnership models:\n- BYOD: user-owned, limited control and high privacy sensitivity.\n- COPE: org-owned with personal enablement, more control.\n\nCapture ownership context and route to the authorised owner when management changes are required.',
        takeaway: 'Ownership model determines what changes are safe and allowed.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-mobile-connectivity-mdm-core1', [
      ['What does Bluetooth primarily provide?', 'Short-range pairing for accessories and low-power data exchange.'],
      ['What is NFC?', 'Near Field Communication: very short-range tap communication (tags/auth).'],
      ['What is tethering/hotspot?', 'Using a phone as an internet connection for another device (Wi-Fi/USB/Bluetooth).'],
      ['What is MDM?', 'Central management for device configuration, apps, and security policy.'],
      ['BYOD stands for what?', 'Bring Your Own Device (user-owned).'],
      ['COPE means what?', 'Corporate-Owned, Personally Enabled (org-owned, personal use allowed).'],
      ['First evidence question for “Wi-Fi won’t connect”?', 'Which SSID, what error/symptom, and is it one device or many?'],
      ['First evidence question for Bluetooth problems?', 'Is it already paired elsewhere and is it in pairing mode/discoverable?']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-mobile-connectivity-q1',
        prompt: 'Which technology is designed for very short-range “tap” interactions such as tags or quick auth?',
        domain: 'A+ Core 1 mobile connectivity',
        difficulty: 'foundation',
        explanation: 'NFC is intentionally short-range.',
        modelAnswer: 'NFC.',
        commonMistakes: ['Confusing Bluetooth with NFC'],
        dcsContext: 'Short-range tech matters for accessories, tags, and quick device workflows.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-mobile-connectivity-mdm-core1',
        weakTopic: 'laptop-mobile-hardware',
        options: [
          { id: 'a', label: 'NFC' },
          { id: 'b', label: 'Bluetooth' },
          { id: 'c', label: 'TCP' },
          { id: 'd', label: 'DHCP' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-mobile-connectivity-q2',
        prompt: 'Why does BYOD versus COPE matter in support decisions?',
        domain: 'A+ Core 1 MDM basics',
        difficulty: 'stretch',
        explanation: 'Ownership affects allowed changes and privacy.',
        modelAnswer:
          'Because ownership determines what the organisation is allowed to manage/change and how privacy boundaries are handled; BYOD is user-owned with limited control, COPE is organisation-owned with more managed policy and app control.',
        commonMistakes: ['Treating all devices as school-owned', 'Ignoring privacy boundaries'],
        dcsContext: 'School support must respect ownership and privacy boundaries.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-mobile-connectivity-mdm-core1',
        weakTopic: 'mdm-group-policy',
        rubric: ['Mentions ownership', 'Mentions control/policy', 'Mentions privacy/boundaries'],
        keywordHints: ['BYOD', 'COPE', 'ownership', 'policy', 'privacy']
      }),
      mcq({
        id: 'a-plus-mobile-connectivity-q3',
        prompt: 'Which option best describes tethering?',
        domain: 'A+ Core 1 mobile connectivity',
        difficulty: 'foundation',
        explanation: 'Tethering uses a mobile device to provide internet connectivity to another device.',
        modelAnswer: 'Using a phone as an internet connection for another device.',
        commonMistakes: ['Calling it VLAN', 'Confusing with Bluetooth pairing'],
        dcsContext: 'Staff may use hotspots during outages; your note should use the right term.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-mobile-connectivity-mdm-core1',
        weakTopic: 'laptop-mobile-hardware',
        options: [
          { id: 'a', label: 'Using a phone as an internet connection for another device' },
          { id: 'b', label: 'Assigning IPs automatically on a LAN' },
          { id: 'c', label: 'Encrypting a Wi-Fi network with WPA3' },
          { id: 'd', label: 'Routing traffic between two subnets' }
        ],
        correctOptionId: 'a'
      }),
      orderSteps({
        id: 'a-plus-mobile-connectivity-q4',
        prompt: 'Order the best first-line triage for “Bluetooth headset won’t connect.”',
        domain: 'A+ Core 1 mobile connectivity',
        difficulty: 'stretch',
        explanation: 'Pairing state and re-pair fixes are common and safe.',
        modelAnswer: 'Confirm pairing mode, remove old pairing, re-pair, then test and document symptom.',
        commonMistakes: ['Changing unrelated Wi-Fi settings', 'Skipping remove/re-pair'],
        dcsContext: 'Fast safe checks matter in classrooms.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-mobile-connectivity-mdm-core1',
        weakTopic: 'laptop-mobile-hardware',
        steps: [
          { id: 'mode', label: 'Confirm the headset is in pairing mode / discoverable' },
          { id: 'forget', label: 'Remove/forget the old pairing on the device' },
          { id: 'pair', label: 'Pair again and confirm it connects' },
          { id: 'test', label: 'Test audio and record any remaining symptom for escalation' }
        ],
        correctOrder: ['mode', 'forget', 'pair', 'test'],
        rubric: ['Starts with pairing state', 'Uses remove/re-pair', 'Ends with evidence capture']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-mobile-connectivity-mdm-core1', [
      { title: 'Hotspot in an outage', prompt: 'Write the note that captures hotspot use safely without copying private details.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-mobile-connectivity-mdm-core1', [
      { title: 'Mobile connectivity quick map', description: 'Create a quick map: USB vs Bluetooth vs NFC vs hotspot, and when each is used.' }
    ])
  }),
  createModule({
    id: 'a-plus-network-core1-ports-protocols-services',
    title: 'A+ Core 1: Networking basics (ports, protocols, services)',
    description:
      'Core networking concepts: IP/TCP/UDP, common ports, and what DNS/DHCP/services do. Designed for support notes and troubleshooting.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 34,
    tags: ['A+ 220-1201', 'TCP', 'UDP', 'ports', 'DNS', 'DHCP', 'HTTP', 'HTTPS'],
    learningObjectives: [
      'Explain IP/TCP/UDP and port numbers in plain English.',
      'Recall common ports and the service they map to.',
      'Describe DNS and DHCP symptoms and how to separate them.'
    ],
    dcsRelevance: [
      'Helps you write clearer network notes (DNS vs DHCP vs “internet is down”).',
      'Supports better escalation quality when class time is impacted.'
    ],
    sections: buildSections('a-plus-network-core1-ports-protocols-services', [
      {
        title: 'IP, TCP, UDP (what they do)',
        bodyMarkdown:
          'IP handles addressing and routing between networks. TCP provides reliable, ordered delivery. UDP is simpler and faster but does not guarantee delivery.\n\nPorts identify the application/service endpoint on a host.\n\nSupport habit: decide which layer is failing: IP reachability, name resolution (DNS), address assignment (DHCP), or an application port.',
        takeaway: 'Layer thinking prevents vague “network is down” notes.'
      },
      {
        title: 'Common ports you should recall',
        bodyMarkdown:
          'Practical set: 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 110 POP3, 143 IMAP, 389 LDAP, 443 HTTPS, 445 SMB, 3389 RDP.',
        takeaway: 'A small set of ports covers most support conversations.'
      },
      {
        title: 'DNS vs DHCP symptom splits',
        bodyMarkdown:
          'DNS failure: names fail but IP access may still work.\n\nDHCP failure: no valid lease, possible 169.254.x.x, limited connectivity.\n\nWrite notes that separate: IP reachability vs name resolution vs authentication/proxy blocks.',
        takeaway: 'Separate DNS vs DHCP vs auth/proxy symptoms in your notes.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-network-core1-ports-protocols-services', [
      ['What does IP primarily provide?', 'Addressing and routing between networks.'],
      ['What is TCP known for?', 'Reliable, ordered delivery (connection-oriented).'],
      ['What is UDP known for?', 'Lower overhead; no delivery guarantee (connectionless).'],
      ['Port 53 is used by what?', 'DNS.'],
      ['Ports 67/68 are used by what?', 'DHCP.'],
      ['Port 443 is used by what?', 'HTTPS.'],
      ['Port 3389 is used by what?', 'RDP.'],
      ['DNS failure symptom pattern?', 'Names fail; direct IP may still work.'],
      ['DHCP failure symptom pattern?', 'No valid lease; may see 169.254.x.x (APIPA).']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-network-core1-q1',
        prompt: 'A device shows 169.254.x.x and cannot reach the network. What is the most likely failing service?',
        domain: 'A+ Core 1 networking',
        difficulty: 'foundation',
        explanation: 'APIPA often appears when DHCP lease assignment fails.',
        modelAnswer: 'DHCP (address assignment).',
        commonMistakes: ['Calling it DNS', 'Assuming whole-network outage'],
        dcsContext: 'Keep the note precise: “no DHCP lease / APIPA seen” is better than “internet down.”',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-core1-ports-protocols-services',
        weakTopic: 'dns-dhcp-gateway',
        options: [
          { id: 'a', label: 'DHCP' },
          { id: 'b', label: 'DNS' },
          { id: 'c', label: 'SMTP' },
          { id: 'd', label: 'NFC' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-network-core1-q2',
        prompt: 'Which port is most commonly associated with HTTPS?',
        domain: 'A+ Core 1 networking',
        difficulty: 'foundation',
        explanation: 'HTTPS typically uses TCP 443.',
        modelAnswer: '443.',
        commonMistakes: ['Choosing 80', 'Mixing up with 53'],
        dcsContext: 'Port recognition helps interpret firewall rules and access notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-core1-ports-protocols-services',
        weakTopic: 'ports-protocols',
        options: [
          { id: 'a', label: '80' },
          { id: 'b', label: '443' },
          { id: 'c', label: '53' },
          { id: 'd', label: '3389' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'a-plus-network-core1-q3',
        prompt: 'In one or two sentences, explain the difference between DNS and DHCP.',
        domain: 'A+ Core 1 networking',
        difficulty: 'stretch',
        explanation: 'These are different services with different failure symptoms.',
        modelAnswer:
          'DNS translates names to addresses. DHCP assigns IP configuration (address/gateway/DNS) to devices. DNS failures break name lookups; DHCP failures break valid address assignment.',
        commonMistakes: ['Treating DNS and DHCP as the same service'],
        dcsContext: 'Better notes come from separating these layers.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-core1-ports-protocols-services',
        weakTopic: 'network-services',
        rubric: ['Defines DNS', 'Defines DHCP', 'Mentions symptom difference'],
        keywordHints: ['names', 'address', 'lease', 'assign']
      }),
      orderSteps({
        id: 'a-plus-network-core1-q4',
        prompt: 'Order the best troubleshooting split when “websites won’t load.”',
        domain: 'A+ Core 1 networking',
        difficulty: 'stretch',
        explanation: 'Start with reachability, then name resolution, then app path.',
        modelAnswer: 'IP reachability, then DNS, then app/auth/proxy path, then record evidence.',
        commonMistakes: ['Jumping straight to reinstalling browsers', 'Skipping DNS checks'],
        dcsContext: 'Evidence-based splits reduce noisy escalation.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-core1-ports-protocols-services',
        weakTopic: 'network-services',
        steps: [
          { id: 'ip', label: 'Confirm IP reachability (basic connectivity)' },
          { id: 'dns', label: 'Check name resolution (DNS)' },
          { id: 'app', label: 'Check app path (HTTPS/proxy/auth) if IP and DNS look OK' },
          { id: 'note', label: 'Record the split and escalate if needed' }
        ],
        correctOrder: ['ip', 'dns', 'app', 'note'],
        rubric: ['Starts with reachability', 'Separates DNS', 'Ends with evidence capture']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-network-core1-ports-protocols-services', [
      { title: 'APIPA note', prompt: 'Write a note for a 169.254/APIPA device that stays scope-aware and escalation-ready.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-network-core1-ports-protocols-services', [
      { title: 'Common ports reference card', description: 'Create a short reference card of the ports you must recall for Core 1.' }
    ])
  }),
  createModule({
    id: 'a-plus-wireless-networks-core1',
    title: 'A+ Core 1: Wireless networks',
    description:
      'Wi-Fi basics (bands/channels expectations), Bluetooth pairing, and short-range tech like NFC/RFID. Designed for fast, evidence-based support notes.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 28,
    tags: ['A+ 220-1201', 'Wi-Fi', '2.4GHz', '5GHz', 'Bluetooth', 'NFC', 'RFID'],
    learningObjectives: [
      'Explain 2.4GHz vs 5GHz trade-offs in plain language.',
      'Capture wireless scope evidence before declaring an “outage”.',
      'Use a safe pairing triage for Bluetooth devices.'
    ],
    dcsRelevance: [
      'Helps with room-specific wireless complaints and “works elsewhere” patterns.',
      'Improves note quality for classroom connectivity incidents.'
    ],
    sections: buildSections('a-plus-wireless-networks-core1', [
      {
        title: '2.4GHz vs 5GHz: expectations not myths',
        bodyMarkdown:
          '2.4GHz generally reaches further and penetrates obstacles better, but is often more congested.\n\n5GHz often provides higher throughput and less interference, but shorter range.\n\nThe support skill: set expectation based on environment (crowding, walls, distance) and capture location evidence.',
        takeaway: '2.4GHz tends toward range; 5GHz tends toward speed/less congestion.'
      },
      {
        title: 'Scope evidence for wireless issues',
        bodyMarkdown:
          'Before making claims, capture:\n- where (room/location)\n- what SSID/network\n- one device vs many\n- time pattern\n- comparison device result\n\nWireless faults can be hyper-local. Your note should preserve that scope instead of flattening it into “Wi-Fi bad”.',
        takeaway: 'Wireless notes must include location + scope + comparison.'
      },
      {
        title: 'Bluetooth, NFC, RFID (don’t mix them)',
        bodyMarkdown:
          'Bluetooth: pairing for accessories (headsets/keyboards).\n\nNFC: extremely short-range tap interactions.\n\nRFID: identification/tracking (range and implementation vary).\n\nIf you use the wrong term, you choose the wrong troubleshooting path.',
        takeaway: 'Correct terminology prevents wasted troubleshooting.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-wireless-networks-core1', [
      ['2.4GHz Wi-Fi is often better at what?', 'Range/penetration (often more congestion).'],
      ['5GHz Wi-Fi is often better at what?', 'Higher throughput/less interference (often shorter range).'],
      ['What are the 3 most important wireless note fields?', 'Location, SSID, and scope (one device vs many).'],
      ['What is a “comparison device” check?', 'Test a known-good device in the same location on the same SSID.'],
      ['Bluetooth is mainly used for what?', 'Accessory pairing and short-range connectivity.'],
      ['NFC is mainly used for what?', 'Tap-based short-range interactions (tags/auth).'],
      ['RFID is mainly used for what?', 'Identification/tracking tags.'],
      ['First action for Bluetooth issues?', 'Confirm pairing mode/discoverable and remove/re-pair if needed.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-wireless-q1',
        prompt: 'Which Wi-Fi band is generally associated with longer range but more congestion in many environments?',
        domain: 'A+ Core 1 wireless networks',
        difficulty: 'foundation',
        explanation: '2.4GHz tends to travel further and is heavily used.',
        modelAnswer: '2.4GHz.',
        commonMistakes: ['Assuming 5GHz always has longer range'],
        dcsContext: 'Room-specific complaints often relate to range/crowding. Capture evidence before guessing.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-wireless-networks-core1',
        weakTopic: 'wireless-networks',
        options: [
          { id: 'a', label: '2.4GHz' },
          { id: 'b', label: '5GHz' },
          { id: 'c', label: 'TCP' },
          { id: 'd', label: 'NFC' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-wireless-q2',
        prompt: 'A teacher says “Wi-Fi is bad in this room but fine elsewhere.” What is the strongest first evidence question?',
        domain: 'A+ Core 1 wireless networks',
        difficulty: 'foundation',
        explanation: 'Scope controls everything that follows.',
        modelAnswer: 'Check whether other devices in the same room on the same SSID have the same issue.',
        commonMistakes: ['Jumping to resets', 'Assuming the device is broken'],
        dcsContext: 'Wireless problems can be location-specific in schools.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-wireless-networks-core1',
        weakTopic: 'wireless-networks',
        options: [
          { id: 'a', label: 'Do other devices in the same room on the same SSID have the issue?' },
          { id: 'b', label: 'What is the printer model?' },
          { id: 'c', label: 'What is the user’s password?' },
          { id: 'd', label: 'Which BIOS version is installed?' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-wireless-q3',
        prompt: 'Which technology is most associated with identification/tracking tags in many environments?',
        domain: 'A+ Core 1 wireless networks',
        difficulty: 'foundation',
        explanation: 'RFID is widely used for identification/tracking tags.',
        modelAnswer: 'RFID.',
        commonMistakes: ['Mixing up NFC and RFID'],
        dcsContext: 'Correct wording improves vendor/system-owner communication.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-wireless-networks-core1',
        weakTopic: 'wireless-networks',
        options: [
          { id: 'a', label: 'RFID' },
          { id: 'b', label: 'UDP' },
          { id: 'c', label: 'SSH' },
          { id: 'd', label: 'RDP' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-wireless-q4',
        prompt: 'List three evidence items you should capture before escalating a “Wi-Fi bad in one room” report.',
        domain: 'A+ Core 1 wireless networks',
        difficulty: 'stretch',
        explanation: 'Wireless issues are often location-specific; evidence must capture that.',
        modelAnswer: 'Room/location, SSID, scope (one device vs many), and comparison device result (any three).',
        commonMistakes: ['Writing only “Wi-Fi down”', 'Skipping scope'],
        dcsContext: 'Room-based evidence makes escalations actionable.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-wireless-networks-core1',
        weakTopic: 'wireless-networks',
        rubric: ['Includes location', 'Includes SSID', 'Includes scope/comparison'],
        keywordHints: ['room', 'SSID', 'scope', 'device', 'compare']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-wireless-networks-core1', [
      { title: 'Room-specific Wi-Fi note', prompt: 'Write an escalation note for a room-specific Wi-Fi issue that impacts learning.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-wireless-networks-core1', [
      { title: 'Wireless evidence checklist', description: 'Create a checklist of the evidence fields you always capture for wireless issues.' }
    ])
  }),
  createModule({
    id: 'a-plus-network-devices-tools-core1',
    title: 'A+ Core 1: Network devices and tools',
    description:
      'Routers, switches, access points, firewalls, PoE, modems/ONTs, and the common field tools you use to gather evidence.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 30,
    tags: ['A+ 220-1201', 'router', 'switch', 'AP', 'firewall', 'PoE', 'tools'],
    learningObjectives: [
      'Describe the role of common network devices.',
      'Choose a simple tool for the evidence you need (cable tester, tone generator, Wi-Fi analyser, loopback).',
      'Write a note that separates “device”, “path”, and “scope”.'
    ],
    dcsRelevance: [
      'Useful when escalating room/network-path issues without overclaiming root cause.',
      'Improves confidence in describing infrastructure components accurately.'
    ],
    sections: buildSections('a-plus-network-devices-tools-core1', [
      {
        title: 'Devices: what they do (plain English)',
        bodyMarkdown:
          'Router: connects networks and routes traffic.\n\nSwitch: connects devices within a network.\n\nAccess point (AP): provides wireless access to a wired network.\n\nFirewall: filters traffic based on rules.\n\nModem/ONT: termination device from the provider (cable/DSL/fiber).\n\nPoE: power delivered over Ethernet (commonly used for APs/phones/cameras).',
        takeaway: 'Use device-role language in your notes (router vs switch vs AP).'
      },
      {
        title: 'Tools: match tool to evidence',
        bodyMarkdown:
          'Cable tester: verifies wiring continuity/ordering.\n\nTone generator + probe: trace a cable through a bundle/patch panel.\n\nWi-Fi analyser: shows SSIDs, channel use, signal strength.\n\nLoopback plug: test a port/NIC at a basic level.\n\nUse tools to reduce uncertainty; don’t replace evidence with guesses.',
        takeaway: 'Tools are for evidence capture, not for showing off.'
      },
      {
        title: 'Structured cabling: patch panels and tracing',
        bodyMarkdown:
          'Patch panels and wall ports are part of structured cabling. A device may be fine while the path is broken (wrong patch, damaged lead, wrong port).\n\nUse a tone generator/probe to trace, and a cable tester to validate.\n\nWrite notes that describe the path: room port → patch panel → switch → uplink, without claiming root cause.',
        takeaway: 'Path description is evidence; root cause is a separate step.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-network-devices-tools-core1', [
      ['What does a router do?', 'Routes traffic between networks.'],
      ['What does a switch do?', 'Connects devices within a network.'],
      ['What does an access point do?', 'Connects wireless clients to a wired network.'],
      ['What does a firewall do?', 'Filters traffic based on rules.'],
      ['What is PoE?', 'Power over Ethernet (power delivered via Ethernet cabling).'],
      ['What does a cable tester tell you?', 'Whether the cable is wired/continuous correctly.'],
      ['What does a tone generator help with?', 'Tracing a cable through patch panels/bundles.'],
      ['What does a Wi-Fi analyser help with?', 'SSID visibility, signal strength, channel usage.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-net-devices-q1',
        prompt: 'Which device most directly provides wireless connectivity to a wired network?',
        domain: 'A+ Core 1 network devices',
        difficulty: 'foundation',
        explanation: 'An access point bridges wireless clients to wired LAN.',
        modelAnswer: 'Access point.',
        commonMistakes: ['Choosing router when AP is the direct Wi-Fi device'],
        dcsContext: 'Room issues often relate to AP path; name it correctly in escalations.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-devices-tools-core1',
        weakTopic: 'network-tools-devices',
        options: [
          { id: 'a', label: 'Access point' },
          { id: 'b', label: 'Patch panel' },
          { id: 'c', label: 'UPS' },
          { id: 'd', label: 'CPU' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-net-devices-q2',
        prompt: 'Which tool is most appropriate to verify an Ethernet cable is wired correctly end-to-end?',
        domain: 'A+ Core 1 network tools',
        difficulty: 'foundation',
        explanation: 'Cable testers validate wiring and continuity.',
        modelAnswer: 'Cable tester.',
        commonMistakes: ['Choosing Wi-Fi analyser for a cable problem'],
        dcsContext: 'Use the simplest tool that answers the evidence question.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-devices-tools-core1',
        weakTopic: 'network-tools-devices',
        options: [
          { id: 'a', label: 'Cable tester' },
          { id: 'b', label: 'Punch-down tool' },
          { id: 'c', label: 'Wi-Fi analyser' },
          { id: 'd', label: 'Stylus' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-net-devices-q3',
        prompt: 'In one sentence each, describe router vs switch vs access point.',
        domain: 'A+ Core 1 network devices',
        difficulty: 'stretch',
        explanation: 'This checks core device-role clarity.',
        modelAnswer:
          'Router routes between networks. Switch connects devices within a network. Access point provides wireless connectivity to a wired network.',
        commonMistakes: ['Using router for everything', 'Mixing AP and switch roles'],
        dcsContext: 'Correct device-role language improves escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-devices-tools-core1',
        weakTopic: 'network-tools-devices',
        rubric: ['Defines router', 'Defines switch', 'Defines access point'],
        keywordHints: ['between networks', 'within network', 'wireless']
      }),
      mcq({
        id: 'a-plus-net-devices-q4',
        prompt: 'A tech needs to trace which patch-panel port connects to a classroom wall socket. Which tool is most appropriate?',
        domain: 'A+ Core 1 network tools',
        difficulty: 'foundation',
        explanation: 'Tone generator/probe is used to trace cabling paths.',
        modelAnswer: 'Tone generator and probe.',
        commonMistakes: ['Choosing Wi-Fi analyser'],
        dcsContext: 'Tracing is common in schools when room ports are unclear.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-devices-tools-core1',
        weakTopic: 'network-tools-devices',
        options: [
          { id: 'a', label: 'Tone generator and probe' },
          { id: 'b', label: 'Stylus' },
          { id: 'c', label: 'Thermal paste' },
          { id: 'd', label: 'Display adapter' }
        ],
        correctOptionId: 'a'
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-network-devices-tools-core1', [
      { title: 'Room network escalation', prompt: 'Write a note that escalates a likely room/AP/path issue without inventing a root cause.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-network-devices-tools-core1', [
      { title: 'Network tools mini-kit', description: 'Draft a small “evidence kit” list and what each tool proves.' }
    ])
  }),
  createModule({
    id: 'a-plus-displays-video-core1',
    title: 'A+ Core 1: Displays and video troubleshooting',
    description:
      'Display types and attributes, plus the practical “display chain” troubleshooting you’ll use in classrooms.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 28,
    tags: ['A+ 220-1201', 'LCD', 'OLED', 'resolution', 'refresh rate', 'HDMI', 'DisplayPort'],
    learningObjectives: [
      'Describe key display attributes (resolution, refresh, pixel density, colour).',
      'Use a “display chain” troubleshooting approach.',
      'Separate “picture works” from “touch/audio/control” paths in notes.'
    ],
    dcsRelevance: [
      'Directly supports ViewBoard/HDMI/USB-C classroom incidents.',
      'Improves your ability to preserve “symptom split” evidence for escalation.'
    ],
    sections: buildSections('a-plus-displays-video-core1', [
      {
        title: 'Display types and what they imply',
        bodyMarkdown:
          'Common types: LCD (with backlight), OLED, and touchscreen layers.\n\nSupport habit: focus on symptoms you can observe: no picture, wrong input, wrong mode (duplicate/extend), flicker, dead pixels, dim backlight, or touch-only failure.',
        takeaway: 'Describe observable symptoms before guessing hardware failure.'
      },
      {
        title: 'Attributes you should recall',
        bodyMarkdown:
          'Resolution = pixel dimensions.\n\nRefresh rate = how often the image updates.\n\nPixel density = clarity at a given size.\n\nColour gamut/accuracy = colour capability.\n\nThese influence the “best match” monitor choice and help explain why a display “feels wrong” even when it works.',
        takeaway: 'Know the language: resolution vs refresh vs pixel density.'
      },
      {
        title: 'Display chain troubleshooting',
        bodyMarkdown:
          'Fast chain checks:\n- power and input/source\n- cable/adapters seated\n- correct port on both ends\n- display mode (Win+P)\n- known-good cable/adapter\n\nIf picture works but touch/audio fails, treat those as separate paths.',
        takeaway: 'Chain first. Separate picture vs touch/audio paths.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-displays-video-core1', [
      ['What is resolution?', 'The pixel dimensions of a display output (e.g., 1920×1080).'],
      ['What is refresh rate?', 'How often the image updates per second (Hz).'],
      ['What does pixel density affect?', 'Perceived sharpness/clarity.'],
      ['First 2 checks for “no display”?', 'Power/input selection, then cable/adapter seating.'],
      ['What Windows shortcut helps change display mode?', 'Windows + P.'],
      ['What does “picture works but touch fails” imply?', 'Touch is on a separate path (often USB/control).'],
      ['Best way to reduce uncertainty quickly in cabling?', 'Swap to a known-good cable/adapter.'],
      ['What is a “display chain”?', 'Source device → adapter/cable → display input/source → output mode.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-displays-q1',
        prompt: 'A teacher laptop picture shows on the display, but touch does not work. What is the best next reasoning step?',
        domain: 'A+ Core 1 displays',
        difficulty: 'foundation',
        explanation: 'Touch often uses a different connection than video.',
        modelAnswer: 'Treat touch as a separate path and check the USB/control connection.',
        commonMistakes: ['Restarting the whole chain with no symptom distinction'],
        dcsContext: 'Preserving symptom splits saves classroom time and improves escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-displays-video-core1',
        weakTopic: 'display-cables-connectors',
        options: [
          { id: 'a', label: 'Treat touch as a separate path and check USB/control connection' },
          { id: 'b', label: 'Assume the network is down' },
          { id: 'c', label: 'Factory reset the display immediately' },
          { id: 'd', label: 'Delete the printer queue' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-displays-q2',
        prompt: 'Which term describes how often the image updates on a display?',
        domain: 'A+ Core 1 displays',
        difficulty: 'foundation',
        explanation: 'Refresh rate is measured in Hz.',
        modelAnswer: 'Refresh rate.',
        commonMistakes: ['Mixing refresh with resolution'],
        dcsContext: 'Using accurate terms improves hardware discussions.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-displays-video-core1',
        weakTopic: 'display-cables-connectors',
        options: [
          { id: 'a', label: 'Refresh rate' },
          { id: 'b', label: 'Resolution' },
          { id: 'c', label: 'Subnet mask' },
          { id: 'd', label: 'DHCP scope' }
        ],
        correctOptionId: 'a'
      }),
      orderSteps({
        id: 'a-plus-displays-q3',
        prompt: 'Order the fastest “display chain” checks for a no-picture classroom issue.',
        domain: 'A+ Core 1 displays',
        difficulty: 'stretch',
        explanation: 'Start with power/input, then seating, then mode, then known-good swap.',
        modelAnswer: 'Confirm input/source, reseat cable/adapter, check Win+P mode, then swap known-good.',
        commonMistakes: ['Skipping input selection', 'Jumping to deep driver reinstalls'],
        dcsContext: 'Classroom time pressure rewards fast chain checks.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-displays-video-core1',
        weakTopic: 'display-cables-connectors',
        steps: [
          { id: 'input', label: 'Confirm display power and selected input/source' },
          { id: 'seat', label: 'Reseat cable/adapter on both ends' },
          { id: 'mode', label: 'Check display mode (Windows + P)' },
          { id: 'swap', label: 'Swap to a known-good cable/adapter if still failing' }
        ],
        correctOrder: ['input', 'seat', 'mode', 'swap'],
        rubric: ['Starts with input', 'Uses seating checks', 'Uses mode check', 'Uses known-good swap']
      }),
      shortAnswer({
        id: 'a-plus-displays-q4',
        prompt: 'Name two display attributes and what they affect.',
        domain: 'A+ Core 1 displays',
        difficulty: 'stretch',
        explanation: 'Attributes help explain “works but feels wrong” issues.',
        modelAnswer: 'Resolution affects pixel detail; refresh rate affects smoothness; pixel density affects sharpness (any two).',
        commonMistakes: ['Mixing terms with no effect'],
        dcsContext: 'Clear language improves discussions about monitor choices and issues.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-displays-video-core1',
        weakTopic: 'display-cables-connectors',
        rubric: ['Names an attribute', 'Explains its effect', 'Names second attribute/effect'],
        keywordHints: ['resolution', 'refresh', 'pixel density', 'colour']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-displays-video-core1', [
      { title: 'No display in class', prompt: 'Write the classroom note that captures chain checks and current fallback.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-displays-video-core1', [
      { title: 'Display chain checklist', description: 'Write a 60-second checklist for “no display” troubleshooting that stays Level 1-safe.' }
    ])
  }),
  createModule({
    id: 'a-plus-memory-storage-raid-core1',
    title: 'A+ Core 1: Memory, storage, and RAID',
    description:
      'RAM basics, storage types (HDD/SSD/NVMe), and RAID concepts with a support-focused lens (symptoms and evidence).',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 34,
    tags: ['A+ 220-1201', 'RAM', 'DDR', 'SSD', 'NVMe', 'HDD', 'RAID'],
    learningObjectives: [
      'Explain RAM vs storage roles in plain language.',
      'Differentiate HDD, SSD, NVMe, and form factors.',
      'Recall what common RAID levels optimise for.'
    ],
    dcsRelevance: [
      'Improves “slow vs failing drive” reasoning in device triage.',
      'Helps explain data-risk and escalation urgency when storage shows warning signs.'
    ],
    sections: buildSections('a-plus-memory-storage-raid-core1', [
      {
        title: 'RAM vs storage (what they do)',
        bodyMarkdown:
          'RAM is short-term working memory. Storage is long-term data persistence.\n\nLow RAM symptoms: heavy swapping, freezes under multitasking.\n\nStorage symptoms: slow launches, read/write errors, missing drive, corruption warnings, unusual noises (HDD).',
        takeaway: 'Classify “memory pressure” vs “storage failure” symptoms.'
      },
      {
        title: 'Storage types you’ll see',
        bodyMarkdown:
          'HDD: spinning disk, slower, mechanical failure risks.\n\nSSD: faster, no moving parts.\n\nNVMe: SSD over PCIe, very fast.\n\nForm factors: 2.5" SATA, M.2.\n\nSupport habit: confirm interface + form factor before ordering parts.',
        takeaway: 'NVMe is an interface/protocol path; M.2 is a form factor.'
      },
      {
        title: 'RAID: the point of the levels',
        bodyMarkdown:
          'RAID 0: speed, no redundancy.\n\nRAID 1: mirror, redundancy.\n\nRAID 5: parity, redundancy with efficiency (needs 3+ drives).\n\nRAID 10 (1+0): mirrored stripes, performance + redundancy.\n\nRAID is not a backup. It is availability/performance design.',
        takeaway: 'RAID ≠ backup.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-memory-storage-raid-core1', [
      ['What is RAM used for?', 'Short-term working memory for active processes.'],
      ['What is storage used for?', 'Long-term data persistence (files/OS/apps).'],
      ['HDD vs SSD: key difference?', 'HDD has moving parts and is slower; SSD has no moving parts and is faster.'],
      ['What is NVMe?', 'A protocol/interface for SSDs over PCIe (very fast).'],
      ['M.2 is best described as what?', 'A form factor for internal expansion (often SSDs).'],
      ['What does RAID 0 optimise for?', 'Performance (no redundancy).'],
      ['What does RAID 1 optimise for?', 'Redundancy via mirroring.'],
      ['Is RAID a backup?', 'No. RAID is not a backup.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-storage-q1',
        prompt: 'Which RAID level provides redundancy by mirroring data across two drives?',
        domain: 'A+ Core 1 storage',
        difficulty: 'foundation',
        explanation: 'RAID 1 is mirroring.',
        modelAnswer: 'RAID 1.',
        commonMistakes: ['Choosing RAID 0'],
        dcsContext: 'Correct RAID language helps when describing server/storage systems to senior ICT.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-memory-storage-raid-core1',
        weakTopic: 'memory-storage-raid',
        options: [
          { id: 'a', label: 'RAID 0' },
          { id: 'b', label: 'RAID 1' },
          { id: 'c', label: 'RAID 5' },
          { id: 'd', label: 'RAID 6' }
        ],
        correctOptionId: 'b'
      }),
      mcq({
        id: 'a-plus-storage-q2',
        prompt: 'Which statement is most accurate?',
        domain: 'A+ Core 1 storage',
        difficulty: 'foundation',
        explanation: 'RAID improves availability/performance but does not replace backups.',
        modelAnswer: 'RAID is not a backup.',
        commonMistakes: ['Assuming RAID replaces backups'],
        dcsContext: 'This distinction matters for risk judgement and escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-memory-storage-raid-core1',
        weakTopic: 'memory-storage-raid',
        options: [
          { id: 'a', label: 'RAID is a backup' },
          { id: 'b', label: 'RAID is not a backup' },
          { id: 'c', label: 'NVMe is a form factor' },
          { id: 'd', label: 'RAM is long-term storage' }
        ],
        correctOptionId: 'b'
      }),
      mcq({
        id: 'a-plus-storage-q3',
        prompt: 'Which RAID level optimises for performance but provides no redundancy?',
        domain: 'A+ Core 1 storage',
        difficulty: 'foundation',
        explanation: 'RAID 0 is striping only.',
        modelAnswer: 'RAID 0.',
        commonMistakes: ['Choosing RAID 1'],
        dcsContext: 'Knowing redundancy helps judge risk and escalation urgency.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-memory-storage-raid-core1',
        weakTopic: 'memory-storage-raid',
        options: [
          { id: 'a', label: 'RAID 0' },
          { id: 'b', label: 'RAID 1' },
          { id: 'c', label: 'RAID 5' },
          { id: 'd', label: 'RAID 10' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-storage-q4',
        prompt: 'Explain the difference between NVMe and M.2.',
        domain: 'A+ Core 1 storage',
        difficulty: 'stretch',
        explanation: 'One is an interface/protocol path; the other is a form factor.',
        modelAnswer: 'NVMe is a storage protocol/interface over PCIe; M.2 is a physical form factor that can host different interfaces (often NVMe SSDs).',
        commonMistakes: ['Treating NVMe and M.2 as the same thing'],
        dcsContext: 'Correct terminology avoids ordering the wrong parts.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-memory-storage-raid-core1',
        weakTopic: 'memory-storage-raid',
        rubric: ['Defines NVMe', 'Defines M.2', 'States they are different categories'],
        keywordHints: ['protocol', 'PCIe', 'form factor']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-memory-storage-raid-core1', [
      { title: 'Drive health escalation', prompt: 'Write the note that escalates a likely drive failure with evidence and urgency without panic.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-memory-storage-raid-core1', [
      { title: 'Storage symptom map', description: 'Create a map: slow vs errors vs missing drive vs corruption, and what evidence to capture.' }
    ])
  }),
  createModule({
    id: 'a-plus-motherboards-cpu-power-cooling-core1',
    title: 'A+ Core 1: Motherboards, CPU, power, and cooling',
    description:
      'Board form factors, BIOS/UEFI basics, TPM/HSM concepts, CPU features, power supplies, and cooling symptoms.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 36,
    tags: ['A+ 220-1201', 'motherboard', 'BIOS', 'UEFI', 'TPM', 'CPU', 'PSU', 'cooling'],
    learningObjectives: [
      'Describe what BIOS/UEFI does at startup.',
      'Recognise power supply and cooling symptom patterns.',
      'Explain TPM at a high level and why it matters.'
    ],
    dcsRelevance: [
      'Supports better triage language when devices fail at boot or show power/thermal symptoms.',
      'Helps you avoid risky “deep BIOS” changes without evidence/approval.'
    ],
    sections: buildSections('a-plus-motherboards-cpu-power-cooling-core1', [
      {
        title: 'Motherboards and form factors',
        bodyMarkdown:
          'Form factors: ATX, micro-ATX, ITX.\n\nExpansion: PCIe slots.\n\nConnections: power, storage interfaces, header pins.\n\nSupport habit: capture the exact symptom before opening cases—POST error, beep pattern, no display, or power cycling.',
        takeaway: 'Boot failure notes need the exact startup symptom.'
      },
      {
        title: 'BIOS/UEFI and secure hardware',
        bodyMarkdown:
          'BIOS/UEFI initialises hardware and starts the boot process. It controls boot order and basic device settings.\n\nTPM (Trusted Platform Module) supports secure key storage and device trust flows.\n\nAs Level 1: avoid experimental BIOS changes; document the symptom and escalate if it’s beyond safe checks.',
        takeaway: 'BIOS changes are high-impact—capture evidence first.'
      },
      {
        title: 'Power and cooling symptoms',
        bodyMarkdown:
          'Power issues: no power, power cycling, random shutdowns.\n\nCooling issues: fan noise, thermal throttling, shutdown under load.\n\nSafe first actions: check power source/cable, reduce dust/blocked airflow externally, and document reproducibility.',
        takeaway: 'Power/cooling issues are often hardware-path problems; treat them as evidence problems.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-motherboards-cpu-power-cooling-core1', [
      ['What does BIOS/UEFI do?', 'Initialises hardware and starts the boot process (controls boot settings).'],
      ['Name a common motherboard form factor.', 'ATX, micro-ATX, or ITX.'],
      ['What does PCIe provide?', 'Expansion connectivity for add-in cards (GPU/NIC/etc.).'],
      ['What is a TPM?', 'A secure hardware module for storing keys and supporting device trust/security.'],
      ['What symptom suggests thermal throttling?', 'Performance slows under load and improves after cooling.'],
      ['What is a safe first step for random shutdowns?', 'Check power/airflow basics and capture when it happens (under load/heat).'],
      ['What is POST?', 'Power-On Self Test: startup checks that occur before the OS loads.'],
      ['What is one safe “power evidence” item to capture?', 'LED state, adapter/PSU state, and whether it powers at all or cycles.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-board-q1',
        prompt: 'What is the primary role of BIOS/UEFI?',
        domain: 'A+ Core 1 motherboards',
        difficulty: 'foundation',
        explanation: 'BIOS/UEFI initialises hardware and begins boot.',
        modelAnswer: 'Initialise hardware and start the boot process.',
        commonMistakes: ['Calling it an operating system component'],
        dcsContext: 'Boot issues need correct language to escalate effectively.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-motherboards-cpu-power-cooling-core1',
        weakTopic: 'motherboards-cpu-power-cooling',
        options: [
          { id: 'a', label: 'Initialise hardware and start the boot process' },
          { id: 'b', label: 'Provide DNS resolution' },
          { id: 'c', label: 'Manage printer queues' },
          { id: 'd', label: 'Encrypt Wi-Fi traffic' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-board-q2',
        prompt: 'A laptop slows dramatically under load and then shuts down; the chassis is hot. What is the most likely category?',
        domain: 'A+ Core 1 power/cooling',
        difficulty: 'foundation',
        explanation: 'Heat + shutdown suggests thermal path.',
        modelAnswer: 'Thermal/cooling issue.',
        commonMistakes: ['Calling it DNS', 'Calling it VLAN'],
        dcsContext: 'Classroom pressure makes thermal issues visible; capture evidence and route appropriately.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-motherboards-cpu-power-cooling-core1',
        weakTopic: 'hardware-troubleshooting',
        options: [
          { id: 'a', label: 'Thermal/cooling issue' },
          { id: 'b', label: 'DNS issue' },
          { id: 'c', label: 'Printer maintenance issue' },
          { id: 'd', label: 'DHCP scope issue' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-board-q3',
        prompt: 'What is a TPM used for at a high level?',
        domain: 'A+ Core 1 motherboards',
        difficulty: 'stretch',
        explanation: 'TPM concepts matter for modern device security and trust.',
        modelAnswer: 'A TPM securely stores cryptographic keys and supports device trust/security features such as secure boot and authentication flows.',
        commonMistakes: ['Treating it as a storage drive'],
        dcsContext: 'Understanding TPM helps interpret modern device security language.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-motherboards-cpu-power-cooling-core1',
        weakTopic: 'motherboards-cpu-power-cooling',
        rubric: ['Mentions secure key storage', 'Mentions trust/security purpose'],
        keywordHints: ['keys', 'secure', 'trust', 'crypto']
      }),
      orderSteps({
        id: 'a-plus-board-q4',
        prompt: 'Order the safest first-line response for a desktop that will not power on.',
        domain: 'A+ Core 1 power',
        difficulty: 'stretch',
        explanation: 'Start with external power evidence and minimal-risk checks.',
        modelAnswer: 'Confirm outlet/power, check cable/switch, test known-good if possible, then escalate.',
        commonMistakes: ['Opening the case immediately', 'Replacing parts without evidence'],
        dcsContext: 'Evidence-first notes reduce downtime and rework.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-motherboards-cpu-power-cooling-core1',
        weakTopic: 'hardware-troubleshooting',
        steps: [
          { id: 'outlet', label: 'Confirm power source/outlet is working' },
          { id: 'cable', label: 'Check power cable and power switch/state' },
          { id: 'known', label: 'Try known-good cable/outlet/PSU test if available' },
          { id: 'escalate', label: 'Escalate with evidence if still no power' }
        ],
        correctOrder: ['outlet', 'cable', 'known', 'escalate'],
        rubric: ['Starts externally', 'Uses known-good comparison', 'Escalates with evidence']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-motherboards-cpu-power-cooling-core1', [
      { title: 'Boot failure note', prompt: 'Write a note for a device that fails at boot without inventing a root cause.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-motherboards-cpu-power-cooling-core1', [
      { title: 'Power/thermal triage checklist', description: 'Create a safe checklist for power and overheating symptoms.' }
    ])
  }),
  createModule({
    id: 'a-plus-printers-mfd-core1',
    title: 'A+ Core 1: Printers and multifunction devices',
    description:
      'Printer types, common maintenance items, and troubleshooting patterns that separate queue, release, and device-quality issues.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 32,
    tags: ['A+ 220-1201', 'laser', 'inkjet', 'thermal', 'impact', 'MFD', 'maintenance'],
    learningObjectives: [
      'Differentiate printer technologies (laser/inkjet/thermal/impact).',
      'Recognise maintenance/consumable symptom patterns.',
      'Write a note that preserves “queue vs device quality vs release” evidence.'
    ],
    dcsRelevance: [
      'Printing is a high-frequency school support theme; good layer notes reduce repeat work.',
      'Follow-Me/release patterns benefit from clear evidence capture.'
    ],
    sections: buildSections('a-plus-printers-mfd-core1', [
      {
        title: 'Printer types (what they mean)',
        bodyMarkdown:
          'Laser: toner + fuser; common for high volume.\n\nInkjet: ink cartridges + print heads.\n\nThermal: heat + thermal paper.\n\nImpact: dot-matrix style physical impact.\n\nTechnology informs the likely maintenance path and symptoms.',
        takeaway: 'Printer type changes the likely failure path.'
      },
      {
        title: 'Maintenance and “quality vs delivery”',
        bodyMarkdown:
          'Delivery issues: job stuck, queue full, release/auth issues.\n\nQuality issues: faded prints, streaks, toner rub-off, smudges, misalignment.\n\nIf copying at the device is also bad, it strengthens the device-quality path rather than workstation/queue.',
        takeaway: 'Copy+print scope is a strong device-quality clue.'
      },
      {
        title: 'Troubleshooting split: queue, release, device, quality',
        bodyMarkdown:
          'A useful print note preserves the failure layer:\n- submission/queue (job leaves workstation?)\n- release/auth (Follow-Me style?)\n- device output (paper path, consumables)\n- quality (streaks, rub-off, faded)\n\nLayer notes prevent endless re-triage.',
        takeaway: 'Write the failure layer in the first line of the note.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-printers-mfd-core1', [
      ['Laser printers primarily use what consumable?', 'Toner.'],
      ['What component heats toner onto the page?', 'Fuser.'],
      ['Inkjet printers primarily use what consumable?', 'Ink cartridges / print heads.'],
      ['Thermal printers require what special media?', 'Thermal paper.'],
      ['What is a strong clue for “device-quality” fault?', 'Copying directly at the device also looks bad.'],
      ['What is a strong clue for “queue/release” fault?', 'Jobs appear in system but do not release/print as expected.'],
      ['If the queue looks fine but nothing prints, what layer might be failing?', 'Release/authentication or the device itself.'],
      ['What is a weak print note?', '“Printer broken” with no layer evidence or symptom details.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-printers-q1',
        prompt: 'A printer produces pages but the toner rubs off easily. Which printer type is this most associated with?',
        domain: 'A+ Core 1 printers',
        difficulty: 'foundation',
        explanation: 'Toner rub-off implies laser printing path (fuser/toner).',
        modelAnswer: 'Laser printer.',
        commonMistakes: ['Choosing inkjet without considering toner clue'],
        dcsContext: 'Quality symptoms should be written precisely in escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-printers-mfd-core1',
        weakTopic: 'printers-maintenance',
        options: [
          { id: 'a', label: 'Laser' },
          { id: 'b', label: 'Inkjet' },
          { id: 'c', label: 'RFID' },
          { id: 'd', label: 'NFC' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-printers-q2',
        prompt: 'A staff member reports bad print quality. The same issue happens when copying directly at the device. What does this most strongly suggest?',
        domain: 'A+ Core 1 printers',
        difficulty: 'foundation',
        explanation: 'Copy path bypasses the workstation and print queue.',
        modelAnswer: 'A device-quality/consumable path issue.',
        commonMistakes: ['Blaming drivers immediately'],
        dcsContext: 'This clue saves time and routes the issue correctly.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-printers-mfd-core1',
        weakTopic: 'printers-maintenance',
        options: [
          { id: 'a', label: 'Device-quality/consumable issue' },
          { id: 'b', label: 'DNS issue' },
          { id: 'c', label: 'Wrong VLAN' },
          { id: 'd', label: 'Browser cache issue' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-printers-q3',
        prompt: 'Thermal printers require which special media to print?',
        domain: 'A+ Core 1 printers',
        difficulty: 'foundation',
        explanation: 'Thermal printers use heat-sensitive media.',
        modelAnswer: 'Thermal paper.',
        commonMistakes: ['Choosing toner'],
        dcsContext: 'Knowing printer types improves symptom interpretation.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-printers-mfd-core1',
        weakTopic: 'printers-maintenance',
        options: [
          { id: 'a', label: 'Thermal paper' },
          { id: 'b', label: 'Toner' },
          { id: 'c', label: 'ECC RAM' },
          { id: 'd', label: 'Fiber optic cable' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-printers-q4',
        prompt: 'Give one clue that indicates a device-quality fault and one clue that indicates a queue/release fault.',
        domain: 'A+ Core 1 printers',
        difficulty: 'stretch',
        explanation: 'This reinforces layer thinking.',
        modelAnswer:
          'Device-quality clue: copying at the device is also bad / toner rub-off / streaks. Queue/release clue: jobs appear submitted but do not release/print (authentication/release stage).',
        commonMistakes: ['Listing only one layer', 'Calling every issue “driver”'],
        dcsContext: 'Layer evidence reduces rework and improves escalations.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-printers-mfd-core1',
        weakTopic: 'printers-maintenance',
        rubric: ['Gives a device-quality clue', 'Gives a queue/release clue'],
        keywordHints: ['copy', 'quality', 'queue', 'release', 'auth']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-printers-mfd-core1', [
      { title: 'Queue vs device-quality note', prompt: 'Write a note that separates queue/release issues from device-quality issues.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-printers-mfd-core1', [
      { title: 'Printer layer checklist', description: 'Create a checklist: workstation → queue → release → device → quality, and what evidence each layer needs.' }
    ])
  }),
  createModule({
    id: 'a-plus-virtualization-cloud-core1',
    title: 'A+ Core 1: Virtualization and cloud computing',
    description:
      'Virtualization concepts (hypervisors, VMs, containers, VDI) and cloud models/characteristics (IaaS/PaaS/SaaS, elasticity, availability).',
    domain: 'Cloud and Platforms',
    level: 'A+',
    estimatedMinutes: 32,
    tags: ['A+ 220-1201', 'virtualization', 'hypervisor', 'VDI', 'containers', 'SaaS', 'IaaS', 'PaaS'],
    learningObjectives: [
      'Explain virtualization in plain language and why it is used.',
      'Differentiate IaaS, PaaS, and SaaS with school-relevant examples.',
      'Recognise VDI and container concepts at a support level.'
    ],
    dcsRelevance: [
      'Helps connect “cloud” concepts to real school platforms and support boundaries.',
      'Supports better judgement about what can be fixed locally vs what is vendor/platform-owned.'
    ],
    sections: buildSections('a-plus-virtualization-cloud-core1', [
      {
        title: 'Virtualization: the core idea',
        bodyMarkdown:
          'Virtualization runs multiple operating environments on shared hardware.\n\nHypervisors manage virtual machines.\n\nType 1 hypervisor runs on bare metal; Type 2 runs on top of an OS.\n\nVDI delivers a desktop session from central infrastructure.\n\nContainers package apps with dependencies; they share the host OS kernel.',
        takeaway: 'VMs virtualize whole machines; containers virtualize application environments.'
      },
      {
        title: 'Cloud models: IaaS, PaaS, SaaS',
        bodyMarkdown:
          'IaaS: provider gives infrastructure; you manage OS/apps.\n\nPaaS: provider gives a platform/runtime; you manage your app.\n\nSaaS: provider gives the whole app; you manage usage and configuration.\n\nSupport habit: identify what layer you own vs what the provider owns.',
        takeaway: 'Ownership/layer thinking is the real cloud skill.'
      },
      {
        title: 'Cloud characteristics you should recall',
        bodyMarkdown:
          'Common characteristics: elasticity (scale), availability (resilience), metered usage, multi-tenancy, and remote accessibility.\n\nIn support notes, the key is not reciting buzzwords — it is stating what is impacted and whether the issue is local device vs platform-side.',
        takeaway: 'Write notes that separate local vs platform-side evidence.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-virtualization-cloud-core1', [
      ['What is a hypervisor?', 'Software that creates/manages virtual machines.'],
      ['Type 1 vs Type 2 hypervisor?', 'Type 1 runs on bare metal; Type 2 runs on top of an OS.'],
      ['What is VDI?', 'Virtual Desktop Infrastructure: remote hosted desktop sessions.'],
      ['VMs vs containers: key difference?', 'VMs virtualize whole machines; containers share host OS kernel and package apps.'],
      ['IaaS means what?', 'Infrastructure as a Service.'],
      ['PaaS means what?', 'Platform as a Service.'],
      ['SaaS means what?', 'Software as a Service.'],
      ['What is elasticity?', 'Ability to scale resources up/down as needed.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-cloud-q1',
        prompt: 'Which cloud model most closely describes a fully managed application where you primarily manage users and configuration?',
        domain: 'A+ Core 1 cloud',
        difficulty: 'foundation',
        explanation: 'SaaS is a fully managed application model.',
        modelAnswer: 'SaaS.',
        commonMistakes: ['Calling everything “cloud” without identifying the model'],
        dcsContext: 'In schools, many platforms are SaaS; support notes should respect ownership boundaries.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-virtualization-cloud-core1',
        weakTopic: 'cloud-models',
        options: [
          { id: 'a', label: 'IaaS' },
          { id: 'b', label: 'PaaS' },
          { id: 'c', label: 'SaaS' },
          { id: 'd', label: 'RAID' }
        ],
        correctOptionId: 'c'
      }),
      mcq({
        id: 'a-plus-virt-q2',
        prompt: 'Which statement best describes a Type 1 hypervisor?',
        domain: 'A+ Core 1 virtualization',
        difficulty: 'foundation',
        explanation: 'Type 1 runs directly on hardware.',
        modelAnswer: 'It runs directly on the hardware (bare metal).',
        commonMistakes: ['Saying it runs on top of Windows/macOS'],
        dcsContext: 'This matters when interpreting infrastructure terminology.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-virtualization-cloud-core1',
        weakTopic: 'virtualization',
        options: [
          { id: 'a', label: 'Runs directly on the hardware (bare metal)' },
          { id: 'b', label: 'Runs only inside a browser tab' },
          { id: 'c', label: 'Is a kind of Wi-Fi standard' },
          { id: 'd', label: 'Is a printer driver' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-virt-q3',
        prompt: 'Which option best describes a container compared to a virtual machine?',
        domain: 'A+ Core 1 virtualization',
        difficulty: 'foundation',
        explanation: 'Containers share the host OS kernel and package apps with dependencies.',
        modelAnswer: 'Packages apps with dependencies while sharing the host OS kernel.',
        commonMistakes: ['Saying containers are the same as VMs'],
        dcsContext: 'This helps interpret modern platform language accurately.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-virtualization-cloud-core1',
        weakTopic: 'virtualization',
        options: [
          { id: 'a', label: 'Packages apps with dependencies while sharing the host OS kernel' },
          { id: 'b', label: 'Always requires a full guest OS for each instance' },
          { id: 'c', label: 'Is a Wi-Fi encryption method' },
          { id: 'd', label: 'Is a printer maintenance kit' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-cloud-q4',
        prompt: 'Give one example of SaaS and one example of IaaS (generic examples are fine).',
        domain: 'A+ Core 1 cloud',
        difficulty: 'stretch',
        explanation: 'Examples show model understanding.',
        modelAnswer:
          'SaaS example: a hosted email/collaboration suite. IaaS example: a provider-hosted virtual machine infrastructure you manage OS/apps on.',
        commonMistakes: ['Calling everything SaaS'],
        dcsContext: 'Support notes improve when you know which layer is provider-owned.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-virtualization-cloud-core1',
        weakTopic: 'cloud-models',
        rubric: ['Provides a SaaS example', 'Provides an IaaS example'],
        keywordHints: ['hosted app', 'virtual machine', 'infrastructure']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-virtualization-cloud-core1', [
      { title: 'Local vs SaaS issue note', prompt: 'Write a note that separates “device issue” from “cloud platform issue” without blaming.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-virtualization-cloud-core1', [
      { title: 'Cloud ownership map', description: 'Create a map of “what we manage” vs “what the provider manages” for SaaS/PaaS/IaaS.' }
    ])
  }),
  createModule({
    id: 'a-plus-troubleshooting-core1',
    title: 'A+ Core 1: Troubleshooting (hardware + network + printers)',
    description:
      'A support-focused troubleshooting module: classify symptoms, preserve evidence, and escalate with the right level of detail.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 35,
    tags: ['A+ 220-1201', 'troubleshooting', 'POST', 'BSoD', 'overheating', 'intermittent', 'queues'],
    learningObjectives: [
      'Use a consistent symptom → scope → safe checks pattern.',
      'Separate “quality vs delivery” for printers and “DNS vs DHCP vs IP reachability” for networks.',
      'Write escalation notes that are specific and privacy-safe.'
    ],
    dcsRelevance: [
      'Aligns with classroom time pressure and the need for crisp notes.',
      'Reinforces privacy-safe evidence capture rather than copying live ticket detail.'
    ],
    sections: buildSections('a-plus-troubleshooting-core1', [
      {
        title: 'The troubleshooting rhythm',
        bodyMarkdown:
          'A repeatable rhythm:\n1) classify the symptom (power/display/storage/network/print)\n2) confirm scope (one device vs many)\n3) run the safest reversible checks\n4) record what changed\n5) escalate with evidence if unresolved\n\nYour aim is not to “try everything”. Your aim is to reduce uncertainty safely.',
        takeaway: 'Troubleshooting is uncertainty reduction, not random experimentation.'
      },
      {
        title: 'Network troubleshooting splits',
        bodyMarkdown:
          'Split web/connectivity into layers:\n- IP reachability\n- DNS resolution\n- authentication/proxy/app path\n\nCapture which layer fails and what comparison device shows.',
        takeaway: 'Write the layer split explicitly in the note.'
      },
      {
        title: 'Printer troubleshooting splits',
        bodyMarkdown:
          'Split printing into:\n- submission/queue\n- release/auth\n- device output/quality\n\nCopy+print scope is a powerful clue for device-quality faults.',
        takeaway: 'Queue vs release vs device-quality is the key print split.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-troubleshooting-core1', [
      ['What are the first two steps in good troubleshooting?', 'Classify the symptom, then confirm scope (one vs many).'],
      ['What makes a “safe first check”?', 'Reversible, low-risk actions (reseat/restart/confirm settings) that preserve evidence.'],
      ['Best layer split for “websites won’t load”?', 'IP reachability → DNS → app/auth/proxy path.'],
      ['Best split for printer problems?', 'Queue/submission → release/auth → device output/quality.'],
      ['Why record what changed after a check?', 'Because symptom changes narrow the failure path.'],
      ['What is a weak escalation note?', 'A vague statement with no scope, steps tried, or symptom split.'],
      ['What is a “comparison check”?', 'Compare with a known-good device or nearby location to control scope.'],
      ['What should you avoid in PD notes?', 'Private/confidential live ticket details, names, credentials, and sensitive identifiers.']
    ]),
    quiz: [
      orderSteps({
        id: 'a-plus-troubleshooting-q1',
        prompt: 'Order the best first-line response to an unknown “it’s broken” report.',
        domain: 'A+ Core 1 troubleshooting',
        difficulty: 'foundation',
        explanation: 'Start with symptom/scope, then safe checks and evidence.',
        modelAnswer: 'Clarify symptom, confirm scope, do safe checks, then document and escalate if needed.',
        commonMistakes: ['Skipping scope', 'Changing deep settings immediately'],
        dcsContext: 'This protects class time and reduces rework.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-troubleshooting-core1',
        weakTopic: 'hardware-troubleshooting',
        steps: [
          { id: 'symptom', label: 'Clarify the exact symptom in plain language' },
          { id: 'scope', label: 'Confirm scope (one device or many / one room or wider)' },
          { id: 'safe', label: 'Run a safe, reversible first check based on symptom' },
          { id: 'note', label: 'Record what changed and escalate with evidence if unresolved' }
        ],
        correctOrder: ['symptom', 'scope', 'safe', 'note'],
        rubric: ['Starts with symptom', 'Includes scope', 'Uses safe checks', 'Ends with evidence capture']
      }),
      mcq({
        id: 'a-plus-troubleshooting-q2',
        prompt: 'A user says “the internet is down.” One device works in the staff room; multiple devices fail in one classroom. What is the best scope label?',
        domain: 'A+ Core 1 troubleshooting',
        difficulty: 'foundation',
        explanation: 'Evidence suggests a location-specific issue.',
        modelAnswer: 'Room/local path issue rather than whole-site outage.',
        commonMistakes: ['Declaring a whole-school outage from one room'],
        dcsContext: 'Scope discipline prevents noisy escalation.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-troubleshooting-core1',
        weakTopic: 'network-troubleshooting',
        options: [
          { id: 'a', label: 'Room/local path issue' },
          { id: 'b', label: 'Whole-school internet outage' },
          { id: 'c', label: 'Printer driver failure' },
          { id: 'd', label: 'TPM failure' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-troubleshooting-q3',
        prompt: 'A printer problem shows jobs submitted successfully, but nothing releases at the copier until users authenticate. Which layer is most likely involved?',
        domain: 'A+ Core 1 troubleshooting',
        difficulty: 'foundation',
        explanation: 'This is a release/auth layer clue.',
        modelAnswer: 'Release/authentication layer.',
        commonMistakes: ['Calling it a driver issue immediately'],
        dcsContext: 'Layer notes prevent repeated re-triage.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-troubleshooting-core1',
        weakTopic: 'printers-maintenance',
        options: [
          { id: 'a', label: 'Release/authentication layer' },
          { id: 'b', label: 'DNS layer' },
          { id: 'c', label: 'TPM layer' },
          { id: 'd', label: 'VGA cable layer' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-troubleshooting-q4',
        prompt: 'Give one symptom clue for a DNS issue and one symptom clue for a DHCP issue.',
        domain: 'A+ Core 1 troubleshooting',
        difficulty: 'stretch',
        explanation: 'This checks layer-based symptom recognition.',
        modelAnswer:
          'DNS clue: names fail but IP may work. DHCP clue: device cannot get a valid lease and may show 169.254.x.x / limited connectivity.',
        commonMistakes: ['Swapping DNS/DHCP symptoms'],
        dcsContext: 'Correct symptom language improves escalations.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-troubleshooting-core1',
        weakTopic: 'network-services',
        rubric: ['Provides DNS clue', 'Provides DHCP clue'],
        keywordHints: ['name', 'IP', 'lease', '169.254']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-troubleshooting-core1', [
      { title: 'Escalation note template', prompt: 'Write a reusable escalation note template that stays privacy-safe but evidence-rich.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-troubleshooting-core1', [
      { title: 'Troubleshooting split cards', description: 'Create quick cards: web (IP/DNS/app), print (queue/release/device), display (chain/symptom split).' }
    ])
  })
];
