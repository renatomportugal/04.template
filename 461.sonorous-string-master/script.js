// inspired by ANDRE LUIS SIQUEIRA ARAUJO's work: // https://codepen.io/aluis92/pen/YeMWjr

let soundURLS =  [
  {
    id: "string1",
    url: "https://eko.com/s/sonorous/demos/string_master/string1.mp3"
  },
  {
    id: "string2",
    url: "https://eko.com/s/sonorous/demos/string_master/string2.mp3"
  },
  {
    id: "string3",
    url: "https://eko.com/s/sonorous/demos/string_master/string3.mp3"
  },
  {
    id: "string4",
    url: "https://eko.com/s/sonorous/demos/string_master/string4.mp3"
  },
  {
    id: "string5",
    url: "https://eko.com/s/sonorous/demos/string_master/string5.mp3"
  },
  {
    id: "wrong1",
    url: "https://eko.com/s/sonorous/demos/string_master/wrong1.mp3"
  },
  {
    id: "wrong2",
    url: "https://eko.com/s/sonorous/demos/string_master/wrong2.mp3"
  },
  {
    id: "wrong3",
    url: "https://eko.com/s/sonorous/demos/string_master/wrong3.mp3"
  },
]

if (window.Sonorous && window.Sonorous.isSupported()) {
  // iterate through sound URLS and create a Sonor for each
  // use a pool so that several instances of the same sound can play simultaneously 
  soundURLS.forEach(sound => {
      Sonorous.addSonor(sound.url, {
        id: sound.id,
        poolSize: 4
    });
  })    
}

const MAX_NOTE_INTERVAL = 900;
const stringsEl = document.querySelector(".strings");
const boardEl = document.querySelector('.board');

function addNote(){  
  let note = document.createElement("div");  
  let stringNumber = Math.floor(Math.random()*5);
  note.classList.add(`type${stringNumber}`, 'note');
  boardEl.appendChild(note);
  
  let nextNoteTime = 400 + Math.random() * MAX_NOTE_INTERVAL;    
 
  note.addEventListener('mousedown', ()=>{
    note.classList.add('selected');
    let sonorId = `string${stringNumber+1}`;
    Sonorous.get(sonorId).play();    
  })
  
  
  // remove note on animation end
  note.addEventListener('animationend', e => {    
    if (e.pseudoElement === ""){
         note.parentNode.removeChild(note);
    }
  });
  
  // create the next note
  setTimeout(()=>{
    addNote()
  }, nextNoteTime); 
}

stringsEl.addEventListener("mousedown", ()=>{  
  let sonorId = `wrong${Math.floor(Math.random()*3)+1}`;
  Sonorous.get(sonorId).play();
  stringsEl.classList.add('wrong');
  setTimeout(()=>stringsEl.classList.remove('wrong'),200)
});

addNote();