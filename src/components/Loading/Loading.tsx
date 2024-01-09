export const Loading = () => {
  return (
    <div className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 z-50 bg-slate-600/20 flex items-center justify-center">
      <div className="w-16 h-16 border-b-4 border-primary-500 border-dashed rounded-full animate-spin ease-in-out duration-700 transition-all"></div>
    </div>
  )
}
export default Loading
