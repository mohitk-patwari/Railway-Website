// scripts.js

// Wait until the DOM is fully loaded
//DOM - document Object MOdel
document.addEventListener('DOMContentLoaded', () => {

    const trainData = [
        { number: '101', from: 'City A', to: 'City B', time: '09:00 AM' },
        { number: '102', from: 'City B', to: 'City C', time: '10:30 AM' },
        { number: '103', from: 'City C', to: 'City D', time: '12:00 PM' }
    ];

    // Function to handle form submissions
    function handleFormSubmission(event, resultDivId, message) {
        event.preventDefault();  // Prevent the default form submission, which is reloading the page and sending data
        const resultDiv = document.getElementById
        (resultDivId);
        resultDiv.innerHTML = message;//upadates the innerHTML property of the resultDiv ,setting the content of the div to the message
    }

    // Handle TRAIN SEARCH FORM 
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', (event) => {
        const from = document.getElementById('from').value;//gets the value of the input field with ID (from)
        const to = document.getElementById('to').value;
        const resultMessage = `Showing results from ${from} to ${to}...`;
        handleFormSubmission(event, 'trainResults', `<li>${resultMessage}</li>`);

        const search = trainData.filter(train => { return train.from === from && train.to === to;
        });

        const trainResultsDiv = document.getElementById('trainResults');
        trainResultsDiv.innerHTML = '';

        const live_status = document.getElementById('scheduleResult');
        live_status.innerHTML = '';

        if (search.length > 0) {
        search.forEach(train=>{
            const trainform = document.createElement('div');
            trainform.classList.add('train-sheet');
            trainform.innerHTML =`
            <p>Train Number:${train.number}</p>
            <p>From: ${train.from}</p>
            <p>To: ${train.to}</p>
            <p>Departure Time: ${train.time}</p>`;
            trainResultsDiv.appendChild(trainform);
        });
    } else {
        trainResultsDiv.innerHTML = `<p>No train found from ${from} to ${to}</p>`;
    }
    event.preventDefault();
    });

    // Handle LIVE TRAIN STATUS 
    const statusForm = document.getElementById('statusForm');
    statusForm.addEventListener('submit', (event) => {
        const trainNumber = document.getElementById('trainNumber').value;
        const resultMessage = `Live status for Train #${trainNumber}:-
        `;
        handleFormSubmission(event, 'statusResult', resultMessage);

        const liveStatus = trainData.filter(train => { return train.number === trainNumber;
        });

        const statusResultDiv = document.getElementById('statusResult');
        statusResultDiv.innerHTML = '';

        const live_status = document.getElementById('scheduleResult');
        live_status.innerHTML = '';

        if (liveStatus.length > 0) {
        liveStatus.forEach(train=>{
            const trainSheet = document.createElement('div');
            trainSheet.classList.add('train-sheet');
            trainSheet.innerHTML =`
            <p>Train Number:${train.number}</p>
            <p>From: ${train.from}</p>
            <p>To: ${train.to}</p>
            <p>Departure Time: ${train.time}</p>`;
            statusResultDiv.appendChild(trainSheet);
        });
    } else {
        statusResultDiv.innerHTML = `<p>No train found with the number ${trainNumber}</p>`;
    }
    event.preventDefault();
    });

    // Handle train schedule form
    const scheduleForm = document.getElementById('scheduleForm');
    scheduleForm.addEventListener('submit', (event) => {
        const trainNumberSchedule = document.getElementById('trainNumberSchedule').value;
        const resultMessage = `Fetching schedule for Train #${trainNumberSchedule}...`;
        handleFormSubmission(event, 'scheduleResult', resultMessage);

        const schedule = trainData.filter(train => { return train.number === trainNumberSchedule;
        });

        const scheduleResultDiv = document.getElementById('scheduleResult');
        scheduleResultDiv.innerHTML = '';

        const schedule_status = document.getElementById('scheduleResult');
        schedule_status.innerHTML = '';

        if (schedule.length > 0) {
        schedule.forEach(train=>{
            const traindoc = document.createElement('div');
            traindoc.classList.add('train-sheets');
            traindoc.innerHTML =`
            <p>Train Number:${train.number}</p>
            <p>From: ${train.from}</p>
            <p>To: ${train.to}</p>
            <p>Departure Time: ${train.time}</p>`;
            scheduleResultDiv.appendChild(traindoc);
        });
    } else {
        scheduleResultDiv.innerHTML = `<p>No train found with the number ${trainNumber}</p>`;
    }
    event.preventDefault();
    });

    // Handle ticket booking form
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const from = document.getElementById('fromBooking').value;
        const trainList = document.getElementById('bookingResult');
        const to = document.getElementById('toBooking').
        value;
        const date = document.getElementById('date').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        // Basic validation (more advanced validation should be done)
        if (!from ||!name||!age|| !to || !date || !cardNumber || !expiryDate || !cvv) {
            alert('Please fill out all fields');
            return;
        }

        

        
        const filteredTrains = trainData.filter(train => {
            return train.from === from && train.to === to;
        });

        trainList.innerHTML = '';
        filteredTrains.forEach(train => {
            const trainCard = document.createElement('div');

            trainCard.classList.add('train-card');
            trainCard.innerHTML = `
                <p>Name:${name}</p>
                <p>Age:${age}</p>
                <p>Train Number: ${train.number}</p>
                <p>From: ${train.from}</p>
                <p>To: ${train.to}</p>
                <p>Departure Time: ${train.time}</p>
                <button onclick="bookTrain('${name}', ${age}, '${train.number}')">Book</button>
                `;
            trainList.appendChild(trainCard);
        });
       
       
       
       

        // const resultMessage = `Booking ticket from ${fromBooking} to ${toBooking} on ${date}. Payment processed using card ending in ${cardNumber.slice(-4)}.`;
        // handleFormSubmission(event, 'bookingResult', resultMessage);
    });
});
function bookTrain(name, age, trainNumber) {
    alert(`You have booked Train ${trainNumber} for ${name}, Age: ${age}.`);
}