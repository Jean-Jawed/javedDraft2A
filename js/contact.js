document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const formWrapper = document.querySelector('.contact__form-wrapper');
    const successMessage = document.getElementById('contactSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(function (response) {
                    if (response.ok) {
                        form.style.display = 'none';
                        successMessage.style.display = 'block';
                        form.reset();
                    } else {
                        throw new Error('Erreur lors de l\'envoi');
                    }
                })
                .catch(function (error) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    alert('Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.');
                });
        });
    }
});