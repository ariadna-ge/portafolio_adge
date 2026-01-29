import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
isSubmitting = false; 
  submitMessage = '';  

  onSubmit(event: Event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    this.isSubmitting = true;

    new Promise((resolve, reject) => {
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      if (name && email && message) {
        resolve({ name, email, message });
      } else {
        reject({ status: 400, statusText: 'Campos incompletos' });
      }
    })
    .then((data: any) => {
      const toEmail = 'denisse.est15@gmail.com';
      const subject = `Nuevo mensaje de ${data.name}`;
      const body = `De: ${data.email}\n\n${data.message}`;
      
      const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;

      this.submitMessage = "Tu mensaje ha sido preparado con éxito.";
      form.reset();
    })
    .catch((err) => {
      const msg = err.statusText || "Ocurrió un error al intentar enviar.";
      this.submitMessage = `Error ${err.status || ''}: ${msg}`;
    })
    .finally(() => {
      this.isSubmitting = false;

      setTimeout(() => {
        this.submitMessage = '';
      }, 3000);
    });
  }
}