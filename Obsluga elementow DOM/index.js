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
    containerWrapper.id = 'container-wrapper';

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
        buttonUp.id = id;

        const buttonDownParagraph = document.createElement(P);
        const buttonDownText = document.createTextNode('\\/');
        buttonDownParagraph.appendChild(buttonDownText);
        buttonDown.appendChild(buttonDownParagraph);
        buttonDown.id = id;

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

        buttonUp.onclick = (e) => {
            moveItemUp(e);
        }

        buttonDown.onclick = (e) => {
            moveItemDown(e);
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

        // add in array
        addedData = [...addedData, {
            id,
            name: nameInput.value,
            age: ageInput.value,
            description: textArea.value
        }];

        const lastElement = addedData[addedData.length-1];

        // add in DOM
        createListItem(lastElement.name, lastElement.age, lastElement.description, lastElement.id);

        nameInput.value = '';
        ageInput.value = '';
        textArea.value = '';
    }

    /* ----------------------------------------
        REMOVE item from list
    ---------------------------------------- */

    const removeItem = (elementId) => {
        // remove in array
        addedData = addedData.filter(data => data.id !== elementId);

        // remove in DOM
        const removeElement = document.getElementById(elementId);
        removeElement?.parentNode.removeChild(removeElement);
    }

    /* ----------------------------------------
        MOVE items
    ---------------------------------------- */

    const moveItemUp = (e) => {
        const currentId = e.currentTarget.id;
        addedData?.map((data, index) => {
            if (data.id === currentId) {
                if (index === 0) {
                    if (addedData.length > 1) {
                        // move element to list end
                        // change order in array
                        const firstElement = addedData.splice(0, 1);
                        addedData = [...addedData, firstElement[0]];

                        // move in DOM
                        const moveElement = document.getElementById(currentId);
                        const parent = moveElement?.parentNode;
                        parent.removeChild(moveElement);
                        parent.appendChild(moveElement);
                    }
                } else {
                    // move element up
                    // change order in array
                    let siblingDataIndex;
                    let movedDataElement;
                    const copyAddedData = [...addedData]
                    copyAddedData?.map((data, index) => {
                        if (data.id === currentId) {
                            siblingDataIndex = index - 1;
                            movedDataElement = copyAddedData.splice(index, 1);
                        }
                    })
                    copyAddedData.splice(siblingDataIndex, 0, movedDataElement[0]);
                    addedData = [...copyAddedData];

                    // move in DOM
                    const moveElement = document.getElementById(currentId);
                    const parent = moveElement?.parentNode;
                    const children = [...moveElement?.parentNode.childNodes];

                    let siblingChildIndex;
                    children.map((child, index) => {
                        if (child.id === currentId) {
                            siblingChildIndex = index - 1;
                        }
                    });
                    parent.removeChild(moveElement);
                    parent.insertBefore(moveElement, children[siblingChildIndex]);
                }
            }
        });

    }

    const moveItemDown = (e) => {
        const currentId = e.currentTarget.id;
        const addedDataLength = addedData.length - 1;
        addedData?.map((data, index) => {
            if (data.id === currentId) {
                if (index === addedDataLength) {
                    if (addedData.length > 1) {
                        // move element to list start
                        // change order in array
                        const lastElement = addedData.splice(index, 1);
                        addedData = [lastElement[0], ...addedData];

                        // move in DOM
                        const moveElement = document.getElementById(currentId);
                        const parent = moveElement?.parentNode;
                        const children = [...moveElement?.parentNode.childNodes];
                        parent.removeChild(moveElement);
                        parent.insertBefore(moveElement, children[0]);
                    }
                } else {
                    // move element down
                    // change order in array
                    let siblingDataIndex;
                    let movedDataElement;
                    const copyAddedData = [...addedData]
                    copyAddedData?.map((data, index) => {
                        if (data.id === currentId) {
                            siblingDataIndex = index + 1;
                            movedDataElement = copyAddedData.splice(index, 1);
                        }
                    })
                    copyAddedData.splice(siblingDataIndex, 0, movedDataElement[0]);
                    addedData = [...copyAddedData];

                    // move in DOM
                    const moveElement = document.getElementById(currentId);
                    const parent = moveElement?.parentNode;
                    const children = [...moveElement?.parentNode.childNodes];
                    let siblingChildIndex;
                    children.map((child, index) => {
                        if (child.id === currentId) {
                            siblingChildIndex = index + 2;
                        }
                    });
                    parent.removeChild(moveElement);
                    parent.insertBefore(moveElement, children[siblingChildIndex]);
                }
            }
        })
    }
});
