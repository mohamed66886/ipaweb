document.getElementById('passwordResetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    document.getElementById('resetForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    

});
const passwordInput = document.getElementById('password');
const strengthMeter = document.getElementById('strength-meter');

passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    
    const width = strength * 20;
    strengthMeter.style.width = width + '%';
    
    if (strength <= 2) {
        strengthMeter.style.backgroundColor = '#e74c3c';
    } else if (strength <= 4) {
        strengthMeter.style.backgroundColor = '#f39c12';
    } else {
        strengthMeter.style.backgroundColor = '#2ecc71';
    }
});