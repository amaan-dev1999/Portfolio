import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  highlight: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  activeIndex = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  testimonials: Testimonial[] = [
    {
      quote: 'Initially in ONBO, the tech stack comprised Angular and Java for the web application. As the project ramped down, we transitioned to working on cCredit, which involved network protocols like TCP/IP communication and payment protocols — areas that were entirely new to the team. Despite limited time, he quickly adapted, gained expertise and delivered outstanding results. This accomplishment was particularly impressive given that he had 2+ years of experience, ensuring the project\'s successful completion beyond expectations. During the final month, as the project was winding down, he single-handedly managed requirement gathering and delivery, showcasing exceptional dedication and ownership.',
      name: 'Krishnan Subramaniam',
      role: 'Director',
      highlight: 'Delivered outstanding results beyond expectations',
    },
    {
      quote: 'Amaan joined the TI project at a crucial time and quickly became a key contributor. He developed multiple Angular modules to replicate core email features from Eptica and played an important role in turning the project status Green. Alongside his frontend work, he also supported backend API enhancements with new filter options. His handling of complex features like "Ask for Help", "Request Approval" and "Email Notifications" was smooth and effective. Amaan also presented demos clearly, helping stakeholders stay aligned.',
      name: 'Ravishankar Yenikapati',
      role: 'Solution Architect',
      highlight: 'Key contributor who turned the project status Green',
    },
    {
      quote: 'Shown very good focus on project development and kept doing the good and effective work. He is truly a self-sustained Full Stack Developer.',
      name: 'Prashant Negi',
      role: 'Senior Manager',
      highlight: 'Truly a self-sustained Full Stack Developer',
    },
  ];

  ngOnInit() {
    this.startAutoRotate();
  }

  ngOnDestroy() {
    this.stopAutoRotate();
  }

  next() {
    this.activeIndex.set((this.activeIndex() + 1) % this.testimonials.length);
    this.stopAutoRotate();
  }

  prev() {
    this.activeIndex.set(
      (this.activeIndex() - 1 + this.testimonials.length) % this.testimonials.length
    );
    this.stopAutoRotate();
  }

  goTo(index: number) {
    this.activeIndex.set(index);
    this.stopAutoRotate();
  }

  private startAutoRotate() {
    this.timer = setInterval(() => {
      this.activeIndex.set((this.activeIndex() + 1) % this.testimonials.length);
    }, 8000);
  }

  private stopAutoRotate() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
