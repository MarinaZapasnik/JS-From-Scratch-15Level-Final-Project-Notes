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
]

const colors = {
    GREEN: 'green',
    BLUE: 'blue',
    RED: 'red',
    YELLOW: 'yellow',
    PURPLE: 'purple',
}

const model = {
    notes: MOCK_NOTES,
    addNote(title, description, color) {
        const newNote = {
            id: new Date().getTime(), 
            title: title,
            content: description, 
            color: color;
            isFavorite: false,
        }
        this.notes.unshift(newNote); 
        view.renderNotes(this.notes);
      },
}

const view = {
    init() {
        this.renderNotes(model.notes)
        const form = document.querySelector('.note-form');
        const inputTitle = document.querySelector('#note-title');
        const inputDescription = document.querySelector('#note-description');
        const list = document.querySelector('.notes-list');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = inputTitle.value;
            const description = inputDescription.value;
            const color ;
            controller.addNote(title, description, color);


        })
    },
    renderNotes(notes) { 
        const title = document.querySelector('label[for="note-title"]')
        const description = document.querySelector('label[for="note-description"]')
    }
}



const controller = {
    addNote(title, description, color) {
        if (title && title.trim() !== '' && description) {
            model.addNote(title, description, color)
        }
    },

}

function init() {
    view.init()
}
   
  init()
   