const buff1 = Buffer.alloc(10)

buff1.write('hello')

console.log(buff1)

const buff2 = Buffer.alloc(10)

buff2.write(10)

console.log(buff2)
