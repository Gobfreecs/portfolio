emailjs.init('your-user-id');


const form = document.getElementById('contact-form');


form.addEventListener('submit', (e) => {
    e.preventDefault();


    const formData = new FormData(form);


    const templateParams = {
        from_name: formData.get('nom'),
        from_email: formData.get('email'),
        message: formData.get('message'),
    };


    emailjs.send('usxPP4_4jYzP7r7au', '_WHIEt1250Yf78xUpNq2w', templateParams)
        .then((response) => {
            console.log('Email sent:', response.status, response.text);
            form.reset();
        })
        .catch((error) => {
            console.error('Error sending email:', error);
        });
});
