"use client";

import { motion } from "framer-motion";

export default function RollingPokeball({ size = 64 }: { size?: number }) {
    return (
        <motion.div
            className="relative rounded-full overflow-hidden border-4 border-black"
            style={{ width: size, height: size }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
            {/* bovenkant rood */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600" />
            {/* onderkant wit */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />
            {/* midden streep */}
            <div className="absolute top-1/2 left-0 w-full h-[15%] bg-black -translate-y-1/2" />
            {/* knop */}
            <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
}
