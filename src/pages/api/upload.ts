import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, Fields, Files } from 'formidable'
import fs from 'fs'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '@/config/firebase.config'
import { verifyJWT } from '@/lib/token'
import { getCookies } from '@/lib/get-cookies'
import { isTokenValid } from '@/lib/is-token-valid'

type FormParseResult = {
  fields: Fields
  files: Files
}

initializeApp(firebaseConfig)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookies = getCookies(req)

  if (!(await isTokenValid(cookies.token))) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in, please provide token to gain access',
    })
  }

  try {
    const data = await parseFormData(req)

    if (!data.files.file || !data.fields.campaignId) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Arquivo ou id da campanha faltando' })
    }

    const file = data.files.file[0]
    const { campaignId } = data.fields

    const fileData = fs.readFileSync(file.filepath)

    const downloadURL = await uploadToFirebase(
      fileData,
      file.mimetype ?? undefined,
      campaignId[0],
    )

    return res
      .status(201)
      .json({ status: 'sucess', data: { url: downloadURL } })
  } catch (error) {
    return res.status(500).json({ status: 'Error' })
  }
}

async function parseFormData(req: NextApiRequest): Promise<FormParseResult> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      } else {
        resolve({ fields, files })
      }
    })
  })
}

async function uploadToFirebase(
  fileData: Uint8Array | Blob | ArrayBuffer,
  mimetype: string | undefined,
  campaignId: string,
) {
  const storage = getStorage()

  const storageRef = ref(storage, `doe-aqui/${campaignId}`)

  const metadata = {
    contentType: mimetype ?? undefined,
  }

  const snapshot = await uploadBytesResumable(storageRef, fileData, metadata)

  return getDownloadURL(snapshot.ref)
}
