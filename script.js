// Presentation Navigation System
class Presentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.currentSlideElement = document.getElementById('current-slide');
        this.totalSlidesElement = document.getElementById('total-slides');
        this.init();
    }

    init() {
        // Set up keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Update total slides counter
        if (this.totalSlidesElement) {
            this.totalSlidesElement.textContent = this.totalSlides;
        }

        // Show first slide
        this.showSlide(0);
    }

    handleKeyPress(event) {
        switch(event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ': // Spacebar
                event.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                this.prevSlide();
                break;
            case 'Home':
                event.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                event.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
        }
    }

    showSlide(index) {
        // Remove active class from all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add active class to current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            this.currentSlide = index;

            // Update slide counter
            this.updateCounter();
        }
    }

    updateCounter() {
        if (this.currentSlideElement) {
            this.currentSlideElement.textContent = this.currentSlide + 1;
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.showSlide(index);
        }
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Presentation();
});
