var redux = require('redux');

console.log('Starting redux example');

var reducer = (state = {name: 'Anonymous'}, action) => { //create a default argument in ES6
    //state = state || {name: 'Anonymous'}; // create a default argument ES5

    switch(action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}

//var store = redux.createStore(reducer); //create the state using the reducer, so the state that gets passed in doesn't get modified

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f  // f => f <<<is equal to>>> (f) => return f;
));

//Subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    console.log("Name is", state.name);
    document.getElementById('app').innerHTML = state.name;
})

var currentState = store.getState();  //returns the STATE from the app, which is the Global Store (or global state)

console.log("Current state", currentState);

var action = {
    type: 'CHANGE_NAME',   // only requirement is to have a type
    name: 'Manuel'
}
store.dispatch(action);
//or
store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Otro nombre'
})
unsubscribe();
store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Nombre que no se imprime'
})
console.log("Estado después de unsubscribe", store.getState());