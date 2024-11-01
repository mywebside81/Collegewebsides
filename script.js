let expandedBar = null; // To keep track of the currently expanded info-bar
let expandedBox = null; // To keep track of the currently expanded image-box

// Function to toggle the expansion of info bars and show/hide additional info
function toggleInfo(element) {
    if (expandedBar && expandedBar !== element) {
        expandedBar.classList.remove('expanded');
        const currentInfoText = expandedBar.querySelector('.info-text');
        if (currentInfoText) {
            currentInfoText.style.display = "none";
        }
    }

    element.classList.toggle('expanded');

    const infoText = element.querySelector('.info-text');
    if (infoText) {
        infoText.style.display = infoText.style.display === "block" ? "none" : "block";
    }

    expandedBar = element.classList.contains('expanded') ? element : null;
}

// Function to toggle the expansion of image boxes and show/hide contact info
function toggleContact(element) {
    if (expandedBox && expandedBox !== element) {
        expandedBox.classList.remove('expanded');
    }

    element.classList.toggle('expanded');
    expandedBox = element.classList.contains('expanded') ? element : null;
}

// Function to display image when roll number is clicked
function showImage(imageName) {
    const imageDisplay = document.getElementById("image-display");
    const rollImage = document.getElementById("roll-image");
    rollImage.src = imageName;
    imageDisplay.style.display = "block";
}

// Function to delete a student's profile
function deleteProfile(serialNumber) {
    // Get the current students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Filter out the student with the matching serial number
    students = students.filter(student => student.serialNumber !== serialNumber);

    // Update localStorage with the new list
    localStorage.setItem('students', JSON.stringify(students));

    // Reload the page to update the UI
    location.reload();
}

// Collapse the expanded info-bar when clicking anywhere else on the body
document.body.addEventListener('click', (event) => {
    if (expandedBar && !expandedBar.contains(event.target)) {
        expandedBar.classList.remove('expanded');
        const currentInfoText = expandedBar.querySelector('.info-text');
        if (currentInfoText) {
            currentInfoText.style.display = "none";
        }
        expandedBar = null;
    }

    if (expandedBox && !expandedBox.contains(event.target)) {
        expandedBox.classList.remove('expanded');
        expandedBox = null;
    }
});

// Collapse the expanded info-bar and image-box when scrolling
window.addEventListener('', () => {
    if (expandedBar) {
        expandedBar.classList.remove('expanded');
        const currentInfoText = expandedBar.querySelector('.info-text');
        if (currentInfoText) {
            currentInfoText.style.display = "none";
        }
        expandedBar = null;
    }

    if (expandedBox) {
        expandedBox.classList.remove('expanded');
        expandedBox = null;
    }
});

// Load students from localStorage and display them
document.addEventListener('DOMContentLoaded', function () {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const container = document.querySelector('body');

    students.forEach(student => {
        const infoBar = document.createElement('div');
        infoBar.classList.add('info-bar');
        infoBar.setAttribute('onclick', 'toggleInfo(this)');

        infoBar.innerHTML = `
            <img src="${student.profileImageSrc}" alt="Profile">
            <div>
                <h3>${student.name}</h3>
                <div class="info-text">
                    <p class="additional-info">Class: ${student.studentClass}</p>
                    <p class="additional-info">Roll No: <a href="mark.html?img=${student.markImageSrc}" class="phone-link">${student.rollNumber}</a></p>
                    <p class="additional-info"><a href="tel:${student.phoneNumber}" class="phone-link">${student.phoneNumber}</a></p>
                </div>
            </div>
            <span class="right-number">${student.serialNumber}</span>
            <button class="delete-btn" onclick="deleteProfile('${student.serialNumber}')">Delete</button>
        `;

        container.appendChild(infoBar);
    });
});
