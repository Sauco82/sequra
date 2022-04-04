This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

After that I set it up with my own defaults, some basic ESLINT configuration, new folder structure, some base styles to create layouts, cleanup, and extra libraries and settings to run tests

## Instructions

Since this is a basic create-react-app application all the typical start, test, build and eject script will work. To have the exercise working we just need to use `npm start` to start the server in [http://localhost:3000](http://localhost:3000) and `npm test` to run the tests.

It is also needed to have the API server running somewhere else.

I would not dare call this production ready without further development and several corrections. But assuming this was going to be integrated somewhere: 
* `index.scss` should be moved to the public folder and somehow, be it compiling it or simply using plain css.
* The application should be built in a way that the client ends being able to add `index.js` as a minified script along with some special class values to track price changes.

## About the app

I chose to make this app using Redux Toolkit including its Query part instead of using the vainilla one or tools like React Query or SWR. 

The main reason: being able to keep all the state in the same store and it working nicely both with REST and GrapQL APIs.

The fact that it still works in a very similar fashion to its competitors is also a great plus.

For testing I have chosen react testing library and msw to mock requests, sadly I didn't have enough time to write something more complete testing the event api POST endpoint interaction.

The popup style would have just been a fixed 100vw x 100vh semitransparent container with a high z-index with an absolutely positioned div, using the data from the queries would have been trivial. I decided to leave it out in order to research how to make work the widget in the merchant site.

From the begining I assumed that the merchant site needed something as zero config as possible and that asking them to add event listeners to their code and emit events that I could listen to from the script was not an option.