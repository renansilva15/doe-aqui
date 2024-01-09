'use client'

import AvatarEditor from 'react-avatar-editor'
import { useState } from 'react'
import { FaUpload } from 'react-icons/fa'

interface SetFileFunction {
  (file: File | null): void
}

interface ImgCutProps {
  setFile: SetFileFunction
  close: () => void
}

const ImgCut = ({ setFile, close }: ImgCutProps) => {
  const [editor, setEditor] = useState<AvatarEditor | null>(null)

  const [selectedFile, setSelectedFile] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement
    const fileList = inputElement.files

    if (fileList && fileList.length > 0) {
      const fileName = fileList[0].name
      setArchivo(fileList[0])
      setSelectedFile(fileName.substring(0, 20) + '...')
    }
  }

  const handleUpload = () => {
    // 'editor' é uma referência ao componente AvatarEditor

    if (editor) {
      const canvas = editor.getImageScaledToCanvas()
      if (canvas) {
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const file = new File([blob], 'img.jpg', {
              type: 'image/jpeg',
            })
            setFile(file)
            close()
          }
        })
      } else {
        close()
      }
    } else {
      close()
    }
  }

  return (
    <div className="fixed top-0 left-0 md:top-[4%] md:left-16 md:bottom-[4%] md:right-16 md:w-auto md:h-auto md:rounded-lg w-full h-screen z-10 flex flex-col items-center justify-center bg-primary-900">
      {/* <input className="" type="file" onChange={handleFileChange} /> */}

      {archivo && (
        <AvatarEditor
          className="scale-[55%] md:scale-100 -mt-20 md:m-0 rounded-lg"
          ref={(ref) => setEditor(ref)}
          image={archivo}
          width={480}
          height={334}
          border={40}
          color={[255, 40, 0, 0.3]} // Cor de fundo transparente
          scale={1}
          rotate={0}
        />
      )}
      <div className="grid grid-cols-2 w-[308px] md:w-[560px] gap-3 mt-4">
        <>
          <label
            htmlFor="cut-image"
            className="w-full md:mb-4 cursor-pointer bg-primary-50 hover:scale-105 text-primary-500 font-semi h-10 px-4 rounded-lg flex items-center justify-start gap-3"
          >
            <FaUpload />{' '}
            {selectedFile ? <p>{selectedFile}</p> : 'Selecione uma imagem'}
          </label>
          <input
            id="cut-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
        <button
          onClick={handleUpload}
          className="w-full bg-primary-50 hover:scale-105 text-primary-500 font-semi h-10 px-4 rounded-lg flex items-center justify-center gap-3"
        >
          Confirmar imagem
        </button>
      </div>
    </div>
  )
}

export default ImgCut
