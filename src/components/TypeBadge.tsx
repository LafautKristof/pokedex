import { typeIcons, typeColors } from "@/app/helpers/typeIcons";

type TypeBadgeProps = {
    type: string;
};

export function TypeBadge({ type }: TypeBadgeProps) {
    const key = type.toLowerCase();

    return (
        <div
            className="flex items-center gap-1 px-2 py-1 rounded-full shadow text-white"
            style={{ backgroundColor: typeColors[key] }}
        >
            <img src={typeIcons[key]} alt={key} className="w-5 h-5" />
            <span className="capitalize text-sm">{key}</span>
        </div>
    );
}
