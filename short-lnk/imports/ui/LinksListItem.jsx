import React from 'react'
import PropTypes from 'prop-types'
import ClipboardJS from 'clipboard'

export default class LinksListItem extends React.Component {
    componentDidMount() {
        this.clipboard = new ClipboardJS(this.refs.copy)

        this.clipboard.on('success', (e) => {
            alert('Copied!')
        })

        this.clipboard.on('error', (e) => {
            alert('Unable to copy.')
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    render() {
        return (
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.shortUrl}</p>
                <button ref="copy" data-clipboard-text={this.props.shortUrl}>Copy</button>
            </div>
        )
    }
}


LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired
}