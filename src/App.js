import React, { Component } from 'react';
import Header from './components/header/Header';
import LgView from './components/lgview/LgView';
import SmView from './components/smview/SmView';
import Footer from './components/footer/Footer';
import './App.css';
import secrets from './secrets';

class App extends Component {
  constructor(props) {
    super(props);
    this.getUrl = this.getUrl.bind(this);
    this.generateOneDay = this.generateOneDay.bind(this);
    this.generateTenDay = this.generateTenDay.bind(this);
    this.state = {
      url: null,
      today: new Date(),
      tomorrow: null
    };
  }
  getUrl = () => {
    let url = fetch(
      `http://api.ipstack.com/check?access_key=${ip_api_key}&output=json&fields=longitude,latitude`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let longitude = data.longitude;
        let latitude = data.latitude;
        return [latitude, longitude];
      })
      .then(location => {
        let url = `https://api.darksky.net/forecast/${darksky_secret}/${
          location[0]
        },${location[1]}`;
        return url;
      });
    this.setState({ url: [url] });
    console.log(url);
    return url;
  };

  async getData(url) {
    let data = fetch(await url).then(res => {
      console.log(res.json());
      return res;
    });
  }
  generateOneDay = () => {
    let tenD = [];
    let date = this.state.today;
    for (let i = 0; i < 10; i++) {
      tenD.append(<Sm-View content={date} />);
      date.setDate(date.getDate() + 1);
      console.log(date);
    }
  };
  generateTenDay = () => {
    let tenD = [];
    let date = this.state.today;
    for (let i = 0; i < 10; i++) {
      tenD.append(<Sm-View content={date} />);
      date.setDate(date.getDate() + 1);
      console.log(date);
    }
  };

  componentDidMount() {
    let data = this.getData(this.getUrl());
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Lg-View id="today" content={this.state.today} />
        <Lg-View id="tomorrow" content={this.state.tomorrow} />
        <div className="tenDay">{this.generateTenDay};</div>
        <Footer />
      </div>
    );
  }
}

export default App;
