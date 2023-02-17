const errors = document.querySelectorAll('.error')
const prices = document.querySelectorAll('#price')
const percents = document.querySelectorAll('.percent')
const resultAmount = document.querySelector('.resultAmount')
const resultTotal = document.querySelector('.resultTotal')
const form = document.querySelector('button[type="reset"]')
let bills = 0
let persone = 1
let tip = 1


// Verifaction of value and make error message 
const checkNumber = (e) => {
  var reg = new RegExp('^[0-9.]$');
  const data = e.data;
  if (data) {
    const isAllow = reg.test(data);
    if (!isAllow) {
      e.preventDefault();
      e.target.classList.add('activeError')

      setInterval(() => {
        e.target.classList.remove('activeError')
      }, 10000);
      return e.target.dataset.info
    }
  }
}

const activeError = (info) => {
  errors.forEach(error => {
    if (info === error.dataset.type)
      error.innerHTML = `data ivalid in ${info} field !!!`
    setInterval(() => {
      error.innerHTML = ``
    }, 10000);
    return
  })
}

// Tip and Total calcule
const calculeTip = () => {
  let amout = (bills * tip) / persone
  let total = (bills * tip)
  amout = new Intl.NumberFormat('en-US',{
    style: 'currency', currency: 'USD' 
  }).format(amout)
  total = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD'
  }).format(total)
  resultAmount.innerHTML = (amout === 'undefined') ? `$0.00` :amout 
  resultTotal.innerHTML = (total === 'undefined') ? `$0.00` : total
}

prices.forEach(price => {
  price.addEventListener('beforeinput', (e) => {
    activeError(checkNumber(e))
  })
  price.addEventListener('keyup', () => {
    prices.forEach(price => {
      if (price.dataset.info === 'bills')
        bills = parseFloat(price.value)
      else if (price.dataset.info === 'membre')
        persone = (price.value === 'NaN') ? 1 : parseInt(price.value)
    })
    calculeTip()
  })
})



percents.forEach(percent => {
  percent.addEventListener('click', (e) => {
    percents.forEach(percent => {
      percent.classList.remove('active')
    });
    e.target.classList.add('active');
    if (e.target.classList.contains('custom')){
      e.target.addEventListener('input',()=>{
        tip = parseFloat((e.target.value)/100)
        calculeTip()
      })
    }
    else{
        tip = parseFloat(e.target.dataset.percent)
    }
    calculeTip()
    e.preventDefault()
  })
})









