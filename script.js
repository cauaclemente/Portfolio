
const Menu = document.querySelector('.menu')
const Bar = document.querySelector('.nav-menu')

Menu.addEventListener('click', () => {
  Menu.classList.toggle('ativo')
  Bar.classList.toggle('ativo')
})
document.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    Menu.classList.remove('ativo');
    Bar.classList.remove('ativo');
  });
});

var radio = document.querySelectorAll('.manual-btn')
var count =1

document.getElementById('radio1').checked =true;

setInterval( function(){
  nextImage();
}, 6000)

function nextImage(){
    count++
    if(count > 4){
        count = 1
    }


document.getElementById('radio'+count).checked =true;
}

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();
  