import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number }[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  categories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: 'fas fa-code',
      skills: [
        { name: 'Java (8–21)', level: 95 },
        { name: 'TypeScript', level: 85 },
        { name: 'Python', level: 70 },
        { name: 'SQL', level: 90 },
      ],
    },
    {
      title: 'Frameworks & Libraries',
      icon: 'fas fa-layer-group',
      skills: [
        { name: 'Spring Boot / Cloud', level: 95 },
        { name: 'Angular', level: 85 },
        { name: 'React', level: 85 },
        { name: 'Hibernate / JPA', level: 90 },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'fas fa-cloud',
      skills: [
        { name: 'AWS (EC2, S3, Lambda, ECS)', level: 88 },
        { name: 'Docker / Kubernetes', level: 82 },
        { name: 'GCP', level: 75 },
        { name: 'Jenkins / GitLab CI', level: 80 },
      ],
    },
    {
      title: 'Architecture & Design',
      icon: 'fas fa-sitemap',
      skills: [
        { name: 'Microservices', level: 92 },
        { name: 'Event-Driven Architecture', level: 88 },
        { name: 'System Design', level: 85 },
        { name: 'REST API Design', level: 95 },
      ],
    },
    {
      title: 'Messaging & Streaming',
      icon: 'fas fa-stream',
      skills: [
        { name: 'Apache Kafka', level: 88 },
        { name: 'Kafka Streams / Connect', level: 80 },
        { name: 'AWS SNS / SQS', level: 78 },
      ],
    },
    {
      title: 'Databases',
      icon: 'fas fa-database',
      skills: [
        { name: 'PostgreSQL', level: 90 },
        { name: 'MySQL', level: 88 },
        { name: 'Oracle', level: 80 },
        { name: 'DynamoDB', level: 75 },
      ],
    },
  ];
}
