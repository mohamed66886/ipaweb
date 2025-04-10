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
          alert('حدث خطأ أثناء إرسال البيانات، لكن تم حفظها محلياً.');
        });
    }
  });