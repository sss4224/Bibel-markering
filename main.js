let GTContainer = document.querySelector('.GT-container');
let NTContainer = document.querySelector('.NT-container');

fetchData();

async function fetchData() {
    try {
        const data = await fetching();
        createBooks(1, 39, GTContainer, data);
        createBooks(40, 66, NTContainer, data);
    } catch (error) {
        console.log('Error during fatch or creation: ', error);
    }
}

async function fetching() {
  try {
    const response = await fetch('https://sss4224.github.io/Bibel-markering/api.json');
    if (!response.ok) {
      throw new Error('Could not find server');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('Something went wrong', error.stack);
  }
}

function createBooks(startIndex, endIndex, GTorNT, data){
    const selectedBooks = data.slice(startIndex - 1, endIndex);
    selectedBooks.forEach((book, index) => {
        let bookEl = document.createElement('p');
        bookEl.classList.add('dont-see-p');
        bookEl.classList.add('book-element');
        bookEl.id = book.name + index;
        bookEl.textContent = book.name;

        let chapterContainer = document.createElement('div');
        chapterContainer.classList.add('chapter-container');
        chapterContainer.classList.add('dont-see-chapter');
        bookEl.appendChild(chapterContainer);
        for(let i = 1; i < book.chapters + 1; i++){
            const chapter = document.createElement('div');
            chapter.textContent = i;
            chapter.classList.add('chapter');
            chapterContainer.appendChild(chapter)
        }
        GTorNT.appendChild(bookEl);
    });
}


let GT = document.querySelector('#GT');
let NT = document.querySelector('#NT');

GT.addEventListener('click', () => {
    let paragraph = GTContainer.querySelectorAll('p');
    paragraph.forEach(paragraph => {
        paragraph.classList.toggle('dont-see-p');
    })
})
NT.addEventListener('click', () => {
    let paragraph = NTContainer.querySelectorAll('p');
    paragraph.forEach(paragraph => {
        paragraph.classList.toggle('dont-see-p');
    })
})

let main = document.querySelector('main');

main.addEventListener('click', (e) => {
    if(e.target.tagName === 'P'){
        let chapterContainer = e.target.querySelector('.chapter-container');
        if(chapterContainer){
            chapterContainer.classList.toggle('dont-see-chapter');
        }
    }
    if(e.target.classList.contains('chapter')){
        e.target.classList.toggle('already-read');
    }
})
