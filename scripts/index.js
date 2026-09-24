const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");
const courseDetails = document.querySelector("#course-details")

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified ${document.lastModified}`;



const courses = [
    {
        subject: "CSE",
        name: "CSE 110",
        credits: 2,
        completed: true,
        certificate: "Programming",
        description: "Introduction to programming and problem solving.",
        technology: ["Python"]
    },
    {
        subject: "WDD",
        name: "WDD 130",
        credits: 2,
        completed: true,
        certificate: "Web Development",
        description: "Introduction to web development.",
        technology: ["HTML", "CSS"]
    },
    {
        subject: "CSE",
        name: "CSE 111",
        credits: 2,
        completed: false,
        certificate: "Programming",
        description: "Object-oriented programming.",
        technology: ["Python"]
    },
    {
        subject: "CSE",
        name: "CSE 210",
        credits: 2,
        completed: false,
        certificate: "Programming",
        description: "Software development and object-oriented programming.",
        technology: ["C#"]
    },
    {
        subject: "WDD",
        name: "WDD 131",
        credits: 2,
        completed: true,
        certificate: "Web Development",
        description: "Dynamic web fundamentals.",
        technology: ["HTML", "CSS", "JavaScript"]
    },
    {
        subject: "WDD",
        name: "WDD 231",
        credits: 2,
        completed: false,
        certificate: "Web Development",
        description: "Web frontend development.",
        technology: ["HTML", "CSS", "JavaScript"]
    }
];

function displayCourses(list) {
    const courses = document.querySelector("#courses");

    courses.innerHTML = "";

    list.forEach(course => {
        const card = document.createElement("div");

        card.textContent = course.name;
        if (course.completed) {
            card.classList.add("completed");
        }

        
        card.addEventListener("click", () => {
            displayCourseDetails(course);
        });

        courses.appendChild(card);
    });

    document.querySelector("#total").textContent = list.reduce((total, course) => total + course.credits, 0);
}

document.querySelector("#all").addEventListener("click", function () {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", function () {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.querySelector("#cse").addEventListener("click", function () {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

displayCourses(courses);

function displayCourseDetails(course) {

    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.name}</h2>
    <h3>${course.name}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificates</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(", ")}</p>
    `;

    courseDetails.showModal();

    const closeModal = document.querySelector("#closeModal");

    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}

displayCourses(courses);