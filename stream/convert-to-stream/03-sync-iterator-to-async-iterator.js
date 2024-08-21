function* generate() {
  for (let i = 1; i < 1025; i++) {
    yield i
  }
}

async function consume(iterator) {
  for await (const chunk of iterator) {
    console.log(chunk)
  }
}

consume(generate())
