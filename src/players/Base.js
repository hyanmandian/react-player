import { Component } from 'react'

import { propTypes, defaultProps } from '../props'

export default class Base extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
  componentWillUnmount () {
    this.stop()
  }
  componentWillReceiveProps (nextProps) {
    // Invoke player methods based on incoming props
    if (this.props.url !== nextProps.url) {
      if (nextProps.url) {
        this.play(nextProps.url)
        this.props.onProgress({ played: 0, loaded: 0 })
      } else {
        this.stop()
        clearTimeout(this.updateTimeout)
      }
    } else if (!this.props.playing && nextProps.playing) {
      this.play()
    } else if (this.props.playing && !nextProps.playing) {
      this.pause()
    } else if (this.props.volume !== nextProps.volume) {
      this.setVolume(nextProps.volume)
    }
  }
  shouldComponentUpdate (nextProps) {
    return this.props.url !== nextProps.url
  }
  onReady = () => {
    this.setVolume(this.props.volume)
    if (this.props.playing || this.priming) {
      this.priming = false
      this.play()
    }
  }
}
