import { ILoadingIndicatorProps } from "./types";

export const LoadingIndicator: React.FC<ILoadingIndicatorProps> = ({ className = 'fill-white' }) => {
    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="flex items-center justify-center my-10 w-full ">
                <img
                    src="assets/logos/fenix-login.svg"
                    alt="fenix"
                    className="object-cover h-auto rounded w-8/12"
                />
            </div>
        </div>
    );
}
