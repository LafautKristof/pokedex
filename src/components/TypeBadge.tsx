import { typeIcons, typeColors } from "@/app/helpers/typeIcons";
import Image from "next/image";

type TypeBadgeProps = {
    type: string;
};

export function TypeBadge({ type }: TypeBadgeProps) {
    const key = type.toLowerCase();

    return (
        <div
            className="flex items-center justify-center gap-1 w-28 h-8 rounded-full shadow text-white"
            style={{ backgroundColor: typeColors[key] }}
        >
            <div className="relative w-5 h-5">
                <Image
                    src={typeIcons[key]}
                    alt={key}
                    fill
                    className="object-contain"
                />
            </div>
            <span className="capitalize text-sm">{key}</span>
        </div>
    );
}
