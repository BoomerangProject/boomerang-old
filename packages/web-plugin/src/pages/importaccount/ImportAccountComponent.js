import React, { Component } from 'react';

class ImportAccountComponent extends Component {

  onChangeOfSeedText(event) {
    this.setState({ seedText: event.target.value });
  }

  onClickOfConfirmButton() {

    if (this.state.seedText.length !== 64) {
      window.alert("seed text must be 64 hexadecimal characters");
      return;
    }

    localStorage.setItem("kudosAccountSeed", this.state.seedText);
    this.props.history.push("/account");
  }

  render() {

    return (

      <div className="ImportAccount container">

        <img alt="" className="ImportAccount logo" src={require("../../images/kudos.png")}/>

        <h5 className="ImportAccount title">Paste a seed to begin</h5>

        <div className="ImportAccount seedLabel">SEED</div>

        <div className="ImportAccount seedTextContainer">
          <textarea className="ImportAccount seedText" maxLength="64" onChange={this.onChangeOfSeedText.bind(this)}></textarea>
        </div>

        <button className="ImportAccount button" onClick={this.onClickOfConfirmButton.bind(this)}>Confirm Seed</button>
      </div>
    );
  }
}

export default ImportAccountComponent;
