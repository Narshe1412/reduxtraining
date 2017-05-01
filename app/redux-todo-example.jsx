var redux = require('redux');

console.log('Starting redux example for todos');

var stateDefault = {
    searchText: '', 
    showCompleted: false, 
    todos: []
}

var reducer = (state = stateDefault, action) => { //create a default argument in ES6
    //state = state || stateDefault; // create a default argument ES5
    return state;
}

var store = redux.createStore(reducer); //create the state using the reducer, so the state that gets passed in doesn't get modified

console.log("Current state", store.getState());  //returns the STATE from the app, which is the Global Store (or global state)