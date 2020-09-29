import React, { Component, Fragment } from 'react';
import css from './style.css';

export default class ProgressBarSalary extends Component {
  render() {
    console.log('props ProgressBar', this.props.data);
    //const { discountINSS, discountIRPF, netSalary } = this.props.data;

    const {
      porcentDiscountINSS,
      porcentDiscountIRPF,
      porcentNetSalary,
    } = this.props.data;

    /*
      <div class={'progressBar'} style={{ width: 100 }}>
        <div class={'progressoINSS'} style={{ width: discountINSS }}></div>
        <div class={'progressoIRPF'} style={{ width: discountIRPF }}></div>
        <div class={'progressoNetSalary'} style={{ width: netSalary }}></div>
      </div>
      */

    return (
      <div class={'progressBar'}>
        <div class={'progress-bar-INSS'} style={{ width: porcentDiscountINSS }}>
          {' '}
        </div>
        <div class={'progress-bar-IRPF'} style={{ width: porcentDiscountIRPF }}>
          {' '}
        </div>
        <div
          class={'progress-bar-netSalary'}
          style={{ width: porcentNetSalary }}
        >
          {' '}
        </div>
      </div>
    );
  }
}
