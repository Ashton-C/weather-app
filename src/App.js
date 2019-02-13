import React, { Component } from "react";
import Header from "./components/header/Header";
import LgView from "./components/lgview/LgView";
import SmView from "./components/smview/SmView";
import Footer from "./components/footer/Footer";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      tomorrow: this.state.today.setDate(getDate() + 1)
    };
  }

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
