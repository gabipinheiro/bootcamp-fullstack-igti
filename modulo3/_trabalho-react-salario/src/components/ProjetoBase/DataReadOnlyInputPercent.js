import React, { Component } from 'react';

export default class DataReadOnlyInputPercent extends Component {
  render() {
    console.log('printandooo', this.props);
    const { data, value, porcent } = this.props;

    return (
      <div>
        <label>
          {data}{' '}
          <input
            type="text"
            readOnly
            disabled
            value={`R$ ${value}  (${porcent})`}
          />
        </label>
      </div>
    );
  }
}
