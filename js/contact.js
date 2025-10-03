document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const formMessages = document.getElementById('form-messages');

  let errors = [];

  // Validation du nom
  if (name.value.trim() === '') {
    errors.push('Le nom est requis.');
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === '') {
    errors.push('L’email est requis.');
  } else if (!emailRegex.test(email.value.trim())) {
    errors.push('Le format de l’email est invalide.');
  }

  // Validation du message
  if (message.value.trim() === '') {
    errors.push('Le message est requis.');
  }

  // Affichage des erreurs ou succès
  if (errors.length > 0) {
    formMessages.style.color = 'red';
    formMessages.innerHTML = errors.join('<br>');
  } else {
    formMessages.style.color = 'green';
    formMessages.innerHTML = 'Message envoyé avec succès !';
    // Optionnel : reset du formulaire
    document.getElementById('contact-form').reset();
  }
});