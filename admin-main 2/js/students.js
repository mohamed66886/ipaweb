const sampleStudents = [
    {
        id: 1,
        name: "Ahmed Mohamed",
        studentId: "STU-2023-001",
        email: "ahmed.mohamed@example.com",
        phone: "+201234567890",
        course: "1",
        joinDate: "2023-01-15",
        status: "active",
        gender: "male",
        address: "123 Main St, Cairo, Egypt",
        photo: "../img/student1.jpg"
    },
    {
        id: 2,
        name: "Mona Ali",
        studentId: "STU-2023-002",
        email: "mona.ali@example.com",
        phone: "+201112223344",
        course: "3",
        joinDate: "2023-02-20",
        status: "active",
        gender: "female",
        address: "456 Garden Ave, Alexandria, Egypt",
        photo: "../img/student2.jpg"
    },
    {
        id: 3,
        name: "Omar Hassan",
        studentId: "STU-2023-003",
        email: "omar.hassan@example.com",
        phone: "+201009988776",
        course: "2",
        joinDate: "2023-03-10",
        status: "graduated",
        gender: "male",
        address: "789 Nile St, Giza, Egypt",
        photo: "../img/student3.jpg"
    },
    {
        id: 4,
        name: "Yara Mahmoud",
        studentId: "STU-2023-004",
        email: "yara.mahmoud@example.com",
        phone: "+201887766554",
        course: "4",
        joinDate: "2023-04-05",
        status: "active",
        gender: "female",
        address: "321 Palm Rd, Luxor, Egypt",
        photo: "../img/student4.jpg"
    },
    {
        id: 5,
        name: "Karim Adel",
        studentId: "STU-2023-005",
        email: "karim.adel@example.com",
        phone: "+201776655443",
        course: "5",
        joinDate: "2023-05-12",
        status: "inactive",
        gender: "male",
        address: "654 Desert Blvd, Aswan, Egypt",
        photo: "../img/student5.jpg"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const bootstrap = window.bootstrap;
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

    function loadStudents(students = sampleStudents) {
        const tableBody = document.getElementById("studentsTableBody");
        tableBody.innerHTML = "";

        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.id = `student-${student.id}`;
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${student.photo || "/placeholder.svg?height=60&width=60"}" alt="${student.name}" class="student-photo rounded-circle" /></td>
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${getCourseName(student.course)}</td>
                <td>${formatDate(student.joinDate)}</td>
                <td><span class="badge bg-${getStatusColor(student.status)}">${getStatusText(student.status)}</span></td>
                <td>
                    <button class="btn action-btn edit-btn" onclick="editStudent(${student.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Student">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn action-btn delete-btn" onclick="showStudentDeleteConfirm(${student.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Student">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);

            setTimeout(() => {
                row.classList.add("new-row");
            }, index * 100);
        });

        // Reinitialize tooltips for new elements
        const newTooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        newTooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    function getCourseName(courseId) {
        const courses = {
            "1": "Flutter Development",
            "2": "Backend (.NET)",
            "3": "Frontend (React)",
            "4": "Data Analysis",
            "5": "Cybersecurity"
        };
        return courses[courseId] || "Unknown";
    }

    function getStatusColor(status) {
        const colors = {
            "active": "success",
            "inactive": "secondary",
            "graduated": "primary"
        };
        return colors[status] || "warning";
    }

    function getStatusText(status) {
        const texts = {
            "active": "Active",
            "inactive": "Inactive",
            "graduated": "Graduated"
        };
        return texts[status] || status;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Initial load
    loadStudents();

    // Search functionality
    const studentSearch = document.getElementById("studentSearch");
    if (studentSearch) {
        studentSearch.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();
            const filteredStudents = sampleStudents.filter(
                student => student.name.toLowerCase().includes(searchTerm) || 
                         student.studentId.toLowerCase().includes(searchTerm) ||
                         student.email.toLowerCase().includes(searchTerm)
            );

            this.classList.add("edit-mode-highlight");
            setTimeout(() => this.classList.remove("edit-mode-highlight"), 800);

            loadStudents(filteredStudents);
        });
    }

    // Filter functionality
    const filterLinks = document.querySelectorAll("[data-filter]");
    filterLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const filter = this.getAttribute("data-filter");
            let filteredStudents = [...sampleStudents];

            if (filter === "active") {
                filteredStudents = sampleStudents.filter(student => student.status === "active");
            } else if (filter === "inactive") {
                filteredStudents = sampleStudents.filter(student => student.status === "inactive");
            } else if (filter === "graduated") {
                filteredStudents = sampleStudents.filter(student => student.status === "graduated");
            }

            const dropdownButton = document.getElementById("filterDropdown");
            dropdownButton.classList.add("pulse-animation");
            setTimeout(() => dropdownButton.classList.remove("pulse-animation"), 1500);

            dropdownButton.innerHTML = `<i class="bi bi-funnel me-1"></i> ${this.textContent.trim()}`;

            loadStudents(filteredStudents);
        });
    });

    // Student photo preview
    const studentPhoto = document.getElementById("studentPhoto");
    const photoPreview = document.getElementById("photoPreview");
    const photoPreviewContainer = document.getElementById("photoPreviewContainer");

    studentPhoto.addEventListener("change", () => {
        if (studentPhoto.files && studentPhoto.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                photoPreview.src = e.target.result;
                photoPreviewContainer.classList.remove("d-none");

                photoPreview.classList.add("image-preview-animation");
                setTimeout(() => {
                    photoPreview.classList.remove("image-preview-animation");
                }, 500);
            };

            reader.readAsDataURL(studentPhoto.files[0]);
        }
    });

    const previewPhotoBtn = document.getElementById("previewPhotoBtn");
    if (previewPhotoBtn) {
        previewPhotoBtn.addEventListener("click", () => {
            if (studentPhoto.files && studentPhoto.files[0]) {
                // Already handled by change event
            } else if (photoPreview.src && !photoPreview.src.includes("placeholder")) {
                photoPreviewContainer.classList.remove("d-none");
                photoPreview.classList.add("image-preview-animation");
                setTimeout(() => {
                    photoPreview.classList.remove("image-preview-animation");
                }, 500);
            } else {
                photoPreview.src = "/placeholder.svg?height=200&width=200";
                photoPreviewContainer.classList.remove("d-none");

                showToast("Please select a photo first", "warning");
            }
        });
    }

    // Save student
    const saveStudentBtn = document.getElementById("saveStudentBtn");
    saveStudentBtn.addEventListener("click", () => {
        const studentForm = document.getElementById("studentForm");

        if (studentForm.checkValidity()) {
            const studentId = document.getElementById("studentId").value;
            const studentName = document.getElementById("studentName").value;
            const studentIdNumber = document.getElementById("studentIdNumber").value;
            const studentEmail = document.getElementById("studentEmail").value;
            const studentPhone = document.getElementById("studentPhone").value;
            const studentCourse = document.getElementById("studentCourse").value;
            const studentJoinDate = document.getElementById("studentJoinDate").value;
            const studentStatus = document.getElementById("studentStatus").value;
            const studentGender = document.getElementById("studentGender").value;
            const studentAddress = document.getElementById("studentAddress").value;
            
            let studentPhotoUrl = "../img/placeholder.jpg";
            if (studentPhoto.files && studentPhoto.files[0] && photoPreview.src) {
                studentPhotoUrl = photoPreview.src;
            } else if (photoPreview.src && !photoPreview.src.includes("placeholder")) {
                studentPhotoUrl = photoPreview.src;
            }

            saveStudentBtn.classList.add("btn-success");
            saveStudentBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Saved Successfully!';

            createConfetti();

            setTimeout(() => {
                if (studentId) {
                    // Update existing student
                    const index = sampleStudents.findIndex(student => student.id == studentId);
                    if (index !== -1) {
                        sampleStudents[index] = {
                            ...sampleStudents[index],
                            name: studentName,
                            studentId: studentIdNumber,
                            email: studentEmail,
                            phone: studentPhone,
                            course: studentCourse,
                            joinDate: studentJoinDate,
                            status: studentStatus,
                            gender: studentGender,
                            address: studentAddress,
                            photo: studentPhotoUrl
                        };

                        const row = document.getElementById(`student-${studentId}`);
                        if (row) {
                            row.classList.add("update-row");
                        }
                    }
                } else {
                    // Add new student
                    const newId = Math.max(...sampleStudents.map(student => student.id)) + 1;
                    sampleStudents.push({
                        id: newId,
                        name: studentName,
                        studentId: studentIdNumber,
                        email: studentEmail,
                        phone: studentPhone,
                        course: studentCourse,
                        joinDate: studentJoinDate,
                        status: studentStatus,
                        gender: studentGender,
                        address: studentAddress,
                        photo: studentPhotoUrl
                    });
                }

                saveStudentBtn.classList.remove("btn-success");
                saveStudentBtn.innerHTML = "Save Student";

                loadStudents();
                const modal = bootstrap.Modal.getInstance(document.getElementById("studentModal"));
                modal.hide();

                showToast(studentId ? "Student updated successfully!" : "Student added successfully!", "success");
            }, 1500);
        } else {
            // Form is invalid
            const invalidFields = studentForm.querySelectorAll(":invalid");
            invalidFields.forEach(field => {
                field.classList.add("shake-animation");
                setTimeout(() => field.classList.remove("shake-animation"), 600);
            });

            studentForm.reportValidity();
        }
    });

    // Delete student confirmation
    const confirmStudentDeleteBtn = document.getElementById("confirmStudentDeleteBtn");
    confirmStudentDeleteBtn.addEventListener("click", () => {
        const studentId = document.getElementById("deleteStudentItemId").value;

        const index = sampleStudents.findIndex(student => student.id == studentId);

        if (index !== -1) {
            const row = document.getElementById(`student-${studentId}`);
            if (row) {
                row.classList.add("delete-row");

                setTimeout(() => {
                    sampleStudents.splice(index, 1);
                    loadStudents();
                    const modal = bootstrap.Modal.getInstance(document.getElementById("deleteStudentConfirmModal"));
                    modal.hide();

                    showToast("Student deleted successfully!", "danger");
                }, 500);
            }
        }
    });

    // Helper functions
    function createConfetti() {
        const colors = ["#f39c12", "#e74c3c", "#3498db", "#2ecc71", "#9b59b6"];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + "px";
            confetti.style.height = Math.random() * 10 + 5 + "px";
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    function showToast(message, type = "success") {
        let toastContainer = document.querySelector(".toast-container");
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
            document.body.appendChild(toastContainer);
        }

        const toastId = `toast-${Date.now()}`;
        const toast = document.createElement("div");
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.id = toastId;
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "assertive");
        toast.setAttribute("aria-atomic", "true");

        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-${type === "success" ? "check-circle" : type === "warning" ? "exclamation-triangle" : "exclamation-circle"} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        toastContainer.appendChild(toast);

        const toastInstance = new bootstrap.Toast(toast, {
            animation: true,
            autohide: true,
            delay: 3000,
        });

        toast.style.transform = "translateY(20px)";
        toast.style.opacity = "0";
        toast.style.transition = "all 0.3s ease";

        toastInstance.show();

        setTimeout(() => {
            toast.style.transform = "translateY(0)";
            toast.style.opacity = "1";
        }, 50);

        toast.addEventListener("hidden.bs.toast", () => {
            toast.remove();
        });
    }
});

// Global functions
window.addNewStudent = () => {
    const studentForm = document.getElementById("studentForm");
    studentForm.reset();
    document.getElementById("studentId").value = "";
    document.getElementById("photoPreviewContainer").classList.add("d-none");

    const modalTitle = document.getElementById("studentModalLabel");
    modalTitle.textContent = "Add New Student";
    modalTitle.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Add New Student';

    modalTitle.classList.add("text-animation");
    setTimeout(() => modalTitle.classList.remove("text-animation"), 1000);

    const modal = new bootstrap.Modal(document.getElementById("studentModal"));
    modal.show();

    setTimeout(() => {
        const formFields = document.querySelectorAll(".form-control, .form-select");
        formFields.forEach((field, index) => {
            setTimeout(() => {
                field.classList.add("form-field-animation");
                setTimeout(() => {
                    field.classList.remove("form-field-animation");
                }, 500);
            }, index * 100);
        });
    }, 300);
};

window.editStudent = (studentId) => {
    const student = sampleStudents.find(s => s.id === studentId);

    if (student) {
        document.getElementById("studentForm").reset();

        const modalTitle = document.getElementById("studentModalLabel");
        modalTitle.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit Student';

        modalTitle.classList.add("text-animation");
        setTimeout(() => modalTitle.classList.remove("text-animation"), 1000);

        const modal = new bootstrap.Modal(document.getElementById("studentModal"));
        modal.show();

        setTimeout(() => {
            const fields = [
                { id: "studentId", value: student.id },
                { id: "studentName", value: student.name },
                { id: "studentIdNumber", value: student.studentId },
                { id: "studentEmail", value: student.email },
                { id: "studentPhone", value: student.phone },
                { id: "studentCourse", value: student.course },
                { id: "studentJoinDate", value: student.joinDate },
                { id: "studentStatus", value: student.status },
                { id: "studentGender", value: student.gender },
                { id: "studentAddress", value: student.address },
            ];

            fields.forEach((field, index) => {
                setTimeout(() => {
                    const element = document.getElementById(field.id);
                    element.value = field.value;
                    element.classList.add("edit-mode-highlight");
                    setTimeout(() => element.classList.remove("edit-mode-highlight"), 800);
                }, index * 100);
            });

            setTimeout(() => {
                if (student.photo) {
                    document.getElementById("photoPreview").src = student.photo;
                    document.getElementById("photoPreviewContainer").classList.remove("d-none");
                    document.getElementById("photoPreview").classList.add("image-preview-animation");
                    setTimeout(() => {
                        document.getElementById("photoPreview").classList.remove("image-preview-animation");
                    }, 500);
                }
            }, fields.length * 100);
        }, 300);
    }
};

window.showStudentDeleteConfirm = (studentId) => {
    const student = sampleStudents.find(s => s.id === studentId);

    if (student) {
        document.getElementById("deleteStudentItemId").value = studentId;

        const modalBody = document.querySelector("#deleteStudentConfirmModal .modal-body p.fs-5");
        modalBody.innerHTML = `Are you sure you want to delete <strong>"${student.name}"</strong>?`;

        const modal = new bootstrap.Modal(document.getElementById("deleteStudentConfirmModal"));
        modal.show();

        setTimeout(() => {
            const warningIcon = document.querySelector("#deleteStudentConfirmModal .bi-exclamation-triangle-fill");
            warningIcon.classList.add("shake-animation");
            setTimeout(() => {
                warningIcon.classList.remove("shake-animation");
            }, 600);
        }, 300);
    }
};