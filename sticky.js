//  checking the key pressed for saving note data
document.addEventListener("keydown",(e) => {
    if(e.ctrlKey && e.key === "s"){
        e.preventDefault();
        SaveNoteData();
    }
});

const Container = document.getElementById("container");
let selectedText = "",
 rangeAT="";
 let noteData = localStorage.getItem("noteData") || [];

readNoteData();
 function readNoteData(){
    noteData = JSON.parse(noteData);


    noteData.forEach((element) => {
        createNewNote(element.value);
    });
 }
// creating new note
function createNewNote(e) {
    let div = document.createElement("div");
    div.classList.add("note-row");

    let newNoteHTML = `<div class="note-row" id="note-row">
                        <div class="note-editor" contenteditable="true" onmouseup="getSelectedText()" id="note-editor">`+ 
                        e +
                        `</div>
                        <div class="note-controls">
                            <div onclick="getSelectedStyle('capitalize')" class="capitalize">Aa</div>
                            <div onclick="getSelectedStyle('bold')" class="bold">B</div>
                            <div onclick="getSelectedStyle('italic')" class="italic">I</div>
                            <div onclick="getSelectedStyle('underline')" class="underline">U</div>
                            <div onclick="getSelectedStyle('lineThrough')" class="lineThrough">ab</div>
                            <div onclick="DeleteNote(this)" class="delete">del</div>
                        </div>
                     </div>`;
    div.innerHTML = newNoteHTML;
    Container.appendChild(div);

    const noteEditorData = document.querySelectorAll(".note-editor");
    noteEditorData.forEach((element) => {
        element.addEventListener("keypress", (e)=>{
            if(e.key === "Enter"){
                document.execCommand("insertHTML", false, "<br />");
                return false;
            }
        })
    });
}
//  saving note data
function SaveNoteData() {
    noteData=[];
    localStorage.setItem("noteDate", []);
    const noteEditorData = document.querySelectorAll(".note-editor");
    noteEditorData.forEach((element) => {
        if(element.innerHTML !== "") {
            let html = {value: element.innerHTML}
            noteData.push(html);
        }

    });
    localStorage.setItem("noteData", JSON.stringify(noteData));
}


// To get selected text for modification
function getSelectedText(){
    selectedText = (window.getSelection().toString());
    rangeAT = window.getSelection().getRangeAt(0);
}

// Function to modify the selected text
// e is used as a holder element for the style
function getSelectedStyle(e){
    if (selectedText){
    let div = document.createElement("span");
    div.classList.add(e);
    div.innerHTML = selectedText;
    rangeAT.deleteContents()
    rangeAT.insertNode(div);
    }
}
// Delete note
function DeleteNote(e) {
    
    let conform = confirm("Are you sure! Do you want to Delete?");
    if (conform){
        e.parentElement.parentElement.remove();
        SaveNoteData();
    }
}
const headEl=document.querySelector(".heading");
const sticky = ["Sticky Notes"]
let stickyIndex = 0;

let characterIndex = 0;
updateText();
function updateText(){
    headEl.innerHTML = ` <h1>${sticky[stickyIndex].slice(0,characterIndex)}</h1>`;
    characterIndex++;
    setTimeout(updateText, 400);
}