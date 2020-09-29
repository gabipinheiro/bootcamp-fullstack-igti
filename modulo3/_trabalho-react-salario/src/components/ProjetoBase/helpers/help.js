function formatValue(value) {
  return Intl.NumberFormat('pt-BR').format(value);
}
/*
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
*/

export default formatValue;
