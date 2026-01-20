import type { ElementType } from 'react';

export type Volunteer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  skills: string[];
  interests: string[];
};

export type Event = {
  id: string;
  title: string;
  ngoId: string;
  date: string;
  time: string;
  location: string;
  description: string;
  why: string;
  impact: string;
  skills: string[];
  imageUrl: string;
  cause: string;
};

export type NGO = {
  id: string;
  name: string;
  logoUrl: string;
  mission: string;
  location: string;
  cause: string[];
  impact: string;
};

export type ForumPost = {
  id: string;
  title: string;
  authorId: string;
  authorName:string;
  createdAt: string;
  replies: number;
  lastReply: {
    authorId: string;
    authorName: string;
    createdAt: string;
  };
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatarId: string;
};

export type LearningSegment = {
  id: number;
  title: string;
  icon: ElementType;
  summary: string;
  actionPoints: string[];
  reflectionQuestions: string[];
  progress: number;
  isLocked: boolean;
};
