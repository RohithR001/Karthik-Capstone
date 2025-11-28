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
        const activeSlide = this.slides[this.currentSlide];

        switch(event.key) {
            case 'ArrowRight':
            case ' ': // Spacebar
                event.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowDown':
                // Check if slide is scrollable and not at bottom
                const isAtBottom = activeSlide &&
                    Math.abs(activeSlide.scrollHeight - activeSlide.scrollTop - activeSlide.clientHeight) < 1;

                if (isAtBottom || !activeSlide || activeSlide.scrollHeight <= activeSlide.clientHeight) {
                    // If at bottom or no overflow, go to next slide
                    event.preventDefault();
                    this.nextSlide();
                }
                // Otherwise, allow default scroll behavior
                break;
            case 'ArrowUp':
                // Check if slide is scrollable and not at top
                const isAtTop = activeSlide && activeSlide.scrollTop < 1;

                if (isAtTop || !activeSlide || activeSlide.scrollHeight <= activeSlide.clientHeight) {
                    // If at top or no overflow, go to previous slide
                    event.preventDefault();
                    this.prevSlide();
                }
                // Otherwise, allow default scroll behavior
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

            // Reset scroll position to top
            this.slides[index].scrollTop = 0;

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
