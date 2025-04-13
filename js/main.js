
const diplomas = {
  flutterdiploma: {
    name: "Flutter porgram",
    description: "This program equips participants with comprehensive skills in mobile app development using Flutter. Starting with Dart fundamentals and progressing to advanced Flutter techniques, participants will also learn how to integrate Firebase and deploy their apps ",
    image: "img/flutter.png",
    duration: "140 Hours",
    price: "EGP 5,000",
    studyType: "Online & Offline",
    startDate: "15 June 2025",
    trainer: {
      name: "Mohamed Abdou Rashad",
      image: "img/mohamerashad.jpg",
      bio: "Senior Mobile Developer with 8 years experience"
    }
  },
  embeddedsystemsdiploma: {
    name: "backend (.NET) Diploma",
    description: "This program offers a complete pathway to mastering backend development using .NET technologies. Participants will start by building a solid foundation in C# and .NET, and then advance to crucial skills in version control, data management, and API development with ASP.NET Core. The program also covers security best practices, testing,",
    image: "img/backend.jpg",
    duration: "130 Hours",
    price: "EGP 7,000",
    studyType: "Offline & Online",
    startDate: "1 July 2025",
    trainer: {
      name: "Ahmed Fahmy",
      image: "https://userpic.codeforces.org/2868460/title/580cf75160d90646.jpg",
      bio: "backend Expert with 10+ years experience"
    }
  },
  softwaretestingdiploma: {
    name: "frontend porgram",
    description: "This program offers a complete journey into front-end web development, focusing on mastering React and modern web technologies. Participants will begin with web basics like HTML, CSS, and JavaScript, then dive into React fundamentals, styling techniques, and state management. The program emphasizes hands-on experience through real-world projects, guided by experienced mentors. In addition, workshops on CV building, LinkedIn optimization, and freelancing strategies will help participants succeed in the competitive field of web development.",
    image: "img/front.jpg",
    duration: "140 Hours",
    price: "EGP 4,500",
    studyType: "Online",
    startDate: "20 June 2025",
    trainer: {
      name: "mohamed abdou rashad",
      image: "img/mohamerashad.jpg",
      bio: "Frontend Developer with 8 years experience"
    }
  },
  dataanalysisdiploma: {
    name: "Data Analysis",
    description: "This program offers a well-rounded approach to data analysis, combining technical skills with practical expertise. Participants will start with the fundamentals of data analysis and gain proficiency in Excel, SQL, and scripting for data manipulation.",
    image: "img/da.png",
    duration: "125 Hours",
    price: "EGP 4,000",
    studyType: "Online & Offline",
    startDate: "10 July 2025",
    trainer: {
      name: "mohamed abdou rashad",
      image: "img/mohamerashad.jpg",
      bio: "Data Analyst at Tech Company"
    }
  },
  machinelearningandai: {
    name: "Networking porgram",
    description: "This program provides an in-depth understanding of networking fundamentals, covering essential topics like CompTIA N+, Windows Server, and Cisco CCNA basics. Participants will also explore cloud computing and network security fundamentals ",
    image: "img/ds.png",
    duration: "210 Hours",
    price: "EGP 8,000",
    studyType: "Online",
    startDate: "5 August 2025",
    trainer: {
      name: "mohamed abdou rashad",
      image: "img/mohamerashad.jpg",
      bio: "AI Specialist with PhD in Machine Learning"
    }
  },
  socdiploma: {
    name: "Cybersecurity porgram Soc",
    description: "This program offers a comprehensive dive into the world of cybersecurity, blending technical skills with practical application. Participants will cover core topics like networking, security concepts, and Linux fundamentals. A key focus is on network and web penetration testing, where participants will engage in activities like information gathering, scanning, exploitation, and post-exploitation.",
    image: "img/cbs.png",
    duration: "150 Hours",
    price: "EGP 6,500",
    studyType: "Offline & Online",
    startDate: "25 July 2025",
    trainer: {
      name: "mohamed abdou rashad",
      image: "img/mohamerashad.jpg",
      bio: "Cybersecurity Expert with 8 years experience"
    }
  }
};
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
    emailjs.init('8MaeV7KdZlgEJTvNkMRYJ');
    
    const loginBtn = document.getElementById('loginBtn');
    const submitBtn = document.getElementById('submitBtn');
    const loginForm = document.getElementById('loginForm');
    
    const savedUser = localStorage.getItem('userData');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      updateUI(userData);
    }
    
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
          imageUrl: ''
        };
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
const trainers = [
  {
    id: 1,
    name: " mohamed abdou",
    course: " Digital Marketing",
    image: "../img/mohamerashad.jpg",
    bio: "developer",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
    }
  },
  {
    id: 2,
    name: " mohamed abdou",
    course: " Digital Marketing",
    image: "../img/mohamerashad.jpg",
    bio: "developer",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
    }
  },
  {
    id: 3,
    name: " mohamed abdou",
    course: " Digital Marketing",
    image: "../img/mohamerashad.jpg",
    bio: "developer",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
    }
  },
  {
    id: 4,
    name: " mohamed abdou",
    course: " Digital Marketing",
    image: "../img/mohamerashad.jpg",
    bio: "developer",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
      
    }
  }
  ,
  {
    id: 5,
    name: " mohamed abdou",
    course: " Digital Marketing",
    image: "../img/mohamerashad.jpg",
    bio: "developer",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
      
    }
  }
  ,
  {
    id: 6,
    name: " mohamed abdou",
    course: " Digital Marketing",
    image: "../img/mohamerashad.jpg",
    bio: "developer",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      website: "#"
      
    }
  }
];


document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('trainersContainer');
  const itemsPerSlide = window.innerWidth >= 992 ? 4 : 2;
  const totalSlides = Math.ceil(trainers.length / itemsPerSlide);
  for (let i = 0; i < totalSlides; i++) {
    const item = document.createElement('div');
    item.className = `carousel-item ${i === 0 ? 'active' : ''}`;
    
    const row = document.createElement('div');
    row.className = 'row justify-content-center';
    
    const startIndex = i * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    
    trainers.slice(startIndex, endIndex).forEach(trainer => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-3 mb-4';
      col.innerHTML = `
        <div class="card h-100 trainer-card">
          <div class="card-img-top overflow-hidden">
            <img src="${trainer.image}" class="w-100 h-100 object-fit-cover" alt="${trainer.name}">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">${trainer.name}</h5>
            <p class="text-primary mb-3">${trainer.course}</p>
            <button class="btn btn-outline-primary details-btn" data-id="${trainer.id}">
              <i class="fas fa-info-circle me-2"></i> View Details
            </button>
          </div>
        </div>
      `;
      row.appendChild(col);
    });
    
    item.appendChild(row);
    container.appendChild(item);
  }

  document.addEventListener('click', function(e) {
    if (e.target.closest('.details-btn')) {
      const btn = e.target.closest('.details-btn');
      const trainerId = parseInt(btn.getAttribute('data-id'));
      showTrainerDetails(trainerId);
    }
  });
});

function showTrainerDetails(id) {
  const trainer = trainers.find(t => t.id === id);
  if (!trainer) return;
  
  document.getElementById('trainerModalTitle').textContent = trainer.name;
  document.getElementById('trainerModalBody').innerHTML = `
    <div class="row">
      <div class="col-md-4 text-center">
        <img src="${trainer.image}" class="img-fluid rounded-circle mb-3 border border-3 border-primary" style="width: 200px; height: 200px; object-fit: cover;" alt="${trainer.name}">
        <div class="d-flex justify-content-center gap-2 mb-4">
          <a href="${trainer.social.facebook}" class="btn btn-primary btn-sm rounded-circle" target="_blank"><i class="bi bi-facebook"></i></a>
          <a href="${trainer.social.twitter}" class="btn btn-info btn-sm rounded-circle text-white" target="_blank"><i class="bi bi-twitter-x"></i></a>
          <a href="${trainer.social.linkedin}" class="btn btn-primary btn-sm rounded-circle" target="_blank"><i class="bi bi-linkedin"></i></a>
          <a href="${trainer.social.website}" class="btn btn-success btn-sm rounded-circle" target="_blank"><i class="bi bi-globe"></i></a>
        </div>
      </div>
      <div class="col-md-8">
        <h4 class="text-primary">${trainer.course}</h4>
        <p class="lead">${trainer.bio}</p>
        <div class="bg-light p-3 rounded">
          <h5 class="fw-bold">Available Courses:</h5>
          <ul class="list-unstyled">
            <li><i class="fas fa-check text-success me-2"></i> ${trainer.course} - Beginner Level</li>
            <li><i class="fas fa-check text-success me-2"></i> ${trainer.course} - Advanced Level</li>
            <li><i class="fas fa-check text-success me-2"></i> Practical Workshop</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  
  const modal = new bootstrap.Modal(document.getElementById('trainerModal'));
  modal.show();
}
function showDiplomaDetails(diplomaId) {

  const diploma = diplomas[diplomaId];
  if (!diploma) {
    console.error('Diploma not found:', diplomaId);
    return;
  }

  document.getElementById('diplomaModalTitle').textContent = diploma.name;
  document.getElementById('diplomaModalName').textContent = diploma.name;
  document.getElementById('diplomaModalImage').src = diploma.image;
  document.getElementById('diplomaModalDescription').textContent = diploma.description;
  document.getElementById('diplomaModalDuration').textContent = diploma.duration;
  document.getElementById('diplomaModalPrice').textContent = diploma.price;
  document.getElementById('diplomaModalStudyType').textContent = diploma.studyType;
  document.getElementById('diplomaModalStartDate').textContent = diploma.startDate;

  
  document.getElementById('diplomaModalTrainerImage').src = diploma.trainer.image;
  document.getElementById('diplomaModalTrainerName').textContent = diploma.trainer.name;
  document.getElementById('diplomaModalTrainerBio').textContent = diploma.trainer.bio;

  
  const modal = new bootstrap.Modal(document.getElementById('diplomaModal'));
  modal.show();
}


document.addEventListener('click', function(e) {
  if(e.target.closest('.cardLink')) {
    e.preventDefault();
    const link = e.target.closest('.cardLink');
    const pathParts = link.getAttribute('href').split('/');
    const diplomaId = pathParts[pathParts.length - 1];
    showDiplomaDetails(diplomaId);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('backgroundAudio');
  const audioBtn = document.getElementById('audioControl');

  function tryAutoPlay() {
      audio.volume = 1; 
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
          playPromise.catch(error => {

              audioBtn.classList.add('muted');
          });
      }
  }

  audioBtn.addEventListener('click', function() {
      if (audio.paused) {
          audio.play();
          audioBtn.classList.remove('muted');
      } else {
          audio.pause();
          audioBtn.classList.add('muted');
      }
  });
  

  tryAutoPlay();
  
  const muteIcon = document.createElement('i');
  muteIcon.className = 'bi bi-volume-mute';
  audioBtn.appendChild(muteIcon);
});

function showLoading() {
  document.getElementById('loadingSection').style.display = 'flex';
}

function hideLoading() {
  const loading = document.getElementById('loadingSection');
  loading.style.opacity = '0';
  setTimeout(() => {
      loading.style.display = 'none';
  }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
  showLoading();

  setTimeout(hideLoading, 1000);
  
});
function updateUI(userData) {
  const userContainer = document.getElementById('userContainer');
  
  if (userData) {
      userContainer.innerHTML = `
          <div class="dropdown">
              <button class="btn btn-transparent dropdown-toggle text-white" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  ${userData.imageUrl ? 
                      `<img src="${userData.imageUrl}" class="user-avatar rounded-circle me-2" width="30" height="30">` : 
                      `<i class="bi bi-person-circle me-2"></i>`}
                  ${userData.name}
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><a class="dropdown-item" href="#" id="logoutBtn">Logout <i class="bi bi-box-arrow-right ms-2"></i></a></li>
              </ul>
          </div>
      `;

      document.getElementById('logoutBtn').addEventListener('click', function(e) {
          e.preventDefault();
          localStorage.removeItem('userData');
          location.reload();
      });
  } else {
      userContainer.innerHTML = `
          <button class="btn btn-primary" id="loginBtn" data-bs-toggle="modal" data-bs-target="#loginModal">
              Log in <i class="bi bi-box-arrow-in-right"></i>
          </button>
      `;
  }
}

function saveUserData(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
  
  updateUI(userData);
  
  sendEmail(userData);
  
  const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
  modal.hide();
}

document.addEventListener('DOMContentLoaded', function() {
  emailjs.init('8MaeV7KdZlgEJTvNkMRYJ');
  
  const savedUser = localStorage.getItem('userData');
  if (savedUser) {
      updateUI(JSON.parse(savedUser));
  }

});
document.getElementById("google-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = this.email.value;
  const formData = new FormData();
  formData.append("entry.1587113359", email);

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSemzDqu0xRfkcQmIyji5XW9_6cQymZQOxI2eRCM4Dba9Fga6g/formResponse", {
      method: "POST",
      mode: "no-cors",
      body: formData
  }).then(() => {
      alert("Thank you for your submission!");
      this.reset();
  }).catch(() => {
      alert("There was an error submitting your form. Please try again.");
  });
});
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

document.getElementById('imageUpload').addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('profileImage').src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', function() {
        console.log('Navigating to course...');
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

document.getElementById('enrollmentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const successAlert = document.createElement('div');
  successAlert.className = 'alert alert-success mt-3';
  successAlert.innerHTML = `
      <i class="bi bi-check-circle-fill me-2"></i>
      Thank you for your enrollment! We've sent confirmation details to your email.
  `;
  
  this.appendChild(successAlert);
  
  setTimeout(() => {
      successAlert.remove();
      this.reset();
      bootstrap.Modal.getInstance(document.getElementById('enrollModal')).hide();
  }, 3000);
});