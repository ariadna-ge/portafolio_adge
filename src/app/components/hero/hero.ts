import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero {
  downloadCV() {
    const cvPath = 'assets/GarciaEstradaAriadna_CV.pdf';
    window.open(cvPath, '_blank');
  }
}
