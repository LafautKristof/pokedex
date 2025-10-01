import Image from "next/image";

const Ash = () => {
    return (
        <div className="absolute -top-50 left-1/7 -translate-x-1/2 ">
            <Image
                src="/Ash_Ketchum_Journeys.png"
                alt="ash"
                width={100}
                height={100}
                className="pointer-events-none select-none"
            />
        </div>
    );
};
export default Ash;
