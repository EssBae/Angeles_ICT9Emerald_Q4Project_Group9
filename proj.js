/* Sidebar */
document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll('.sidebar ul li a');

    menuLinks.forEach(link => {
        link.classList.remove("active");
        
        const linkPage = link.getAttribute("href");
        if (currentPage === linkPage || (currentPage === "" && linkPage === "Dashboard.html")) {
            link.classList.add("active");
        }
    });
});

/* Login Page */
function login() {
    const u = document.getElementById('user')?.value;
    const p = document.getElementById('pass')?.value;

    if (u === "Admin" && p === "1234") {
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.href = "Dashboard.html";
    } else {
        alert("❌ Invalid Credentials");
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

/* Profile Page*/
function initProfile() {
    const uploadInput = document.getElementById("uploadPFP");
    const profileImg = document.querySelector(".profile-avatar img");
    const studentName = document.getElementById("studentName");
    const fileName = document.getElementById("fileName");

    if (profileImg) {
        profileImg.src = "icon.jpg";
    }

    // Local Storage - NAME
    if (studentName) {
        const savedName = localStorage.getItem("studentName");

        if (savedName) {
            studentName.innerText = savedName;
        }

        studentName.addEventListener("input", function () {
            localStorage.setItem("studentName", this.innerText);
        });
    }

    // Local Storage - PFP
    const savedPFP = localStorage.getItem("profilePicture");

    if (savedPFP && profileImg) {
        profileImg.src = savedPFP;
    }

    //Pfp upload
    if (uploadInput && profileImg) {
        uploadInput.addEventListener("change", function () {
            const file = this.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const imageData = e.target.result;

                    profileImg.src = imageData;

                    localStorage.setItem("profilePicture", imageData);
                };

                reader.readAsDataURL(file);

                if (fileName) {
                    fileName.textContent = file.name;
                }
            } else {
                if (fileName) {
                    fileName.textContent = "No file chosen";
                }
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", initProfile);

function changePassAlert() {
    alert("Unavailable.");
}

/* Notebooks Page */
const teachers = {
    "Filipino": { 
        name: "WINMHAR SALAZAR", 
        img: "FIL.jpg",
        topic: "National Identity & Literature",
        desc: "Mastering the Filipino language through the lens of history, culture, and the profound symbolism of Jose Rizal's works." 
    },
    "English": { 
        name: "ROGELIO JR ALEGRID", 
        img: "ENG.jpg",
        topic: "Global Communication & World Lit",
        desc: "Developing a global voice through critical analysis of world masterpieces and advanced rhetorical composition." 
    },
    "Math": { 
        name: "ANGELINA CRISTOBAL", 
        img: "MATH.jpg",
        topic: "Advanced Logical Reasoning",
        desc: "A rigorous journey through Algebra and Geometry, turning complex equations into tools for real-world problem solving." 
    },
    "Social Studies": { 
        name: "RUEL ROQUE", 
        img: "SS.jpg",
        topic: "Civics & Global Perspectives",
        desc: "Analyzing the forces of history and economics to understand our role as citizens in an interconnected world." 
    },
    "Science": { 
        name: "AILENE GALANG", 
        img: "SCI.jpg",
        topic: "Inquiry & Empirical Discovery",
        desc: "Unlocking the secrets of the physical and biological world through evidence-based research and laboratory experimentation." 
    },
    "ICT": { 
        name: "LUISITO BALAJADIA", 
        img: "ICT.jpg",
        topic: "Digital Architecture & Innovation",
        desc: "Equipping 9-Emerald with the technical prowess and ethical framework to lead in the digital 21st century." 
    },
    "Values Education": { 
        name: "SEAN PATRICK MERCADO", 
        img: "VE.jpg",
        topic: "Character & Ethical Leadership",
        desc: "Refining personal integrity and moral judgment to become a person of substance and conscience." 
    },
    "Music & Arts": { 
        name: "AMELIA AGUIRRE", 
        img: "MUSIC.jpg",
        topic: "Aesthetic Appreciation & Theory",
        desc: "Exploring the soul of humanity through harmonic theory and the evolution of visual artistic movements." 
    },
    "TLE": { 
        name: "ROSELLE SARMIENTO", 
        img: "TLE.jpg",
        topic: "Practical Arts & Entrepreneurship",
        desc: "Transforming theoretical knowledge into livelihood skills, focusing on innovation and practical life management." 
    }
};

function openNotebook(subject) {
    const popup = document.getElementById("notebookPopup");
    const title = document.getElementById("popupTitle");
    const desc = document.getElementById("popupDesc");
    const img = document.getElementById("popupImage");

    if (!popup) return;

    const data = teachers[subject];
    if (data) {
        title.innerText = subject;
        img.src = data.img;
        desc.innerHTML = `
            <div style="font-weight: 800; color: #d4af37; letter-spacing: 2px; margin-bottom: 5px;">${data.topic.toUpperCase()}</div>
            <div style="font-size: 0.9rem; margin-bottom: 20px; color: #888;">INSTRUCTOR: ${data.name}</div>
            <p style="padding: 0 20px; font-style: italic;">"${data.desc}"</p>
            <div style="margin-top: 25px; border-top: 1px solid #eee; padding-top: 20px;">
                <span style="background: #f0f0f0; padding: 8px 15px; border-radius: 20px; font-size: 0.8rem;">9-Emerald SY 2025-2026</span>
            </div>
        `;
    }
    popup.style.display = "flex";
}
function closePopup() {
    const popup = document.getElementById("notebookPopup");
    if (popup) {
        popup.style.display = "none";
    }
}

window.addEventListener("click", function(event) {
    const popup = document.getElementById("notebookPopup");
    if (event.target === popup) {
        closePopup();
    }
});

window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closePopup();
    }
});

/* Tasks Page */
const taskText = document.getElementById('task-text');
const submitButtons = document.querySelectorAll('.submit-btn');

submitButtons.forEach(button => {
    button.addEventListener('click', function () {

        const card = button.closest('.task-card');
        const subject = card.querySelector('h2').textContent;
        const task = card.querySelector('h3').textContent;

        taskText.textContent = `Selected: ${subject} - ${task}`;
    });
});

const fileInput = document.getElementById('fileInput');
const fileStatus = document.getElementById('file-status');

let activeButton = null;

// click button > open file picker
submitButtons.forEach(button => {
    button.addEventListener('click', function () {
        activeButton = button;
        fileInput.value = "";
        fileInput.click();
    });
});

fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) {

        const fileName = fileInput.files[0].name;

        fileStatus.textContent = `Selected file: ${fileName}`;
        alert('File selected successfully!');

        if (activeButton) {
            activeButton.textContent = "Submitted ✓";
            activeButton.disabled = true;
            activeButton.classList.add("submitted");
            activeButton.disabled = true;
            
            //Local Storage
            const card = activeButton.closest('.task-card');
            const subject = card.querySelector('h2').textContent;
            const task = card.querySelector('h3').textContent;

            const key = subject + "-" + task;
            localStorage.setItem(key, "submitted");
        }
    }
});

//Local Storage upon submission
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".task-card").forEach(card => {

        const key =
            card.querySelector('h2').textContent + "-" +
            card.querySelector('h3').textContent;

        const saved = localStorage.getItem(key);

        const button = card.querySelector(".submit-btn");

        if (saved) {
            button.textContent = "Submitted ✓";
            button.disabled = true;
            button.classList.add("submitted");
        }
    });
});

//Reset Local Storage
function resetAllStorage() {
    localStorage.clear();
    alert("All saved data has been reset.");

    location.reload();
}


