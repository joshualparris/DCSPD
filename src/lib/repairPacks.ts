import { WeakTopicKey } from '../types/assessment';
import { RepairPack, RepairPackItem } from '../types/repairPacks';
import { TrainingModule } from '../types/training';
import { Scenario } from '../types/scenarios';
import { UserProgress } from '../lib/progress';
import { isDue } from './spacedRepetition';

const TOPIC_DESCRIPTIONS: Record<WeakTopicKey, string> = {
  'ports-protocols': 'Master the common network ports and protocols used in a school environment.',
  'dns-dhcp-gateway': 'Deepen your understanding of core network addressing and name resolution.',
  'vlan-firewall-rules': 'Learn how traffic is segmented and protected at DCS.',
  'network-services': 'Support essential network services like printing and file sharing.',
  'wireless-networks': 'Troubleshoot Wi-Fi connectivity across campus.',
  'network-tools-devices': 'Become proficient with switches, routers, and testing tools.',
  'laptop-mobile-hardware': 'Identify and resolve physical issues with staff and student devices.',
  'display-cables-connectors': 'Support classroom AV, ViewBoards, and office displays.',
  'memory-storage-raid': 'Understand data storage and performance components.',
  'motherboards-cpu-power-cooling': 'Master the core internals of PCs and servers.',
  'printers-maintenance': 'Keep school printing and MFDs operational.',
  'cloud-models': 'Support SaaS, PaaS, and IaaS platforms like M365.',
  'virtualization': 'Understand how servers and desktops are virtualized.',
  'hardware-troubleshooting': 'Apply a structured approach to fixing hardware.',
  'network-troubleshooting': 'Diagnose and resolve connectivity issues efficiently.',
  'offboarding-sequence': 'Ensure secure and clean staff/student departures.',
  'mdm-group-policy': 'Manage device configurations via Intune and GPO.',
  'printer-symptoms': 'Quickly identify specific printing failure patterns.',
  'classroom-av': 'Maintain and troubleshoot ViewBoards, projectors, and audio.',
  'ticket-quality': 'Write evidence-rich notes that reduce escalation cycles.',
  'security-risk-judgement': 'Make safe support decisions that protect school data.',
  'parent-portal-workflows': 'Support parent access to school systems.',
  'sentral-support': 'Resolve common issues in our core SIS.',
  'schoolbox-workflows': 'Support the LMS and student engagement tools.',
  'login-password-support': 'Handle MFA and account access requests safely.',
  'permissions-access': 'Troubleshoot shared drives and resource access.',
  'website-filtering': 'Manage and troubleshoot internet access controls.',
  'onboarding-workflows': 'Perfect the setup for new DCS staff and students.',
  'teams-sharepoint-onedrive': 'Support collaboration and cloud file storage.',
  'jamf-ipad-support': 'Manage student and staff Apple devices.',
  'soft-skills': 'Communicate effectively and with empathy under pressure.',
  'communication': 'Build trust through clear, professional support interactions.'
};

export function getRepairPackForTopic(
  topic: WeakTopicKey,
  modules: TrainingModule[],
  scenarios: Scenario[],
  progress: UserProgress
): RepairPack {
  const items: RepairPackItem[] = [];

  // 1. Module
  const relatedModule = modules.find(m => m.tags.includes(topic) || m.domain.toLowerCase().includes(topic.toLowerCase()));
  if (relatedModule) {
    items.push({
      id: `repair-mod-${relatedModule.id}`,
      title: `Review Module: ${relatedModule.title}`,
      type: 'complete-module',
      estimatedMinutes: Math.min(relatedModule.estimatedMinutes, 10), // Focused review
      targetId: relatedModule.id,
      route: `/modules/${relatedModule.id}`
    });
  }

  // 2. Scenario
  const relatedScenario = scenarios.find(s => s.focus.includes(topic) || s.title.toLowerCase().includes(topic.toLowerCase()));
  if (relatedScenario) {
    items.push({
      id: `repair-scen-${relatedScenario.id}`,
      title: `Practice Lab: ${relatedScenario.title}`,
      type: 'scenario-lab',
      estimatedMinutes: relatedScenario.estimatedMinutes,
      targetId: relatedScenario.id,
      route: `/scenarios`
    });
  }

  // 3. Flashcards (if any are due for this topic)
  const dueCards = modules.flatMap((module) =>
    module.flashcards
      .filter((card) => {
        const cardProgress = progress.modules[module.id]?.flashcards?.[card.id];
        return Boolean(cardProgress && isDue(cardProgress.dueDateIso) && module.tags.includes(topic));
      })
      .map((card) => ({ card, module }))
  );

  if (dueCards.length > 0) {
    items.push({
      id: `repair-flash-${topic}`,
      title: `Review ${dueCards.length} ${topic} flashcards`,
      type: 'review-flashcards',
      estimatedMinutes: Math.ceil(dueCards.length * 0.5),
      route: '/due-today'
    });
  }

  // 4. Ticket Note Challenge (Generic if not specifically defined)
  items.push({
    id: `repair-note-${topic}`,
    title: `Write a practice ticket note for ${topic}`,
    type: 'write-ticket-note',
    estimatedMinutes: 5,
    route: '/scenarios' // Redirect to scenarios where they can practice note writing
  });

  return {
    topicKey: topic,
    title: `${topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Repair Pack`,
    description: TOPIC_DESCRIPTIONS[topic] || 'Targeted training to build proficiency in this area.',
    items,
    totalMinutes: items.reduce((sum, i) => sum + i.estimatedMinutes, 0)
  };
}
