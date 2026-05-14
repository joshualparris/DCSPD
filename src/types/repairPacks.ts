import { StudyRecommendationAction } from './studyPath';

export type RepairPackItem = {
  id: string;
  title: string;
  type: StudyRecommendationAction;
  estimatedMinutes: number;
  targetId?: string;
  route: string;
};

export type RepairPack = {
  topicKey: string;
  title: string;
  description: string;
  items: RepairPackItem[];
  totalMinutes: number;
};
