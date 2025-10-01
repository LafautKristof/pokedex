"use server";
import { typeColors, typeIcons } from "@/app/helpers/typeIcons";
import { TypeRes } from "@/app/types/TypeTypes";
import PokedexShell from "@/components/PokedexShell";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
    const resTypes = await fetch(`/api/type`, {
        next: { tags: ["types"] },
        cache: "no-store",
    });
    const data = await resTypes.json();
    const types: TypeRes[] = data.types;

    return (
        <PokedexShell showHint={false} showBack>
            <div className="relative w-full h-full flex flex-col">
                <div className="flex-1 pb-24">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-20">
                        {Array.isArray(types) &&
                            types.map((type) => (
                                <Link
                                    key={type.apiId}
                                    href={`/pokedex/type/${type.apiId}`}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className="relative w-24 h-24 drop-shadow-lg p-2 rounded-md"
                                        style={{
                                            backgroundColor:
                                                typeColors[
                                                    type.name.toLowerCase()
                                                ],
                                        }}
                                    >
                                        <Image
                                            src={
                                                typeIcons[
                                                    type.name.toLowerCase()
                                                ]
                                            }
                                            alt={type.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <p className="font-pokemon">{type.name}</p>
                                </Link>
                            ))}
                    </div>{" "}
                </div>{" "}
            </div>
        </PokedexShell>
    );
};
export default page;
