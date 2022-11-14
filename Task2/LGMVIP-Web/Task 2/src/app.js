import React from "react";
import Detail from "./Detail";
import "./style.css";
import { trackPromise } from "react-promise-tracker";

class App extends React.Component {
  constructor() {
    super();
    this.state = { content: "" };
  }

  loadData = (url) => {
    trackPromise(
      fetch(url)
        .then(function (response) {
          if (response.ok) {
            return response.text();
          }
          throw new Error("Error message.");
        })
        .then(
          function (userData) {
            userData = JSON.parse(userData);
            // console.log("data: ", userData);
            this.setState({ content: userData });
          }
          .bind(this)
        )
        .catch(function (err) {
          console.log("failed to load ", url, err.message);
        })
    );
  };
  render() {
    let a = "";
    if (this.state.content) {
      a = <Detail data={this.state.content.data} />;
    }
    return (
      <div className="mainContainer">
        <div className="buttonContainer">
          <p className='title'>Code Star</p>
            <button
              onClick={this.loadData.bind(
                this,
                "https://reqres.in/api/users?page=1"
              )}
            >
              Show User Data
            </button>
        </div>
        {a}
      </div>
    );
  }
}

export default App;