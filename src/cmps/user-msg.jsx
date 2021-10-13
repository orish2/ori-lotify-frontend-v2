import React from 'react'

import { eventBusService } from '../services/event-bus.service.js'
import ringing from '../assets/img/ringing.png'

export class UserMsg extends React.Component {

  removeEvent;

  state = {
    msg: null
  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      setTimeout(() => {
        this.setState({ msg: null })
      }, 5000)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
    if (!this.state.msg) return <></>
    const msgClass = this.state.msg.type || ''
    return (
      <div id={`toast`} className={`show  ${msgClass}`}><div id="img"><img style={{ height: '20px', width: "20px" }} src={ringing} /></div><div id="desc"> {this.state.msg.txt}</div></div>
      //<section className={'user-msg ' + msgClass}>
      //  <button onClick={() => {
      //    this.setState({ msg: null })
      //  }}>x</button>
      //  {this.state.msg.txt}
      //</section>
    )
  }
}
