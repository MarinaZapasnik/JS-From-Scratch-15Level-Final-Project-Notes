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
    toggleHeart(id) {
      const note = this.notes.find(note => note.id === id);
      note.isFavorite = !note.isFavorite
      view.renderNotes(this.notes);
    },
    deleteNote(id) {
      this.notes = this.notes.filter(el => el.id !== id);
      view.renderNotes(this.notes);
    },
    showFavoriteNotes() {
      const favoriteNotes = this.notes.filter(el => el.isFavorite);
      view.renderNotes(favoriteNotes);
    },
    };

const view = {
 
  init() {
    this.renderNotes(model.notes);
    const box = document.querySelector('.box');
    const form = document.querySelector(".note-form");
    const inputTitle = document.querySelector("#note-title");
    const inputDescription = document.querySelector("#note-description");
    
    let color = document.querySelector('input[name="color"]:checked').value;
    
    const filterBox = document.querySelector(".filter-box");

    

      box.addEventListener('click', function(event) {
        const noteFrame = event.target.closest('.note-frame');
        if (!noteFrame) {
          return
        }
        const id = +noteFrame.id;
        

        if (event.target.classList.contains('heart-inactive') || event.target.classList.contains('heart-active')) {
          controller.toggleHeart(id);
        };
        if (event.target.classList.contains('trash')) {
          controller.deleteNote(id);
        };
        
      });
        
      form.addEventListener("click", function (event) {
        if (event.target.name === "color") {
          color = event.target.value;
        };
      });

      form.addEventListener("submit", function (event) {
          event.preventDefault();
          const title = inputTitle.value;
          const description = inputDescription.value;

          controller.addNote(title, description, color);
          inputTitle.value = "";
          inputDescription.value = "";
      });
      

      filterBox.addEventListener('change', function(event) {
        if (event.target.classList.contains('favorite')) {
          if (event.target.checked) {
            controller.showFavoriteNotes();
          } else {
            controller.showAllNotes();
          }
        }
      });
  },

  showDoneMessage(){
    const messageBox = document.querySelector('.messages-box');
      messageBox.innerHTML += `<img src="assets/AlertDone.png" alt="DONE">`;
      const removeMessage = () => {
        messageBox.innerHTML = '';
      }
      setTimeout(removeMessage, 2000)

  },
  
  renderNotes(notes) {
    
    const list = document.querySelector(".notes-list");
    const count = document.querySelector(".header-notes-count");
    const filterBox = document.querySelector(".filter-box");
    let countContent = notes.length;

    let notesHTML = "";
    let filterBoxContent = "";
    const isFavoriteChecked = filterBox.querySelector('.favorite').checked;

    if(countContent > 0) {
      filterBoxContent = filterBox.innerHTML;
      for (let i = 0; i < countContent; i++) {
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
      };

    } else {
      filterBoxContent = ''
      notesHTML += `<h2>У вас нет ни одной заметки <br> 
                    Заполните поля выше и создайте свою первую заметку!</h2>`
    };
    
    list.innerHTML = notesHTML;
    filterBox.innerHTML = filterBoxContent;
    count.textContent = countContent;
    filterBox.querySelector('.favorite').checked = isFavoriteChecked;
    
  },
};



const controller = {
    addNote(title, description, color) {
        if (title && title.trim() !== '' && description && description.trim() !== '') {
            model.addNote(title, description, color)
            view.showDoneMessage()
        }
    },
    toggleHeart(id){
      model.toggleHeart(id);
    },
    deleteNote(id) {
      model.deleteNote(id);
    },
    showFavoriteNotes() {
      model.showFavoriteNotes();
    },
    showAllNotes() {
      view.renderNotes(model.notes);
    },
};

function init() {
    view.init();
}

document.addEventListener('DOMContentLoaded', init);
