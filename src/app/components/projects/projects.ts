import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  year: string;
  description: string[];
  technologies: string[];
  icon: string;
  impact: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Email Feature for Contact Application',
      year: '2025',
      icon: 'fas fa-envelope',
      description: [
        'Designed and delivered a scalable, full-stack email communication module for a large-scale customer service platform.',
        'Implemented end-to-end frontend and backend workflows using React, NgRx, RxJS, and Spring Boot with attachment handling and async processing.',
        'Delivered the feature ahead of schedule (9 months) significantly improving agent productivity and SLA compliance.',
      ],
      technologies: ['React', 'NgRx', 'RxJS', 'Spring Boot', 'REST APIs'],
      impact: 'Ahead of 9-month schedule',
    },
    {
      title: 'cCredit & cCredit Management Console',
      year: '2024',
      icon: 'fas fa-credit-card',
      description: [
        'Contributed to the migration of legacy payment systems to a modern, scalable architecture.',
        'Designed and built responsive, high-performance user interfaces using React 18, improving maintainability and modularity.',
        'Containerized services using Docker and automated installation workflows with Bash scripting.',
      ],
      technologies: ['React 18', 'Java', 'Spring Boot', 'Docker', 'Bash'],
      impact: 'Legacy → Modern Architecture',
    },
    {
      title: 'Hardware Obsolescence Management Platform',
      year: '2025',
      icon: 'fas fa-microchip',
      description: [
        'Designed and built a cloud-native, AI-powered platform to automate hardware obsolescence tracking and risk analysis.',
        'Architected an end-to-end data and AI pipeline using Vertex AI, Gemini, RAG, Cloud Run, BigQuery, and Looker.',
        'Achieved 20+ hours of weekly operational time savings and 10–30% reduction in maintenance costs.',
      ],
      technologies: ['GCP', 'Vertex AI', 'Gemini', 'RAG', 'BigQuery', 'Looker', 'Cloud Run'],
      impact: '20+ hrs/week saved, 10-30% cost reduction',
    },
  ];
}
