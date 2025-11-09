export function formatPi(value) {
  return `${value.toFixed(6)} π`;
}

export function getBalances() {
  return {
    testnet: { pi: 1000.123456, powa: 500 },
    mainnet: { pi: 0.0, powa: 0 }
  };
}
