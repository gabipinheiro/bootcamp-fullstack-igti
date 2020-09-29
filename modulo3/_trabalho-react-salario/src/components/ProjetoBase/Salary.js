import React, { Component } from 'react';
import { calculateSalaryFrom } from './Calculates';
import ProgressBarSalary from './ProgressBarSalary';
import DataReadOnlyInput from './DataReadOnlyInput';
import DataReadOnlyInputPercent from './DataReadOnlyInputPercent';
import formatNumber from './helpers/help';
import css from './style.css';

export default class Salary extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0,
    };
  }

  handleInputChange = (event) => {
    console.log('nada?', event.target.value);
    const newFullSalary = event.target.value;

    this.setState({
      fullSalary: newFullSalary,
    });
  };

  render() {
    const { fullSalary } = this.state;
    const allData = calculateSalaryFrom(fullSalary);
    console.log('all document', allData);

    console.log('discountIRPF', allData.porcentDiscountIRPF);

    return (
      <div>
        <h1 className={'title'}> React Salário </h1>
        <div class={'input'}>
          <lable>
            {' '}
            Salário Bruto:
            <input
              autoFocus
              type="number"
              value={formatNumber(fullSalary)}
              onChange={this.handleInputChange}
            ></input>
          </lable>
        </div>
        <ProgressBarSalary data={allData} />
        <br />

        <div className="readOnly">
          <DataReadOnlyInput data={'Base INSS'} value={allData.baseINSS} />

          <DataReadOnlyInputPercent
            data={'Desconto INSS'}
            value={allData.discountINSS}
            porcent={allData.porcentDiscountINSS}
          />
          <DataReadOnlyInput data={'Base IRPF'} value={allData.baseIRPF} />
          <DataReadOnlyInputPercent
            data={'Desconto IRPF'}
            value={allData.discountIRPF}
            porcent={allData.porcentDiscountIRPF}
          />
          <br />
          <br />
          <DataReadOnlyInputPercent
            data={'Salário líquido'}
            value={allData.netSalary}
            porcent={allData.porcentNetSalary}
          />
        </div>
      </div>
    );
  }
}
