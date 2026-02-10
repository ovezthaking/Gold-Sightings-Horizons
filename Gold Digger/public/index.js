const eventSource = new EventSource('/api/price')

const priceEl = document.getElementById('price-display')


eventSource.onmessage = (e) => {
    const data = JSON.parse(e.data)
    priceEl.innerText = parseFloat(data.price)
}

eventSource.onerror = () => {
    console.error('Connection lost. Reconnecting...')
}


document.addEventListener('input', (e) => {
    if (e.target.id !== 'investment-amount') {
        return
    }

    if (e.target.value === '') {
        return
    }

    const value = Number(e.target.value)
    if (Number.isNaN(value) || value < 0) {
        e.target.value = 0
    }
})


document.getElementById('close-btn').addEventListener('click', () => {
    document.querySelector('dialog').style.display = 'none'
})


document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const dialog = document.querySelector('dialog')
    const dialogText = document.getElementById('investment-summary')

    const data = {
        amount: document.getElementById('investment-amount').value,
        currentPrice: document.getElementById('price-display').textContent
    }

    if (!data.amount || !data.currentPrice) {
        alert('U haven\'t provided any price or an error ocurred')
        return
    }

    const ounces = data.amount/data.currentPrice

    try {
        const resposne = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        dialog.style.display = 'block'
        if (resposne.ok) {
            dialogText.textContent = `You just bought ${ounces} ounces (ozt) for ${data.amount}. \n You will receive documentation shortly.`
        } else {
            dialogText.textContent = 'Something gone wrong. Please try again'
        }
    } catch (err) {
        dialogText.textContent = 'Server crashed'
        console.error('Error: ', err)
    }

})
