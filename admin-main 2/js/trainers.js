const sampleTrainers = [
    {
        id: 1,
        name: "Mohamed Abdou",
        email: "mohamed.abdou@ipaacademy.com",
        phone: "+201234567890",
        specialization: "Flutter Development",
        experience: 5,
        status: "active",
        bio: "Senior Flutter developer with extensive experience in building cross-platform mobile applications.",
        photo: "../img/trainer1.jpg"
    },
    {
        id: 2,
        name: "Ahmed Naeim",
        email: "ahmed.naeim@ipaacademy.com",
        phone: "+201112223344",
        specialization: "Backend Development (.NET)",
        experience: 7,
        status: "active",
        bio: "Backend specialist with deep knowledge of .NET Core and cloud architectures.",
        photo: "../img/trainer2.jpg"
    },
    {
        id: 3,
        name: "Hana Mohamed",
        email: "hana.mohamed@ipaacademy.com",
        phone: "+201001122334",
        specialization: "Frontend Development (React)",
        experience: 4,
        status: "active",
        bio: "Frontend expert focusing on React, Redux and modern JavaScript frameworks.",
        photo: "../img/trainer3.jpg"
    },
    {
        id: 4,
        name: "Yara Elnagar",
        email: "yara.elnagar@ipaacademy.com",
        phone: "+201998877665",
        specialization: "Data Analysis",
        experience: 6,
        status: "active",
        bio: "Data scientist with expertise in Python, Pandas and machine learning.",
        photo: "../img/trainer4.jpg"
    },
    {
        id: 5,
        name: "Omar Hassan",
        email: "omar.hassan@ipaacademy.com",
        phone: "+201887766554",
        specialization: "Cybersecurity",
        experience: 8,
        status: "inactive",
        bio: "Cybersecurity consultant with certifications in ethical hacking and penetration testing.",
        photo: "../img/trainer5.jpg"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const bootstrap = window.bootstrap;
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

    function loadTrainers(trainers = sampleTrainers) {
        const tableBody = document.getElementById("trainersTableBody");
        tableBody.innerHTML = "";

        trainers.forEach((trainer, index) => {
            const row = document.createElement("tr");
            row.id = `trainer-${trainer.id}`;
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${trainer.photo || "/placeholder.svg?height=60&width=60"}" alt="${trainer.name}" class="trainer-photo rounded-circle" /></td>
                <td>${trainer.name}</td>
                <td>${trainer.specialization}</td>
                <td>${trainer.email}</td>
                <td><span class="badge bg-${trainer.status === 'active' ? 'success' : 'secondary'}">${trainer.status === 'active' ? 'Active' : 'Inactive'}</span></td>
                <td>
                    <button class="btn action-btn edit-btn" onclick="editTrainer(${trainer.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Trainer">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn action-btn delete-btn" onclick="showTrainerDeleteConfirm(${trainer.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Trainer">
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

    // Initial load
    loadTrainers();

    // Search functionality
    const trainerSearch = document.getElementById("trainerSearch");
    if (trainerSearch) {
        trainerSearch.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();
            const filteredTrainers = sampleTrainers.filter(
                trainer => trainer.name.toLowerCase().includes(searchTerm) || 
                         trainer.specialization.toLowerCase().includes(searchTerm) ||
                         trainer.email.toLowerCase().includes(searchTerm)
            );

            this.classList.add("edit-mode-highlight");
            setTimeout(() => this.classList.remove("edit-mode-highlight"), 800);

            loadTrainers(filteredTrainers);
        });
    }

    // Filter functionality
    const filterLinks = document.querySelectorAll("[data-filter]");
    filterLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const filter = this.getAttribute("data-filter");
            let filteredTrainers = [...sampleTrainers];

            if (filter === "active") {
                filteredTrainers = sampleTrainers.filter(trainer => trainer.status === "active");
            } else if (filter === "inactive") {
                filteredTrainers = sampleTrainers.filter(trainer => trainer.status === "inactive");
            }

            const dropdownButton = document.getElementById("filterDropdown");
            dropdownButton.classList.add("pulse-animation");
            setTimeout(() => dropdownButton.classList.remove("pulse-animation"), 1500);

            dropdownButton.innerHTML = `<i class="bi bi-funnel me-1"></i> ${this.textContent.trim()}`;

            loadTrainers(filteredTrainers);
        });
    });

    // Trainer photo preview
    const trainerPhoto = document.getElementById("trainerPhoto");
    const photoPreview = document.getElementById("photoPreview");
    const photoPreviewContainer = document.getElementById("photoPreviewContainer");

    trainerPhoto.addEventListener("change", () => {
        if (trainerPhoto.files && trainerPhoto.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                photoPreview.src = e.target.result;
                photoPreviewContainer.classList.remove("d-none");

                photoPreview.classList.add("image-preview-animation");
                setTimeout(() => {
                    photoPreview.classList.remove("image-preview-animation");
                }, 500);
            };

            reader.readAsDataURL(trainerPhoto.files[0]);
        }
    });

    const previewPhotoBtn = document.getElementById("previewPhotoBtn");
    if (previewPhotoBtn) {
        previewPhotoBtn.addEventListener("click", () => {
            if (trainerPhoto.files && trainerPhoto.files[0]) {
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

    // Save trainer
    const saveTrainerBtn = document.getElementById("saveTrainerBtn");
    saveTrainerBtn.addEventListener("click", () => {
        const trainerForm = document.getElementById("trainerForm");

        if (trainerForm.checkValidity()) {
            const trainerId = document.getElementById("trainerId").value;
            const trainerName = document.getElementById("trainerName").value;
            const trainerEmail = document.getElementById("trainerEmail").value;
            const trainerPhone = document.getElementById("trainerPhone").value;
            const trainerSpecialization = document.getElementById("trainerSpecialization").value;
            const trainerExperience = document.getElementById("trainerExperience").value;
            const trainerStatus = document.getElementById("trainerStatus").value;
            const trainerBio = document.getElementById("trainerBio").value;
            
            let trainerPhotoUrl = "../img/placeholder.jpg";
            if (trainerPhoto.files && trainerPhoto.files[0] && photoPreview.src) {
                trainerPhotoUrl = photoPreview.src;
            } else if (photoPreview.src && !photoPreview.src.includes("placeholder")) {
                trainerPhotoUrl = photoPreview.src;
            }

            saveTrainerBtn.classList.add("btn-success");
            saveTrainerBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Saved Successfully!';

            createConfetti();

            setTimeout(() => {
                if (trainerId) {
                    // Update existing trainer
                    const index = sampleTrainers.findIndex(trainer => trainer.id == trainerId);
                    if (index !== -1) {
                        sampleTrainers[index] = {
                            ...sampleTrainers[index],
                            name: trainerName,
                            email: trainerEmail,
                            phone: trainerPhone,
                            specialization: trainerSpecialization,
                            experience: Number.parseInt(trainerExperience) || 0,
                            status: trainerStatus,
                            bio: trainerBio,
                            photo: trainerPhotoUrl
                        };

                        const row = document.getElementById(`trainer-${trainerId}`);
                        if (row) {
                            row.classList.add("update-row");
                        }
                    }
                } else {
                    // Add new trainer
                    const newId = Math.max(...sampleTrainers.map(trainer => trainer.id)) + 1;
                    sampleTrainers.push({
                        id: newId,
                        name: trainerName,
                        email: trainerEmail,
                        phone: trainerPhone,
                        specialization: trainerSpecialization,
                        experience: Number.parseInt(trainerExperience) || 0,
                        status: trainerStatus,
                        bio: trainerBio,
                        photo: trainerPhotoUrl
                    });
                }

                saveTrainerBtn.classList.remove("btn-success");
                saveTrainerBtn.innerHTML = "Save Trainer";

                loadTrainers();
                const modal = bootstrap.Modal.getInstance(document.getElementById("trainerModal"));
                modal.hide();

                showToast(trainerId ? "Trainer updated successfully!" : "Trainer added successfully!", "success");
            }, 1500);
        } else {
            // Form is invalid
            const invalidFields = trainerForm.querySelectorAll(":invalid");
            invalidFields.forEach(field => {
                field.classList.add("shake-animation");
                setTimeout(() => field.classList.remove("shake-animation"), 600);
            });

            trainerForm.reportValidity();
        }
    });

    // Delete trainer confirmation
    const confirmTrainerDeleteBtn = document.getElementById("confirmTrainerDeleteBtn");
    confirmTrainerDeleteBtn.addEventListener("click", () => {
        const trainerId = document.getElementById("deleteTrainerItemId").value;

        const index = sampleTrainers.findIndex(trainer => trainer.id == trainerId);

        if (index !== -1) {
            const row = document.getElementById(`trainer-${trainerId}`);
            if (row) {
                row.classList.add("delete-row");

                setTimeout(() => {
                    sampleTrainers.splice(index, 1);
                    loadTrainers();
                    const modal = bootstrap.Modal.getInstance(document.getElementById("deleteTrainerConfirmModal"));
                    modal.hide();

                    showToast("Trainer deleted successfully!", "danger");
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
window.addNewTrainer = () => {
    const trainerForm = document.getElementById("trainerForm");
    trainerForm.reset();
    document.getElementById("trainerId").value = "";
    document.getElementById("photoPreviewContainer").classList.add("d-none");

    const modalTitle = document.getElementById("trainerModalLabel");
    modalTitle.textContent = "Add New Trainer";
    modalTitle.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Add New Trainer';

    modalTitle.classList.add("text-animation");
    setTimeout(() => modalTitle.classList.remove("text-animation"), 1000);

    const modal = new bootstrap.Modal(document.getElementById("trainerModal"));
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

window.editTrainer = (trainerId) => {
    const trainer = sampleTrainers.find(t => t.id === trainerId);

    if (trainer) {
        document.getElementById("trainerForm").reset();

        const modalTitle = document.getElementById("trainerModalLabel");
        modalTitle.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit Trainer';

        modalTitle.classList.add("text-animation");
        setTimeout(() => modalTitle.classList.remove("text-animation"), 1000);

        const modal = new bootstrap.Modal(document.getElementById("trainerModal"));
        modal.show();

        setTimeout(() => {
            const fields = [
                { id: "trainerId", value: trainer.id },
                { id: "trainerName", value: trainer.name },
                { id: "trainerEmail", value: trainer.email },
                { id: "trainerPhone", value: trainer.phone },
                { id: "trainerSpecialization", value: trainer.specialization },
                { id: "trainerExperience", value: trainer.experience },
                { id: "trainerStatus", value: trainer.status },
                { id: "trainerBio", value: trainer.bio },
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
                if (trainer.photo) {
                    document.getElementById("photoPreview").src = trainer.photo;
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

window.showTrainerDeleteConfirm = (trainerId) => {
    const trainer = sampleTrainers.find(t => t.id === trainerId);

    if (trainer) {
        document.getElementById("deleteTrainerItemId").value = trainerId;

        const modalBody = document.querySelector("#deleteTrainerConfirmModal .modal-body p.fs-5");
        modalBody.innerHTML = `Are you sure you want to delete <strong>"${trainer.name}"</strong>?`;

        const modal = new bootstrap.Modal(document.getElementById("deleteTrainerConfirmModal"));
        modal.show();

        setTimeout(() => {
            const warningIcon = document.querySelector("#deleteTrainerConfirmModal .bi-exclamation-triangle-fill");
            warningIcon.classList.add("shake-animation");
            setTimeout(() => {
                warningIcon.classList.remove("shake-animation");
            }, 600);
        }, 300);
    }
};