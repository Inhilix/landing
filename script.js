// ============================================
// 1. MOBILE NAV TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

// ============================================
// 2. SCROLL-TRIGGERED FADE-IN (IntersectionObserver)
// ============================================
const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
} else {
  // Fallback: show all immediately if IntersectionObserver not supported
  revealEls.forEach(function (el) { el.classList.add('visible'); });
}

// ============================================
// 3. CONTACT FORM HANDLING
// ============================================
const form          = document.getElementById('contact-form');
const formSuccess   = document.getElementById('form-success');
const successMsg    = document.getElementById('success-name-msg');

const nameInput     = document.getElementById('name');
const emailInput    = document.getElementById('email');
const messageInput  = document.getElementById('message');
const nameError     = document.getElementById('name-error');
const emailError    = document.getElementById('email-error');
const messageError  = document.getElementById('message-error');

function clearErrors() {
  [nameInput, emailInput, messageInput].forEach(function (el) {
    el.classList.remove('error');
  });
  nameError.textContent    = '';
  emailError.textContent   = '';
  messageError.textContent = '';
}

function validateForm() {
  var valid = true;

  if (nameInput.value.trim() === '') {
    nameInput.classList.add('error');
    nameError.textContent = 'Please enter your name.';
    valid = false;
  }

  var emailVal = emailInput.value.trim();
  if (emailVal === '') {
    emailInput.classList.add('error');
    emailError.textContent = 'Please enter your email.';
    valid = false;
  } else if (!emailVal.includes('@') || !emailVal.includes('.')) {
    emailInput.classList.add('error');
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (messageInput.value.trim() === '') {
    messageInput.classList.add('error');
    messageError.textContent = 'Please enter a message.';
    valid = false;
  }

  return valid;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  clearErrors();

  if (!validateForm()) return;

  var name = nameInput.value.trim().split(' ')[0];
  successMsg.textContent = 'Thanks ' + name + '! We\'ll be in touch within 24 hours.';

  form.hidden = true;
  formSuccess.hidden = false;
});

// ============================================
// 4. NAVBAR SCROLL STYLE
// ============================================
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  if (window.scrollY > 20) {
    navbar.style.background = 'rgba(9,9,15,0.97)';
  } else {
    navbar.style.background = 'rgba(9,9,15,0.85)';
  }
});
