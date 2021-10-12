const DIV = 'div';
const P = 'p';
const FORM = 'form';
const INPUT = 'input';
const TEXT_AREA = 'textArea';

window.addEventListener('load', function() {
    //  ==========  STATE  ===========
    let addedData = [];

    //  ==========  VIEW  ===========
    const containerWrapper = createItem(DIV,'container-wrapper', 'container-wrapper');
    document.body.appendChild(containerWrapper);

    containerWrapper.onclick = (e) => {
        const targetElement = e.target;
        const parentOfTargetElement = e.target.parentNode;
        const targetInnerText = e.target.innerText;
        if (targetInnerText === 'X') {
            targetElement.id && removeItem(targetElement.id);
            parentOfTargetElement.id && removeItem(parentOfTargetElement.id);
        }

        if (targetInnerText === '/\\') {
            targetElement.id && moveItemUp(targetElement.id);
            parentOfTargetElement.id && moveItemUp(parentOfTargetElement.id);
        }

        if (targetInnerText === '\\/') {
            targetElement.id && moveItemDown(targetElement.id);
            parentOfTargetElement.id && moveItemDown(parentOfTargetElement.id);
        }
    }

    function createItem(tag, className, id, text) {
        if (tag === DIV || tag === P || tag === FORM) {
            const item = document.createElement(tag);
            if (className) item.className = className;
            if (id) item.id = id;
            if (text) {
                const itemWithText = document.createTextNode(text);
                item.appendChild(itemWithText);
            }

            return item;
        }
    }

    function createInputOrTextArea(tag, className, placeholder, type, value) {
        if (tag === INPUT || tag === TEXT_AREA) {
            const element = document.createElement(tag);
            if (className) element.className = className;
            if (placeholder) element.placeholder = placeholder;
            if (type) element.type = type;
            if (value) element.value = value;

            return element;
        }
    }

    function createListItem(nameText, ageText, descriptionText, id) {
        // CONTAINER: create node elements with attributes
        const inputsWrapper = createItem(DIV,'inputs-wrapper');
        const listAndButtonWrapper = createItem(DIV,'list-button-wrapper');
        const contentWrapper = createItem(DIV,'content-wrapper', id);
        const nameArea = createItem(DIV,'name-area');
        const ageArea = createItem(DIV,'age-area');
        const listArea = createItem(DIV,'list-area');
        const descriptionContainer = createItem(DIV,'description-container');
        const buttonsContainer = createItem(DIV,'buttons-container');
        const buttonUp = createItem(DIV,'button-up', id);
        const buttonDown = createItem(DIV,'button-down', id);
        const buttonRemove = createItem(DIV,'button-remove', id);

        buttonUp.appendChild(createItem(P, undefined, undefined,'/\\'));
        buttonDown.appendChild(createItem(P, undefined, undefined,'\\/'));
        buttonRemove.appendChild(createItem(P, undefined, undefined,'X'));

        // CONTAINER: insert element to document body
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

        // CONTAINER: add text to text container
        nameArea.appendChild(createItem(P, undefined, id, nameText));
        ageArea.appendChild(createItem(P, undefined, id, ageText));
        descriptionContainer.appendChild(createItem(P, undefined, id, descriptionText));

        // COLORED: color container on hover
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
    }

    // FORM: create node elements with attributes
    const formContainer = createItem(DIV,'form-container');
    const inputsContainer = createItem(DIV,'inputs-container');
    const textAreaAndButtonContainer = createItem(DIV,'text-button-container');
    const form = createItem(FORM,'form');
    const nameInput = createInputOrTextArea(INPUT, 'name-input', 'Podaj imie i nazwisko');
    const ageInput = createInputOrTextArea(INPUT, 'age-input', 'Podaj wiek', 'number');
    const submitInput = createInputOrTextArea(INPUT, 'submit-input', undefined, 'submit', 'Dodaj');
    const textArea = createInputOrTextArea(TEXT_AREA, 'text-area', 'Wpisz opis');

    // insert element to document body
    document.body.appendChild(formContainer);
    formContainer.appendChild(form);
    form.appendChild(inputsContainer);
    inputsContainer.appendChild(nameInput);
    inputsContainer.appendChild(ageInput);
    form.appendChild(textAreaAndButtonContainer);
    textAreaAndButtonContainer.appendChild(textArea);
    textAreaAndButtonContainer.appendChild(submitInput);

    //  ==========  CONTROLLER  ===========

    // ADD item to list
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

    // REMOVE item from list
    const removeItem = (elementId) => {
        // remove in array
        addedData = addedData.filter(data => data.id !== elementId);

        // remove in DOM
        const removeElement = document.getElementById(elementId);
        removeElement?.parentNode.removeChild(removeElement);
    }

    // MOVE items
    const moveItemUp = (currentId) => {
        // const currentId = e.currentTarget.id;
        addedData?.forEach((data, index) => {
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
                    copyAddedData?.forEach((data, index) => {
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
                    children.forEach((child, index) => {
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

    const moveItemDown = (currentId) => {
        // const currentId = e.currentTarget.id;
        const addedDataLength = addedData.length - 1;
        addedData?.forEach((data, index) => {
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
                    copyAddedData?.forEach((data, index) => {
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
                    children.forEach((child, index) => {
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
