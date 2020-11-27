import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Get the element to prepend our app to. This could be any element on a specific website or even just `document.body`.
const body = document.getElementsByTagName('body');

// Create a div to render the <App /> component to.
const app = document.createElement('div');

// Set the app element's id to `root`. This is the same as the element that create-react-app renders to by default so it will work on the local server too.
app.id = 'root';

console.log(body, 'body')
// Prepend the <App /> component to the viewport element if it exists. You could also use `appendChild` depending on your needs.
if (body) {
    console.log('body set app')
    body[0].appendChild(app);
}

// Render the <App /> component.
ReactDOM.render(<App />, document.getElementById('root'));
