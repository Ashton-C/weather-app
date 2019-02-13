import React, { Component } from "react";
import Header from "./components/header/Header";
import LgView from "./components/lgview/LgView";
import SmView from "./components/smview/SmView";
import Footer from "./components/footer/Footer";
import "./App.css";

let ds_api_key = process.env.DARK_SKY_SECRET;
let ip_api_key = process.env.IPSTACK_SECRET;

class App extends Component {
  constructor(props) {
    super(props);
    this.generateOneDay = this.generateOneDay.bind(this);
    this.generateTenDay = this.generateTenDay.bind(this);
    this.state = {
      today: new Date(),
      tomorrow: null
    };
  }
  generateOneDay = () => {
    let location = fetch(
      `api.ipstack.com/check?access_key=${ip_api_key}&output=json&fields=longitude,latitude`
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        let longitude = data.longitude;
        let latitude = data.latitude;
        console.log(longitude);
        return [latitude, longitude];
      });
    let url = `https://api.darksky.net/forecast/${ds_api_key}/${location[0]},${
      location[1]
    }`;
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

  render() {
    let test = this.generateOneDay();
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
