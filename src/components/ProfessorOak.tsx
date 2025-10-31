"use client";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";

export default function ProfessorOakBalloon({ message }: { message?: string }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="fixed bottom-0 left-1/3 -translate-x-1/2 z-50 flex flex-col items-center">
            <AnimatePresence>
                {open && (
                    <>
                        {/* 💬 De tekstballon */}
                        <motion.div
                            key="balloon"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative bg-white border-4 border-gray-800 rounded-2xl px-4 py-3 shadow-lg font-pokemon text-gray-800 text-sm max-w-xs text-center mb-3"
                        >
                            <button
                                className="absolute top-1 left-1"
                                onClick={() => setOpen(false)}
                            >
                                <IoIosCloseCircle color="red" size={20} />
                            </button>
                            <p>{message}</p>
                            {/* Speech bubble punt */}
                            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800"></div>
                            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-7 border-r-7 border-t-7 border-l-transparent border-r-transparent border-t-white"></div>
                        </motion.div>

                        {/* 🧓 Professor Oak afbeelding */}
                        <motion.div
                            key="oak"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Image
                                src="/professor-oak-png-1480569.png"
                                alt="Professor Oak"
                                width={100}
                                height={100}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* 🔘 Enkel zichtbaar als de ballon gesloten is */}
            {!open && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setOpen(true)}
                    className="mt-2 px-3 py-1 bg-yellow-400 border-2 border-gray-800 rounded-md font-pokemon text-sm shadow hover:bg-yellow-300 transition"
                >
                    Talk to Professor Oak
                </motion.button>
            )}
        </div>
    );
}
