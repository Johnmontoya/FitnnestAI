import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface IErrorFallbackProps {
    resetErrorBoundary: (...args: unknown[]) => void;
}

const ErrorFallback = ({ resetErrorBoundary }: IErrorFallbackProps) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 px-2 text-center">
            <div className="h-96 flex flex-col justify-center items-center">
                <h1 className="text-8xl font-extrabold text-red-500">500</h1>
                <p className="text-4xl font-medium text-gray-800">Internal Server Error</p>
                <p className="text-xl text-gray-800 mt-4">We apologize for the inconvenience. Please try again later.</p>
                <div className="flex flex-row gap-4 mt-4">
                    <Button text="" variant="danger" onClick={() => resetErrorBoundary()}>
                        Intentar de nuevo
                    </Button>
                    <Button
                        text="" variant="primary"
                        onClick={() => {
                            navigate("/", { replace: true });
                            window.location.reload();
                        }}
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;