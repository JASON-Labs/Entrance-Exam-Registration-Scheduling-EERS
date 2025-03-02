async function fetchExam() {
    const phone = document.getElementById("phoneLookup").value;
    const response = await fetch(`http://localhost:5000/api/users/exam/${phone}`);
    const result = await response.json();

    if (response.ok) {
        document.getElementById("examInfo").innerHTML = `
            <p>Exam Name: ${result.exam_name}</p>
            <p>Unit: ${result.unit}</p>
            <p>Date: ${result.date}</p>
            <p>Time: ${result.time}</p>
            <p>Location: ${result.location}</p>
        `;
    } else {
        document.getElementById("examInfo").innerText = result.error;
    }
}
