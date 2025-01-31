const MOCK_NOTES = [
    {
    id: 1,
    title: 'Работа с формами',
    description: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: 'green',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Работа с формами',
    description: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: 'red',
    isFavorite: true,
  },
  {
    id: 3,
    title: 'Работа с формами',
    description: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: 'purple',
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Работа с формами',
    description: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: 'blue',
    isFavorite: false,
  },
];

const colors = {
    GREEN: 'green',
    BLUE: 'blue',
    RED: 'red',
    YELLOW: 'yellow',
    PURPLE: 'purple',
};

const model = {
    notes: [],
    addNote(title, description, color) {
        const newNote = {
            id: new Date().getTime(), 
            title: title,
            description: description, 
            color: color,
            isFavorite: false,
        }
        this.notes.unshift(newNote); 
        view.renderNotes(this.notes);
    },
    toggleHeart(id) {
      const note = this.notes.find(note => note.id === id);
      note.isFavorite = !note.isFavorite
      
      view.renderNotes(this.notes);
    }
    
    
    };

const view = {
  init() {
    this.renderNotes(model.notes);
    const form = document.querySelector(".note-form");
    const inputTitle = document.querySelector("#note-title");
    const inputDescription = document.querySelector("#note-description");
    const choiseColor = document.querySelector(".radio-list");
    let color = document.querySelector('input[name="color"]:checked').value;
    const list = document.querySelector(".notes-list");
    
      choiseColor.addEventListener("change", function (event) {
        if (event.target.name === "color") {
          color = event.target.value;
        };

        form.addEventListener("submit", function (event) {
          event.preventDefault();
          const title = inputTitle.value;
          const description = inputDescription.value;

          controller.addNote(title, description, color);
          inputTitle.value = "";
          inputDescription.value = "";

          
        });
      });
      list.addEventListener('click', function(event) {
        if (event.target.classList.contains('heart-inactive') || event.target.classList.contains('heart-active')) {
          const id = +event.target.closest('.note-frame').id
          controller.toggleHeart(id);
        }
      })


  },
  
  renderNotes(notes) {
    const list = document.querySelector(".notes-list");
    const count = document.querySelector(".header-notes-count");
    const filterBox = document.querySelector(".filter-box")

    let notesHTML = "";
    let countContent = notes.length;
    let filterBoxContent = ""

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
        notesHTML += `
              <li class="note-frame ${note.color} ${note.isFavorite ? "favorite" : ""}" id="${note.id}">
                  <div class="note-frame-header">
                      <h2 class="note-title">${note.title}</h2>
                      <div class="note-icons">
                          <img class="${note.isFavorite ? "heart-active" : "heart-inactive"}" 
                          src="${note.isFavorite ? "assets/heart-active.png" : "assets/heart-inactive.png"}" alt="favorite">
                          <img class="trash" src="assets/trash.png" alt="DELETE">
                      </div>
                  </div>
                  <p class="note-description">${note.description}</p>
              </li>
              `;
    }

    if (+countContent <= 0) {
        filterBoxContent += `<h2>У вас нет еще ни одной заметки <br> 
                            Заполните поля выше и создайте свою первую заметку!</h2>`
    }

    count.textContent = countContent;
    list.innerHTML = notesHTML;
    filterBox.innerHTML = filterBoxContent;
  },
};



const controller = {
    addNote(title, description, color) {
        if (title && title.trim() !== '' && description && description.trim() !== '') {
            model.addNote(title, description, color)
            //else {} в дальнейшем добавим сообщения об ошибках!
        }
    },
    toggleHeart(id){
      model.toggleHeart(id);
    }
    
};

function init() {
    view.init();
}

document.addEventListener('DOMContentLoaded', init);
