import { FaGithub, FaLinkedin } from 'react-icons/fa'

interface TeamCardProps {
  name: string
  image: string
  github: string
  linkedin: string
}

export const TeamCard = ({ name, image, github, linkedin }: TeamCardProps) => {
  return (
    <div className="w-[280px] h-[320px] bg-transparent cursor-pointer group perspective">
      <div className="relative preserve-3d group-hover:flip-y w-full h-full duration-500">
        <div className="absolute backface-hidden w-full h-full rounded-lg overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
        <div className="text-2xl absolute flex flex-col items-center justify-center gap-y-3 p-4 flip-y backface-hidden w-full h-full bg-primary-900 text-primary-50 rounded-lg overflow-hidden">
          <h1 className="font-semibold">{name}</h1>
          <div className="w-full flex justify-evenly text-3xl">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all duration-200 hover:text-primary-300"
            >
              <FaGithub />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all duration-200 hover:text-primary-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
