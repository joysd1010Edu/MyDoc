import { LoaderIcon } from "lucide-react";

interface fullScreenLoaderProps {
 label?: string;
 className?: string;   
}


const FullScreenLoader = ({label}:fullScreenLoaderProps) => {
    return (
        <div className=" flex flex-col justify-center  items-center min-h-screen gap-3">
            <LoaderIcon className=" size-6 text-muted-foreground animate-spin"/>
            {label && <p className=" text-muted-foreground font-medium">{label}</p>}
        </div>
    );
};

export default FullScreenLoader;