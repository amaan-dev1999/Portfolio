import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { MetricsComponent } from './components/metrics/metrics';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { WorkflowComponent } from './components/workflow/workflow';
import { ProjectsComponent } from './components/projects/projects';
import { TestimonialsComponent } from './components/testimonials/testimonials';
import { ArchitectureComponent } from './components/architecture/architecture';
import { EducationComponent } from './components/education/education';
import { ContactComponent } from './components/contact/contact';
import { TerminalComponent } from './components/terminal/terminal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    MetricsComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    WorkflowComponent,
    ProjectsComponent,
    TestimonialsComponent,
    ArchitectureComponent,
    EducationComponent,
    TerminalComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
