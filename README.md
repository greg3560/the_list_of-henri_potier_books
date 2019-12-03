# The List of Henri Potier's Books
This project was bootstrapped with a personnel script who
install React, Babel, Webpack with his configuration from scratch.

## Table of Contents

* [App](#App)
* [Redux et React Redux](#Redux-et-React-Redux)
* [Hooks](#Hooks)
* [Api](#Api)
* [Use-case](#Use-case)
* [Available Scripts](#Available-Scripts)
* [Folder Structure](#Folder-Structure)

### App

The application uses among others the following libraries:
- [React v16.12.0](https://fr.reactjs.org/)
- [Redux v4.0.4](https://redux.js.org)
- [React Redux v7.1.3](https://github.com/reactjs/react-redux)
- [Material Ui v4.7.1](https://material-ui.com/)
- [Axios v0.19.0](https://www.npmjs.com/package/axios)

For the basket portion the application uses the Heap algorithm for
ability to calculate all possible offers. And as stipulate in
the specifications, the application selected the best commercial offer.

### Redux et React Redux

The application is managed thanks to Redux to decentralize the
logical development and to centralize the states.


The action files are :
- `/src/actions/BasketAction.js`
- `/src/actions/RequestAPIAction.js`
- `/src/actions/RequestOffersAction.js`

Reducers files are :
- `/src/reducers/api.js`
- `/src/reducers/basket.js`
- `/src/reducers/index.js`
- `/src/reducers/offersApi.js`

The container files or are connected the components are:
- `/src/containers/ShowBasket.js`
- `/src/containers/ShowBooks.js`
- `/src/containers/ShowDetailsBook.js`<br />
The containers are responsible for updating the UI

### Hooks
For pure functional components the application uses hooks
to manage the local state (useState ()).

`const [basketChecked, setBasketChecked] = React.useState(basketList.indexOf(isbn) !== -1);`

To simulate life cycles the application uses useEffect ()

`//effect hook equivalent to componentDidUpdate
     useEffect(() => {
         toggleDrawer('left', open, true)({type: '', key: ''});
     }, [open]);`

- [React Hooks](https://fr.reactjs.org/docs/hooks-intro.html)

### Api

The application uses the axios library. Promise based HTTP client for the browser and node.js
the application use a thunk to manage the asynchronous call.

The entry point are in get method:
- `http://henri-potier.xebia.fr/books`
- `http://henri-potier.xebia.fr/books/c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885
   c05db861/commercialOffers`
   
The application uses a proxy to perform the queries and thus avoid cross domain errors. 

- [Proxy](https://cors-anywhere.herokuapp.com/)

### Use case

The user arrives on the home page and can navigate through the menu.

Livres: The user can view all books and put them in his basket by clicking on the icon caddy. 
He can visualize part of the synopsis by clicking on the arrow on the map. He can also access 
the sheet of the book with the detail of the film.

Panier: On this view, the user can view his cart and choose the quantities he wants.

Throughout the navigation the user can perform a quick search with the field located in the 
upper and fixed part of the application. He lands on the detail page of the book.

The basket is stored in real time in a cookie to provide a user experience and more.

## Available Scripts

Launches the dependencies install.<br>

### `npm install`

In the project directory, you can run (line command):

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test:unit`

Launches the test runner.<br>

### `npm run build`


## Folder Structure

The skeleton of the application is built around the 
Rails-style design pattern.
After clone, your project should look like this:

```
public/
  favicon.ico
  index.html
src/
  actions/
  components/
  constants/
  containers/
  reducers/
  App.js
  index.js
tests/
  Action.spec.js
  Api.spec.js
  ApiOffers.spec.js
  Basket.spec.js
  Components.spec.js
  dom.js
  helpers.js
  Reducer.spec.js
  SpanningTable.spec
.babelrc
.env
muiTheme.js
package.json
package-lock.json
README.md
webpack.config.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.