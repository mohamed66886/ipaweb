document.addEventListener("DOMContentLoaded", function() {
    // Initialize tab functionality
    const tabLinks = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabLinks.forEach(link => {
        link.addEventListener("click", function() {
            tabLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Test email button
    const testEmailBtn = document.getElementById("testEmailBtn");
    if (testEmailBtn) {
        testEmailBtn.addEventListener("click", function() {
            const testEmailModal = new bootstrap.Modal(document.getElementById("testEmailModal"));
            testEmailModal.show();
        });
    }

    // Send test email
    const sendTestEmailBtn = document.getElementById("sendTestEmailBtn");
    if (sendTestEmailBtn) {
        sendTestEmailBtn.addEventListener("click", function() {
            const form = document.getElementById("testEmailForm");
            if (form.checkValidity()) {
                sendTestEmailBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
                sendTestEmailBtn.disabled = true;
                
                // Simulate sending email
                setTimeout(() => {
                    sendTestEmailBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Sent!';
                    setTimeout(() => {
                        const modal = bootstrap.Modal.getInstance(document.getElementById("testEmailModal"));
                        modal.hide();
                        sendTestEmailBtn.innerHTML = 'Send Test Email';
                        sendTestEmailBtn.disabled = false;
                        
                        // Show success toast
                        showToast("Test email sent successfully!", "success");
                    }, 1000);
                }, 2000);
            } else {
                form.reportValidity();
            }
        });
    }

    // Create backup button
    const createBackupBtn = document.getElementById("createBackupBtn");
    if (createBackupBtn) {
        createBackupBtn.addEventListener("click", function() {
            createBackupBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Creating Backup...';
            createBackupBtn.disabled = true;
            
            // Simulate backup process
            setTimeout(() => {
                createBackupBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Backup Created!';
                setTimeout(() => {
                    createBackupBtn.innerHTML = '<i class="bi bi-download me-2"></i>Create Backup Now';
                    createBackupBtn.disabled = false;
                    
                    // Show success toast
                    showToast("Backup created successfully!", "success");
                }, 1500);
            }, 3000);
        });
    }

    // Restore backup button
    const restoreBackupBtn = document.getElementById("restoreBackupBtn");
    if (restoreBackupBtn) {
        restoreBackupBtn.addEventListener("click", function() {
            const backupFile = document.getElementById("backupFile");
            if (backupFile.files.length === 0) {
                showToast("Please select a backup file first", "warning");
                return;
            }
            
            restoreBackupBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Restoring...';
            restoreBackupBtn.disabled = true;
            
            // Simulate restore process
            setTimeout(() => {
                restoreBackupBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Restore Complete!';
                setTimeout(() => {
                    restoreBackupBtn.innerHTML = '<i class="bi bi-upload me-2"></i>Restore Backup';
                    restoreBackupBtn.disabled = false;
                    
                    // Show success toast
                    showToast("Backup restored successfully!", "success");
                }, 1500);
            }, 3000);
        });
    }

    // Form submissions
    const forms = ["generalSettingsForm", "securitySettingsForm", "emailSettingsForm", "paymentSettingsForm"];
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener("submit", function(e) {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...';
                submitBtn.disabled = true;
                
                // Simulate save process
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Saved!';
                    setTimeout(() => {
                        submitBtn.innerHTML = 'Save Changes';
                        submitBtn.disabled = false;
                        
                        // Show success toast
                        showToast("Settings saved successfully!", "success");
                    }, 1000);
                }, 1500);
            });
        }
    });

    // Toast notification function
    function showToast(message, type = "success") {
        const toastContainer = document.querySelector(".toast-container") || document.createElement("div");
        toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
        document.body.appendChild(toastContainer);

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