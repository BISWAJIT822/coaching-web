document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatsCounter();
  initTestimonialCarousel();
  initFooterYear();
});

function initFooterYear() {
  const copyrightElem = document.querySelector('.footer-copyright');
  if (copyrightElem) {
    const year = new Date().getFullYear();
    copyrightElem.innerHTML = `&copy; ${year} advancxsolution. All Rights Reserved.`;
  }
}

/* ==================== 1. NAVBAR & ACTIVE NAVIGATION ==================== */
function initNavbar() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Mobile Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (mobileDrawer.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }

  // Active Nav Scroll Spy
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==================== 2. STATS COUNTER ANIMATION ==================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.result-number');
  let animated = false;

  const resultsSection = document.getElementById('results');
  if (!resultsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1500;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(resultsSection);
}

/* ==================== 3. TESTIMONIAL CAROUSEL DOTS ==================== */
function initTestimonialCarousel() {
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const cards = document.querySelectorAll('.testimonial-card');

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      // Highlight corresponding card slightly on mobile
      if (cards[index]) {
        cards.forEach(c => c.style.borderColor = 'rgba(255, 255, 255, 0.22)');
        cards[index].style.borderColor = '#38BDF8';
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  });
}

/* ==================== 4. MODALS & POPUPS ==================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeModalOnBackdrop(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

// Lightbox for Gallery
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImage');
  const cap = document.getElementById('lightboxCaption');
  
  if (modal && img) {
    img.src = src;
    cap.textContent = caption || 'Moments at Excel';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function openGalleryModal() {
  showToast('Gallery', 'Opening high resolution institute photo archive...');
}

/* ==================== 5. FORM HANDLING ==================== */
function prefillCourse(courseName) {
  const select = document.getElementById('formCourse');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === courseName || select.options[i].text.includes(courseName)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('formName').value;
  const course = document.getElementById('formCourse').value;

  showToast('Enquiry Submitted!', `Thank you ${name || 'Student'}, our academic counselor will contact you regarding ${course || 'the course'} shortly.`);
  event.target.reset();
}

function handleModalSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('mName').value;
  closeModal('enquiryModal');
  showToast('Demo Class Booked!', `Thank you ${name}. We have reserved your seat for the free demo and mentorship session.`);
  event.target.reset();
}

function showNotice(title, msg) {
  showToast(title, msg);
}

function showToast(title, msg) {
  const toast = document.getElementById('toastNotification');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMsg');

  if (toast && toastTitle && toastMsg) {
    toastTitle.textContent = title;
    toastMsg.textContent = msg;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);
  }
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal('enquiryModal');
    closeModal('lightboxModal');
  }
});
