const layout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'ShiftRight'],
    ['CtrlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'CtrlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
];

let textField=document.createElement("textarea");
textField.classList.add("text-field");
document.body.appendChild(textField);

let keyboardContainer=document.createElement("div");
keyboardContainer.classList.add("keyboard");
document.body.appendChild(keyboardContainer);

layout.forEach(row => {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row');
    row.forEach(key => {
        const keyContainer = document.createElement('div');
        keyContainer.classList.add('key');
        keyContainer.textContent = key;
        if(/^[a-zA-Z]+$/.test(key)&&key.length===1){
            keyContainer.setAttribute("data-code", "Key"+key.toUpperCase());
        }
        else if(Number.isInteger(+key)){
            keyContainer.setAttribute("data-code", "Digit"+key);
        }
        else if(key==='`'){
            keyContainer.setAttribute("data-code", "Backquote");
        }
        else if(key==='-'){
            keyContainer.setAttribute("data-code", 'Minus');
        }
        else if(key==='='){
            keyContainer.setAttribute("data-code", 'Equal');
        }
        else if(key==='['){
            keyContainer.setAttribute("data-code", 'BracketLeft');
        }
        else if(key===']'){
            keyContainer.setAttribute("data-code", 'BracketRight');
        }
        else if(key==='|'){
            keyContainer.setAttribute("data-code", 'BacksLash');
        }
        else if(key===';'){
            keyContainer.setAttribute("data-code", 'Semicolon');
        }
        else if(key==="'"){
            keyContainer.setAttribute("data-code", 'Quote');
        }
        else if(key===','){
            keyContainer.setAttribute("data-code", 'Comma');
        }
        else if(key==='.'){
            keyContainer.setAttribute("data-code", 'Period');
        }
        else if(key==='/'){
            keyContainer.setAttribute("data-code", 'Slash');
        }
        else{
            keyContainer.setAttribute("data-code", key);
        }
        rowContainer.appendChild(keyContainer);
    });
    keyboardContainer.appendChild(rowContainer);
});

let capsLock=false;
function virtualKeyPress(event) {
    const button = event.target; // получаем нажатую кнопку
    const buttonValue = button.textContent; // получаем значение кнопки (текст внутри)
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 200);
    // меняем текст в текстовом поле
    const textField = document.querySelector('.text-field');
    if(button.textContent==="Backspace"){
        textField.value=textField.value.slice(0, -1);
    }
    else if(button.textContent==="Tab"){
        const start = textField.selectionStart;
        const end = textField.selectionEnd;

        // добавляем горизонтальный отступ
        textField.value =textField.value.substring(0, start) + '\t' + textField.value.substring(end);

        // перемещаем курсор в конечную позицию
        textField.selectionStart = textField.selectionEnd = start + 1;
    }
    else if(button.textContent==="CapsLock"){
        capsLock = !capsLock;
    }
    else {
        textField.value += buttonValue;
    }

}


function realKeyPress(event){
        const key = event.key;
        const input = document.querySelector('.text-field');
        const virtualKey = document.querySelector(`.key[data-code="${event.code}"]`);
        if(virtualKey){
            virtualKey.classList.add('active');
            setTimeout(() => {
                virtualKey.classList.remove('active');
            }, 200);
        }
        // if(virtualKey.textContent==="Backspace"){
        //     input.value=input.value.slice(0, -1);
        // }
        // // Добавляем символ нажатой клавиши в поле ввода
        // else {
            input.value += key;
        // }

        // Проигрываем анимацию нажатия клавиши
}



const buttons = document.querySelectorAll('.key');

buttons.forEach(button => {
    button.addEventListener('click', virtualKeyPress);
});

document.addEventListener('keydown', realKeyPress);

// document.querySelector(`.key[data-code="Backspace"]`).addEventListener("click",(event)=>{
//     textField.value.replace("Backspace", "");
//     textField.value = textField.value.slice(0, -1);
// })

