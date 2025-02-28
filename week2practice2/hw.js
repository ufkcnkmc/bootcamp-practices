function collatzSequenceLength(number, memo) {
  if (number === 1) return 1;
  if (memo.has(number)) return memo.get(number);

  let nextN = number % 2 === 0 ? number / 2 : 3 * number + 1;
  let length = 1 + collatzSequenceLength(nextN, memo);

  memo.set(number, length);
  return length;
}

function findLongestCollatz(limit) {
  let longestStart = 1;
  let longestLength = 1;
  let memo = new Map();
  for (let i = 1; i < limit; i++) {
    let length = collatzSequenceLength(i, memo);
    if (length > longestLength) {
      longestLength = length;
      longestStart = i;
    }
  }

  return longestStart;
}

const limit = 1000000;
console.log(
  "1 milyon altındaki en uzun Collatz zincirini başlatan sayı:",
  findLongestCollatz(limit)
);
