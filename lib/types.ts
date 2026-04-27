import React from 'react';

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type SidebarItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: SidebarItem[];
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type StatsCardItem = {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
};

export type Theme = 'light' | 'dark' | 'system';
