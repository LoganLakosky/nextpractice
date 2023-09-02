export function Timeout(fn: any, delay: number) {
  setTimeout(() => {
    fn(false);
  }, delay);
}
