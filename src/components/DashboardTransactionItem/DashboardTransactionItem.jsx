import React from 'react'
import './DashboardTransactionItem.scss'
import { Link } from 'react-router-dom'

const DashboardTransactionItem = ({
  fullName,
  ticker,
  shares,
  date,
  price,
  buy,
  sell,
}) => {
  return (
    <>
      <div className='dashTransactionItem'>
        <div className='dashTransactionItem__img-wrapper'>
          <img className='dashTransactionItem__img' />
        </div>
        <div className='dashTransactionItem__text-wrapper'>
          <div className='dashTransactionItem__text--header'>
            <h4 className='dashTransactionItem__username'>{fullName}</h4>
            <p className='dashTransactionItem__date'>{date.substring(0, 10)}</p>
          </div>
          {buy == 1 ? (
            <p className='dashTransactionItem__text'>
              Bought {shares} shares of{' '}
              <Link
                className='dashTransactionItem__link'
                to={`/portfoliopro/${ticker}`}
              >
                {ticker}
              </Link>
            </p>
          ) : (
            <p className='dashTransactionItem__text'>
              Sold {shares} shares of{' '}
              <Link to={`/portfoliopro/${ticker}`}>{ticker}</Link>
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default DashboardTransactionItem
