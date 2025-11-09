export function formatPi(pi) {
  return `${(pi||0).toFixed(3)} π (≈ $${Math.round((pi||0)* (process.env.NEXT_PUBLIC_PI_PRICE || 314159)).toLocaleString()})`;
}
export function getBalances() {
  return {
    testnet: { pi: 9.75, powa: 1000 },
    mainnet: { pi: 0.0, powa: 0.0 }
  };
}
