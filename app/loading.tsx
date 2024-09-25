
import { Spinner } from "@nextui-org/react";
export default function Loading() {
    return (
        <div className="flex justify-center items-center col-span-3 h-[60vh] w-full">
            <Spinner size="lg" />
        </div>
    );
}