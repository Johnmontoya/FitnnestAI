const LoadingFallback = () => {
    return (
        <div className="w-full h-screen m-auto flex justify-center items-center h-fit z-50 bg-slate-900/90 backdrop-blur-none">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-white border-gray-700"></div>
        </div>
    );
};

export default LoadingFallback;