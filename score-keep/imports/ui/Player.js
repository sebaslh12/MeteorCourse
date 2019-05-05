import React from 'react'
import PropTypes from 'prop-types'

import { Players } from '../api/players'

export default class Player extends React.Component {
    render() {
        const { _id: id, name, score } = this.props.player
        return (
            <div className="item">
                <p>
                    {name} has {score} point(s)
                </p>
                <button onClick={() => {
                    Players.update(id,
                        {
                            $inc: {
                                score: -1
                            }
                        })
                }}>-1</button>
                <button onClick={() => {
                    Players.update(id,
                        {
                            $inc: {
                                score: 1
                            }
                        })
                }}>+1</button>
                <button onClick={() => Players.remove(id)}>X</button>
            </div>
        )
    }
}


Player.propTypes = {
    player: PropTypes.object.isRequired
}