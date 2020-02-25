//declare variables
const date = document.querySelector('.date');
const name = document.querySelector('.name');
const subject = document.querySelector('.subject');
const senderEmail = document.querySelector('.senderemail');
const receiversEmail = document.querySelector('.receiveremail');
const message = document.querySelector('.message');
const btn = document.querySelector("#submit");

// validation
// error tags
const dateErr = document.querySelector('.date-error');
const nameErr = document.querySelector('.name-error');
const subjectErr = document.querySelector('.subject-error');
const senderEmailErr = document.querySelector('.send-email-error');
const receiversEmailErr = document.querySelector('.rec-email-error');
const messageErr = document.querySelector('.msg-error');

// refactor this
name.addEventListener('blur', () => {
  if (name.value.length < 3) {
  nameErr.style.display = 'block';
  }
  else {
    nameErr.style.display = 'none';
  }
})

subject.addEventListener('blur', () => {
  if (!subject.value) {
  subjectErr.style.display = 'block';
  }
  else {
    subjectErr.style.display = 'none';
  }
})

senderEmail.addEventListener('blur', () => {
  if (!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(senderEmail.value))) {
  senderEmailErr.style.display = 'block';
  }
  else {
    senderEmailErr.style.display = 'none';
  }
})

receiversEmail.addEventListener('blur', () => {
  if (!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(receiversEmail.value))) {
  receiversEmailErr.style.display = 'block';
  }
  else {
    receiversEmailErr.style.display = 'none';
  }
})

message.addEventListener('blur', () => {
  if (!message.value) {
  messageErr.style.display = 'block';
  }
  else {
    messageErr.style.display = 'none';
  }
})

// refactor o

//modal
const modal = document.querySelector('.modal');
const messageModal = document.querySelector('.message-modal');
const cancel = document.querySelector('.cancel');

// send request
btn.addEventListener('click', async (e) => {
  e.preventDefault();

  const body = {
    name: name.value,
    subject: subject.value,
    senderEmail: senderEmail.value,
    message: message.value,
    receiversEmail: receiversEmail.value,
    date: date.value
  }

 const response = await fetch('/api/v1/create', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(e => console.log(e));

    console.log(response)

    modal.style.display = 'block';

    if(response.message === 'entries should all be filled') {
      messageModal.textContent = 'entries should all be filled';
    }
    if (response.status === 'success') {
      messageModal.textContent = 'message saved. your scheduled mail will be sent';
    }

    if(response.message === 'back date') {
      dateErr.style.display = 'block';
    }

    else {
      dateErr.style.display = 'none';
    }
});

cancel.addEventListener('click', () => {
  modal.style.display = 'none';
})