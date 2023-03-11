import React, { Component } from 'react'
import axios from 'axios';
import Card from './Card';
import './Deck.css'
const API_Base_URL = "https://deckofcardsapi.com/api/deck/"


class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null, drawn: [] }
        this.getCard = this.getCard.bind(this)
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_Base_URL}/new/shuffle`)
        this.setState({ deck: deck.data })

    }
    async getCard() {
        let id = this.state.deck.deck_id;
        try {
            let cardUrl = `${API_Base_URL}${id}/draw/`;
            let cardRes = await axios.get(cardUrl);
            if (!cardRes.data.success) {
                throw new Error("No cards left")
            }
            console.log(cardRes.data.cards[0]);
            let card = cardRes.data.cards[0]
            this.setState(st => ({
                drawn: [
                    ...st.drawn, { id: card.code, image: card.image, uname: `${card.value} of ${card.suit}` }
                ]
            }))
        } catch (err) {
            alert(err)
        }

        //    "https://deckofcardsapi.com/api/deck/${deck_id}/draw/"
    }

    render() {
        const cards = this.state.drawn.map(c => (<Card key={c.id} image={c.image} name={c.name} />))
        return (
            <div>
                <h1 className='Deck-title'>Card Dealer</h1>
                <h2 className='Deck-title'>A demo using Axios</h2>
                <button className='Deck-btn' onClick={this.getCard}>Get Card</button>
                <div className='Deck'>{cards}</div>
            </div>
        )
    }
}

export default Deck