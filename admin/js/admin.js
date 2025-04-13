document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const wrapper = document.getElementById('wrapper');
    
    sidebarToggle.addEventListener('click', function() {
        wrapper.classList.toggle('toggled');
    });
    
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    const saveCourseBtn = document.getElementById('saveCourseBtn');
    if (saveCourseBtn) {
        saveCourseBtn.addEventListener('click', function() {
            const courseForm = document.getElementById('courseForm');
            if (courseForm.checkValidity()) {
                alert('Course saved successfully!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('addCourseModal'));
                modal.hide();
            } else {
                courseForm.reportValidity();
            }
        });
    }
    
    setTimeout(() => {
        console.log('Dashboard data loaded');
    }, 1000);
    
    const logoutBtn = document.querySelector('.dropdown-item[href="index.html"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    window.addNewCourse = function() {
        const modal = new bootstrap.Modal(document.getElementById('addCourseModal'));
        modal.show();
    };
    
    window.editCourse = function(courseId) {
        const modal = new bootstrap.Modal(document.getElementById('addCourseModal'));
        document.getElementById('addCourseModalLabel').textContent = 'Edit Course';
        document.getElementById('courseName').value = 'Sample Course ' + courseId;
        modal.show();
    };
    
    window.deleteCourse = function(courseId) {
        if (confirm('Are you sure you want to delete this course?')) {
            alert('Course deleted successfully!');
        }
    };
});