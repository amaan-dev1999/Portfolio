import {
  Component,
  ElementRef,
  signal,
  viewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Phase {
  id: string;
  icon: string;
  title: string;
  description: string;
  frequency: string;
  color: string;
  tasks: string[];
}

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workflow.html',
  styleUrl: './workflow.scss',
})
export class WorkflowComponent implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;
  sectionRef = viewChild<ElementRef>('sectionRef');

  activePhase = signal<string | null>(null);
  isVisible = signal(false);

  phases: Phase[] = [
    {
      id: 'discover',
      icon: 'fas fa-lightbulb',
      title: 'Discover & Analyze',
      description: 'Grab requirements from the product owner, break them down, assess feasibility and impact across services.',
      frequency: 'Per Sprint',
      color: '#fbbf24',
      tasks: [
        'Gather feature requirements from PO',
        'Impact analysis across microservices',
        'Story breakdown & acceptance criteria',
        'Identify cross-team dependencies',
      ],
    },
    {
      id: 'architect',
      icon: 'fas fa-drafting-compass',
      title: 'Design & POC',
      description: 'Whiteboard the solution, prototype risky areas, validate architecture decisions before committing the team.',
      frequency: 'Per Feature',
      color: '#a78bfa',
      tasks: [
        'System design & architecture decisions',
        'Spike / POC for unknowns',
        'API contracts & data flow mapping',
        'Technical design review with team',
      ],
    },
    {
      id: 'plan',
      icon: 'fas fa-tasks',
      title: 'Plan & Delegate',
      description: 'Break the design into technical subtasks, allocate based on team strengths, and set sprint commitments.',
      frequency: 'Per Sprint',
      color: '#38bdf8',
      tasks: [
        'Create technical subtasks in Jira',
        'Allocate tasks based on expertise',
        'Define DoD & blockers upfront',
        'Sprint planning with the team',
      ],
    },
    {
      id: 'build',
      icon: 'fas fa-code',
      title: 'Build & Assist',
      description: 'Write production code on critical paths while unblocking teammates — pair programming, debugging, clarifying requirements.',
      frequency: 'Daily',
      color: '#64ffda',
      tasks: [
        'Develop core / complex modules',
        'Pair program to unblock teammates',
        'Resolve technical ambiguities',
        'Standup & progress sync',
      ],
    },
    {
      id: 'review',
      icon: 'fas fa-search-plus',
      title: 'Review & Quality',
      description: 'Enforce code quality through reviews — catch design smells, security gaps, and performance pitfalls before merge.',
      frequency: 'Daily',
      color: '#f472b6',
      tasks: [
        'Pull request code reviews',
        'Enforce coding standards & patterns',
        'Performance & security review',
        'Knowledge sharing via review comments',
      ],
    },
    {
      id: 'ship',
      icon: 'fas fa-rocket',
      title: 'Demo & Ship',
      description: 'Demo to stakeholders in UAT, address feedback, coordinate the production release and post-deploy validation.',
      frequency: 'Per Release',
      color: '#e8590c',
      tasks: [
        'Demo to stakeholders in UAT',
        'Incorporate feedback & fixes',
        'Production release coordination',
        'Post-deploy monitoring & validation',
      ],
    },
  ];

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.isVisible.set(true);
        }
      },
      { threshold: 0.15 },
    );
  }

  ngAfterViewInit() {
    const el = this.sectionRef()?.nativeElement;
    if (el) this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  togglePhase(id: string) {
    this.activePhase.set(this.activePhase() === id ? null : id);
  }
}
