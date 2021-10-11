const DIV = 'div';
const P = 'p';
const FORM = 'form';
const INPUT = 'input';
const TEXT_AREA = 'textArea';

window.addEventListener('load', function() {
    /* =============================================
               MODEL
     ============================================== */

    /* ----------------------------------------
        STATE
    ---------------------------------------- */

    let addedData = []

    /* =============================================
                    VIEW
     ============================================== */

    /* ----------------------------------------
     CONTAINER: create node elements with attributes
    ---------------------------------------- */

    // div
    const containerWrapper = document.createElement(DIV);
    containerWrapper.className = 'container-wrapper';

    document.body.appendChild(containerWrapper);

    function createListItem(nameText, ageText, descriptionText, id) {
        const inputsWrapper = document.createElement(DIV);
        inputsWrapper.className = 'inputs-wrapper';

        const listAndButtonWrapper = document.createElement(DIV);
        listAndButtonWrapper.className = 'list-button-wrapper';

        const contentWrapper = document.createElement(DIV);
        contentWrapper.className = 'content-wrapper';
        contentWrapper.id = id;

        const nameArea = document.createElement(DIV);
        nameArea.className = 'name-area';

        const ageArea = document.createElement(DIV);
        ageArea.className = 'age-area';

        const listArea = document.createElement(DIV);
        listArea.className = 'list-area';

        const descriptionContainer = document.createElement(DIV);
        descriptionContainer.className = 'description-container';

        const buttonsContainer = document.createElement(DIV);
        buttonsContainer.className = 'buttons-container';

        const buttonUp = document.createElement(DIV);
        buttonUp.className = 'button-up';

        const buttonDown = document.createElement(DIV);
        buttonDown.className = 'button-down';

        const buttonRemove = document.createElement(DIV);
        buttonRemove.className = 'button-remove';
        buttonRemove.id = id;

        const buttonUpParagraph = document.createElement(P);
        const buttonUpText = document.createTextNode('/\\');
        buttonUpParagraph.appendChild(buttonUpText);
        buttonUp.appendChild(buttonUpParagraph);

        const buttonDownParagraph = document.createElement(P);
        const buttonDownText = document.createTextNode('\\/');
        buttonDownParagraph.appendChild(buttonDownText);
        buttonDown.appendChild(buttonDownParagraph);

        const buttonRemoveParagraph = document.createElement(P);
        const buttonRemoveText = document.createTextNode('X');
        buttonRemoveParagraph.appendChild(buttonRemoveText);
        buttonRemove.appendChild(buttonRemoveParagraph);

        // insert element to document body
        containerWrapper.appendChild(contentWrapper);
        contentWrapper.appendChild(inputsWrapper);
        inputsWrapper.appendChild(nameArea);
        inputsWrapper.appendChild(ageArea);
        contentWrapper.appendChild(listAndButtonWrapper);
        listAndButtonWrapper.appendChild(listArea);
        listArea.appendChild(descriptionContainer);
        listArea.appendChild(buttonsContainer);
        buttonsContainer.appendChild(buttonUp);
        buttonsContainer.appendChild(buttonDown);
        contentWrapper.appendChild(buttonRemove);

        // add name to name text area
        const nameItem = document.createElement(P);
        nameItem.id = id;
        const nameItemText = document.createTextNode(nameText);
        nameItem.appendChild(nameItemText);
        nameArea.appendChild(nameItem);

        // add age to name text area
        const ageItem = document.createElement(P);
        ageItem.id = id;
        const ageItemText = document.createTextNode(ageText);
        ageItem.appendChild(ageItemText);
        ageArea.appendChild(ageItem);

        // add description to name text area
        const listItem = document.createElement(P);
        listItem.id = id;
        const listItemText = document.createTextNode(descriptionText);
        listItem.appendChild(listItemText);
        descriptionContainer.appendChild(listItem);

        /* ----------------------------------------
            COLORED: color container on hover
            ---------------------------------------- */

        contentWrapper.addEventListener('mouseenter', function() {
            nameArea.classList.add('name-is-colored');
            ageArea.classList.add('age-is-colored');
            listArea.classList.add('list-is-colored');
            buttonUp.classList.add('button-is-colored');
            buttonDown.classList.add('button-is-colored');
        })

        contentWrapper.addEventListener('mouseleave', function() {
            nameArea.classList.remove('name-is-colored');
            ageArea.classList.remove('age-is-colored');
            listArea.classList.remove('list-is-colored');
            buttonUp.classList.remove('button-is-colored');
            buttonDown.classList.remove('button-is-colored');
        })

        buttonRemove.onclick = (e) => {
            const elementId = e.currentTarget.id;
            removeItem(elementId);
        }
    }

    /* ----------------------------------------
        FORM: create node elements with attributes
       ---------------------------------------- */
    // div
    const formContainer = document.createElement(DIV);
    formContainer.className = 'form-container';

    const inputsContainer = document.createElement(DIV);
    inputsContainer.className = 'inputs-container';

    const textAreaAndButtonContainer = document.createElement(DIV);
    textAreaAndButtonContainer.className = 'text-button-container';

    // form
    const form = document.createElement(FORM);
    form.className = 'form';

    // input
    const nameInput = document.createElement(INPUT);
    nameInput.className = 'name-input';
    nameInput.placeholder = 'Podaj imie i nazwisko';

    const ageInput = document.createElement(INPUT);
    ageInput.className = 'age-input';
    ageInput.type = 'number';
    ageInput.placeholder = 'Podaj wiek';

    const submitInput = document.createElement(INPUT);
    submitInput.type = 'submit';
    submitInput.className = 'submit-input';
    submitInput.value = 'Dodaj';

    // textArea
    const textArea = document.createElement(TEXT_AREA);
    textArea.className = 'text-area';
    textArea.placeholder = 'Wpisz opis';

    // insert element to document body
    document.body.appendChild(formContainer);
    formContainer.appendChild(form);
    form.appendChild(inputsContainer);
    inputsContainer.appendChild(nameInput);
    inputsContainer.appendChild(ageInput);
    form.appendChild(textAreaAndButtonContainer);
    textAreaAndButtonContainer.appendChild(textArea);
    textAreaAndButtonContainer.appendChild(submitInput);

    /* =============================================
                   CONTROLLER
    ============================================== */

    /* ----------------------------------------
        ADD item to list
    ---------------------------------------- */

    submitInput.onclick = (e) => {
        e.preventDefault();
        const id = Math.random().toString();

        addedData = [...addedData, {
            id,
            name: nameInput.value,
            age: ageInput.value,
            description: textArea.value
        }];

        createListItem(addedData[addedData.length-1].name, addedData[addedData.length-1].age, addedData[addedData.length-1].description, addedData[addedData.length-1].id);

        nameInput.value = '';
        ageInput.value = '';
        textArea.value = '';
    }

    /* ----------------------------------------
        REMOVE item from list
    ---------------------------------------- */

    const removeItem = (elementId) => {
        addedData = addedData.filter(data => data.id !== elementId);

        const removeElement = document.getElementById(elementId);
        removeElement?.parentNode.removeChild(removeElement);
    }
});

