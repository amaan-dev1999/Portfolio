import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Metric {
  icon: string;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  color: string;
  description: string;
}

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics.html',
  styleUrl: './metrics.scss',
})
export class MetricsComponent implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;
  private hasAnimated = false;
  stripRef = viewChild<ElementRef>('stripRef');

  displayValues = signal<number[]>([]);

  metrics: Metric[] = [
    {
      icon: 'fas fa-calendar-check',
      value: 4,
      suffix: '+',
      prefix: '',
      label: 'Years Experience',
      color: '#64ffda',
      description: 'Building enterprise systems',
    },
    {
      icon: 'fas fa-bolt',
      value: 5000,
      suffix: '+',
      prefix: '',
      label: 'Events / Second',
      color: '#e8590c',
      description: 'Kafka throughput achieved',
    },
    {
      icon: 'fas fa-rocket',
      value: 1000,
      suffix: 'x',
      prefix: '',
      label: 'Performance Boost',
      color: '#a78bfa',
      description: 'Frontend re-architecture',
    },
    {
      icon: 'fas fa-database',
      value: 65,
      suffix: '%',
      prefix: '',
      label: 'Query Optimization',
      color: '#38bdf8',
      description: 'SQL tuning & indexing',
    },
    {
      icon: 'fas fa-building',
      value: 20,
      suffix: '+',
      prefix: '',
      label: 'Enterprise Clients',
      color: '#f472b6',
      description: 'Multi-tenant SaaS platform',
    },
    {
      icon: 'fas fa-star',
      value: 5,
      suffix: '★',
      prefix: '',
      label: 'Rated Performer',
      color: '#fbbf24',
      description: '2 consecutive years',
    },
  ];

  ngOnInit() {
    this.displayValues.set(this.metrics.map(() => 0));
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCounters();
        }
      },
      { threshold: 0.3 },
    );
  }

  ngAfterViewInit() {
    const el = this.stripRef()?.nativeElement;
    if (el) this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  private animateCounters() {
    const duration = 2000;
    const frameDuration = 16;
    const totalFrames = Math.ceil(duration / frameDuration);

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = this.easeOutExpo(frame / totalFrames);
      this.displayValues.set(
        this.metrics.map((m) => Math.round(progress * m.value)),
      );
      if (frame >= totalFrames) {
        clearInterval(timer);
        this.displayValues.set(this.metrics.map((m) => m.value));
      }
    }, frameDuration);
  }

  private easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  formatValue(index: number): string {
    const m = this.metrics[index];
    const val = this.displayValues()[index];
    if (m.value >= 1000) {
      return m.prefix + val.toLocaleString() + m.suffix;
    }
    return m.prefix + val + m.suffix;
  }
}
