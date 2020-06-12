const getAllItems = () => {
  axios.get('/api/items')
    .then(({ data: items }) => {
      document.getElementById('items').innerHTML = ''
      items.forEach(item => {
        let itemElem = document.createElement('li')
        if (item.isDone) {
          itemElem.style.color = 'green'
        }
        itemElem.textContent = item.text
        document.getElementById('items').append(itemElem)
      })
    })
}

document.getElementById('addItem').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/items', {
    text: document.getElementById('item').value,
    isDone: false
  })
    .then(({ data: item }) => {
      let itemElem = document.createElement('li')
      itemElem.textContent = item.text
      document.getElementById('items').append(itemElem)
      document.getElementById('item').value = ''
    })
    .catch(err => {
      console.log(err)
      document.getElementById('item').value = ''
    })
})

getAllItems()