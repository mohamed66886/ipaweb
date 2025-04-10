function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.innerText = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('.card p');
  const values = [1000, 100, 100000, 3.5];
  let animated = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        counters.forEach((counter, i) => {
          animateValue(counter, 0, values[i], 4500);
        });
        animated = true;
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.card').forEach(card => observer.observe(card));
  window.addEventListener('load', () => {
    setTimeout(() => {
      const toastElement = document.getElementById('myToast');
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }, 1000); 
  });
  document.addEventListener('DOMContentLoaded', function() {
    // تهيئة EmailJS
    emailjs.init('8MaeV7KdZlgEJTvNkMRYJ'); // استخدم Private Key الخاص بك
    
    // عناصر DOM
    const loginBtn = document.getElementById('loginBtn');
    const submitBtn = document.getElementById('submitBtn');
    const loginForm = document.getElementById('loginForm');
    
    // تحقق من وجود بيانات محفوظة
    const savedUser = localStorage.getItem('userData');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      updateUI(userData);
    }
    
    // تحديث واجهة المستخدم بناء على البيانات
    function updateUI(userData) {
      if (userData.imageUrl) {
        loginBtn.innerHTML = `${userData.name} <img src="${userData.imageUrl}" class="user-image">`;
      } else {
        loginBtn.innerHTML = `${userData.name} <i class="bi bi-person-circle"></i>`;
      }
      loginBtn.style.backgroundColor = 'transparent';
      loginBtn.style.color = 'white';
    }
    
    submitBtn.addEventListener('click', function() {
      if (loginForm.checkValidity()) {
        const userImageInput = document.getElementById('userImage');
        const userData = {
          name: document.getElementById('name').value,
          address: document.getElementById('address').value,
          faculty: document.getElementById('faculty').value,
          phone: document.getElementById('phone').value,
          imageUrl: '' // سيتم تعبئتها لاحقاً
        };
             // معالجة الصورة إذا تم تحميلها
      if (userImageInput.files && userImageInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          userData.imageUrl = e.target.result;
          saveUserData(userData);
        };
        
        reader.readAsDataURL(userImageInput.files[0]);
      } else {
        saveUserData(userData);
      }
    } else {
      loginForm.reportValidity();
    }
  });
  function saveUserData(userData) {
    // حفظ البيانات في LocalStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // تحديث واجهة المستخدم
    updateUI(userData);
    
    // إرسال البيانات عبر البريد الإلكتروني
    sendEmail(userData);
    
    // إغلاق النموذج
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
  }
    
    // دالة إرسال البريد الإلكتروني
    function sendEmail(userData) {
      const templateParams = {
        to_email: 'mohamedabdouooo28@gmail.com',
        name: userData.name,
        address: userData.address,
        faculty: userData.faculty,
        phone: userData.phone,
        from_name: 'Website Registration Form'
      };
      
      emailjs.send('service_2tdk8bt', 'template_aia8ddv', templateParams)
        .then(function(response) {
          console.log('Email sent successfully!', response.status, response.text);
          alert('تم تسجيل البيانات وإرسالها بنجاح!');
        }, function(error) {
          console.log('Failed to send email:', error);
          alert('تم تسجيل البيانات وإرسالها بنجاح!');
        });
    }
  });
 // بيانات المدربين
const trainers = [
  {
    id: 1,
    name: "mohamed abdou rashad",
    course: "  Advanced Web Development",
    image: "../img/mohamerashad.jpg",
    bio: "Web developer with 10 years of experience in programming and web development. Specialized in React.js and Node.js. Holds several certifications from major tech companies.",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
    }
  },
  {
    id: 2,
    name: " Sarah Abdullah",
    course: " Digital Marketing",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "A Google-certified digital marketing expert specializing in search engine optimization and advertising campaign management, she has helped over 50 companies achieve their marketing goals.",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
    }
  },
  {
    id: 3,
    name: "Muhammad Ali",
    course: "data analysis",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    bio: "An expert in data analysis and machine learning. He works as a senior data analyst at a major company. He holds a master's degree in data science from a prestigious university.",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
    }
  },
  {
    id: 4,
    name: "Noura Ahmed",
    course: "Graphic design",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    bio: "A professional graphic designer with 8 years of experience in the design field. She specializes in designing visual identities and marketing materials. She works with clients from all over the world.",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
    }
  }
];


function displayTrainers() {
  const trainersContainer = document.getElementById('trainersContainer');
  
  trainers.forEach((trainer, index) => {
    const item = document.createElement('div');
    item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    
    item.innerHTML = `
      <div class="row justify-content-center">
        <div class="col-12 col-md-10">
          <div class="row justify-content-center">
            ${generateTrainerCard(trainer, 'col-12 col-sm-10 col-md-6')}
            ${window.innerWidth >= 768 && trainers[index+1] ? generateTrainerCard(trainers[index+1], 'col-12 col-sm-10 col-md-6') : ''}
          </div>
        </div>
      </div>
    `;
    
    trainersContainer.appendChild(item);
    if(window.innerWidth >= 768) index++; 
  });
}

// إنشاء بطاقة المدرب
function generateTrainerCard(trainer, colClass) {
  if(!trainer) return '';
  
  return `
    <div class="${colClass} mb-4">
      <div class="card h-100 trainer-card border-0 shadow-sm">
        <div class="card-img-top overflow-hidden" style="height: 250px;">
          <img src="${trainer.image}" class="w-100 h-100 object-fit-cover" alt="${trainer.name}">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title fw-bold">${trainer.name}</h5>
          <p class="text-primary mb-3">${trainer.course}</p>
          <button class="btn btn-outline-primary details-btn" data-id="${trainer.id}">
            <i class="fas fa-info-circle me-2"></i> details 
          </button>
        </div>
      </div>
    </div>
  `;
}


function showTrainerDetails(id) {
  const trainer = trainers.find(t => t.id === id);
  if (!trainer) return;
  
  const modalTitle = document.getElementById('trainerModalTitle');
  const modalBody = document.getElementById('trainerModalBody');
  
  modalTitle.textContent = trainer.name;
  modalBody.innerHTML = `
    <div class="row">
      <div class="col-md-4 text-center">
        <img src="${trainer.image}" class="img-fluid rounded-circle mb-3 border border-3 border-primary" style="width: 200px; height: 200px; object-fit: cover;" alt="${trainer.name}">
        
        <div class="d-flex justify-content-center gap-2 mb-4">
          <a href="${trainer.social.facebook}" class="btn btn-primary btn-sm rounded-circle" target="_blank"><i class="bi bi-facebook"></i></a>
          <a href="${trainer.social.twitter}" class="btn btn-info btn-sm rounded-circle text-white" target="_blank"><i class="bi bi-twitter-x"></i></a>
          <a href="${trainer.social.linkedin}" class="btn btn-primary btn-sm rounded-circle" target="_blank"><i class="bi bi-linkedin"></i></a>
          <a href="${trainer.social.website}" class="btn btn-success btn-sm rounded-circle" target="_blank"><i class="bi bi-github"></i></a>
        </div>
      </div>
      <div class="col-md-8">
        <h4 class="text-primary">${trainer.course}</h4>
        <p class="lead">${trainer.bio}</p>
        
        <div class="bg-light p-3 rounded">
          <h5 class="fw-bold">Available courses:</h5>
          <ul class="list-unstyled">
            <li><i class="fas fa-check text-success me-2"></i> ${trainer.course} - Basic level</li>
            <li><i class="fas fa-check text-success me-2"></i> ${trainer.course} - Advanced level</li>
            <li><i class="fas fa-check text-success me-2"></i> Practical workshop </li>
          </ul>
        </div>
      </div>
    </div>
  `;
  
  const modal = new bootstrap.Modal(document.getElementById('trainerModal'));
  modal.show();
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  displayTrainers();
  
  // إضافة حدث النقر على أزرار التفاصيل
  document.addEventListener('click', function(e) {
    if(e.target.classList.contains('details-btn') || e.target.closest('.details-btn')) {
      const btn = e.target.classList.contains('details-btn') ? e.target : e.target.closest('.details-btn');
      const trainerId = parseInt(btn.getAttribute('data-id'));
      showTrainerDetails(trainerId);
    }
  });
});