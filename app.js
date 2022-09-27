// Vanilla JS Typewriter Effect

// *starts*
var typewriterEffect = { strings: ["create notes...", "edit notes...", "delete notes..."],
    typeSpeed: 100,
    cursorChar: '_',
    loop: true
  };

let typewriterText= new Typed("#typewriter-text",typewriterEffect);
// *ends*



// color array
const colorArray = ["#E7FBBE", "#D9D7F1", "#FFFDDE", "#FFCBCB", "#F3D1F4", "#E1FFB1"]


// Tools Section-JS Functionalities

// *starts*


// Making Text Bold

// let boldBtn = document.getElementById('bold-btn');
// boldBtn.addEventListener("click", makeTextBold(id));

// let selectedText = window.getSelection().toString();
// //let boldedText =  selectedText.style.fontWeight = "bold";


// function makeTextBold(id){
//   console.log("clicked bold");
//   const notes = getNotes();
//   const targetNote = notes.filter((note) => note.id == id)[0];

//   targetNote.style.backgroundColor = "red";
//   saveNotes(notes);
  
// }

// Copying Text

const copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click",() => copyTextHandler())


async function copyTextHandler() {
  let text = window.getSelection().toString();
  
  await navigator.clipboard.writeText(text);
}




// *ends*

// Other Functionalities
// *starts*
const notesContainer = document.getElementById("container");
const addNoteButton = notesContainer.querySelector(".add-note");



getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});





addNoteButton.addEventListener("click", () => addNote());




function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}




function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}




function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Jot down your thoughts!";
  element.style.backgroundColor = colorArray[Math.floor(Math.random() * 5)]

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });



//Deleting the existing Notes

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}




function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}




function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}




function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
// *ends*