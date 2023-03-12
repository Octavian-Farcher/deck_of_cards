In this demo app I am getting used to axios, which I use to fetch data from an API.
This App has two components Deck and Card.
Deck component has an async function in componentDidMount, which awaits for the component to render data from a deck full of 52 cards we get with axios and store it in the state of the component.
This same component also has a function getCard which will take the id of the deck from the component state and it will render a random card from the deck until the deck is empty.
When the deck is empty, the deck will throw an error as an alert 'The are no cards left'.
The card component gets the getCard function through the props and renders the card.
