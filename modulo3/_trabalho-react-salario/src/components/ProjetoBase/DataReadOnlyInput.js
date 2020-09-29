import React, { Component } from 'react';
import formatNumber from './helpers/help';

export default class DataReadOnlyInput extends Component {
  render() {
    console.log('printandoooii', this.props);
    const { data, value, porcent } = this.props;

    return (
      <div>
        <label>
          {data}{' '}
          <input
            type="text"
            readOnly
            disabled
            value={`R$ ${formatNumber(value)}`}
          />
        </label>
      </div>
    );
  }
}
