// Sample data for models and dresses
const models = [
    {
        name: "Model 1",
        category: "Casual Wear",
        image: "images/model1.jpg"
    },
    {
        name: "Model 2",
        category: "Evening Wear",
        image: "images/model2.jpg"
    }
];

const dresses = [
    {
        style: "Summer Dress",
        description: "Light and breezy summer collection",
        image: "images/dress1.jpg"
    },
    {
        style: "Evening Gown",
        description: "Elegant evening wear",
        image: "images/dress2.jpg"
    }
];

// Function to create model cards
function createModelCards() {
    const modelsGrid = document.querySelector('#models .grid');
    models.forEach(model => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${model.image}" alt="${model.name}">
            <h3>${model.name}</h3>
            <p>${model.category}</p>
        `;
        modelsGrid.appendChild(card);
    });
}

// Function to create dress cards
function createDressCards() {
    const dressesGrid = document.querySelector('#dresses .grid');
    dresses.forEach(dress => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${dress.image}" alt="${dress.style}">
            <h3>${dress.style}</h3>
            <p>${dress.description}</p>
        `;
        dressesGrid.appendChild(card);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createModelCards();
    createDressCards();

    // Wait for initial animations to complete
    setTimeout(() => {
        // Show sliding images
        const slidingImages = document.querySelectorAll('.sliding-image');
        slidingImages.forEach((img, index) => {
            setTimeout(() => {
                img.classList.add('show');
            }, index * 200);
        });

        // After images are shown, start background removal
        setTimeout(() => {
            // Change page background
            document.querySelector('.page-transition').classList.add('white');
            
            // Change theme for navigation elements
            document.querySelector('.nav-icons').classList.add('white');
            document.querySelector('.logo-text').classList.add('white');
            document.querySelector('.star-icon').classList.add('white');

            // Remove background from images
            slidingImages.forEach(img => {
                img.classList.add('remove-bg');
            });

            // Slide images down
            setTimeout(() => {
                document.querySelector('.sliding-images').classList.add('slide-down');
            }, 2000);
        }, 2000);
    }, 6000); // Wait for initial animations

    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryContainer = document.querySelector('.gallery-container');
    
    const options = {
        root: galleryContainer,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
                // Don't unobserve - this allows re-animation when scrolling back
            }
        });
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Reset animations when scrolling back
    galleryContainer.addEventListener('scroll', () => {
        galleryItems.forEach(item => {
            if (!isElementInViewport(item, galleryContainer)) {
                item.classList.remove('slide-in');
            }
        });
    });
});

function isElementInViewport(el, container) {
    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return (
        rect.left >= containerRect.left - rect.width &&
        rect.right <= containerRect.right + rect.width
    );
}

// Add any interactive features here if needed
document.addEventListener('DOMContentLoaded', function() {
    const switchInput = document.querySelector('.switch input');
    const pageTransition = document.querySelector('.page-transition');
    const logoText = document.querySelector('.logo-text');
    const starIcon = document.querySelector('.star-icon');
    const navIcons = document.querySelectorAll('.nav-icons a');

    setTimeout(() => {
        switchInput.addEventListener('change', function() {
            if (this.checked) {
                // Add white theme classes
                pageTransition.classList.add('white');
                logoText.classList.add('white');
                starIcon.classList.add('white');
                navIcons.forEach(icon => icon.classList.add('white'));
            }
        });
    }, 6000); // Wait for initial animations
}); 