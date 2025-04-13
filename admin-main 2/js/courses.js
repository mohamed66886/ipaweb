const sampleCourses = [
    {
      id: 1,
      name: "Flutter Development Masterclass",
      description:
        "Learn to build beautiful, fast, and native-quality apps with Flutter for iOS and Android from scratch.",
      date: "2025-05-15",
      price: 2500,
      image: "../img/flutter.jpg",
      category: "flutter",
      duration: 40,
      type: "both",
      trainer: "1",
    },
    {
      id: 2,
      name: "Backend Development with .NET",
      description:
        "Master backend development using .NET Core, Entity Framework, and SQL Server to build robust APIs and web applications.",
      date: "2025-06-01",
      price: 3000,
      image: "../img/backend.jpg",
      category: "backend",
      duration: 48,
      type: "online",
      trainer: "2",
    },
    {
      id: 3,
      name: "Frontend Development with React",
      description:
        "Learn modern frontend development with React, Redux, and related technologies to build interactive user interfaces.",
      date: "2025-05-20",
      price: 2800,
      image: "../img/frontend.jpg",
      category: "frontend",
      duration: 36,
      type: "both",
      trainer: "3",
    },
    {
      id: 4,
      name: "Data Analysis with Python",
      description:
        "Master data analysis techniques using Python, Pandas, NumPy, and visualization libraries to extract insights from data.",
      date: "2025-07-10",
      price: 3200,
      image: "../img/data.jpg",
      category: "data",
      duration: 45,
      type: "online",
      trainer: "4",
    },
    {
      id: 5,
      name: "Cybersecurity Fundamentals",
      description:
        "Learn essential cybersecurity concepts, threat detection, and protection strategies to secure digital assets and information.",
      date: "2025-08-05",
      price: 3500,
      image: "../img/cyber.jpg",
      category: "cyber",
      duration: 50,
      type: "offline",
      trainer: "2",
    },
  ]
  
  document.addEventListener("DOMContentLoaded", () => {

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const bootstrap = window.bootstrap 
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

    function loadCourses(courses = sampleCourses) {
      const tableBody = document.getElementById("coursesTableBody")
      tableBody.innerHTML = ""
  
      courses.forEach((course, index) => {
        const row = document.createElement("tr")
        row.id = `course-${course.id}`
        row.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="${course.image || "/placeholder.svg?height=60&width=100"}" alt="${course.name}" class="course-image" /></td>
          <td>${course.name}</td>
          <td>${course.description.length > 100 ? course.description.substring(0, 100) + "..." : course.description}</td>
          <td>${formatDate(course.date)}</td>
          <td>${course.price.toLocaleString()} EGP</td>
          <td>
            <button class="btn action-btn edit-btn" onclick="editCourse(${course.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Course">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn action-btn delete-btn" onclick="showDeleteConfirm(${course.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Course">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `
        tableBody.appendChild(row)
  
        setTimeout(() => {
          row.classList.add("new-row")
        }, index * 100)
      })

      const newTooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      newTooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
    }

    function formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" }
      return new Date(dateString).toLocaleDateString("en-US", options)
    }

    loadCourses()

    const courseSearch = document.getElementById("courseSearch")
    if (courseSearch) {
      courseSearch.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase()
        const filteredCourses = sampleCourses.filter(
          (course) =>
            course.name.toLowerCase().includes(searchTerm) || course.description.toLowerCase().includes(searchTerm),
        )
  
        this.classList.add("edit-mode-highlight")
        setTimeout(() => this.classList.remove("edit-mode-highlight"), 800)
  
        loadCourses(filteredCourses)
      })
    }
  

    const filterLinks = document.querySelectorAll("[data-filter]")
    filterLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const filter = this.getAttribute("data-filter")
        let filteredCourses = [...sampleCourses]
  
        const today = new Date()
  
        if (filter === "active") {
          filteredCourses = sampleCourses.filter((course) => {
            const courseDate = new Date(course.date)
            return courseDate <= today
          })
        } else if (filter === "upcoming") {
          filteredCourses = sampleCourses.filter((course) => {
            const courseDate = new Date(course.date)
            return courseDate > today
          })
        } else if (filter === "completed") {
          filteredCourses = sampleCourses.filter((course) => {
            const courseDate = new Date(course.date)
            const endDate = new Date(courseDate)
            endDate.setDate(endDate.getDate() + 30)
            return endDate < today
          })
        }

        const dropdownButton = document.getElementById("filterDropdown")
        dropdownButton.classList.add("pulse-animation")
        setTimeout(() => dropdownButton.classList.remove("pulse-animation"), 1500)
  
        dropdownButton.innerHTML = `<i class="bi bi-funnel me-1"></i> ${this.textContent.trim()}`
  
        loadCourses(filteredCourses)
      })
    })

    const modalTabs = document.querySelectorAll(".modal-tab")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    modalTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        modalTabs.forEach((t) => t.classList.remove("active"))
        tabPanes.forEach((p) => {
          p.classList.remove("active")
          p.style.opacity = 0
        })

        this.classList.add("active")
        const target = this.getAttribute("data-target")
        const targetPane = document.getElementById(target)
        targetPane.classList.add("active")

        setTimeout(() => {
          targetPane.style.opacity = 1
        }, 50)
      })
    })

    const courseImage = document.getElementById("courseImage")
    const imagePreview = document.getElementById("imagePreview")
    const imagePreviewContainer = document.getElementById("imagePreviewContainer")
  
    courseImage.addEventListener("change", () => {
      if (courseImage.files && courseImage.files[0]) {
        const reader = new FileReader()
  
        reader.onload = (e) => {
          imagePreview.src = e.target.result
          imagePreviewContainer.classList.remove("d-none")

          imagePreview.classList.add("image-preview-animation")
          setTimeout(() => {
            imagePreview.classList.remove("image-preview-animation")
          }, 500)
        }
  
        reader.readAsDataURL(courseImage.files[0])
      }
    })

    const previewImageBtn = document.getElementById("previewImageBtn")
    if (previewImageBtn) {
      previewImageBtn.addEventListener("click", () => {
        if (courseImage.files && courseImage.files[0]) {
        } else if (imagePreview.src && !imagePreview.src.includes("placeholder")) {
          imagePreviewContainer.classList.remove("d-none")
          imagePreview.classList.add("image-preview-animation")
          setTimeout(() => {
            imagePreview.classList.remove("image-preview-animation")
          }, 500)
        } else {
          imagePreview.src = "/placeholder.svg?height=200&width=300"
          imagePreviewContainer.classList.remove("d-none")

          showToast("Please select an image first", "warning")
        }
      })
    }

    const saveCourseBtn = document.getElementById("saveCourseBtn")
    saveCourseBtn.addEventListener("click", () => {
      const courseForm = document.getElementById("courseForm")
  
      if (courseForm.checkValidity()) {
        const courseId = document.getElementById("courseId").value
        const courseName = document.getElementById("courseName").value
        const courseDescription = document.getElementById("courseDescription").value
        const courseDate = document.getElementById("courseDate").value
        const courseDuration = document.getElementById("courseDuration").value
        const coursePrice = document.getElementById("coursePrice").value
        const courseCategory = document.getElementById("courseCategory").value
        const courseType = document.getElementById("courseType").value
        const courseTrainer = document.getElementById("courseTrainer").value

        let courseImageUrl = "../img/placeholder.jpg"
        if (courseImage.files && courseImage.files[0] && imagePreview.src) {
          courseImageUrl = imagePreview.src
        } else if (imagePreview.src && !imagePreview.src.includes("placeholder")) {
          courseImageUrl = imagePreview.src
        }

        saveCourseBtn.classList.add("btn-success")
        saveCourseBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Saved Successfully!'
  
        createConfetti()
  
        setTimeout(() => {
          if (courseId) {
            const index = sampleCourses.findIndex((course) => course.id == courseId)
            if (index !== -1) {
              sampleCourses[index] = {
                ...sampleCourses[index],
                name: courseName,
                description: courseDescription,
                date: courseDate,
                price: Number.parseFloat(coursePrice),
                duration: Number.parseInt(courseDuration),
                category: courseCategory,
                type: courseType,
                trainer: courseTrainer,
                image: courseImageUrl,
              }

              const row = document.getElementById(`course-${courseId}`)
              if (row) {
                row.classList.add("update-row")
              }
            }
          } else {
            const newId = Math.max(...sampleCourses.map((course) => course.id)) + 1
            sampleCourses.push({
              id: newId,
              name: courseName,
              description: courseDescription,
              date: courseDate,
              price: Number.parseFloat(coursePrice),
              duration: Number.parseInt(courseDuration),
              category: courseCategory,
              type: courseType,
              trainer: courseTrainer,
              image: courseImageUrl,
            })
          }

          saveCourseBtn.classList.remove("btn-success")
          saveCourseBtn.innerHTML = "Save Course"
  
          loadCourses()
          const modal = bootstrap.Modal.getInstance(document.getElementById("courseModal"))
          modal.hide()

          showToast(courseId ? "Course updated successfully!" : "Course added successfully!", "success")
        }, 1500)
      } else {

        const invalidFields = courseForm.querySelectorAll(":invalid")
        invalidFields.forEach((field) => {
          field.classList.add("shake-animation")
          setTimeout(() => field.classList.remove("shake-animation"), 600)
        })
  
        courseForm.reportValidity()
      }
    })

    function createConfetti() {
      const colors = ["#f39c12", "#e74c3c", "#3498db", "#2ecc71", "#9b59b6"]
  
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div")
        confetti.className = "confetti"
        confetti.style.left = Math.random() * 100 + "vw"
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.width = Math.random() * 10 + 5 + "px"
        confetti.style.height = Math.random() * 10 + 5 + "px"
        document.body.appendChild(confetti)

        setTimeout(() => {
          confetti.remove()
        }, 3000)
      }
    }

    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn")
    confirmDeleteBtn.addEventListener("click", () => {
      const courseId = document.getElementById("deleteItemId").value

      const index = sampleCourses.findIndex((course) => course.id == courseId)
  
      if (index !== -1) {

        const row = document.getElementById(`course-${courseId}`)
        if (row) {
          row.classList.add("delete-row")

          setTimeout(() => {
            sampleCourses.splice(index, 1)
            loadCourses()

            const modal = bootstrap.Modal.getInstance(document.getElementById("deleteConfirmModal"))
            modal.hide()

            showToast("Course deleted successfully!", "danger")
          }, 500)
        }
      }
    })

    function showToast(message, type = "success") {
      let toastContainer = document.querySelector(".toast-container")
      if (!toastContainer) {
        toastContainer = document.createElement("div")
        toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3"
        document.body.appendChild(toastContainer)
      }
t
      const toastId = `toast-${Date.now()}`
      const toast = document.createElement("div")
      toast.className = `toast align-items-center text-white bg-${type} border-0`
      toast.id = toastId
      toast.setAttribute("role", "alert")
      toast.setAttribute("aria-live", "assertive")
      toast.setAttribute("aria-atomic", "true")
  
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi bi-${type === "success" ? "check-circle" : type === "warning" ? "exclamation-triangle" : "exclamation-circle"} me-2"></i>
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `
  
      toastContainer.appendChild(toast)
  
      const toastInstance = new bootstrap.Toast(toast, {
        animation: true,
        autohide: true,
        delay: 3000,
      })

      toast.style.transform = "translateY(20px)"
      toast.style.opacity = "0"
      toast.style.transition = "all 0.3s ease"
  
      toastInstance.show()
  
      setTimeout(() => {
        toast.style.transform = "translateY(0)"
        toast.style.opacity = "1"
      }, 50)
  

      toast.addEventListener("hidden.bs.toast", () => {
        toast.remove()
      })
    }
  })
    window.addNewCourse = () => {
    const courseForm = document.getElementById("courseForm")
    courseForm.reset()
    document.getElementById("courseId").value = ""
    document.getElementById("imagePreviewContainer").classList.add("d-none")
  
    const modalTitle = document.getElementById("courseModalLabel")
    modalTitle.textContent = "Add New Course"
    modalTitle.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Add New Course'

    modalTitle.classList.add("text-animation")
    setTimeout(() => modalTitle.classList.remove("text-animation"), 1000)
    const modal = new bootstrap.Modal(document.getElementById("courseModal"))
    modal.show()

    setTimeout(() => {
      const formFields = document.querySelectorAll(".form-control, .form-select")
      formFields.forEach((field, index) => {
        setTimeout(() => {
          field.classList.add("form-field-animation")
          setTimeout(() => {
            field.classList.remove("form-field-animation")
          }, 500)
        }, index * 100)
      })
    }, 300)
  }
  
  window.editCourse = (courseId) => {
    const course = sampleCourses.find((c) => c.id === courseId)
  
    if (course) {
      document.getElementById("courseForm").reset()

      const modalTitle = document.getElementById("courseModalLabel")
      modalTitle.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit Course'

      modalTitle.classList.add("text-animation")
      setTimeout(() => modalTitle.classList.remove("text-animation"), 1000)

      const modal = new bootstrap.Modal(document.getElementById("courseModal"))
      modal.show()

      setTimeout(() => {
        const fields = [
          { id: "courseId", value: course.id },
          { id: "courseName", value: course.name },
          { id: "courseDescription", value: course.description },
          { id: "courseDate", value: course.date },
          { id: "courseDuration", value: course.duration },
          { id: "coursePrice", value: course.price },
          { id: "courseCategory", value: course.category },
          { id: "courseType", value: course.type },
          { id: "courseTrainer", value: course.trainer },
        ]
  
        fields.forEach((field, index) => {
          setTimeout(() => {
            const element = document.getElementById(field.id)
            element.value = field.value
            element.classList.add("edit-mode-highlight")
            setTimeout(() => element.classList.remove("edit-mode-highlight"), 800)
          }, index * 100)
        })
  
        setTimeout(() => {
          if (course.image) {
            document.getElementById("imagePreview").src = course.image
            document.getElementById("imagePreviewContainer").classList.remove("d-none")
            document.getElementById("imagePreview").classList.add("image-preview-animation")
            setTimeout(() => {
              document.getElementById("imagePreview").classList.remove("image-preview-animation")
            }, 500)
          }
        }, fields.length * 100)
      }, 300)
    }
  }
  
  window.showDeleteConfirm = (courseId) => {
    const course = sampleCourses.find((c) => c.id === courseId)
  
    if (course) {
      document.getElementById("deleteItemId").value = courseId

      const modalBody = document.querySelector("#deleteConfirmModal .modal-body p.fs-5")
      modalBody.innerHTML = `Are you sure you want to delete <strong>"${course.name}"</strong>?`

      const modal = new bootstrap.Modal(document.getElementById("deleteConfirmModal"))
      modal.show()
  
      setTimeout(() => {
        const warningIcon = document.querySelector("#deleteConfirmModal .bi-exclamation-triangle-fill")
        warningIcon.classList.add("shake-animation")
        setTimeout(() => {
          warningIcon.classList.remove("shake-animation")
        }, 600)
      }, 300)
    }
  }
  