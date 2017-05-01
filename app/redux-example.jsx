var redux = require('redux');

console.log('Starting redux example');

var reducer = (state = {name: 'Anonymous'}, action) => { //create a default argument in ES6
    //state = state || {name: 'Anonymous'}; // create a default argument ES5

    return state;
}
var store = redux.createStore(reducer); //create the state using the reducer, so the state that gets passed in doesn't get modified

var currentState = store.getState();  //returns the STATE from the app, which is the Global Store (or global state)

console.log("Current state", currentState);