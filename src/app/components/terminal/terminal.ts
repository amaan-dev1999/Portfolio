import { Component, ElementRef, ViewChild, AfterViewInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TerminalLine {
  type: 'input' | 'output' | 'ascii' | 'error' | 'success' | 'table';
  text: string;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('terminalInput') terminalInput!: ElementRef<HTMLInputElement>;
  @ViewChild('terminalBody') terminalBody!: ElementRef<HTMLDivElement>;

  isOpen = signal(false);
  lines = signal<TerminalLine[]>([]);
  currentInput = signal('');
  commandHistory: string[] = [];
  historyIndex = -1;
  isTyping = signal(false);

  private commands: Record<string, () => TerminalLine[]> = {
    help: () => this.cmdHelp(),
    whoami: () => this.cmdWhoami(),
    skills: () => this.cmdSkills(),
    experience: () => this.cmdExperience(),
    projects: () => this.cmdProjects(),
    education: () => this.cmdEducation(),
    certifications: () => this.cmdCertifications(),
    contact: () => this.cmdContact(),
    clear: () => this.cmdClear(),
    tech: () => this.cmdTech(),
    metrics: () => this.cmdMetrics(),
    sudo: () => [{ type: 'error' as const, text: '🚫 Nice try! You don\'t have root access to my portfolio.' }],
    ls: () => [
      { type: 'output' as const, text: 'drwxr-xr-x  about/' },
      { type: 'output' as const, text: 'drwxr-xr-x  skills/' },
      { type: 'output' as const, text: 'drwxr-xr-x  experience/' },
      { type: 'output' as const, text: 'drwxr-xr-x  projects/' },
      { type: 'output' as const, text: 'drwxr-xr-x  education/' },
      { type: 'output' as const, text: '-rw-r--r--  resume.pdf' },
      { type: 'output' as const, text: '-rw-r--r--  README.md' },
    ],
    pwd: () => [{ type: 'output' as const, text: '/home/amaan/portfolio' }],
    date: () => [{ type: 'output' as const, text: new Date().toString() }],
    echo: () => [{ type: 'output' as const, text: 'Hello from Amaan\'s terminal! 👋' }],
    neofetch: () => this.cmdNeofetch(),
  };

  private initialized = false;

  ngAfterViewInit() {}

  @HostListener('document:keydown', ['$event'])
  onGlobalKeyDown(event: KeyboardEvent) {
    if (event.key === '`' && event.ctrlKey) {
      event.preventDefault();
      this.toggle();
    }
    if (event.key === 'Escape' && this.isOpen()) {
      this.close();
    }
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen.set(true);
    if (!this.initialized) {
      this.initialized = true;
      setTimeout(() => {
        this.addLines(this.getWelcomeMessage());
        this.focusInput();
      }, 300);
    } else {
      setTimeout(() => this.focusInput(), 100);
    }
  }

  close() {
    this.isOpen.set(false);
  }

  focusInput() {
    this.terminalInput?.nativeElement?.focus();
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.isTyping()) return;

    if (event.key === 'Enter') {
      this.executeCommand();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateHistory(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigateHistory(1);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      this.autoComplete();
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      this.cmdClear();
    }
  }

  private executeCommand() {
    const input = this.currentInput().trim();
    const inputLine: TerminalLine = { type: 'input', text: input };

    if (input) {
      this.commandHistory.unshift(input);
    }
    this.historyIndex = -1;

    this.lines.update(lines => [...lines, inputLine]);
    this.currentInput.set('');

    if (!input) {
      this.scrollToBottom();
      return;
    }

    const parts = input.toLowerCase().split(' ');
    const cmd = parts[0];

    if (cmd === 'clear') {
      this.lines.set([]);
      return;
    }

    const handler = this.commands[cmd];
    if (handler) {
      const output = handler();
      this.typeOutputLines(output);
    } else {
      this.addLines([{
        type: 'error',
        text: `command not found: ${cmd}. Type 'help' for available commands.`
      }]);
    }
  }

  private typeOutputLines(outputLines: TerminalLine[]) {
    this.isTyping.set(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < outputLines.length) {
        this.lines.update(lines => [...lines, outputLines[i]]);
        i++;
        this.scrollToBottom();
      } else {
        clearInterval(interval);
        this.isTyping.set(false);
        this.focusInput();
      }
    }, 30);
  }

  private addLines(newLines: TerminalLine[]) {
    this.lines.update(lines => [...lines, ...newLines]);
    this.scrollToBottom();
  }

  private scrollToBottom() {
    setTimeout(() => {
      const el = this.terminalBody?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 10);
  }

  private navigateHistory(direction: number) {
    const newIndex = this.historyIndex - direction;
    if (newIndex >= 0 && newIndex < this.commandHistory.length) {
      this.historyIndex = newIndex;
      this.currentInput.set(this.commandHistory[newIndex]);
    } else if (newIndex < 0) {
      this.historyIndex = -1;
      this.currentInput.set('');
    }
  }

  private autoComplete() {
    const input = this.currentInput().toLowerCase();
    if (!input) return;
    const matches = Object.keys(this.commands).filter(c => c.startsWith(input));
    if (matches.length === 1) {
      this.currentInput.set(matches[0]);
    } else if (matches.length > 1) {
      this.addLines([
        { type: 'input', text: input },
        { type: 'output', text: matches.join('  ') }
      ]);
    }
  }

  private getWelcomeMessage(): TerminalLine[] {
    return [
      { type: 'ascii', text: '╔══════════════════════════════════════════════════════════╗' },
      { type: 'ascii', text: '║                                                          ║' },
      { type: 'ascii', text: '║    █████╗ ███╗   ███╗ █████╗  █████╗ ███╗   ██╗          ║' },
      { type: 'ascii', text: '║   ██╔══██╗████╗ ████║██╔══██╗██╔══██╗████╗  ██║          ║' },
      { type: 'ascii', text: '║   ███████║██╔████╔██║███████║███████║██╔██╗ ██║          ║' },
      { type: 'ascii', text: '║   ██╔══██║██║╚██╔╝██║██╔══██║██╔══██║██║╚██╗██║          ║' },
      { type: 'ascii', text: '║   ██║  ██║██║ ╚═╝ ██║██║  ██║██║  ██║██║ ╚████║          ║' },
      { type: 'ascii', text: '║   ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝          ║' },
      { type: 'ascii', text: '║                                                          ║' },
      { type: 'ascii', text: '╚══════════════════════════════════════════════════════════╝' },
      { type: 'success', text: '' },
      { type: 'success', text: '  Welcome to Amaan\'s Interactive Terminal v1.0.0' },
      { type: 'output', text: '  Software Engineer II → Tech Lead | Java | Cloud | Systems' },
      { type: 'output', text: '' },
      { type: 'output', text: '  Type \'help\' to see available commands.' },
      { type: 'output', text: '  Use ↑↓ for history, Tab for autocomplete.' },
      { type: 'output', text: '' },
    ];
  }

  private cmdHelp(): TerminalLine[] {
    return [
      { type: 'success', text: '┌─────────────────────────────────────────────────┐' },
      { type: 'success', text: '│              AVAILABLE COMMANDS                  │' },
      { type: 'success', text: '├─────────────────────────────────────────────────┤' },
      { type: 'output', text: '│  whoami          → Who is Amaan?                 │' },
      { type: 'output', text: '│  skills          → Technical skills & expertise  │' },
      { type: 'output', text: '│  experience      → Work experience timeline      │' },
      { type: 'output', text: '│  projects        → Featured projects             │' },
      { type: 'output', text: '│  education       → Academic background           │' },
      { type: 'output', text: '│  certifications  → Professional certifications   │' },
      { type: 'output', text: '│  tech            → Current tech stack            │' },
      { type: 'output', text: '│  metrics         → Key performance metrics       │' },
      { type: 'output', text: '│  contact         → How to reach me               │' },
      { type: 'output', text: '│  neofetch        → System info (fun!)            │' },
      { type: 'output', text: '│  ls              → List portfolio sections       │' },
      { type: 'output', text: '│  clear           → Clear terminal                │' },
      { type: 'success', text: '└─────────────────────────────────────────────────┘' },
    ];
  }

  private cmdWhoami(): TerminalLine[] {
    return [
      { type: 'success', text: '═══ AMAAN AHMAD KHAN ═══' },
      { type: 'output', text: '' },
      { type: 'output', text: '  Role      : Tech Lead @ ERGO Technologies & Services' },
      { type: 'output', text: '  Previous  : Software Engineer II @ Worldline Global Services' },
      { type: 'output', text: '  Domain    : Financial Payments → Insurance' },
      { type: 'output', text: '  Location  : Mumbai, Maharashtra, India' },
      { type: 'output', text: '  Education : B.E. in Electronics & Telecom (CGPA: 8.55)' },
      { type: 'output', text: '  Exp       : 4+ years building enterprise-grade systems' },
      { type: 'output', text: '' },
      { type: 'success', text: '  ★★★★★ 5-Star Rated Performer (2 consecutive years)' },
      { type: 'output', text: '' },
      { type: 'output', text: '  "I design distributed systems that handle thousands' },
      { type: 'output', text: '   of events per second and scale from 500 to 500K records."' },
    ];
  }

  private cmdSkills(): TerminalLine[] {
    return [
      { type: 'success', text: '═══ TECHNICAL SKILLS ═══' },
      { type: 'output', text: '' },
      { type: 'output', text: '  LANGUAGES' },
      { type: 'output', text: '  ├── Java (8–21)     ████████████████████░  95%' },
      { type: 'output', text: '  ├── TypeScript      █████████████████░░░░  85%' },
      { type: 'output', text: '  ├── SQL             ██████████████████░░░  90%' },
      { type: 'output', text: '  └── Python          ██████████████░░░░░░░  70%' },
      { type: 'output', text: '' },
      { type: 'output', text: '  FRAMEWORKS' },
      { type: 'output', text: '  ├── Spring Boot     ████████████████████░  95%' },
      { type: 'output', text: '  ├── Angular         █████████████████░░░░  85%' },
      { type: 'output', text: '  ├── React           █████████████████░░░░  85%' },
      { type: 'output', text: '  └── Hibernate/JPA   ██████████████████░░░  90%' },
      { type: 'output', text: '' },
      { type: 'output', text: '  CLOUD & DEVOPS' },
      { type: 'output', text: '  ├── AWS             █████████████████░░░░  88%' },
      { type: 'output', text: '  ├── Docker/K8s      ████████████████░░░░░  82%' },
      { type: 'output', text: '  └── GCP             ███████████████░░░░░░  75%' },
      { type: 'output', text: '' },
      { type: 'output', text: '  ARCHITECTURE' },
      { type: 'output', text: '  ├── Microservices   ██████████████████░░░  92%' },
      { type: 'output', text: '  ├── Event-Driven    █████████████████░░░░  88%' },
      { type: 'output', text: '  └── System Design   █████████████████░░░░  85%' },
      { type: 'output', text: '' },
      { type: 'output', text: '  Type \'tech\' for detailed tech stack breakdown.' },
    ];
  }

  private cmdExperience(): TerminalLine[] {
    return [
      { type: 'success', text: '═══ WORK EXPERIENCE ═══' },
      { type: 'output', text: '' },
      { type: 'success', text: '  ┌─ CURRENT ─────────────────────────────────────┐' },
      { type: 'output', text: '  │  Tech Lead                                     │' },
      { type: 'output', text: '  │  ERGO Technologies & Services                  │' },
      { type: 'output', text: '  │  Insurance Domain | Feb 2026 → Present         │' },
      { type: 'output', text: '  │                                                 │' },
      { type: 'output', text: '  │  → Onboarded into microservices architecture   │' },
      { type: 'output', text: '  │  → Debugging & validating across environments  │' },
      { type: 'output', text: '  │  → Leading code reviews & sprint ceremonies    │' },
      { type: 'success', text: '  └────────────────────────────────────────────────┘' },
      { type: 'output', text: '' },
      { type: 'output', text: '  ┌─ PREVIOUS ────────────────────────────────────────┐' },
      { type: 'output', text: '  │  Software Engineer I → II                         │' },
      { type: 'output', text: '  │  Worldline Global Services                        │' },
      { type: 'output', text: '  │  Financial Domain | Payments | Aug 2022 → Jan 2026│' },
      { type: 'output', text: '  │                                                    │' },
      { type: 'output', text: '  │  → Built event-driven systems (5K+ events/sec)    │' },
      { type: 'output', text: '  │  → Multi-tenant SaaS for 20+ enterprise clients   │' },
      { type: 'output', text: '  │  → 1000x performance boost (500 → 500K records)   │' },
      { type: 'output', text: '  │  → Reduced query time by 65%, app perf by 40%     │' },
      { type: 'output', text: '  │  → ★★★★★ 5-Star Rated (2 consecutive years)       │' },
      { type: 'output', text: '  └────────────────────────────────────────────────────┘' },
    ];
  }

  private cmdProjects(): TerminalLine[] {
    return [
      { type: 'success', text: '═══ FEATURED PROJECTS ═══' },
      { type: 'output', text: '' },
      { type: 'output', text: '  [01] Email Feature — Customer Service Platform (2025)' },
      { type: 'output', text: '       Stack: React, NgRx, RxJS, Spring Boot' },
      { type: 'success', text: '       Impact: Delivered ahead of 9-month schedule' },
      { type: 'output', text: '' },
      { type: 'output', text: '  [02] cCredit & Management Console (2024)' },
      { type: 'output', text: '       Stack: React 18, Java, Spring Boot, Docker' },
      { type: 'success', text: '       Impact: Legacy → Modern architecture migration' },
      { type: 'output', text: '' },
      { type: 'output', text: '  [03] Hardware Obsolescence AI Platform (2025)' },
      { type: 'output', text: '       Stack: GCP, Vertex AI, Gemini, RAG, BigQuery' },
      { type: 'success', text: '       Impact: 20+ hrs/week saved, 10-30% cost reduction' },
    ];
  }

  private cmdEducation(): TerminalLine[] {
    return [
      { type: 'success', text: '═══ EDUCATION ═══' },
      { type: 'output', text: '' },
      { type: 'output', text: '  🎓 Bachelor of Engineering' },
      { type: 'output', text: '     Electronics & Telecommunication' },
      { type: 'output', text: '     AIKTC College of Engineering' },
      { type: 'output', text: '     2018 – 2022 | Mumbai, MH' },
      { type: 'success', text: '     CGPA: 8.55' },
    ];
  }

  private cmdCertifications(): TerminalLine[] {
    return [
      { type: 'success', text: '═══ CERTIFICATIONS ═══' },
      { type: 'output', text: '' },
      { type: 'output', text: '  [2025] ☁️  Google Cloud Associate Cloud Engineer' },
      { type: 'output', text: '  [2024] 🏗️  System Design — Scalable Architecture & AWS' },
      { type: 'output', text: '  [2023] ☕ Java Master Class — 130+ Hours' },
      { type: 'output', text: '  [2023] 🐳 Docker Foundation Professional' },
      { type: 'output', text: '  [2022] 🌱 Spring Framework Training' },
      { type: 'output', text: '  [2022] 🗄️  Database Technologies (Oracle & MySQL)' },
    ];
  }

  private cmdContact(): TerminalLine[] {
    return [
      { type: 'success', text: '═══ CONTACT ═══' },
      { type: 'output', text: '' },
      { type: 'output', text: '  📧 Email    : amaan.ahmadkhan1999@gmail.com' },
      { type: 'output', text: '  📱 Phone    : +91-9198557381' },
      { type: 'output', text: '  📍 Location : Mumbai, Maharashtra, India' },
      { type: 'output', text: '  💼 LinkedIn : linkedin.com/in/amaan-ahmad-khan' },
      { type: 'output', text: '  🐙 GitHub   : github.com/amaan-dev1999' },
      { type: 'output', text: '' },
      { type: 'success', text: '  ✉️  Open to new opportunities and collaborations!' },
    ];
  }

  private cmdTech(): TerminalLine[] {
    return [
      { type: 'success', text: '═══ TECH STACK ═══' },
      { type: 'output', text: '' },
      { type: 'output', text: '  ┌── Backend ─────────────────────────────────────┐' },
      { type: 'output', text: '  │  Java 8-21 · Spring Boot · Spring Cloud        │' },
      { type: 'output', text: '  │  Spring MVC · Spring Security · Spring Data JPA│' },
      { type: 'output', text: '  │  Hibernate · REST APIs · Swagger/OpenAPI       │' },
      { type: 'output', text: '  └────────────────────────────────────────────────┘' },
      { type: 'output', text: '  ┌── Frontend ────────────────────────────────────┐' },
      { type: 'output', text: '  │  Angular · React · TypeScript · RxJS · NgRx    │' },
      { type: 'output', text: '  └────────────────────────────────────────────────┘' },
      { type: 'output', text: '  ┌── Cloud & DevOps ──────────────────────────────┐' },
      { type: 'output', text: '  │  AWS (EC2, S3, Lambda, ECS, EKS, RDS, IAM)    │' },
      { type: 'output', text: '  │  GCP · Docker · Kubernetes · Jenkins           │' },
      { type: 'output', text: '  │  GitLab CI/CD                                  │' },
      { type: 'output', text: '  └────────────────────────────────────────────────┘' },
      { type: 'output', text: '  ┌── Messaging & Data ────────────────────────────┐' },
      { type: 'output', text: '  │  Apache Kafka · Kafka Streams · Kafka Connect  │' },
      { type: 'output', text: '  │  AWS SNS/SQS                                   │' },
      { type: 'output', text: '  │  PostgreSQL · MySQL · Oracle · DynamoDB        │' },
      { type: 'output', text: '  └────────────────────────────────────────────────┘' },
      { type: 'output', text: '  ┌── Practices ───────────────────────────────────┐' },
      { type: 'output', text: '  │  Microservices · Event-Driven · TDD · BDD      │' },
      { type: 'output', text: '  │  Clean Code · Design Patterns · Agile/Scrum    │' },
      { type: 'output', text: '  │  System Design · High Availability             │' },
      { type: 'output', text: '  └────────────────────────────────────────────────┘' },
    ];
  }

  private cmdMetrics(): TerminalLine[] {
    return [
      { type: 'success', text: '═══ KEY METRICS ═══' },
      { type: 'output', text: '' },
      { type: 'output', text: '  ┌─────────────────┬──────────────────────────────┐' },
      { type: 'output', text: '  │ Metric          │ Value                        │' },
      { type: 'output', text: '  ├─────────────────┼──────────────────────────────┤' },
      { type: 'output', text: '  │ Events/sec      │ 5,000+  (Kafka pipelines)   │' },
      { type: 'output', text: '  │ Latency         │ < 50ms  (event processing)  │' },
      { type: 'output', text: '  │ Perf Boost      │ 1000x   (500 → 500K rows)  │' },
      { type: 'output', text: '  │ Query Speedup   │ 65%     (SQL optimization)  │' },
      { type: 'output', text: '  │ App Perf Gain   │ 40%     (overall throughput)│' },
      { type: 'output', text: '  │ Time Saved      │ 20+ hrs/week (AI platform)  │' },
      { type: 'output', text: '  │ Cost Reduction  │ 10-30%  (maintenance costs) │' },
      { type: 'output', text: '  │ Dev Velocity    │ +25%    (AI-assisted dev)   │' },
      { type: 'output', text: '  │ Clients Served  │ 20+     (multi-tenant SaaS) │' },
      { type: 'output', text: '  └─────────────────┴──────────────────────────────┘' },
    ];
  }

  private cmdNeofetch(): TerminalLine[] {
    return [
      { type: 'ascii', text: '         ╭──────────────╮' },
      { type: 'ascii', text: '    ╭────│   < AAK />   │────╮' },
      { type: 'ascii', text: '    │    ╰──────────────╯    │' },
      { type: 'ascii', text: '    │     ┌──┐    ┌──┐      │' },
      { type: 'ascii', text: '    │     │▓▓│    │▓▓│      │' },
      { type: 'ascii', text: '    │     └──┘    └──┘      │' },
      { type: 'ascii', text: '    │        ╭────╮         │' },
      { type: 'ascii', text: '    │        ╰────╯         │' },
      { type: 'ascii', text: '    ╰──────────────────────╯' },
      { type: 'output', text: '' },
      { type: 'success', text: '  amaan@portfolio' },
      { type: 'output', text: '  ──────────────────' },
      { type: 'output', text: '  OS      : Engineer Linux 4.0-LTS' },
      { type: 'output', text: '  Host    : Mumbai, India' },
      { type: 'output', text: '  Kernel  : Java 21 (Spring Boot 3.x)' },
      { type: 'output', text: '  Shell   : /bin/backend-engineer' },
      { type: 'output', text: '  DE      : Angular + React' },
      { type: 'output', text: '  WM      : Microservices Architecture' },
      { type: 'output', text: '  CPU     : Brain v4.0 @ 5K events/sec' },
      { type: 'output', text: '  GPU     : Kafka Streams Accelerated' },
      { type: 'output', text: '  Memory  : 4 years / unlimited capacity' },
      { type: 'output', text: '  Disk    : PostgreSQL + DynamoDB + Oracle' },
      { type: 'output', text: '  Uptime  : Since Aug 2022 (no downtime)' },
      { type: 'output', text: '' },
      { type: 'output', text: '  ██ ██ ██ ██ ██ ██ ██ ██' },
    ];
  }

  private cmdClear(): TerminalLine[] {
    this.lines.set([]);
    return [];
  }
}
