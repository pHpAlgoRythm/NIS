function showDetails(name, age, gender, date, complaint, temp, pulse, respRate, bp) {
    document.getElementById('patientDetails').innerHTML = `
        <h2>Patient Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age} years</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Date of Admission:</strong> ${date}</p>
        <p><strong>Chief Complaint:</strong> ${complaint}</p>
        <h3>Vital Signs</h3>
        <table>
            <tr><th>Vital Sign</th><th>Value</th></tr>
            <tr><td>Temperature</td><td>${temp}</td></tr>
            <tr><td>Pulse</td><td>${pulse}</td></tr>
            <tr><td>Respiratory Rate</td><td>${respRate}</td></tr>
            <tr><td>Blood Pressure</td><td>${bp}</td></tr>
        </table>
        <div class='patInfoBtn'>
        <button onclick='appendEdit()' class='editBtn'>Edit</button>
        <button onclick="hideDetails()" class='closeBtn'>Close</button>
        </div>
    `;
    document.getElementById('patientDetails').style.display = 'block';
}

function hideDetails() {
    document.getElementById('patientDetails').style.display = 'none';
}

function showAddPatientForm() {
    document.getElementById('addPatientForm').style.display = 'block';
}

function hideAddPatientForm() {
    document.getElementById('addPatientForm').style.display = 'none';
}

function addPatient(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const date = document.getElementById('admissionDate').value;
    const complaint = document.getElementById('complaint').value;
    const temp = document.getElementById('temperature').value;
    const pulse = document.getElementById('pulse').value;
    const respRate = document.getElementById('respiratoryRate').value;
    const bp = document.getElementById('bloodPressure').value;

    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerHTML = `
        <img src="https://via.placeholder.com/100" alt="Patient Photo">
        <p><strong>Name:</strong> ${name}</p>
        <button onclick="showDetails('${name}', ${age}, '${gender}', '${date}', '${complaint}', '${temp}', '${pulse}', '${respRate}', '${bp}')">Show More</button>
    `;
    document.getElementById('patientList').appendChild(newCard);
    hideAddPatientForm();
}

function searchPatients(query) {
    let resultsContainer = document.getElementById('searchResults');
    if (query.length === 0) {
        resultsContainer.style.display = 'none';
        return;
    }
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = `<h3>Search Results</h3><p>Showing results for: "${query}"</p>`;
}

function appendEdit()
{
document.getElementById('editPatientForm').style.display = 'block';
} 

function hideEditForm(){
document.getElementById('editPatientForm').style.display = 'none';
}