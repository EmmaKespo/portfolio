
    document.getElementById('contact-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Stops the page from reloading

        // 1. Gather all data from your form fields
        const formData = {
            from_name: this.from_name.value,
            from_email: this.from_email.value,
            phone_number: this.phone_number.value,
            subject: this.subject.value,
            message: this.message.value
        };

        try {
            // 2. Send data to your local Node.js server
            const response = await fetch('https://portfolio-htlz.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            // 3. Handle success or failure feedback
            if (result.success) {
                alert('Message sent successfully right to my inbox!');
                this.reset(); // Clears out the form inputs
            } else {
                alert('Failed to send: ' + result.error);
            }
        } catch (err) {
            alert('Could not connect to the backend server. Make sure node server.js is running!');
        }
    });

