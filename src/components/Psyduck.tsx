"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FallingPsyduck() {
    return (
        <motion.div
            className="fixed top-0 right-1/6 -translate-x-1/2 z-50"
            initial={{ y: -200 }}
            animate={{ y: -80 }}
            transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                repeatDelay: 2,
            }}
        >
            <Image
                src="/psyduck-png_1433465.png"
                alt="Psyduck"
                width={100}
                height={100}
                style={{ transform: "rotate(180deg)" }}
                priority
            />
        </motion.div>
    );
}
