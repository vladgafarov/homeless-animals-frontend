export const wait = (ms: number) => {
   return new Promise((res, rej) => {
      setTimeout(() => {
         res('Done')
      }, ms)
   })
}
