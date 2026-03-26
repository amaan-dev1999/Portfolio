import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  title: string;
  company: string;
  domain: string;
  location: string;
  period: string;
  current: boolean;
  points: string[];
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent {
  activeIndex = signal(0);
  openArchitecture = output<void>();

  experiences: Experience[] = [
    {
      title: 'Tech Lead',
      company: 'ERGO Technologies & Services',
      domain: 'Insurance Domain',
      location: 'Mumbai, MH',
      period: 'Feb 2026 – Present',
      current: true,
      points: [
        'Completed onboarding and set up local development environment while gaining understanding of the existing microservices architecture and development workflow.',
        'Analyzed existing services and APIs, assisting in debugging issues and validating fixes across development and staging environments.',
        'Participated in sprint ceremonies, code reviews, and technical discussions while preparing internal documentation to understand system design and engineering practices.',
      ],
      technologies: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'AWS'],
    },
    {
      title: 'Software Engineer (I, II)',
      company: 'Worldline Global Services',
      domain: 'Financial Domain | Payment Systems',
      location: 'Mumbai, MH',
      period: 'Aug 2022 – Jan 2026',
      current: false,
      points: [
        'Designed and developed scalable, enterprise-grade applications using Java, Spring Boot, Angular, and RESTful microservices architecture, deployed on containerized workloads running on AWS ECS.',
        'Designed event-driven architecture using Apache Kafka and Spring Cloud Stream, processing 5K+ events/second with sub-50ms latency.',
        'Built stateless REST APIs with JWT-based security, secrets managed via AWS Secrets Manager and externalized configuration through AWS Parameter Store.',
        'Contributed to multi-tenant SaaS platform development using Spring MVC and Hibernate, serving 20+ enterprise clients.',
        'Optimized SQL queries and database indexes, reducing average query execution time by 65% and improving overall application performance by 40%.',
        'Re-architected a critical frontend processing flow that scaled data handling from 500 records to 500K records — 1000× performance improvement.',
        'Recognized as a 5-star rated performer for two consecutive years.',
      ],
      technologies: [
        'Java', 'Spring Boot', 'Angular', 'React', 'Kafka',
        'AWS', 'Docker', 'PostgreSQL', 'Hibernate', 'NgRx',
      ],
    },
  ];

  setActive(index: number) {
    this.activeIndex.set(index);
  }
}
