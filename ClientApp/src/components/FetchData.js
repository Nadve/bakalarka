import React, { Component } from 'react';
import Axios from 'axios';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { card: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(card) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price USD</th>
            <th>Price EUR</th>
          </tr>
        </thead>
        <tbody>
            <tr key={card.name}>
              <td>{card.name}</td>
                  <td>{card.prices.usd}</td>
                  <td>{card.prices.eur}</td>
            </tr>          
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.card);

    return (
      <div>
        <h1 id="tabelLabel" >Random Mtg card</h1>
        <p>This component demonstrates fetching data from scryfall api.</p>
        {contents}
      </div>
    );
  }

    async populateWeatherData() {
        const url = 'https://api.scryfall.com/cards/random?format=json&pretty=true?q=react'
        const response = await Axios.get(url)
        this.setState({ card: response.data, loading: false })
    }
}
