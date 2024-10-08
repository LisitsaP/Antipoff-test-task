export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[500px]">

    <div className="flex flex-row gap-2">
    <div className="w-4 h-4 rounded-full bg-violet animate-bounce"></div>
    <div className="w-4 h-4 rounded-full bg-violet animate-bounce [animation-delay:-.3s]"></div>
    <div className="w-4 h-4 rounded-full bg-violet animate-bounce [animation-delay:-.5s]"></div>
  </div>
    </div>
  )
}
