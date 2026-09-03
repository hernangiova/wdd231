const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified ${document.lastModified}`;



const courses = [
    {
        subject: "CSE",
        name: "CSE 110",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        name: "WDD 130",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        name: "CSE 111",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        name: "CSE 210",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        name: "WDD 131",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        name: "WDD 231",
        credits: 2,
        completed: false
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