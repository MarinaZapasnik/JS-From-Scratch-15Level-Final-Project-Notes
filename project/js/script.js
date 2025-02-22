const MOCK_NOTES = [
  {
    id: 1,
    title: 'Работа с формами',
    description: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: colors.GREEN,
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Валидация форм',
    description: 'Проверка данных на стороне клиента позволяет избежать лишних запросов на сервер и повысить удобство использования формы',
    color: 'red',
    isFavorite: true,
  },
  {
    id: 3,
    title: 'События в форме',
    description: 'Обработка событий формы, таких как submit и change, помогает управлять поведением формы и её взаимодействием с пользователем',
    color: 'purple',
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Стилизация форм',
    description: 'Используйте CSS для стилизации форм и их элементов, чтобы улучшить внешний вид и удобство использования',
    color: 'blue',
    isFavorite: false,
  },
  {
    id: 5,
    title: 'Адаптивные формы',
    description: 'Создайте формы, которые адаптируются под разные устройства и экраны, чтобы обеспечить лучшую совместимость и удобство использования',
    color: 'blue',
    isFavorite: true,
  },
  {
    id: 6,
    title: 'Динамические формы',
    description: 'Используйте JavaScript для создания динамических форм, которые изменяются в зависимости от действий пользователя',
    color: 'yellow',
    isFavorite: false,
  },
  {
    id: 7,
    title: 'Безопасность форм',
    description: 'Обеспечьте безопасность форм, защищая их от атак, таких как XSS и CSRF, и шифруя передаваемые данные',
    color: 'green',
    isFavorite: true,
  },
];


// const colors = {
//     GREEN: 'green',
//     BLUE: 'blue',
//     RED: 'red',
//     YELLOW: 'yellow',
//     PURPLE: 'purple',
// };

const messages = [
  {
    name: 'error',
    class: 'message',
    src: 'assets/AlertError.png',
    alt: 'Максимальная длина заголовка - 50 символов',
  },
  {
    name: 'done',
    class: 'message',
    src: 'assets/AlertDone.png',
    alt: 'Заметка добавлена!',
  },
  {
    name: 'delete',
    class: 'message',
    src: 'assets/AlertDelete.png',
    alt: 'Заметка удалена!',
  },
  {
    name: 'field',
    class: 'message',
    src: 'assets/AlertField.png',
    alt: 'Заполните все поля!',
  },
]

const model = {
    notes: MOCK_NOTES,
    addNote(title, description, color) {
        const newNote = {
            id: new Date().getTime(), 
            title: title.trim(),
            description: description.trim(), 
            color, // color: color
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
    showFavoriteNotes(favoriteNotes) {
      favoriteNotes = this.notes.filter(el => el.isFavorite);
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
    
    
    let colorCircle = document.querySelector('input[name="color"]:checked')
    let color = colorCircle.value;
    
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
          view.showWarningMessage(id);
        };

        
        
      });
        
      form.addEventListener("click", function (event) {
        if (event.target.name === "color") {
          color = event.target.value;
          colorCircle = event.target;
          
        };
      });

      form.addEventListener('input', function (event) {
        if (event.target.id === "note-title") {
          if (event.target.value.length > 50) {
            view.showMessage('error')
          }
        }
      });

      form.addEventListener("submit", function (event) {
          event.preventDefault();
          const title = inputTitle.value.trim();
          const description = inputDescription.value.trim();
         
          if (title.length <= 0 || description.length <= 0) {
            view.showMessage('field')
          } else {
            controller.addNote(title, description, color);
          inputTitle.value = "";
          inputDescription.value = "";  
          }
        }
          
      );
      

      filterBox.addEventListener('change', function(event) {
        
        if (event.target.classList.contains('favorite')) {
          if (event.target.checked) {
            controller.showFavoriteNotes(notes); 
          } else {
            controller.showAllNotes();
          }
        }
      });
  },

  showMessage(messageName) {
    const messageBox = document.querySelector('.messages-box');
    messageBox.innerHTML = '';
    const message = messages.find(msg => msg.name === messageName);
    if (message) {
      messageBox.innerHTML += `<div class='message'>
                                  <img class=${message.class} src=${message.src} alt=${message.alt}>
                                </div>`;
      
      const removeMessage = () => {
        const messageImg = document.querySelector('.message');
        if (messageImg) {
          messageImg.remove();
        }
        
      }
      setTimeout(removeMessage, 3000);
      
      
    }
  },

  showWarningMessage(id) {
    const messageBox = document.querySelector('.messages-box');
    messageBox.innerHTML = '';
    messageBox.innerHTML += `<div class='warning'>
                                <audio class="audio" style="display: none;">
                                    <source src="assets/sound.mp3" type="audio/mp3">
                                </audio>
                                
                              <h3>Вы действительно хотите удалить заметку?</h3>
                              <div class='buttons'>
                                <button class='yes'>Да!</button>
                                <button class='no'>Нет!</button> 
                              </div>
                              
                            </div>`;
    const audio = document.querySelector(".audio");
    audio.play();

    messageBox.addEventListener("click", function (event) {
      if (event.target.classList.contains("yes")) {
        controller.deleteNote(id);
      } 
      if (event.target.classList.contains("no")) {
        messageBox.innerHTML = "";
      }
    });                       

  },
  

  // showDoneMessage(){
  //   const messageBox = document.querySelector('.messages-box');
  //     messageBox.innerHTML += `<img class="message-done" src="assets/AlertDone.png" alt="DONE">`;
  //     const removeDoneMessage = () => {
  //       messageBox.innerHTML = '';
  //     }
  //     setTimeout(removeDoneMessage, 3500)

  // },
  
  
  // showErrorMessage(){
  //   const messageBox = document.querySelector('.messages-box');
  //     messageBox.innerHTML += `<img class="message" src="assets/AlertError.png" alt="ERROR">`;
  //     const removeErrorMessage = () => {
  //       messageBox.innerHTML = '';
  //     }
  //     setTimeout(removeErrorMessage, 3500)

  // },

  // showUnfilledMessage(){
  //   const messageBox = document.querySelector('.messages-box');
  //     messageBox.innerHTML += `<img class="message" src="assets/AlertField.png" alt="ERROR">`;
  //     const removeUnfilledMessage = () => {
  //       messageBox.innerHTML = '';
  //     }
  //     setTimeout(removeUnfilledMessage, 3500)

  // },

  // showDeleteMessage(){
  //   const messageBox = document.querySelector('.messages-box');
  //     messageBox.innerHTML += `<img class="message" src="assets/AlertDelete.png" alt="DELETE">`;
  //     const removeDeleteMessage = () => {
  //       messageBox.innerHTML = '';
  //     }
  //     setTimeout(removeDeleteMessage, 3500)

  // },
  renderNotes(notes) {
    
    const list = document.querySelector(".notes-list");
    const count = document.querySelector(".header-notes-count");
    const filterBox = document.querySelector(".filter-box");
    const countContent = model.notes.length;

    let notesHTML = "";
        
    const favoriteCheckBox = filterBox.querySelector('.favorite');
    const isFavoriteChecked = favoriteCheckBox.checked;
    const filteredNotes = (favoriteCheckBox && isFavoriteChecked)? notes.filter(note => note.isFavorite) : notes;
    
    if (countContent > 0) {
      filteredNotes.forEach(note => {
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
      });
      filterBox.style.display = 'block';
      
      notesHTML = filteredNotes.length > 0 ? notesHTML :  notesHTML += `<h2>Среди ваших заметок нет избранных!</h2>`;
      

    } else {
      
      notesHTML += `<h2>У вас нет ни одной заметки <br> 
                    Заполните поля выше и создайте свою первую заметку!</h2>`;
      filterBox.style.display = 'none';
    };
    
    list.innerHTML = notesHTML;
   
    count.textContent = countContent;
    favoriteCheckBox.checked = isFavoriteChecked;
    
    
  },
};



const controller = {
    addNote(title, description, color) {
        if (title && title.trim() !== '' && description && description.trim() !== '') {
            model.addNote(title, description, color)
            view.showMessage('done')
        }
    },
    toggleHeart(id){
      model.toggleHeart(id);
    },
    deleteNote(id) {
      if (notes.length > 0) {
        model.deleteNote(id);
        view.showMessage('delete');
        
      }
      
    },
    showFavoriteNotes(notes) {
      if (notes.length > 0) { 
      model.showFavoriteNotes(notes);
      }
    },
    showAllNotes() {
      if (model.notes.length > 0) {
        view.renderNotes(model.notes);
      }
     
    },
};

function init() {
    view.init();
}

document.addEventListener('DOMContentLoaded', init);
