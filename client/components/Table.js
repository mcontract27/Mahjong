import React from 'react'
import deck from '../classes/deck'
import Hand from './Hand'

export default class Table extends React.Component {
    render(){
        const wall = new deck(true)
        wall.newDeck()
        console.log(wall)
        return (
            <Hand deck={wall} />
        )
    }
}