import React from 'react'
import PropTypes from 'prop-types'

import Player from './Player'

export default class PlayerList extends React.Component {

    renderPlayers = () => {
        const players = this.props.players
        if (players.length)
            return players.map((player) => <Player key={player._id} player={player} />)
        else
            return (
                <div className="item">
                    <p>Add your first player to get started</p>
                </div>
            )
    }

    render() {
        return (
            <div>
                {this.renderPlayers()}
            </div>
        )
    }
}

PlayerList.propTypes = {
    players: PropTypes.array.isRequired
}