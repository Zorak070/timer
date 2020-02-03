import React, { Component } from 'react';
import './App.css';
import Timer from './containers/Timer';
import CountDown from './containers/Countdown';
import { TIMER, COUNTDOWN } from './constants';
class App extends Component {

  constructor(props) {
    super(props);

    //initial state
    this.state = {
      mode: TIMER
    };

    //binding functions
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var checked = this.refs.toggle.checked;
    if (checked === true) {
      this.setState({
        ...this.state,
        mode: TIMER
      })
    }
    else if (checked === false) {
      this.setState({
        ...this.state,
        mode: COUNTDOWN
      })
    }
  }

  render() {
    return (
      <div className="App d-flex  flex-column container">
        <div className="Header">
          <h1>Web Timer App</h1>
        </div>

        <div className="d-flex flex-fill justify-content-center flex-column">
          <div className="row">
            <div className="col-md-6 offset-md-3" >
              <div className="timer-toggle" onClick={this.handleChange}>
                <input type="checkbox" defaultChecked="checked" data-toggle="toggle"
                  data-on="TIMER" data-off="COUNTDOWN" ref="toggle" />
              </div>
              <div className="timer-container">
                {this.state.mode === TIMER && <Timer />}
                {this.state.mode === COUNTDOWN && <CountDown />}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-grow-1" />
      </div>
    );
  }
}
export default App;
