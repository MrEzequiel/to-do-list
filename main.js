const getToDoList = () => JSON.parse(localStorage.getItem('todoList')) ?? []

const setToDo = toDoListMemory =>
  localStorage.setItem('todoList', JSON.stringify(toDoListMemory))

const toDoList = document.querySelector('.to-do')

const createItem = (text, status, id) => {
  const item = document.createElement('div')
  item.classList.add('item-to-do')
  item.innerHTML = `
  <input type="checkbox" class="input-check" ${status} data-id="${id}" />
  <div class="item">
    <p>${text}</p>
  </div>
  <input type="button" value="X" class="to-do-delete" data-id="${id}" />
  `

  toDoList.prepend(item)
}

const cleanScreen = () => {
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.lastChild)
  }
}

const updateScreen = () => {
  cleanScreen()
  let toDoListMemory = getToDoList()
  toDoListMemory.forEach((item, index) =>
    createItem(item.text, item.status, index)
  )
}

const newToDo = event => {
  const key = event.key
  const click = event.type

  let toDo = document.querySelector('#new-to-do').value

  if (key === 'Enter' || click === 'click') {
    const toDoListMemory = getToDoList()
    toDoListMemory.push({
      text: `${toDo}`,
      status: ''
    })
    setToDo(toDoListMemory)
    updateScreen()
    document.querySelector('#new-to-do').value = ''
  }
}

const deleteToDo = index => {
  const toDoListMemory = getToDoList()
  toDoListMemory.splice(index, 1)
  setToDo(toDoListMemory)
  updateScreen()
}

const updateItem = index => {
  const toDoListMemory = getToDoList()
  if (toDoListMemory[index].status === '') {
    toDoListMemory[index].status = 'checked'
  } else {
    toDoListMemory[index].status = ''
  }
  setToDo(toDoListMemory)
  updateScreen()
}

const clickToDo = event => {
  const element = event.target
  if (element.type === 'button') {
    let index = element.dataset.id
    deleteToDo(index)
  } else if (element.type === 'checkbox') {
    let index = element.dataset.id
    updateItem(index)
  }
}

document.querySelector('#new-to-do').addEventListener('keypress', newToDo)

document.querySelector('.add-to-do').addEventListener('click', newToDo)

toDoList.addEventListener('click', clickToDo)

updateScreen()
