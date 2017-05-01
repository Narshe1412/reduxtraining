var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
    name: 'Anonymous',
    hobbies: [],
    movies: []
}
var nextHobbyId = 1;
var nextMovieId = 1;

//var store = redux.createStore(reducer); //create the state using the reducer, so the state that gets passed in doesn't get modified

var nameReducer = (state = 'Anonymous', action) => {
    switch(action.type){
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state
    }
}

var hobbiesReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_HOBBY':
            return [
                ...state, //pulls the current array and add the object below to it
                {
                    id: nextHobbyId++,
                    hobby: action.hobby
                }]
        case 'REMOVE_HOBBY':
            return state.filter((hobby) => hobby.id !== action.id)
        default:
            return state
    }
}

var moviesReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_MOVIE':
            return [
                ...state, //pulls the current array and add the object below to it
                {
                    id: nextMovieId++,
                    movie: action.movie
                }]
        case 'REMOVE_MOVIE':
            return state.filter((movie) => movie.id !== action.id)
        default:
            return state
    }
}

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer
})

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f  // f => f <<<is equal to>>> (f) => return f;
));

//Subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    console.log("Name is", state.name);
    document.getElementById('app').innerHTML = state.name;
    console.log('new state', store.getState())
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

store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Running'
})
store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Ironman',
    genre: 'superheroes'
})

//unsubscribe();
store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Nombre que no se imprime'
})
store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Jogging'
})
store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Titanic',
    genre: 'drama'
})

store.dispatch({
    type: 'REMOVE_HOBBY',
    id: 2
})

store.dispatch({
    type: 'REMOVE_MOVIE',
    id: 1
})