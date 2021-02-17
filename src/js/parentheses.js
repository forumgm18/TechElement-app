// Генерирует строку из n пар скобок
const getParentheses = (n) =>{
  const par = ['()','{}','[]'] // варианты скобок
  const parCount = [0, 0, 0]   // количество выпавших скобок каждого типа
  let res='',   // результат
    tmp = []  // стек
  // Возвращает парную скобку к открывающей
  const getPar = (s) =>  par.find(el => el[0] === s)[1]
  // Закрывающая/Открывающая (true/false) скобка
  const isClose = () => Math.random() < 0.5
  // Тип скобки (индекс) из par[]
  const ind = () => {
    const t = Math.random() // Случайное число
    let r = t < 0.33 ? 0 : t < 0.66 ? 1 : 2 // Тестируем t и возвращаем индекс: 0, 1 или 2
    if (parCount[r] !== 0) { // Скобка с таким индексом уже выпадала
      let r1 = parCount.indexOf(0) // ищем индекс еще не выпадавшей скобки
      if (r1 >= 0) r = r1          // если найден - возвращаем новый индекс скобки
    }
    parCount[r]++   // увеличиваем счетчик выпадения скобки
    return r
  }
  let i, openCount = 1, closeCount = 0 // Счетчики

  res = par[ind()][0] // помещаем открывающую скобку в результат
  tmp.push(res)       // и в стек

  while (res.length < 2*n) {
    i = ind()
    if (isClose() && tmp.length && closeCount < n) { // закрывающая скобка
      res += getPar(tmp.pop())
      closeCount++
    } else if (openCount < n) {         // открывающая скобка
      res += par[i][0]
      tmp.push(par[i][0])
      openCount++
    }
  }
  return res
}
// Проверяет баланс скобок в строке
function isBalanced(str) {
  // пары открывающих-закрывающих скобок
  let br = "(){}[]"
  // стек открытых скобок
  let st = []
  let p = 0 // количество скобок
  // бежим по всей строке
  for (let i = 0; i < str.length; ++i) {
    // текущий символ
    let ch = str[i]
    // ищем символ в скобках
    let ind = br.indexOf(ch)
    // если скобка найдена
    if (ind >= 0) {
      p++
      // проверяем, какая это скобка
      if (ind % 2 !== 0) { // нечетная => закрывающая , проверяем стек
        // стек пуст - ошибка порядка
        if (!st.length) return false
        // извлекаем последнюю открытую скобку из стека
        let last_br = st.pop()
        // если она не соответствует закрывающей скобке - тоже ошибка порядка
        if (last_br !== br[ind - 1]) return false
      } else { // открывающую скобку просто помещаем в стек
        st.push(ch)
      }
    }
  }
  // если после обхода всей строки стек пуст - ошибок нет
  return !st.length && p
}

const numInp = document.getElementById('num')
const numBtn = document.getElementById('num-btn')
const numRes = document.getElementById('num-res')
numBtn.addEventListener('click', (e) => {
  e.preventDefault()
  numRes.textContent = ''
  let n = parseInt(numInp.value, 10)
  let res = getParentheses(n)
  numRes.textContent = res
})

const parInp = document.getElementById('txt-par')
const parBtn = document.getElementById('par-btn')
const parRes = document.getElementById('par-res')
parBtn.addEventListener('click', (e) => {
  e.preventDefault()
  parRes.textContent = ''
  let s = parInp.value.trim()
  if (!s.length) return
  let res = isBalanced(s) ? 'Верно' :'Не верно'
  parRes.textContent = res
})
