import Image from 'next/image';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Image
                src="/loader-img.png"
                alt="Loading"
                width={80}
                height={80}
                className="animate-spin-slower mb-4"
            />
            <p>LOADING ...</p>
        </div>
    );
};

export default Loader;
