import React, { Component } from 'react';
import './Timer.css';
import { Timer } from 'easytimer.js';

class Timers extends Component {

    constructor(props) {
        super(props);

        var timer = new Timer();

        this.state = {
            timer: timer,
            timer_text: timer.getTimeValues().toString(),
            timer_state: "stopped"
        };
        //binding
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        //Add event listener
        timer.addEventListener("secondsUpdated", this.onTimerUpdate.bind(this));
        timer.addEventListener("started", this.onTimerUpdate.bind(this));
        timer.addEventListener("reset", this.onTimerUpdate.bind(this));
        timer.start();
    }

    onTimerUpdate(e) {
        this.setState({
            ...this.state,
            timer_text: this.state.timer.getTimeValues().toString()
        });
    }

    startTimer() {
        this.state.timer.start();
        this.setState({
            ...this.state,
            timer_state: "ticking"
        });
    }

    stopTimer() {
        this.state.timer.stop();
        this.setState({
            ...this.state,
            timer_state: "stopped"
        });
    }

    pauseTimer() {
        this.state.timer.pause();
        this.setState({
            ...this.state,
            timer_state: "paused"
        });
    }

    resetTimer() {
        this.state.timer.reset();
        this.setState({
            ...this.state,
            timer_state: "ticking"
        });
    }
    render() {
        return (
            <div className="Timer">
                <div className="timer-text">
                    <h2>{this.state.timer_text}</h2>
                </div>
                <div className="timer-buttons text-center">
                    {this.state.timer_state !== "ticking" && (
                        <button onClick={this.startTimer} className="btn btn-success"><i class="fa fa-play"></i></button>
                    )}
                    {this.state.timer_state === "ticking" && (
                        <button onClick={this.pauseTimer} className="btn btn-warning"><i class="fa fa-pause"></i></button>
                    )}
                    <button onClick={this.stopTimer} className="btn btn-danger"><i class="fa fa-stop"></i></button>
                    <button onClick={this.resetTimer} className="btn btn-primary"><i class="fa fa-history"></i></button>
                </div>
            </div>
        );
    }
}

export default Timers;