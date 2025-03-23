const API_BASE_URL = "http://localhost:8080/doubts";

// Fetch doubts based on selected subject
async function fetchDoubts(subject) {
    try {
        const response = await fetch(`${API_BASE_URL}/subject/${subject}`);
        const doubts = await response.json();

        const doubtList = document.getElementById("doubtList");
        doubtList.innerHTML = "";

        doubts.forEach(doubt => {
            const doubtItem = document.createElement("div");
            doubtItem.classList.add("doubt-item");
            doubtItem.innerHTML = `
                <strong>${doubt.subject}</strong>: ${doubt.question}
                <br> <em>Posted by: ${doubt.user.name}</em>
                <div id="comments-${doubt.id}">
                    <h3>Comments:</h3>
                    <div class="comment-list"></div>
                    <input type="text" id="comment-input-${doubt.id}" placeholder="Add a comment">
                    <button onclick="postComment(${doubt.id})">Post Comment</button>
                </div>
            `;
            doubtList.appendChild(doubtItem);

            loadComments(doubt.id); // Load existing comments for this doubt
        });
    } catch (error) {
        console.error("Error fetching doubts:", error);
    }
}

// Post a new doubt
async function postDoubt() {
    const subject = document.getElementById('subjectInput').value;
    const name = document.getElementById('nameInput').value;
    const doubtText = document.getElementById('doubtInput').value;

    const data = {
        subject: subject,
        question: doubtText,
        user: { name: name }
    };

    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Doubt posted:", result);
        fetchDoubts(subject); // Reload doubts for the selected subject
    } catch (error) {
        console.error("Error posting doubt:", error);
    }
}
