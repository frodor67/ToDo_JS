'use strict';



function DomElement (selector, height, width, bg, fontSize) {
 this.selector = selector;
 this.height = height;
 this.width = width;
 this.bg= bg;
 this.fontSize = fontSize;

 this.createElem = function (textElem) {
  const myFunc = document.getElementsByClassName('.my_func');
  

  if ( this.selector.includes('.', 0)) {
   let div = document.createElement('div');
   div.innerHTML = `<p>${textElem}</p>`;
   document.body.append(div);
   div.classList.add(this.selector);
   div.style.cssText = `height: ${this.height};
                        width: ${this.width};
                        background-color: ${this.bg};
                        font-size: ${this.fontSize}; ` ;
  } else if (this.selector.includes('#', 0)) {
   const p = document.createElement('p');
   p.innerHTML = textElem;
   document.body.append(p);
   p.id = this.selector;
   p.style.cssText = `height: ${this.height};
                        width: ${this.width};
                        background-color: ${this.bg};
                        font-size: ${this.fontSize}; `;
  } 
 };
}

let elem1 = new DomElement('.this_id', '100px', '100px', 'red', '24px' );

elem1.createElem('Привет!!!');