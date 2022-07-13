let bill = document.getElementById('bill')
let people = document.getElementById('people')
let tips = document.querySelectorAll('.card-tip')
let customTip = document.getElementById('customTip')
let tipSelected
let resetButton = document.getElementById('reset')
let errors = document.querySelectorAll('.text-error')
let tipValue = document.getElementById('tipValue')
let totalValue = document.getElementById('total')
let specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/


function removeTip() {
    tips.forEach((e) => e.classList.remove('active'))
    customTip.classList.remove('active')
    tipSelected = undefined
}


function resetAll() {
    bill.value = ''
    people.value = ''
    totalValue.innerHTML = '0'
    tipValue.innerHTML = '0'
    removeTip()
}

function isAllFull() {
    return bill.value != '' && tipSelected && people.value != ''
}

function calculate() {
    if(!isAllFull) return
    if(!tipSelected) return
    if(people.value == '') return
    let tipChoosed
    
    if(tipSelected.classList.contains('card-tip')) tipChoosed = tipSelected.innerHTML
    else tipChoosed = tipSelected.value

    let tip = (Number(tipChoosed.replace('%', '')) / 100) * Number(bill.value.replace(',', '.')) / Number(people.value)
    let total = Number(bill.value.replace(',', '.')) / Number(people.value)
    tipValue.innerHTML = String(tip.toFixed(2)).replace('.', ',')
    console.log(total)
    totalValue.innerHTML = total.toFixed(2).replace('.', ',')
}

resetButton.addEventListener('click', resetAll)

bill.addEventListener('input', (e) => {
    e.target.value =  e.target.value.replace(/[a-z]/g, '').replace(specialChar, '')
    if(isNaN(e.target.value.replace(',', '.'))) {
        bill.classList.add('input-error')
        errors[0].classList.remove('none')
        return
    }
    bill.classList.remove('input-error')
    errors[0].classList.add('none')
    calculate()
})

people.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
    if(e.target.value === '0') {
        errors[1].classList.remove('none')
        people.classList.add('input-error')
        people.maxLength = 1
        return
    }
    errors[1].classList.add('none')
    people.classList.remove('input-error')
    people.maxLength = 9999999999999999
    calculate()
})

customTip.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[a-z]/g, '').replace(/[^0-9]/g, '')
    calculate()
})

customTip.addEventListener('change', (e) => {
    if(!e.target.value.includes('%') && e.target.value != '') {
        
        removeTip()
        e.target.value += '%'
        customTip.classList.add('active')
        tipSelected = customTip
        calculate()
    }
})

tips.forEach((tip) => {
    
    tip.addEventListener('click', () => {
        removeTip()
        customTip.value = ''
        tip.classList.add('active')
        tipSelected = tip
        calculate()
    })
})