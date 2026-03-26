import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  submitted = signal(false);

  contactInfo = [
    { icon: 'fas fa-envelope', label: 'Email', value: 'amaan.ahmadkhan1999@gmail.com', href: 'mailto:amaan.ahmadkhan1999@gmail.com' },
    { icon: 'fas fa-phone', label: 'Phone', value: '+91-9198557381', href: 'tel:+919198557381' },
    { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Mumbai, Maharashtra, India', href: '' },
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn', value: 'linkedin.com/in/amaan', href: 'https://linkedin.com/in/amaan' },
  ];

  onSubmit() {
    const { name, email, subject, message } = this.formData;
    const mailtoLink = `mailto:amaan.ahmadkhan1999@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, '_blank');
    this.submitted.set(true);
    setTimeout(() => this.submitted.set(false), 3000);
  }
}
