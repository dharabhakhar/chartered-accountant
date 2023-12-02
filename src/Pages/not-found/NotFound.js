
import NotFoundIcon from "./icons/error.png"

export default function NotFound() {

    return (
        <div className="fixed inset-0 z-[999] bg-white flex gap-y-4 justify-center items-center flex-col">
            <div>
                <img src={NotFoundIcon} className="h-[70px] w-[70px]" alt="not found" />
            </div>
            <h1 className="text-[18px]">Page Not Found</h1>
        </div>
    )
}