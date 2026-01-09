import React from 'react';

export interface Message {
  role: 'user' | 'model';
  content: string;
  isError?: boolean;
  hasAction?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string;
  features: string[];
  icon: React.ReactNode;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  image: string;
  description: string;
  tags: string[];
  year: string;
  stats: { label: string; value: string }[];
  challenge: string;
  solution: string;
  result: string;
  gallery: string[];
  liveLinks?: { label: string; url: string }[];
}

export interface ResourceItem {
  id: string;
  name: string;
  description: string;
  category: 'LLM' | 'Image' | 'Video' | 'Code' | 'Audio' | 'Productivity' | 'Agent';
  url: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  popular: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  content: React.ReactNode;
  tags: string[];
}