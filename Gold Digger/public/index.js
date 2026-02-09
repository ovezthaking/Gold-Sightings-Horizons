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


document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
})
