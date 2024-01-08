# Web Mobile 1 - Assignment 3 - Flashcards

This is a web application, where user can create flashcards and use them for different purposes.

## Components

Header.jsx - Header / Navbar shown at the top of every page.
Home.jsx - the home page of the website, where user can view my other projects.
Contact.jsx - the contact page, where users can send messages, which then will be sent to the JSON server.
Flashcards.jsx - component with the most of functionality, also the parent of Card.jsx component.
Cards.jsx - each card is represented as a form of an individual component.

## Hooks that were used

## useState()

The useState() hook is a fundamental React function that enables functional components to manage and update state within the component. It takes an initial state as an argument and returns an array containing the current state value and a function to update it, allowing developers to incorporate dynamic data and reactivity into their React applications effortlessly.

## useEffect()

The useEffect() hook in React allows developers to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM, by executing the provided function after every render. It serves as a versatile tool for handling lifecycle events and managing the impact of side effects in React applications.

## Getting started

1. Download this proejct as a zip folder, decompress it, and open in any code editor.
2. npm install
 It will install node modules, and check dependencies, and if you do not have Vite.js, it will install it as well.
3. npx json-server --watch database.json
Run JSON server...  can be written without "npx" if you have installed json server globally. Server will run at port :3000
4. npm run dev
This command will run the project itself at port :5173.

