import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit {
  displayText = signal('');
  private roles = [
    'Full Stack Developer',
    'Java Engineer',
    'Cloud Architect',
    'System Designer',
  ];
  private currentRoleIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;

  ngOnInit() {
    this.typeEffect();
  }

  private typeEffect() {
    const currentRole = this.roles[this.currentRoleIndex];
    const speed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.currentCharIndex <= currentRole.length) {
      this.displayText.set(currentRole.substring(0, this.currentCharIndex));
      this.currentCharIndex++;
    } else if (this.isDeleting && this.currentCharIndex >= 0) {
      this.displayText.set(currentRole.substring(0, this.currentCharIndex));
      this.currentCharIndex--;
    }

    if (!this.isDeleting && this.currentCharIndex > currentRole.length) {
      setTimeout(() => {
        this.isDeleting = true;
        this.typeEffect();
      }, 2000);
      return;
    }

    if (this.isDeleting && this.currentCharIndex < 0) {
      this.isDeleting = false;
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      this.currentCharIndex = 0;
    }

    setTimeout(() => this.typeEffect(), speed);
  }

  scrollTo(event: Event, href: string) {
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
