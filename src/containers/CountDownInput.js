import React, { Component } from 'react';
import './CountDownInput.css';

class CountDownInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            temp_duration: this.props.duration
        }

        this.handleChange = this.handleChange.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
    }

    handleChange(e) {
        var duration_value = parseInt(e.target.value);
        if (duration_value > 0) {
            this.setState({
                ...this.state,
                temp_duration: duration_value
            })
        }
    }

    updateDuration() {
        this.props.updateDuration(this.state.temp_duration);
    }

    render() {
        return (
            <div className="Countdown-Input">
                <div className="input-title">
                    <h2>Set the Duration</h2>
                </div>
                <div className="d-flex form-group duration-form">
                    <label className="duration-label">Duration (mins):</label>
                    <input onChange={this.handleChange}
                        value={this.state.temp_duration}
                        className="flex-fill form-control duration-input"
                        type="number" />
                </div>
                <div className="submission-btn">
                    <button onClick={this.updateDuration} className="btn btn-primary">
                        Set Duration
                    </button>
                </div>
            </div>
        );
    }
}

export default CountDownInput;