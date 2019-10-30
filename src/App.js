import React, { Component } from 'react';
import Header from './components/header/Header';
import LgView from './components/lgview/LgView';
import SmView from './components/smview/SmView';
import Footer from './components/footer/Footer';
import './App.css';

let apixu_key = 'd0d11c2b8e864928b36162638192102';
let ip_api_key = 'e7cf71190d76913a7983a016fe359dec';

class App extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      data: {
        location: {
          name: '',
          region: '',
          country: '',
          lat: 0,
          lon: 0,
          tz_id: '',
          localtime_epoch: 0,
          localtime: ''
        },
        current: {
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
      }
    };
  }

  getData() {
    let lat,
      long = navigator.geolocation.getCurrentPosition(this.getLoc);
    console.log(lat, long);
    let data = fetch(
      `https://api.apixu.com/v1/current.json?key=${apixu_key}&q=auto:ip`
    )
      .then(res => {
        console.log(res.clone().json());
        return res.clone().json();
      })
      .then(current => {
        console.log(
          `You are in: ${current.location.name}, and the current temp is: ${
            current.current.temp_f
          }`
        );
        this.setState({ data: current });
        return current;
      });
  }

  getLoc = position => {
    return [position.coords.latitude, position.coords.longitude];
  };

  componentDidMount() {
    let data = this.getData();
  }

  render() {
    let { data } = this.state;
    console.log(data);
    return (
      <div className="App">
        <Header />
        <LgView id="today" content={data} />
        <div className="tenDay">
          {data ? (
            <div>
              You are currently in {data.location.name} and the temp is{' '}
              {data.current.temp_f}.
            </div>
          ) : (
            <div> Loading... </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
