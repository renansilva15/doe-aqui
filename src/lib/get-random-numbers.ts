function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomNumbers(quantity: number) {
  const randomNumbers = []

  for (let i = 0; i < quantity; i++) {
    randomNumbers.push(getRandomInt(0, 9))
  }

  return randomNumbers
}
