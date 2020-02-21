const date = document.querySelector('.date');
const name = document.querySelector('.name');
const subject = document.querySelector('.subject');
const senderEmail = document.querySelector('.senderemail');
const receiversEmail = document.querySelector('.receiveremail');
const message = document.querySelector('.message');
const btn = document.querySelector("#submit");

console.log(date.value)
console.log(name)
console.log(subject)
console.log(senderEmail)
console.log(receiversEmail)
console.log(message)





btn.addEventListener('click', async e => {
  e.preventDefault();

  const body = {
    name: name.value,
    subject: subject.value,
    senderEmail: senderEmail.value,
    message: message.value,
    receiversEmail: receiversEmail.value,
    date: date.value
}

fetch('/api/v1/create', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => console.log(res))
    .catch(e => console.log(e));

    
});