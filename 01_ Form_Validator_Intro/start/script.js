const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      console.log('checksuccess');
      showSuccess(input);
    }
  });

  return isRequired;
}

function checkLength(input, min, max) {
  const regexlength = `\\w{${min},${max}}`;
  // 先將regex要輸入的字串存入一個變數，前面兩個\\是為了讓第2個\可以跑得出來
  const lengthvalid = new RegExp(regexlength, 'g');
  //只有這樣我們才可以用template string放變數進去進行比對
  const formControl = input.parentElement;
  //找input的parent 就是formControl
  if (lengthvalid.test(`${input.value}`)) {
    formControl.classList.add('success');
  } else {
    showError(
      username,
      `${getFieldName(
        username
      )} must be must be between ${min}-${max} characters`
    );
  }
}
// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}
// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  //將輸入資料傳入驗證function
  //Validation list : "",length,email format,username contain aleast 1 alphabet Cap,password match

  if (!checkRequired([username])) {
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }
});
