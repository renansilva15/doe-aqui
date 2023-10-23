// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { pix } from '@klawdyo/pix.js'

export async function POST() {
  const code = pix({
    key: '+5589994301738',
    // name: '',
    // city: 'coco',
    txId: 'ASD123',
    amount: 0.1,
  })

  return Response.json(code)
}
