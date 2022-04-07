class TypeWriter {
  constructor(textElement, words, wait){
    this.textElement = textElement
    this.words = words
    this.letter = ""
    this.wordIndex = 0;
    this.wait = parseInt(wait)  //wait recieving from html attribute
    // console.log(typeof this.wait);
    this.type()
    this.isDeleting = false  // from start we are not deleting the letters so when we start deleting we will change it true
  }
  type(){
    // current indexes of the words
    const currentIndex = this.wordIndex % this.words.length;

    // full text of the curren word
    const fullText = this.words[currentIndex];

    // checking for deleting and adding
    if (this.isDeleting) {
      //true
      this.letter = fullText.substring(0, this.letter.length - 1); // it is gonna remove letter one by one
    } else {
      this.letter = fullText.substring(0, this.letter.length + 1); // it is gonna add letter one by one
    }

    // inserting text into the element
    this.textElement.innerHTML = `<span class="txt">${this.letter}</span>`;

    //initial type speed
    let typeSpeed = 100;
    // changing type speed
    if (this.isDeleting) {
      typeSpeed /= 3; //shorthand of typeSpeed = typeSpeed / ?
    }
    // if one sentence is completely written
    if (!this.isDeleting && this.letter === fullText) {
      typeSpeed = this.wait; //make a pause at the end
      this.isDeleting = true; // deleting the word now
    }
    // if one sentence is completely deleted
    else if (this.isDeleting && this.letter === "") {
      this.isDeleting = false; // so that we move to next word
      this.wordIndex++; // move to next word
      typeSpeed = 500; // pause before start typing
    }

    setTimeout(() => {
      return this.type(); //calling this.type() function every -- secs
    }, typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const textEl = document.querySelector(".info")
  const wordsFromHtml = textEl.getAttribute("data-words")  // string
  const words = JSON.parse(wordsFromHtml)  //converted string into in an array
  const wait = textEl.getAttribute("data-wait")

  new TypeWriter(textEl, words, wait)
})
