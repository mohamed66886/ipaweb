const sampleTestimonials = [
    {
        id: 1,
        authorName: "Mohamed Ahmed",
        authorRole: "Flutter Developer",
        authorCompany: "Tech Solutions Inc.",
        testimonialText: "The Flutter course at IPA Academy transformed my career. The instructors were knowledgeable and the hands-on projects were extremely helpful.",
        rating: 5,
        status: "approved",
        date: "2024-03-15",
        photo: "../img/testimonial1.jpg"
    },
    {
        id: 2,
        authorName: "Hana Mahmoud",
        authorRole: "Frontend Developer",
        authorCompany: "WebCraft",
        testimonialText: "Excellent learning experience! The React course gave me the skills I needed to land my dream job.",
        rating: 4,
        status: "approved",
        date: "2024-02-28",
        photo: "../img/testimonial2.jpg"
    },
    {
        id: 3,
        authorName: "Youssef Ali",
        authorRole: "Backend Engineer",
        authorCompany: "DataSystems",
        testimonialText: "The .NET course was comprehensive and well-structured. I highly recommend IPA Academy for anyone looking to enhance their backend skills.",
        rating: 5,
        status: "approved",
        date: "2024-01-10",
        photo: "../img/testimonial3.jpg"
    },
    {
        id: 4,
        authorName: "Nada Samir",
        authorRole: "Data Analyst",
        authorCompany: "Analytics Pro",
        testimonialText: "The Data Analysis course provided practical knowledge that I could immediately apply to my work. Great instructors and resources!",
        rating: 4,
        status: "pending",
        date: "2024-04-05",
        photo: "../img/testimonial4.jpg"
    },
    {
        id: 5,
        authorName: "Karim Hassan",
        authorRole: "Cybersecurity Specialist",
        authorCompany: "SecureNet",
        testimonialText: "The cybersecurity fundamentals course exceeded my expectations. The real-world scenarios were particularly valuable.",
        rating: 5,
        status: "approved",
        date: "2023-12-20",
        photo: "../img/testimonial5.jpg"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const bootstrap = window.bootstrap;
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

    function loadTestimonials(testimonials = sampleTestimonials) {
        const tableBody = document.getElementById("testimonialsTableBody");
        tableBody.innerHTML = "";

        testimonials.forEach((testimonial, index) => {
            const row = document.createElement("tr");
            row.id = `testimonial-${testimonial.id}`;
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${testimonial.photo || "/placeholder.svg?height=40&width=40"}" alt="${testimonial.authorName}" class="author-photo rounded-circle me-2">
                        ${testimonial.authorName}
                    </div>
                </td>
                <td>${testimonial.authorRole}${testimonial.authorCompany ? `<br><small class="text-muted">${testimonial.authorCompany}</small>` : ''}</td>
                <td>${testimonial.testimonialText.length > 100 ? testimonial.testimonialText.substring(0, 100) + "..." : testimonial.testimonialText}</td>
                <td>${getRatingStars(testimonial.rating)}</td>
                <td><span class="badge bg-${testimonial.status === 'approved' ? 'success' : 'warning'}">${testimonial.status === 'approved' ? 'Approved' : 'Pending'}</span></td>
                <td>
                    <button class="btn action-btn edit-btn" onclick="editTestimonial(${testimonial.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Testimonial">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn action-btn delete-btn" onclick="showTestimonialDeleteConfirm(${testimonial.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Testimonial">
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

    function getRatingStars(rating) {
        const fullStar = '<i class="bi bi-star-fill text-warning"></i>';
        const halfStar = '<i class="bi bi-star-half text-warning"></i>';
        const emptyStar = '<i class="bi bi-star text-warning"></i>';
        
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += fullStar;
            } else if (i - 0.5 <= rating) {
                stars += halfStar;
            } else {
                stars += emptyStar;
            }
        }
        return stars;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Initial load
    loadTestimonials();

    // Search functionality
    const testimonialSearch = document.getElementById("testimonialSearch");
    if (testimonialSearch) {
        testimonialSearch.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();
            const filteredTestimonials = sampleTestimonials.filter(
                testimonial => testimonial.authorName.toLowerCase().includes(searchTerm) || 
                         testimonial.testimonialText.toLowerCase().includes(searchTerm) ||
                         (testimonial.authorCompany && testimonial.authorCompany.toLowerCase().includes(searchTerm))
            );

            this.classList.add("edit-mode-highlight");
            setTimeout(() => this.classList.remove("edit-mode-highlight"), 800);

            loadTestimonials(filteredTestimonials);
        });
    }

    // Filter functionality
    const filterLinks = document.querySelectorAll("[data-filter]");
    filterLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const filter = this.getAttribute("data-filter");
            let filteredTestimonials = [...sampleTestimonials];

            if (filter === "approved") {
                filteredTestimonials = sampleTestimonials.filter(testimonial => testimonial.status === "approved");
            } else if (filter === "pending") {
                filteredTestimonials = sampleTestimonials.filter(testimonial => testimonial.status === "pending");
            }

            const dropdownButton = document.getElementById("filterDropdown");
            dropdownButton.classList.add("pulse-animation");
            setTimeout(() => dropdownButton.classList.remove("pulse-animation"), 1500);

            dropdownButton.innerHTML = `<i class="bi bi-funnel me-1"></i> ${this.textContent.trim()}`;

            loadTestimonials(filteredTestimonials);
        });
    });

    // Author photo preview
    const authorPhoto = document.getElementById("authorPhoto");
    const photoPreview = document.getElementById("photoPreview");
    const photoPreviewContainer = document.getElementById("photoPreviewContainer");

    authorPhoto.addEventListener("change", () => {
        if (authorPhoto.files && authorPhoto.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                photoPreview.src = e.target.result;
                photoPreviewContainer.classList.remove("d-none");

                photoPreview.classList.add("image-preview-animation");
                setTimeout(() => {
                    photoPreview.classList.remove("image-preview-animation");
                }, 500);
            };

            reader.readAsDataURL(authorPhoto.files[0]);
        }
    });

    const previewPhotoBtn = document.getElementById("previewPhotoBtn");
    if (previewPhotoBtn) {
        previewPhotoBtn.addEventListener("click", () => {
            if (authorPhoto.files && authorPhoto.files[0]) {
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

    // Save testimonial
    const saveTestimonialBtn = document.getElementById("saveTestimonialBtn");
    saveTestimonialBtn.addEventListener("click", () => {
        const testimonialForm = document.getElementById("testimonialForm");

        if (testimonialForm.checkValidity()) {
            const testimonialId = document.getElementById("testimonialId").value;
            const authorName = document.getElementById("authorName").value;
            const authorRole = document.getElementById("authorRole").value;
            const authorCompany = document.getElementById("authorCompany").value;
            const testimonialRating = document.getElementById("testimonialRating").value;
            const testimonialText = document.getElementById("testimonialText").value;
            const testimonialStatus = document.getElementById("testimonialStatus").value;
            const testimonialDate = document.getElementById("testimonialDate").value;
            
            let authorPhotoUrl = "../img/placeholder.jpg";
            if (authorPhoto.files && authorPhoto.files[0] && photoPreview.src) {
                authorPhotoUrl = photoPreview.src;
            } else if (photoPreview.src && !photoPreview.src.includes("placeholder")) {
                authorPhotoUrl = photoPreview.src;
            }

            saveTestimonialBtn.classList.add("btn-success");
            saveTestimonialBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Saved Successfully!';

            createConfetti();

            setTimeout(() => {
                if (testimonialId) {
                    // Update existing testimonial
                    const index = sampleTestimonials.findIndex(testimonial => testimonial.id == testimonialId);
                    if (index !== -1) {
                        sampleTestimonials[index] = {
                            ...sampleTestimonials[index],
                            authorName: authorName,
                            authorRole: authorRole,
                            authorCompany: authorCompany,
                            rating: Number.parseInt(testimonialRating),
                            testimonialText: testimonialText,
                            status: testimonialStatus,
                            date: testimonialDate,
                            photo: authorPhotoUrl
                        };

                        const row = document.getElementById(`testimonial-${testimonialId}`);
                        if (row) {
                            row.classList.add("update-row");
                        }
                    }
                } else {
                    // Add new testimonial
                    const newId = Math.max(...sampleTestimonials.map(testimonial => testimonial.id)) + 1;
                    sampleTestimonials.push({
                        id: newId,
                        authorName: authorName,
                        authorRole: authorRole,
                        authorCompany: authorCompany,
                        rating: Number.parseInt(testimonialRating),
                        testimonialText: testimonialText,
                        status: testimonialStatus,
                        date: testimonialDate,
                        photo: authorPhotoUrl
                    });
                }

                saveTestimonialBtn.classList.remove("btn-success");
                saveTestimonialBtn.innerHTML = "Save Testimonial";

                loadTestimonials();
                const modal = bootstrap.Modal.getInstance(document.getElementById("testimonialModal"));
                modal.hide();

                showToast(testimonialId ? "Testimonial updated successfully!" : "Testimonial added successfully!", "success");
            }, 1500);
        } else {
            // Form is invalid
            const invalidFields = testimonialForm.querySelectorAll(":invalid");
            invalidFields.forEach(field => {
                field.classList.add("shake-animation");
                setTimeout(() => field.classList.remove("shake-animation"), 600);
            });

            testimonialForm.reportValidity();
        }
    });

    // Delete testimonial confirmation
    const confirmTestimonialDeleteBtn = document.getElementById("confirmTestimonialDeleteBtn");
    confirmTestimonialDeleteBtn.addEventListener("click", () => {
        const testimonialId = document.getElementById("deleteTestimonialItemId").value;

        const index = sampleTestimonials.findIndex(testimonial => testimonial.id == testimonialId);

        if (index !== -1) {
            const row = document.getElementById(`testimonial-${testimonialId}`);
            if (row) {
                row.classList.add("delete-row");

                setTimeout(() => {
                    sampleTestimonials.splice(index, 1);
                    loadTestimonials();
                    const modal = bootstrap.Modal.getInstance(document.getElementById("deleteTestimonialConfirmModal"));
                    modal.hide();

                    showToast("Testimonial deleted successfully!", "danger");
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
window.addNewTestimonial = () => {
    const testimonialForm = document.getElementById("testimonialForm");
    testimonialForm.reset();
    document.getElementById("testimonialId").value = "";
    document.getElementById("photoPreviewContainer").classList.add("d-none");
    document.getElementById("testimonialDate").value = new Date().toISOString().split('T')[0];

    const modalTitle = document.getElementById("testimonialModalLabel");
    modalTitle.textContent = "Add New Testimonial";
    modalTitle.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Add New Testimonial';

    modalTitle.classList.add("text-animation");
    setTimeout(() => modalTitle.classList.remove("text-animation"), 1000);

    const modal = new bootstrap.Modal(document.getElementById("testimonialModal"));
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

window.editTestimonial = (testimonialId) => {
    const testimonial = sampleTestimonials.find(t => t.id === testimonialId);

    if (testimonial) {
        document.getElementById("testimonialForm").reset();

        const modalTitle = document.getElementById("testimonialModalLabel");
        modalTitle.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit Testimonial';

        modalTitle.classList.add("text-animation");
        setTimeout(() => modalTitle.classList.remove("text-animation"), 1000);

        const modal = new bootstrap.Modal(document.getElementById("testimonialModal"));
        modal.show();

        setTimeout(() => {
            const fields = [
                { id: "testimonialId", value: testimonial.id },
                { id: "authorName", value: testimonial.authorName },
                { id: "authorRole", value: testimonial.authorRole },
                { id: "authorCompany", value: testimonial.authorCompany },
                { id: "testimonialRating", value: testimonial.rating },
                { id: "testimonialText", value: testimonial.testimonialText },
                { id: "testimonialStatus", value: testimonial.status },
                { id: "testimonialDate", value: testimonial.date },
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
                if (testimonial.photo) {
                    document.getElementById("photoPreview").src = testimonial.photo;
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

window.showTestimonialDeleteConfirm = (testimonialId) => {
    const testimonial = sampleTestimonials.find(t => t.id === testimonialId);

    if (testimonial) {
        document.getElementById("deleteTestimonialItemId").value = testimonialId;

        const modalBody = document.querySelector("#deleteTestimonialConfirmModal .modal-body p.fs-5");
        modalBody.innerHTML = `Are you sure you want to delete testimonial from <strong>"${testimonial.authorName}"</strong>?`;

        const modal = new bootstrap.Modal(document.getElementById("deleteTestimonialConfirmModal"));
        modal.show();

        setTimeout(() => {
            const warningIcon = document.querySelector("#deleteTestimonialConfirmModal .bi-exclamation-triangle-fill");
            warningIcon.classList.add("shake-animation");
            setTimeout(() => {
                warningIcon.classList.remove("shake-animation");
            }, 600);
        }, 300);
    }
};