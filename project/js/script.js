const MOCK_NOTES = [
    {
    id: 1,
    title: 'Работа с формами',
    content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: 'green',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Работа с формами',
    content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: 'green',
    isFavorite: true,
  },
  {
    id: 3,
    title: 'Работа с формами',
    content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: 'green',
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Работа с формами',
    content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: 'green',
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
        this.renderNotes(model.notes)
        const form = document.querySelector('.note-form');
        const inputTitle = document.querySelector('#note-title');
        const inputDescription = document.querySelector('#note-description');
        //const list = document.querySelector('.notes-list');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = inputTitle.value;
            const description = inputDescription.value;
            const color = "blue" ;// пока что не знаю что тут делать
            controller.addNote(title, description, color);
            inputTitle.value = '';
            inputDescription.value = '';

        });
    },
    renderNotes(notes) { 
        // const title = document.querySelector('label[for="note-title"]');
        // const description = document.querySelector('label[for="note-description"]');
        // const color = document.querySelector('input[type="radio"]:checked');

        
    const list = document.querySelector('.notes-list');
    let notesHTML = '';

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      console.log('Render Note:', note);

      notesHTML += `
          <li id="${note.id}" class="${note.isFavorite ? "favorite" : ""}">
            <h2 class="note-title">${note.title}</h2>
            <img class="heart-inactive" src="assets/heart-inactive.png" alt="INACTIVE">
            <img class="trash" src="assets/trash.png" alt="DELETE">
            <p class="note-title">${note.description}</p>
          </li>
        `;
    }

    list.innerHTML = notesHTML;

    },
};



const controller = {
    addNote(title, description, color) {
        if (title && title.trim() !== '' && description) {
            model.addNote(title, description, color)
        }
    },

};

function init() {
    view.init();
}

document.addEventListener('DOMContentLoaded', init);
