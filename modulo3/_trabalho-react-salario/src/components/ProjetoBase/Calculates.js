// Fonte: https://www.todacarreira.com/calculo-salario-liquido/

// tabela INSS

const INSS_TABLE = [
  {
    id: 1,
    minValue: 0,
    maxValue: 1045,
    difference: 1045 - 0,
    discountPercentage: 0.075,
    discountValue: -1,
  },
  {
    id: 2,
    minValue: 1045.01,
    maxValue: 2089.6,
    difference: 2089.6 - 1045,
    discountPercentage: 0.09,
  },
  {
    id: 3,
    minValue: 2089.61,
    maxValue: 3134.4,
    difference: 3134.4 - 2089.6,
    discountPercentage: 0.12,
  },
  {
    id: 4,
    minValue: 3134.41,
    maxValue: 6101.06,
    difference: 6101.06 - 3134.4,
    discountPercentage: 0.14,
  },
];

// arredonda valor
function round(value) {
  return +value.toFixed(2);
}

// calcula e retorna o desconto INSS
function calculateDiscountINSS(baseINSS) {
  let discountINSS = 0;

  if (baseINSS > 6101.07) {
    return 713.1;
  }

  for (var i = 0; i < INSS_TABLE.length; i++) {
    var currentItem = INSS_TABLE[i];
    let discountValue = 0;

    if (baseINSS > currentItem.maxValue) {
      // prettier-ignore
      discountValue = 
        round(currentItem.difference * currentItem.discountPercentage);

      discountINSS += discountValue;
    } else {
      // prettier-ignore
      discountValue = 
        round((baseINSS - currentItem.minValue) * currentItem.discountPercentage);

      discountINSS += discountValue;
      break;
    }
  }

  discountINSS = round(discountINSS);

  return discountINSS;
}

// calcula e retorna o desconto IRPF
function calculateDiscountIRPF(baseIRPF) {
  let discountIRPF =
    baseIRPF < 1903.98
      ? 0
      : baseIRPF < 2826.65
      ? round(baseIRPF * 0.075) - 142.8
      : baseIRPF < 3751.05
      ? round(baseIRPF * 0.15) - 354.8
      : baseIRPF < 4664.68
      ? round(baseIRPF * 0.225) - 636.13
      : round(baseIRPF * 0.275) - 869.36;

  discountIRPF = round(discountIRPF);

  return discountIRPF;
}

function calculatePorcent(data, base) {
  if (base != 0) {
    return round((data * 100) / base);
  } else {
    return 0;
  }
}

// retorna todos os dados
function calculateSalaryFrom(fullSalary) {
  console.log('Calculates: ', fullSalary);

  //const baseINSS = Intl.NumberFormat('pt-BR').format(+fullSalary);
  const baseINSS = +fullSalary;

  const discountINSS = calculateDiscountINSS(baseINSS);
  const porcentDiscountINSS = calculatePorcent(discountINSS, baseINSS);

  const baseIRPF = baseINSS - discountINSS;
  const discountIRPF = calculateDiscountIRPF(baseIRPF);
  const porcentDiscountIRPF = calculatePorcent(discountIRPF, baseINSS);

  const netSalary = baseINSS - (discountINSS + discountIRPF);
  const porcentNetSalary = calculatePorcent(netSalary, baseINSS);

  return {
    baseINSS,
    discountINSS,
    porcentDiscountINSS,
    baseIRPF,
    discountIRPF,
    porcentDiscountIRPF,
    netSalary,
    porcentNetSalary,
  };
}

export { calculateSalaryFrom };
