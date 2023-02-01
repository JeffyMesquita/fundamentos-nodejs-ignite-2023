// Stream -> 

// process.stdin
//   .pipe(process.stdout)

import { Readable }  from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1
  
  _read() {
    const i = this.index++

    if(i > 100) {
      this.push(null)
    } else {
      this.push(i)
    }
  }
}

new OneToHundredStream()
  .pipe(process.stdout)