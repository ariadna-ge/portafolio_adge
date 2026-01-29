import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '.reveal',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
