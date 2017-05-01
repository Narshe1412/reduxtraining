var redux = require('redux');

console.log('Starting redux example for todos');

var stateDefault = {
    searchText: '', 
    showCompleted: false, 
    todos: []
}

var reducer = (state = stateDefault, action) => { //create a default argument in ES6
    //state = state || stateDefault; // create a default argument ES5

    switch(action.type){
        case 'CHANGE_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText
            }
        default:
            return state;
    }
}

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)); //create the state using the reducer, so the state that gets passed in doesn't get modified

//subscribe to changes
var unsubscribe = store.subscribe(()=> {
    var state = store.getState();
    document.getElementById('app').innerHTML = state.searchText;
})

console.log("Current state", store.getState());  //returns the STATE from the app, which is the Global Store (or global state)

var changeSearchText = {
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'new text'
}
store.dispatch(changeSearchText);

store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'dog'
})

store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'last one'
})