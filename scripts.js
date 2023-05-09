document.addEventListener('DOMContentLoaded', function () {
    const scheduleBtn = document.getElementById('scheduleBtn');
    const appointmentForm = document.getElementById('appointmentForm');
    const alias = document.getElementById('alias');
    const apptId = document.getElementById('apptId');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const datePicker = document.getElementById('datePicker');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const submitBtn = document.getElementById('submitBtn');
    const calendar = document.getElementById('calendar');
    const appointmentModal = document.getElementById('appointmentModal');
    const appointmentSummary = document.getElementById('appointmentSummary');
    const smsReminderBtn = document.getElementById('smsReminderBtn');

    function generateRandomAlias() {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 12; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function createAppointmentDiv(date, time) {
        const div = document.createElement('div');
        div.style.backgroundColor = getRandomColor();
        div.style.padding = '10px';
        div.style.margin = '10px';
        div.style.cursor = 'pointer';
        div.innerHTML = `${firstName.value} has a consultation at ${date} and ${time} with Pexip Health Demo. Please call +1XXXXXXXXXX if cancelation or reschedule is needed.`;
        div.addEventListener('dblclick', () => {
            appointmentSummary.textContent = `Appointment Summary:\nPatient: ${firstName.value} ${lastName.value}\nDate: ${date}\nTime: ${time}\nEmail: ${email.value}\nPhone: ${phone.value}`;
            appointmentModal.classList.remove('hidden');
        });
        return div;
    }

    function closeModal() {
        appointmentModal.classList.add('hidden');
    }

    scheduleBtn.addEventListener('click', () => {
        let randomAlias = generateRandomAlias();
        appointmentForm.classList.toggle('hidden');
        alias.textContent = randomAlias;
        apptId.value = randomAlias;
    });

    const flatpickrInstance = flatpickr(datePicker, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true
    });

    submitBtn.addEventListener('click', () => {
        const selectedDate = flatpickrInstance.selectedDates[0];
        if (!firstName.value || !lastName.value || !selectedDate || !email.value || !phone.value) {
            alert("Please fill in all fields and select a date and time.");
            return;
        }

        const date = selectedDate.toLocaleDateString();
        const time = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const scheduledAppt = document.querySelector("#scheduled-appt");

        scheduledAppt.setAttribute('data-conference-name', `ph${apptId.value}`);
        scheduledAppt.setAttribute('data-participant-name', `${firstName.value} ${lastName.value}`);
        scheduledAppt.setAttribute('data-participant-email', `${email.value}`);
        scheduledAppt.setAttribute('data-participant-phone', `${phone.value}`);
        scheduledAppt.classList.remove('hidden');

        firstName.value = '';
        lastName.value = '';
        flatpickrInstance.clear();
        email.value = '';
        phone.value = '';
        appointmentForm.classList.add('hidden');
    });

    smsReminderBtn?.addEventListener('click', () => {
        alert('SMS reminder sent to patient.');
        closeModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target == appointmentModal) {
            closeModal();
        }
    });
});


