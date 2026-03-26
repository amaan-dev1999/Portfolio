import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class EducationComponent {
  education = {
    degree: 'Bachelor of Engineering in Electronics And Telecommunication',
    college: 'AIKTC College of Engineering',
    period: '2018 – 2022',
    cgpa: '8.55',
    location: 'Mumbai, MH',
  };

  certifications = [
    {
      name: 'Google Cloud Associate Cloud Engineer',
      issuer: 'Google',
      year: '2025',
      icon: 'fab fa-google',
    },
    {
      name: 'System Design Certification',
      issuer: 'Scalable Architecture & AWS Well-Architected Framework',
      year: '2024',
      icon: 'fas fa-drafting-compass',
    },
    {
      name: 'Java Master Class Certification',
      issuer: 'Advanced Java Programming (130+ Hours)',
      year: '2023',
      icon: 'fab fa-java',
    },
    {
      name: 'Docker Foundation Professional',
      issuer: 'LinkedIn Learning',
      year: '2023',
      icon: 'fab fa-docker',
    },
    {
      name: 'Spring Framework Training',
      issuer: 'Spring Boot & Enterprise Application Development',
      year: '2022',
      icon: 'fas fa-leaf',
    },
    {
      name: 'Database Technologies Training',
      issuer: 'Oracle & MySQL Design and Management',
      year: '2022',
      icon: 'fas fa-database',
    },
  ];
}
