const eventSource = new EventSource('/api/price')

const priceEl = document.getElementById('price-display')


eventSource.onmessage = (e) => {
    const data = JSON.parse(e.data)
    priceEl.innerText = parseFloat(data.price)
}

eventSource.onerror(() => {
    console.error('Connection lost. Reconnecting...')
})