import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  highlights = [
    { icon: 'fas fa-code', value: '4+', label: 'Years Experience' },
    { icon: 'fas fa-building', value: '2', label: 'Companies' },
    { icon: 'fas fa-project-diagram', value: '5+', label: 'Major Projects' },
    { icon: 'fas fa-star', value: '5★', label: 'Rated Performer' },
  ];
}
