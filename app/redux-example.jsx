var redux = require('redux');
var axios = require('axios');

console.log('Starting redux example');

//-----------------------------------------
var nameReducer = (state = 'Anonymous', action) => {
    switch(action.type){
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state
    }
}
var changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
        //^ ES6>>> name : name
    }
}


//-----------------------------------------
var nextHobbyId = 1;
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
var addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    }
}
var removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    }
}


//-----------------------------------------
var nextMovieId = 1;
var moviesReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_MOVIE':
            return [
                ...state, //pulls the current array and add the object below to it
                {
                    id: nextMovieId++,
                    movie: action.movie,
                    genre: action.genre
                }]
        case 'REMOVE_MOVIE':
            return state.filter((movie) => movie.id !== action.id)
        default:
            return state
    }
}
var addMovie = (movie, genre) =>{
    return {
        type: 'ADD_MOVIE',
        movie,
        genre
    }
}
var removeMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
}


//-----------------------------------------
var mapReducer = (state={isFetching:false, url:undefined}, action) => {
    switch(action.type) {
        case 'START_LOCATION_FETCH':
            return {
                isFetching: true,
                url: undefined
            }
        case 'COMPLETE_LOCATION_FETCH':
            return {
                isFetching: false,
                url: action.url
            }
        default:
            return state
    }
}
var startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
}
var completeLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
}
var fetchLocation = () => {
    store.dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then(function(res){
        var loc = res.data.loc;
        var baseUrl = 'http://maps.google.com/?q='

        store.dispatch(completeLocationFetch(baseUrl+loc));
    })
}

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
})

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f  // f => f <<<is equal to>>> (f) => return f;
));

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

fetchLocation();

store.dispatch(changeName("Manuel"));
store.dispatch(changeName('Otro nombre')) 
store.dispatch(addHobby('Running'))
store.dispatch(addMovie('Ironman','superheroes'))
store.dispatch(changeName('Nombre que no se imprime'));
store.dispatch(addHobby('Jogging'));
store.dispatch(addMovie('Titanic','drama'));
store.dispatch(removeHobby(2));
store.dispatch(removeMovie(1));


