declare module '@klawdyo/pix.js' {
  export interface PixOptions {
    key: string
    txId: string | number
    amount: number
  }

  export function pix(options: PixOptions): string
}
