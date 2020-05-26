(function() {

    //There was a login event
    auth.loginEvent = function() {
        console.log("Login event");
        people.style.display = "block";

        //Reference to database
        const db = firebase.firestore();

        //Select list
        const contactList = document.querySelector('#contact_list');
        //Select contact form
        const contactForm = document.querySelector('#contact_form');

        //Render contact list/display data
        function renderList(doc) {
            //Create new elements
            const li = document.createElement('li');
            const name = document.createElement('span');
            const phone = document.createElement('span');
            const deleteBtn = document.createElement('button');

            //Keep track of document Id
            li.setAttribute("data-id", doc.id);
            //Populate text
            name.textContent = doc.data().name;
            phone.textContent = doc.data().phone;
            deleteBtn.appendChild(document.createTextNode('X'));

            //Append data to li
            li.appendChild(name);
            li.appendChild(phone);
            li.appendChild(deleteBtn);

            //Append li to list
            contactList.appendChild(li);

            //Listen for deletion event
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                //Get id of contact we want to delete (document id)
                const id = e.target.parentElement.getAttribute("data-id");
                //e.target.parentElement.dataset.id
                //Delete document from database
                db.collection('contacts').doc(id).delete();
            });
        }

        //Get data from database - supports real-time listener
        db.collection('contacts').orderBy('name').onSnapshot(snapshot => {
            const changes = snapshot.docChanges();
            changes.forEach(change => {
                //If document type is added, send doc to renderList
                if(change.type == 'added'){
                    renderList(change.doc);
                }
                else if(change.type == 'removed'){
                    //Grab li where data-id matches the data that was changed
                    const li = contactList.querySelector('[data-id=' + change.doc.id + ']');
                    //Remove li from DOM
                    contactList.removeChild(li);
                }
            });
        });

        //Saving data
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            //Add data to contacts collection
            db.collection('contacts').add({
                name: contactForm.name.value,
                phone: contactForm.phone_number.value
            });
            //Clear form
            contactForm.reset();
        });

    }

    //There was a logout event
    auth.logoutEvent = function() {
        console.log("Logout event");
        /*const contactList = document.querySelector('#contact_list');

        while(contactList.firstChild){
            contactList.removeChild(contactList.firstChild);
        }*/

        people.style.display = "none";    
    }
}) ();