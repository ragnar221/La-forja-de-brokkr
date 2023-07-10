const form = document.getElementById("form");
const userName = document.getElementById('user');
const pass = document.getElementById("pass");
const confirmPass = document.getElementById("confirm-pass");
const age = document = document.getElementById("age");
const phoneNumber = document.getElementById("phone");
const eMail= document.getElementById("email");
const parrafo = document.getElementById('error');
const regBtn = document.querySelector("enviar");
const regName = document.getElementById("first-name");

let registry = JSON.parse(localStorage.getItem("registry")) || [];

const saveRegistry = () => {
    localStorage.setItem("registry",JSON.stringify(registry));
};

  form.addEventListener('submit',(e)=> {
        e.preventDefault();
        let error = '';
        let enviar = false;
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if (userName.value.length < 6) {
            error += `debes usar un nombre de mas de seis caracteres <br>`;
            enviar = true;
        }
        if (!validatePasswordSymbol(pass.value)) {
            error += `la contraseña debe tener una mayuscula, minuscula, numero y simbolo <br>`;
            enviar = true;
        }
        if (!confirmPassword(pass.value, confirmPass.value)) {
            error += `Las contraseñas no coinciden <br>`;
            enviar = true;
        }
        if (age.value.length > 110) {
            error += `numero de edad excesivo <br>`;
            enviar = true;
        }
        
        if (!regexEmail.test(eMail.value)) {
            error += `La direccion de E-Mail no es valida`;
            enviar = true;
        }
        if (!validatePhone(phoneNumber.value)) {
            error += `el numero de telefono no es valido <br>`;
            enviar = true;
        }
        if (enviar) {
            parrafo.classList.add('errores');
            parrafo.innerHTML = error;
        } else {
            parrafo.classList.add('ok');
            parrafo.innerHTML = 'enviado';
        }
            
           });
        
   

    const validatePasswordSymbol = (password) => {
        let re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return re.test(password);
    };
    const confirmPassword = (password, confirmPassword) => {
        return password === confirmPassword;
    };
    
    const validatePhone = (phoneNumber) => {
    let re = /^\d{10}$/;
    return re.test(phoneNumber);
    };

    const SubmitHandler = () => {
        let newUser = userName.value;
        registry = [...registry, newUser];
        userName.value ="";
        saveRegistry();
    };


    const init = () => {
        form.addEventListener('submit',SubmitHandler);
    };

    init();

