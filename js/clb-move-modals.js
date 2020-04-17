// Move Modal markup to the correct place, using vanilla JS

//console.log('Move Modals');

function moveModals() {

          // var x = document.createElement("P");                        // Create a <p> node
          // var t = document.createTextNode("This is a paragraph.");    // Create a text node
          // x.appendChild(t);                                           // Append the text to <p>
          // document.body.appendChild(x);                               // Append <p> to <body>

     let modals = document.getElementsByClassName('clb-custom-modal-move');
     //console.log(modals);

     for (var i = 0; i < modals.length; i++) {
          //console.log(modals[i]);

          // copy and create new modal down in footer where the functionality will work
          let newModal = document.createElement("div");
          newModal.innerHTML = modals[i].innerHTML;
          document.body.appendChild(newModal);

          // wipe out the modal HTML in the entry-content
          modals[i].innerHTML = '';
     }

}


moveModals();





function setFlipCardHeights() {

     console.log('setFlipCardHeights 12:42p');
     let elementList = document.querySelectorAll('.wp-block-cgb-people-flip');
     console.log(elementList.length);

     for (let i = 0; i < elementList.length; i++) {

       console.log(elementList[i]);
       let personFlips = elementList[i].querySelectorAll('.wp-block-cgb-person-flip');
       let flipperHeight = elementList[i].dataset.cardHeight;
       console.log(flipperHeight);

       for (let j = 0; j < personFlips.length; j++) {
            let singlePersonFlip = personFlips[j];
            console.log(singlePersonFlip);
            console.log("This cards height: " + flipperHeight);
            singlePersonFlip.setAttribute("style", "height:" + flipperHeight + "px;");
       }

     }

}
setFlipCardHeights();
