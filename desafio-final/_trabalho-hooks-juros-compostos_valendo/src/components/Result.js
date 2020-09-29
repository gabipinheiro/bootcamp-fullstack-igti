import React from 'react';
import css from './components-module.css';

export default function Result({ values }) {
  let period = values.period;
  let amount = values.amount;
  let yields = values.yields;
  let yieldsPercentage = values.yieldsPercentage;

  let colorTextValues = yieldsPercentage < 0 ? styles.loss : styles.profit;
  let colorTextPercentage =
    yieldsPercentage < 0 ? styles.loss : styles.profitPercentage;

  console.log('porcentagem: ', colorTextValues);

  return (
    <div style={styles.box}>
      <span id="period">
        <b>{period}</b>
      </span>

      <div className="info">
        <div style={colorTextValues}>
          <b>
            R$ {amount} <br />+ R$ {yields}{' '}
          </b>
          <br />
        </div>
        <div style={colorTextPercentage}>{yieldsPercentage}%</div>
      </div>
    </div>
  );
}

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    border: 'solid 1px lightgray',
    width: '120px',
    marginLeft: '2rem',
    marginBottom: '2rem',
    height: '100px',
  },

  loss: {
    color: '#ee0000',
  },

  profit: {
    color: '#329a66',
  },
  profitPercentage: {
    color: '#79cdcd',
  },
};
