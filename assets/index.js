// Verifaction of value and make error message 
const errors = document.querySelector('.error')
const price = document.querySelector('#price')

const checkNumber = (e)=>{
  var reg = new RegExp('^[0-9]$');
  var text = price.value
  if(reg.test(e.key))
    price.style.border = `1px solid green`
  else 
    console.log(text)
    
}

price.addEventListener('keydown',checkNumber)