import axios from 'https://cdn.skypack.dev/axios';

const form = document.querySelector('#register-form')
form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault() 

  const name = document.querySelector('#name').value
  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value
  const passconfirmation = document.querySelector('#passconfirmation').value

  const formData = {
    name: name,
    email: email,
    password: password,
    passconfirmation: passconfirmation
  }

  axios.post('http://localhost:3000/cadastro', formData)
    .then(response => {
      const messageContainer = document.querySelector('#message-container');
      messageContainer.innerHTML = '<p>Cadastro realizado com sucesso!</p>';
    })
    .catch(error => {
      const messageContainer = document.querySelector('#message-container');
      messageContainer.innerHTML = '<p>Ocorreu um erro ao fazer a solicitação.</p>';

    })
}