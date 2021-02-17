const prodListElement = document.querySelector('.product-list')
const prodElements = prodListElement.querySelectorAll('.product-item')

// Перебираем все элементы списка и присваиваем нужное значение
for (const prod of prodElements) {
  prod.draggable = true
  const tt = prod.querySelectorAll('a, img')
  tt.forEach(el => el.ondragstart = () => false)
}

prodListElement.addEventListener('dragstart', (evt) => {
  evt.target.closest('.product-item').classList.add('selected')
})

prodListElement.addEventListener('dragend', (evt) => {
  const curEl = evt.target.closest('.selected')
  const dd = document.querySelector('.dd-current')
  dd.before(curEl)
  dd.classList.remove('dd-current')
  curEl.classList.remove('selected')
})

const getNextElement = (cursorPosition, currentElement) => {
  // Получаем объект с размерами и координатами
  const currentElementCoord = currentElement.getBoundingClientRect();
  // Находим горизонтальную координату центра текущего элемента
  const currentElementCenter = currentElementCoord.x + currentElementCoord.width / 2
  // Если курсор левее центра элемента, возвращаем текущий элемент
  // В ином случае — следующий DOM-элемент
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling
  return nextElement
}

prodListElement.addEventListener('dragenter', (evt) => {
  evt.preventDefault()
  const curEl = evt.target.closest('.product-item')
  if (!curEl) return
  const nextElement = getNextElement(evt.clientX, curEl)
  const dd = document.querySelectorAll('.dd-current')
  dd.forEach(el => el.classList.remove('dd-current'))
  nextElement.classList.add('dd-current')
})
