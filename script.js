// ===== JAVASCRIPT FILE CONTENT (script.js) =====

// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;
  
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Navbar Scroll Effect
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Particles Animation
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.width = `${Math.random() * 5 + 2}px`;
  particle.style.height = particle.style.width;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
  particle.style.animationDelay = `${Math.random() * 5}s`;
  particlesContainer.appendChild(particle);
}

// Typing Effect
const typedTextSpan = document.querySelector('.typed-text');
const texts = [
  'B.Tech CSE Student',
  'Software Developer',
  'Python Enthusiast',
  'Web Developer',
  'Problem Solver'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function type() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 100;
  } else {
    typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 200;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingDelay = 500;
  }
  
  setTimeout(type, typingDelay);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
  observer.observe(element);
});

// Skill Progress Circles Animation
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const circles = entry.target.querySelectorAll('.progress-ring-fill');
      circles.forEach(circle => {
        const percent = circle.style.getPropertyValue('--percent');
        circle.style.strokeDashoffset = `calc(326.56 - (326.56 * ${percent}) / 100)`;
      });
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card-3d').forEach(card => {
  skillObserver.observe(card);
});

// Weather App
function getWeather() {
  const cityInput = document.getElementById('city');
  const weatherResult = document.getElementById('weatherResult');
  const city = cityInput.value.trim();
  
  if (city === '') {
    weatherResult.innerHTML = '<span style="color: #dc3545;">Please enter a city name</span>';
    return;
  }
  
  // Demo data (In production, integrate with a real weather API)
  const weatherData = {
    temperature: Math.floor(Math.random() * 15 + 20),
    condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 30 + 50)
  };
  
  weatherResult.innerHTML = `
    <div class="weather-info">
      <strong>${city}</strong><br>
      <i class="fas fa-temperature-high"></i> ${weatherData.temperature}°C<br>
      <i class="fas fa-cloud"></i> ${weatherData.condition}<br>
      <i class="fas fa-tint"></i> Humidity: ${weatherData.humidity}%
    </div>
  `;
  
  weatherResult.style.animation = 'fadeInUp 0.5s ease';
  cityInput.value = '';
}

// Allow Enter key to trigger weather search
document.getElementById('city').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeather();
  }
});

// To-Do App
function addTask() {
  const taskInput = document.getElementById('task');
  const taskList = document.getElementById('taskList');
  const taskValue = taskInput.value.trim();
  
  if (taskValue === '') {
    return;
  }
  
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskValue}</span>
    <button onclick="removeTask(this)" style="float: right; background: transparent; border: none; color: #dc3545; cursor: pointer; font-size: 1.2rem;">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  taskList.appendChild(li);
  taskInput.value = '';
  
  // Add animation
  li.style.animation = 'slideInLeft 0.3s ease';
}

function removeTask(button) {
  const li = button.parentElement;
  li.style.animation = 'slideOutRight 0.3s ease';
  setTimeout(() => {
    li.remove();
  }, 300);
}

// Allow Enter key to add task
document.getElementById('task').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Contact Form
function sendEmail(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Demo alert (In production, integrate with EmailJS or backend)
  const btn = e.target.querySelector('button');
  const originalText = btn.innerHTML;
  
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
    btn.style.background = '#28a745';
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.background = '';
      e.target.reset();
    }, 2000);
    
    console.log('Email would be sent:', { name, email, message });
  }, 1500);
}

// EmailJS Integration (Uncomment and configure when ready)
/*
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

function sendEmail(e) {
  e.preventDefault();
  
  const btn = e.target.querySelector('button');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  btn.disabled = true;
  
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  }).then(
    () => {
      btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
      btn.style.background = '#28a745';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
        e.target.reset();
      }, 2000);
    },
    () => {
      btn.innerHTML = '<i class="fas fa-times me-2"></i>Failed to Send';
      btn.style.background = '#dc3545';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 2000);
    }
  );
}
*/

// Profile Card 3D Effect
const profileCard = document.querySelector('.profile-card-3d');
if (profileCard) {
  profileCard.addEventListener('mousemove', (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = 'rotateX(0) rotateY(0)';
  });
}

// Skill Cards 3D Effect
document.querySelectorAll('.skill-card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

// Add slideOutRight animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(style);

// Page Load Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Console Welcome Message
console.log('%c Welcome to Hishal MT\'s Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
console.log('%c Interested in collaboration? Let\'s connect! ', 'color: #667eea; font-size: 14px; font-weight: bold;');



// CERTIFICATE MODAL

function openCertificate(imageSrc){

const modal =
document.getElementById("certificateModal");

const modalImg =
document.getElementById("certificateImage");

modal.style.display = "block";

modalImg.src = imageSrc;

document.body.style.overflow = "hidden";

}

// CLOSE MODAL

function closeCertificate(){

document.getElementById(
"certificateModal"
).style.display = "none";

document.body.style.overflow = "auto";

}

// CLOSE WHEN CLICK OUTSIDE

window.addEventListener("click", function(e){

const modal =
document.getElementById("certificateModal");

if(e.target === modal){

closeCertificate();

}

});

// ESC KEY CLOSE

document.addEventListener("keydown", function(e){

if(e.key === "Escape"){

closeCertificate();

}

});


// =========================
// ANIMATED PROGRESS BAR
// =========================

const progressBars = document.querySelectorAll(".progress-fill");

window.addEventListener("load", () => {

    progressBars.forEach((bar) => {

        let width = bar.getAttribute("data-width");

        setTimeout(() => {
            bar.style.width = width;
        }, 300);

    });

});
