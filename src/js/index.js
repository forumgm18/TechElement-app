// =================== Часть 1 ===============================

const tabToggle = document.querySelector('[data-tab-toggle]')
const menuItems = document.querySelectorAll('[data-menu-lvl]')

tabToggle.addEventListener('mouseenter', (e) => {
  document.querySelector('[data-product-list]').classList.add('tab-mode')
})
tabToggle.addEventListener('mouseleave', (e) => {
  document.querySelector('[data-product-list]').classList.remove('tab-mode')
})
menuItems.forEach(el => {
  el.addEventListener('mouseenter', e => e.currentTarget.classList.add('opened'))
  el.addEventListener('mouseleave', e => e.currentTarget.classList.remove('opened'))
})

// =================== Часть 2 ===============================

const editItems = document.querySelectorAll('[data-edit-product]')

const formTemplate = (productId, productTitle) => `
  <div class="product-edit" data-insert-form>
    <form class="product-edit-form">
      <input type="text" name="productId" hidden value="${productId}">
      <input type="text" name="title" value="${productTitle}">
      <button class="btn" type="submit">Готово</button>
    </form>
   </div>`

editItems.forEach(el => {
  el.addEventListener('click', e => {
    let currentTitle = e.currentTarget.textContent
    let currentId = e.currentTarget.dataset.id
    let parent = e.currentTarget.parentNode
    if (!parent.querySelector('[data-insert-form]')) {
      parent.insertAdjacentHTML('beforeend', formTemplate(currentId, currentTitle))
    }
    parent.querySelector('[data-insert-form]').classList.add('opened')
    const form = parent.querySelector('form')
    form.addEventListener('submit', formSubmit )
    form.querySelector('input').value = currentTitle
  })
})

const formSerialize = (form) => {
  let input = form.getElementsByTagName("input")
  let formData = {}
  for (let i = 0; i < input.length; i++) {
    if (input[i].name.length > 0) formData[input[i].name] = input[i].value
  }
  return formData
}

const formSubmit = async (e) => {
  e.preventDefault()
  let url = 'https://techelement.ru/post.php'
  let formData = formSerialize(e.target)
  let response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(formData)
  })
   e.target.closest('[data-insert-form]').classList.remove('opened')
  if (response.ok) {
    // const res = await response.json()
    alert("Изменения сохранены!")

  } else {
    alert("Ошибка отправки формы!")
  }

}
// =================== Часть 3 ===============================
import './drag-drop'

// =================== Часть 4 ===============================
import './parentheses'




