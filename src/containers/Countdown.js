import React, { Component } from 'react';
import './Countdown.css';
import CountDownInput from './CountDownInput';
import { Timer } from 'easytimer.js';

class CountDown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countdown_text: "00:00:00",
            edit_duration: true,
            timer: null,
            duration: 30
        }

        this.bindListeners = this.bindListeners.bind(this);
        this.resetCountdown = this.resetCountdown.bind(this);
        this.editDuration = this.editDuration.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
    }

    bindListeners(timer) {
        timer.addEventListener("started", this.onTimerStarted.bind(this));
        timer.addEventListener("reset", this.onTimerStarted.bind(this));
        timer.addEventListener("secondsUpdated", this.onTimerUpdated.bind(this));
        timer.addEventListener("targetAchieved", this.onTimerEnded.bind(this));
    }


    onTimerStarted(e) {
        if (this.state.timer) {
            this.setState({
                ...this.state,
                countdown_text: this.state.timer.getTimeValues().toString()
            });
        }
    }

    onTimerUpdated(e) {
        if (this.state.timer !== null) {
            this.setState({
                ...this.state,
                countdown_text: this.state.timer.getTimeValues().toString()
            });
        }
    }

    onTimerEnded(e) {
        var countdown_message = "Countdown complete";
        this.setState({
            ...this.state,
            countdown_text: countdown_message
        });
    }

    editDuration() {
        this.setState({
            ...this.state,
            edit_duration: true,
            countdown_text: "00:00:00"
        });
    }

    updateDuration(duration) {
        var timer = new Timer();
        this.bindListeners(timer);

        timer.start({
            countdown: true,
            startValues: { minutes: duration }
        });

        this.setState({
            ...this.state,
            edit_duration: false,
            duration: duration,
            timer: timer,
            countdown_text: timer.getTimeValues().toString()
        });

    }

    resetCountdown() {
        this.state.timer.reset();
    }

    componentDidMount() {
        var timer = new Timer();
        this.bindListeners(timer);
        if (this.state.edit_duration === false) {
            timer.start({
                countdown: true,
                startValues: { minutes: this.state.duration }
            });
            this.setState({
                ...this.state,
                timer: timer,
                countdown_text: timer.getTimeValues().toString()
            });
        }
    }

    componentWillUnmount() {
        if (this.state.timer !== null) {
            this.state.timer.stop();
        }
    }

    render() {
        return (
            <div className="Countdown">
                {this.state.edit_duration === false && (
                    <div>
                        <div className="countdown-buttons row">
                            <div className="col text-left">
                                <button onClick={this.resetCountdown} className="btn btn-primary">
                                    <i className="fa fa-history" />
                                </button>
                            </div>
                            <div className="col text-right">
                                <button onClick={this.editDuration} className="btn btn-secondary">
                                    <i className="fa fa-pencil" />
                                </button>
                            </div>
                        </div>
                        <div className="countdown-text">
                            <h2>{this.state.countdown_text}</h2>
                        </div>
                    </div>
                )}
                {this.state.edit_duration === true && (
                    <CountDownInput duration={this.state.duration} updateDuration={this.updateDuration} />
                )}
            </div>
        );
    }
}

export default CountDown;