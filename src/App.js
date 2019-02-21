import React, { Component } from "react";
import Header from "./components/header/Header";
import LgView from "./components/lgview/LgView";
import SmView from "./components/smview/SmView";
import Footer from "./components/footer/Footer";
import "./App.css";

//ksys

class App extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.generateOneDay = this.generateOneDay.bind(this);
    this.generateTenDay = this.generateTenDay.bind(this);
    this.state = {
      data: null
    };
  }

  getData(url) {
    let data = fetch(
      `https://api.apixu.com/v1/current.json?key=${apixu_key}&q=Sale lake City, UT`
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
    let data = this.getData();
  }

  render() {
    let { data } = this.state;
    return (
      <div className="App">
        <Header />
        <LgView id="today" content={data} />
        <LgView id="tomorrow" content={null} />
        <div className="tenDay">
          {data ? (
            <div>
              You are currently in {data.location.name} and the temp is{" "}
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
