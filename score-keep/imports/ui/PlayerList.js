import React from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'
import Player from './Player'

export default class PlayerList extends React.Component {

    renderPlayers = () => {
        const players = this.props.players
        if (players.length)
            return players.map((player) => <Player key={player._id} player={player} />)
        else
            return (
                <div className="item">
                    <p className="item__message">Add your first player to get started</p>
                </div>
            )
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderPlayers()}
                </FlipMove>
            </div>
        )
    }
}

PlayerList.propTypes = {
    players: PropTypes.array.isRequired
}