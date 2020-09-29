import React, { useEffect } from 'react';
import css from './app-module.css';
import Result from './components/Result';
import Results from './components/Results';

export default function App() {
  const [initialValue, setInitialValue] = React.useState(0);
  const [rate, setRate] = React.useState(0);
  const [period, setPeriod] = React.useState(1);
  const [infos, setInfos] = React.useState([
    {
      period,
      amount: 0,
      yields: 0,
      yieldsPercentage: 0,
    },
  ]);

  const handleInitialInputValue = ({ target }) => {
    let newInitialValue = parseInt(target.value);
    setInitialValue(newInitialValue);
  };

  const handleInputRate = ({ target }) => {
    let newRate = parseFloat(target.value);
    setRate(newRate);
  };

  const handleInputPeriod = ({ target }) => {
    let newPeriod = parseInt(target.value);
    setPeriod(newPeriod);
  };

  useEffect(() => {
    //push no array a cada periodo, atualizando:
    //  period, amount, yield, yieldPercentage

    let newAmount = initialValue;
    let newYields = 0;
    let newYieldsPercentage = 0;
    let juries = parseFloat(rate / 100);
    let newInfos = [];

    const calculateAmount = () => {
      newAmount += newAmount * juries;
    };

    const calculateYields = () => {
      newYields = (newAmount - initialValue).toFixed(2);
      newYieldsPercentage =
        newAmount === 0 ? 0 : ((newYields * 100) / initialValue).toFixed(2);
      //return [newYields, newYieldsPercentage];
    };

    for (let i = 1; i <= period; i++) {
      calculateAmount();
      calculateYields();

      newInfos.push({
        period: i,
        amount: parseFloat(newAmount).toFixed(2),
        yields: newYields,
        yieldsPercentage: newYieldsPercentage,
      });
    }
    setInfos(newInfos);
  }, [initialValue, rate, period]);

  return (
    <div className="container">
      <h1 className="center">React - Juros Compostos</h1>
      <div>
        <form className="center">
          <div className="form">
            <label htmlFor="inputInitialValue" className="active">
              Valor inicial:
              <input
                id="inputInitialValue"
                type="number"
                min="0"
                value={initialValue}
                onChange={handleInitialInputValue}
              />
            </label>

            <label htmlFor="inputRate">
              Taxa de júros:
              <input
                id="inputRate"
                type="number"
                value={rate}
                step={0.1}
                onChange={handleInputRate}
              />
            </label>

            <label htmlFor="inputPeriod">
              Período (meses):
              <input
                id="inputPeriod"
                type="number"
                min="1"
                value={period}
                onChange={handleInputPeriod}
              />
            </label>
          </div>
        </form>
      </div>
      <Results>
        <div style={styles.results}>
          {infos.map((info) => {
            return <Result key={info.period} values={info} />;
          })}
        </div>
      </Results>
    </div>
  );
}

const styles = {
  results: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
};
