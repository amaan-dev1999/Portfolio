import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ArchNode {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  tech: string;
  detail: string;
  layer: string;
}

interface ArchConnection {
  from: string;
  to: string;
  label: string;
  animated: boolean;
  color: string;
}

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './architecture.html',
  styleUrl: './architecture.scss',
})
export class ArchitectureComponent {
  isOpen = signal(false);
  pinnedNode = signal<ArchNode | null>(null);
  hoveredNode = signal<ArchNode | null>(null);
  activeLayer = signal<string>('all');

  get activeNode(): ArchNode | null {
    return this.pinnedNode() ?? this.hoveredNode();
  }

  open() {
    this.isOpen.set(true);
    this.activeLayer.set('all');
    this.pinnedNode.set(null);
    this.hoveredNode.set(null);
  }

  close() {
    this.isOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.isOpen()) this.close();
  }

  layers = [
    { id: 'all', label: 'Full System', icon: 'fas fa-layer-group' },
    { id: 'client', label: 'Client', icon: 'fas fa-desktop' },
    { id: 'gateway', label: 'Gateway', icon: 'fas fa-shield-alt' },
    { id: 'service', label: 'Services', icon: 'fas fa-microchip' },
    { id: 'messaging', label: 'Messaging', icon: 'fas fa-stream' },
    { id: 'data', label: 'Data', icon: 'fas fa-database' },
    { id: 'cloud', label: 'Cloud', icon: 'fas fa-cloud' },
  ];

  nodes: ArchNode[] = [
    // Client Layer
    {
      id: 'react-app', label: 'React SPA', icon: 'fab fa-react',
      x: 50, y: 30, width: 140, height: 65, color: '#61dafb',
      tech: 'React 18 + NgRx + RxJS',
      detail: 'Responsive UI handling 500K records with reactive state management. Re-architected for 1000x performance improvement.',
      layer: 'client',
    },
    {
      id: 'angular-app', label: 'Angular App', icon: 'fab fa-angular',
      x: 230, y: 30, width: 140, height: 65, color: '#dd0031',
      tech: 'Angular + TypeScript',
      detail: 'Enterprise admin console for multi-tenant SaaS configuration and monitoring dashboards.',
      layer: 'client',
    },
    // Gateway Layer
    {
      id: 'alb', label: 'AWS ALB', icon: 'fas fa-network-wired',
      x: 140, y: 140, width: 140, height: 65, color: '#ff9900',
      tech: 'Application Load Balancer',
      detail: 'Routes traffic across ECS containers. Supports high availability and fault tolerance with health checks.',
      layer: 'gateway',
    },
    // Service Layer
    {
      id: 'auth-service', label: 'Auth Service', icon: 'fas fa-lock',
      x: 10, y: 260, width: 130, height: 65, color: '#a78bfa',
      tech: 'Spring Security + JWT',
      detail: 'Stateless authentication with JWT tokens. Secrets managed via AWS Secrets Manager.',
      layer: 'service',
    },
    {
      id: 'payment-service', label: 'Payment API', icon: 'fas fa-credit-card',
      x: 155, y: 260, width: 130, height: 65, color: '#64ffda',
      tech: 'Spring Boot + JPA',
      detail: 'Core payment processing service. RESTful APIs with externalized config via AWS Parameter Store.',
      layer: 'service',
    },
    {
      id: 'email-service', label: 'Email Service', icon: 'fas fa-envelope',
      x: 300, y: 260, width: 130, height: 65, color: '#f472b6',
      tech: 'Spring Boot + Async',
      detail: 'Full-stack email module for customer service platform. Handles attachments and high-volume processing.',
      layer: 'service',
    },
    // Messaging Layer
    {
      id: 'kafka', label: 'Apache Kafka', icon: 'fas fa-bolt',
      x: 80, y: 385, width: 160, height: 70, color: '#e8590c',
      tech: 'Kafka + Streams + Connect',
      detail: 'Event-driven backbone processing 5K+ events/sec with sub-50ms latency. Spring Cloud Stream integration.',
      layer: 'messaging',
    },
    {
      id: 'sns-sqs', label: 'SNS / SQS', icon: 'fas fa-bell',
      x: 280, y: 385, width: 140, height: 70, color: '#ff9900',
      tech: 'AWS SNS + SQS',
      detail: 'Async notification and queue system for decoupled inter-service communication.',
      layer: 'messaging',
    },
    // Data Layer
    {
      id: 'postgres', label: 'PostgreSQL', icon: 'fas fa-database',
      x: 10, y: 510, width: 120, height: 65, color: '#336791',
      tech: 'PostgreSQL + Indexes',
      detail: 'Primary OLTP database. Query optimization reduced execution time by 65%, improving app perf by 40%.',
      layer: 'data',
    },
    {
      id: 'dynamodb', label: 'DynamoDB', icon: 'fas fa-table',
      x: 150, y: 510, width: 120, height: 65, color: '#4053d6',
      tech: 'AWS DynamoDB',
      detail: 'NoSQL store for high-throughput session data and real-time event state.',
      layer: 'data',
    },
    {
      id: 's3', label: 'Amazon S3', icon: 'fas fa-archive',
      x: 290, y: 510, width: 120, height: 65, color: '#3f8624',
      tech: 'S3 + Analytics',
      detail: 'Persists Kafka streaming outputs for downstream analytics and reconciliation workflows.',
      layer: 'data',
    },
    // Cloud Layer
    {
      id: 'ecs', label: 'AWS ECS', icon: 'fab fa-docker',
      x: 430, y: 180, width: 120, height: 55, color: '#ff9900',
      tech: 'ECS + Docker',
      detail: 'Containerized workloads running behind ALB. Supports auto-scaling and blue-green deployments.',
      layer: 'cloud',
    },
    {
      id: 'secrets', label: 'Secrets Mgr', icon: 'fas fa-key',
      x: 430, y: 260, width: 120, height: 55, color: '#dd6b20',
      tech: 'AWS Secrets Manager',
      detail: 'Centralized secret management for JWT keys, DB credentials, and API tokens.',
      layer: 'cloud',
    },
    {
      id: 'cicd', label: 'CI/CD', icon: 'fas fa-rocket',
      x: 430, y: 340, width: 120, height: 55, color: '#38bdf8',
      tech: 'Jenkins + GitLab CI',
      detail: 'Automated build, test, and deployment pipelines. Docker-based release workflows.',
      layer: 'cloud',
    },
  ];

  connections: ArchConnection[] = [
    { from: 'react-app', to: 'alb', label: 'HTTPS', animated: true, color: '#61dafb' },
    { from: 'angular-app', to: 'alb', label: 'HTTPS', animated: true, color: '#dd0031' },
    { from: 'alb', to: 'auth-service', label: 'Route', animated: true, color: '#ff9900' },
    { from: 'alb', to: 'payment-service', label: 'Route', animated: true, color: '#ff9900' },
    { from: 'alb', to: 'email-service', label: 'Route', animated: true, color: '#ff9900' },
    { from: 'payment-service', to: 'kafka', label: 'Produce', animated: true, color: '#64ffda' },
    { from: 'kafka', to: 'email-service', label: 'Consume', animated: true, color: '#e8590c' },
    { from: 'email-service', to: 'sns-sqs', label: 'Notify', animated: true, color: '#f472b6' },
    { from: 'payment-service', to: 'postgres', label: 'Read/Write', animated: false, color: '#64ffda' },
    { from: 'auth-service', to: 'dynamodb', label: 'Sessions', animated: false, color: '#a78bfa' },
    { from: 'kafka', to: 's3', label: 'Stream out', animated: true, color: '#e8590c' },
    { from: 'alb', to: 'ecs', label: 'Deploy', animated: false, color: '#ff9900' },
    { from: 'auth-service', to: 'secrets', label: 'Fetch', animated: false, color: '#a78bfa' },
    { from: 'cicd', to: 'ecs', label: 'Deploy', animated: true, color: '#38bdf8' },
  ];

  metrics = [
    { label: 'Events/sec', value: '5,000+', icon: 'fas fa-bolt' },
    { label: 'Latency', value: '<50ms', icon: 'fas fa-tachometer-alt' },
    { label: 'Performance', value: '1000x', icon: 'fas fa-rocket' },
    { label: 'Query Speed', value: '+65%', icon: 'fas fa-database' },
  ];

  onNodeHover(node: ArchNode | null) {
    this.hoveredNode.set(node);
  }

  onNodeClick(node: ArchNode) {
    this.pinnedNode.set(this.pinnedNode()?.id === node.id ? null : node);
  }

  setActiveLayer(layerId: string) {
    this.activeLayer.set(layerId);
    this.pinnedNode.set(null);
    this.hoveredNode.set(null);
  }

  isNodeVisible(node: ArchNode): boolean {
    return this.activeLayer() === 'all' || node.layer === this.activeLayer();
  }

  isConnectionVisible(conn: ArchConnection): boolean {
    if (this.activeLayer() === 'all') return true;
    const fromNode = this.nodes.find(n => n.id === conn.from);
    const toNode = this.nodes.find(n => n.id === conn.to);
    return (fromNode?.layer === this.activeLayer() || toNode?.layer === this.activeLayer()) ?? false;
  }

  getNodeCenter(id: string): { x: number; y: number } {
    const node = this.nodes.find(n => n.id === id);
    if (!node) return { x: 0, y: 0 };
    return { x: node.x + node.width / 2, y: node.y + node.height / 2 };
  }
}
