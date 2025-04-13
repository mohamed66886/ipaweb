const sampleEvents = [
    {
        id: 1,
        name: "Tech Conference 2025",
        description: "Annual technology conference featuring the latest trends in software development and IT.",
        date: "2025-05-20",
        startTime: "09:00",
        endTime: "17:00",
        location: "Cairo Convention Center",
        type: "conference",
        capacity: 500,
        image: "../img/conference.jpg"
    },
    {
        id: 2,
        name: "Flutter Workshop",
        description: "Hands-on workshop for building cross-platform mobile applications with Flutter.",
        date: "2025-06-15",
        startTime: "10:00",
        endTime: "14:00",
        location: "IPA Academy - Main Hall",
        type: "workshop",
        capacity: 50,
        image: "../img/flutter-workshop.jpg"
    },
    {
        id: 3,
        name: "Cybersecurity Seminar",
        description: "Learn about the latest cybersecurity threats and how to protect your systems.",
        date: "2025-07-10",
        startTime: "13:00",
        endTime: "16:00",
        location: "Online",
        type: "seminar",
        capacity: 200,
        image: "../img/cyber-seminar.jpg"
    },
    {
        id: 4,
        name: "Developer Meetup",
        description: "Monthly meetup for developers to network and share knowledge.",
        date: "2025-04-25",
        startTime: "18:00",
        endTime: "21:00",
        location: "Tech Hub Cairo",
        type: "meetup",
        capacity: 100,
        image: "../img/meetup.jpg"
    },
    {
        id: 5,
        name: "AI Webinar",
        description: "Introduction to Artificial Intelligence and Machine Learning concepts.",
        date: "2025-08-05",
        startTime: "19:00",
        endTime: "21:00",
        location: "Online",
        type: "webinar",
        capacity: 300,
        image: "../img/webinar.jpg"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const bootstrap = window.bootstrap;
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

    function loadEvents(events = sampleEvents) {
        const tableBody = document.getElementById("eventsTableBody");
        tableBody.innerHTML = "";

        events.forEach((event, index) => {
            const row = document.createElement("tr");
            row.id = `event-${event.id}`;
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${event.image || "/placeholder.svg?height=60&width=100"}" alt="${event.name}" class="event-image" /></td>
                <td>${event.name}</td>
                <td>${event.description.length > 100 ? event.description.substring(0, 100) + "..." : event.description}</td>
                <td>
                    ${formatDate(event.date)}<br>
                    ${event.startTime} - ${event.endTime}
                </td>
                <td>${event.location}</td>
                <td>
                    <button class="btn action-btn edit-btn" onclick="editEvent(${event.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Event">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn action-btn delete-btn" onclick="showEventDeleteConfirm(${event.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Event">
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

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Initial load
    loadEvents();

    // Search functionality
    const eventSearch = document.getElementById("eventSearch");
    if (eventSearch) {
        eventSearch.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();
            const filteredEvents = sampleEvents.filter(
                event => event.name.toLowerCase().includes(searchTerm) || 
                         event.description.toLowerCase().includes(searchTerm) ||
                         event.location.toLowerCase().includes(searchTerm)
            );

            this.classList.add("edit-mode-highlight");
            setTimeout(() => this.classList.remove("edit-mode-highlight"), 800);

            loadEvents(filteredEvents);
        });
    }

    // Filter functionality
    const filterLinks = document.querySelectorAll("[data-filter]");
    filterLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const filter = this.getAttribute("data-filter");
            let filteredEvents = [...sampleEvents];

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (filter === "upcoming") {
                filteredEvents = sampleEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate >= today;
                });
            } else if (filter === "past") {
                filteredEvents = sampleEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate < today;
                });
            }

            const dropdownButton = document.getElementById("filterDropdown");
            dropdownButton.classList.add("pulse-animation");
            setTimeout(() => dropdownButton.classList.remove("pulse-animation"), 1500);

            dropdownButton.innerHTML = `<i class="bi bi-funnel me-1"></i> ${this.textContent.trim()}`;

            loadEvents(filteredEvents);
        });
    });

    // Event image preview
    const eventImage = document.getElementById("eventImage");
    const eventImagePreview = document.getElementById("eventImagePreview");
    const eventImagePreviewContainer = document.getElementById("eventImagePreviewContainer");

    eventImage.addEventListener("change", () => {
        if (eventImage.files && eventImage.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                eventImagePreview.src = e.target.result;
                eventImagePreviewContainer.classList.remove("d-none");

                eventImagePreview.classList.add("image-preview-animation");
                setTimeout(() => {
                    eventImagePreview.classList.remove("image-preview-animation");
                }, 500);
            };

            reader.readAsDataURL(eventImage.files[0]);
        }
    });

    const previewEventImageBtn = document.getElementById("previewEventImageBtn");
    if (previewEventImageBtn) {
        previewEventImageBtn.addEventListener("click", () => {
            if (eventImage.files && eventImage.files[0]) {
                // Already handled by change event
            } else if (eventImagePreview.src && !eventImagePreview.src.includes("placeholder")) {
                eventImagePreviewContainer.classList.remove("d-none");
                eventImagePreview.classList.add("image-preview-animation");
                setTimeout(() => {
                    eventImagePreview.classList.remove("image-preview-animation");
                }, 500);
            } else {
                eventImagePreview.src = "/placeholder.svg?height=200&width=300";
                eventImagePreviewContainer.classList.remove("d-none");

                showToast("Please select an image first", "warning");
            }
        });
    }

    // Save event
    const saveEventBtn = document.getElementById("saveEventBtn");
    saveEventBtn.addEventListener("click", () => {
        const eventForm = document.getElementById("eventForm");

        if (eventForm.checkValidity()) {
            const eventId = document.getElementById("eventId").value;
            const eventName = document.getElementById("eventName").value;
            const eventDescription = document.getElementById("eventDescription").value;
            const eventDate = document.getElementById("eventDate").value;
            const eventStartTime = document.getElementById("eventStartTime").value;
            const eventEndTime = document.getElementById("eventEndTime").value;
            const eventLocation = document.getElementById("eventLocation").value;
            const eventType = document.getElementById("eventType").value;
            const eventCapacity = document.getElementById("eventCapacity").value;
            
            let eventImageUrl = "../img/placeholder.jpg";
            if (eventImage.files && eventImage.files[0] && eventImagePreview.src) {
                eventImageUrl = eventImagePreview.src;
            } else if (eventImagePreview.src && !eventImagePreview.src.includes("placeholder")) {
                eventImageUrl = eventImagePreview.src;
            }

            saveEventBtn.classList.add("btn-success");
            saveEventBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Saved Successfully!';

            createConfetti();

            setTimeout(() => {
                if (eventId) {
                    // Update existing event
                    const index = sampleEvents.findIndex(event => event.id == eventId);
                    if (index !== -1) {
                        sampleEvents[index] = {
                            ...sampleEvents[index],
                            name: eventName,
                            description: eventDescription,
                            date: eventDate,
                            startTime: eventStartTime,
                            endTime: eventEndTime,
                            location: eventLocation,
                            type: eventType,
                            capacity: Number.parseInt(eventCapacity) || 0,
                            image: eventImageUrl
                        };

                        const row = document.getElementById(`event-${eventId}`);
                        if (row) {
                            row.classList.add("update-row");
                        }
                    }
                } else {
                    // Add new event
                    const newId = Math.max(...sampleEvents.map(event => event.id)) + 1;
                    sampleEvents.push({
                        id: newId,
                        name: eventName,
                        description: eventDescription,
                        date: eventDate,
                        startTime: eventStartTime,
                        endTime: eventEndTime,
                        location: eventLocation,
                        type: eventType,
                        capacity: Number.parseInt(eventCapacity) || 0,
                        image: eventImageUrl
                    });
                }

                saveEventBtn.classList.remove("btn-success");
                saveEventBtn.innerHTML = "Save Event";

                loadEvents();
                const modal = bootstrap.Modal.getInstance(document.getElementById("eventModal"));
                modal.hide();

                showToast(eventId ? "Event updated successfully!" : "Event added successfully!", "success");
            }, 1500);
        } else {
            // Form is invalid
            const invalidFields = eventForm.querySelectorAll(":invalid");
            invalidFields.forEach(field => {
                field.classList.add("shake-animation");
                setTimeout(() => field.classList.remove("shake-animation"), 600);
            });

            eventForm.reportValidity();
        }
    });

    // Delete event confirmation
    const confirmEventDeleteBtn = document.getElementById("confirmEventDeleteBtn");
    confirmEventDeleteBtn.addEventListener("click", () => {
        const eventId = document.getElementById("deleteEventItemId").value;

        const index = sampleEvents.findIndex(event => event.id == eventId);

        if (index !== -1) {
            const row = document.getElementById(`event-${eventId}`);
            if (row) {
                row.classList.add("delete-row");

                setTimeout(() => {
                    sampleEvents.splice(index, 1);
                    loadEvents();
                    const modal = bootstrap.Modal.getInstance(document.getElementById("deleteEventConfirmModal"));
                    modal.hide();

                    showToast("Event deleted successfully!", "danger");
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
window.addNewEvent = () => {
    const eventForm = document.getElementById("eventForm");
    eventForm.reset();
    document.getElementById("eventId").value = "";
    document.getElementById("eventImagePreviewContainer").classList.add("d-none");

    const modalTitle = document.getElementById("eventModalLabel");
    modalTitle.textContent = "Add New Event";
    modalTitle.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Add New Event';

    modalTitle.classList.add("text-animation");
    setTimeout(() => modalTitle.classList.remove("text-animation"), 1000);

    const modal = new bootstrap.Modal(document.getElementById("eventModal"));
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

window.editEvent = (eventId) => {
    const event = sampleEvents.find(e => e.id === eventId);

    if (event) {
        document.getElementById("eventForm").reset();

        const modalTitle = document.getElementById("eventModalLabel");
        modalTitle.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit Event';

        modalTitle.classList.add("text-animation");
        setTimeout(() => modalTitle.classList.remove("text-animation"), 1000);

        const modal = new bootstrap.Modal(document.getElementById("eventModal"));
        modal.show();

        setTimeout(() => {
            const fields = [
                { id: "eventId", value: event.id },
                { id: "eventName", value: event.name },
                { id: "eventDescription", value: event.description },
                { id: "eventDate", value: event.date },
                { id: "eventStartTime", value: event.startTime },
                { id: "eventEndTime", value: event.endTime },
                { id: "eventLocation", value: event.location },
                { id: "eventType", value: event.type },
                { id: "eventCapacity", value: event.capacity },
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
                if (event.image) {
                    document.getElementById("eventImagePreview").src = event.image;
                    document.getElementById("eventImagePreviewContainer").classList.remove("d-none");
                    document.getElementById("eventImagePreview").classList.add("image-preview-animation");
                    setTimeout(() => {
                        document.getElementById("eventImagePreview").classList.remove("image-preview-animation");
                    }, 500);
                }
            }, fields.length * 100);
        }, 300);
    }
};

window.showEventDeleteConfirm = (eventId) => {
    const event = sampleEvents.find(e => e.id === eventId);

    if (event) {
        document.getElementById("deleteEventItemId").value = eventId;

        const modalBody = document.querySelector("#deleteEventConfirmModal .modal-body p.fs-5");
        modalBody.innerHTML = `Are you sure you want to delete <strong>"${event.name}"</strong>?`;

        const modal = new bootstrap.Modal(document.getElementById("deleteEventConfirmModal"));
        modal.show();

        setTimeout(() => {
            const warningIcon = document.querySelector("#deleteEventConfirmModal .bi-exclamation-triangle-fill");
            warningIcon.classList.add("shake-animation");
            setTimeout(() => {
                warningIcon.classList.remove("shake-animation");
            }, 600);
        }, 300);
    }
};