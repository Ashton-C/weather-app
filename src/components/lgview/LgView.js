import React, { Component } from 'react';
import './styles.css';

export default class LgView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: {
        last_updated_epoch: 0,
        last_updated: '',
        temp_c: 0,
        temp_f: 0,
        is_day: 0,
        condition: { text: '', icon: '', code: 0 },
        wind_mph: 0,
        wind_kph: 0,
        wind_degree: 0,
        wind_dir: '',
        pressure_mb: 0,
        pressure_in: 0,
        precip_mm: 0,
        precip_in: 0,
        humidity: 0,
        cloud: 0,
        feelslike_c: 0,
        feelslike_f: 0,
        vis_km: 0,
        vis_miles: 0,
        uv: 0
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ condition: this.nextProps });
  }

  render() {
    return (
      <div className="LgView">
        {this.props.content ? (
          <div>{this.props.content.current.temp_f}</div>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    );
  }
}
