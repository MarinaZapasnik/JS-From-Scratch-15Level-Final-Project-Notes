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
    notes: MOCK_NOTES,
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
    
    
    };

const view = {
  init() {
    this.renderNotes(model.notes);
    const form = document.querySelector(".note-form");
    const inputTitle = document.querySelector("#note-title");
    const inputDescription = document.querySelector("#note-description");
    const choiseColor = document.querySelector(".radio-list");
    let color = document.querySelector('input[name="color"]:checked').value;
    
    choiseColor.addEventListener("change", function (event) {
      if (event.target.name === "color") {
        color = event.target.value;
      }

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = inputTitle.value;
        const description = inputDescription.value;

        controller.addNote(title, description, color);
        inputTitle.value = "";
        inputDescription.value = "";

        
      });
    });
  },
  
  renderNotes(notes) {
    const list = document.querySelector(".notes-list");
    const count = document.querySelector(".header-notes-count");

    let notesHTML = "";
    let countContent = notes.length;

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
        notesHTML += `
              <li class="note-frame ${note.color} ${
          note.isFavorite ? "favorite" : ""
        }" id="${note.id}">
                  <div class="note-frame-header">
                      <h2 class="note-title">${note.title}</h2>
                      <div class="note-icons">
                          <img class="heart-inactive" src="assets/heart-inactive.png" alt="INACTIVE">
                          <img class="trash" src="assets/trash.png" alt="DELETE">
                      </div>
                  </div>
                  <p class="note-description">${note.description}</p>
              </li>
              `;
    }
    count.textContent = countContent
    list.innerHTML = notesHTML;
  },
};



const controller = {
    addNote(title, description, color) {
        if (title && title.trim() !== '' && description && description.trim() !== '') {
            model.addNote(title, description, color)
            //else {} в дальнейшем добавим сообщения об ошибках!
        }
    },
    
};

function init() {
    view.init();
}

document.addEventListener('DOMContentLoaded', init);
