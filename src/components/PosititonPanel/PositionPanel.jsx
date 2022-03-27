import { Component } from 'react'
import React from 'react'
import axios from 'axios'
import './PositionPanel.scss'

class PositionPanel extends Component {
  state = {
    accountBalance: 0,
    ticker: '',
    currentPositonShares: 0,
    newPositionShares: 0,
    averagePrice: 0,
    profitLoss: 0,
    cashAmount: 0,
    price: 0,
  }

  componentDidMount() {
    this.setState({ price: this.props.price })
    this.loadAccountBalance()
    this.loadPortfolioStock()
  }

  loadAccountBalance = () => {
    var options = {
      method: 'GET',
      url: 'http://localhost:44317/api/useraccount',
    }
    axios
      .request(options)
      .then((response) => {
        this.setState({ accountBalance: response.data.AccountBalance })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  loadPortfolioStock = () => {
    axios
      .get(`http://localhost:44317/api/portfolio/${this.props.ticker}`)
      .then((response) => {
        var pl =
          (this.props.price - response.data.AveragePrice) * response.data.Shares
        this.setState({
          averagePrice: response.data.AveragePrice,
          ticker: response.data.Ticker,
          currentPositonShares: response.data.Shares,
          profitLoss: pl.toFixed(2),
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      cashAmount: (e.target.value * this.state.price).toFixed(2),
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (e.nativeEvent.submitter.name == 'buy') {
      this.handleBuy()
    } else {
      console.log('sell')
    }
  }

  handleBuy = () => {
    // update account balance
    //update transaction table
    // update prtoflio table
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ticker != this.props.ticker) {
      this.fetchData()
    }
    if (prevProps.price != this.props.price) {
      this.setState({ price: this.props.price })
    }
  }

  render() {
    return (
      <section className='position'>
        <div className='position__accountBalance-wrapper'>
          <p className='position__accountBalance--label'>Account Balance</p>
          <p className='position__accountBalance--text'>
            {this.state.accountBalance}
          </p>
        </div>
        <div className='position-wrapper first'>
          <h4 className='position__header'>Current Position</h4>
          <table className='position__table'>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Shares</th>
                <th>Average Price</th>
                <th>Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.ticker}</td>
                <td>{this.state.currentPositonShares}</td>
                <td>{this.state.averagePrice}</td>
                <td>{this.state.profitLoss}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='position-wrapper second'>
            <h4 className='position__header'>New Position</h4>
            <table className='position__table'>
              <tr>
                <th>Stock</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Cash Amount</th>
              </tr>
              <tr>
                <td>{this.state.ticker}</td>
                <td>
                  <input
                    className='position__input--shares'
                    type='text'
                    name='newPositionShares'
                    onChange={this.handleChange}
                    value={this.state.newPositionShares}
                  />
                </td>
                <td>{this.state.price}</td>
                <td>{this.state.cashAmount}</td>
              </tr>
            </table>
          </div>
          <div className='position__button-wrapper'>
            <button className='position__button buy' type='submit' name='buy'>
              Buy
            </button>
            <button className='position__button sell' type='submit' name='sell'>
              Sell
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default PositionPanel
