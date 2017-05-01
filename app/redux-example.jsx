var redux = require('redux');
var axios = require('axios');

console.log('Starting redux example');

var actions = require('./actions/index')
var store = require('./store/configureStore').configure();

//Subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    console.log('new state', store.getState())

    if(state.map.isFetching) {
        document.getElementById('app').innerHTML = 'Loading...'
    } else if (state.map.url) {
        document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View your Location</a>'
    }
})

var currentState = store.getState();  //returns the STATE from the app, which is the Global Store (or global state)

console.log("Current state", currentState);

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName("Manuel"));
store.dispatch(actions.changeName('Otro nombre')) 
store.dispatch(actions.addHobby('Running'))
store.dispatch(actions.addMovie('Ironman','superheroes'))
store.dispatch(actions.changeName('Nombre que no se imprime'));
store.dispatch(actions.addHobby('Jogging'));
store.dispatch(actions.addMovie('Titanic','drama'));
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.removeMovie(1));


