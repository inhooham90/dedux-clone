import Dedux from './dedux.js';
import countReducer from './countReducer.js';
import COUNTER_ACTIONS from './COUNTER_ACTIONS.js';

const { createStore } = Dedux;

let localStorage = window.localStorage;
let store = createStore(countReducer);

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('count')) {
        store.dispatch({ 
            type: COUNTER_ACTIONS.SET, 
            // count: parseInt(localStorage.getItem('count'))
            // // uncomment line 14 and comment out line 16 to store count
            count: 0
        });
    };
});

store.subscribe(() => {
    const count = store.getState();
    document.querySelector("#count").innerHTML = count;
});

// uncommment line 28 - 35 to save them to local storage

// window.addEventListener("beforeunload", () => {
//     let count = document.querySelector("#count").innerHTML;
//     if(parseInt(count) !== 0) {
//         localStorage.setItem('count', document.querySelector("#count").innerHTML);
//     } else {
//         localStorage.clear();
//     }
// });

export const increment = function() {
    store.dispatch({ type: COUNTER_ACTIONS.INCREMENT });
};

export const decrement = function() {
    store.dispatch({ type: COUNTER_ACTIONS.DECREMENT });
};

export const reset = function() {
    store.dispatch({ type: COUNTER_ACTIONS.RESET });
};

document.querySelector('#up').addEventListener('click', increment);
document.querySelector('#down').addEventListener('click', decrement);
document.querySelector('#reset').addEventListener('click', reset);