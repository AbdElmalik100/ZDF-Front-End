"use client";;
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion'

export const Card = React.memo(({
    card,
    index,
    hovered,
    setHovered
}) => (
    <motion.div
        initial={{ y: 25, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", delay: 0.1 * index }}

        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
            "rounded-lg shadow-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden xl:w-[calc(100%/5)] lg:w-[calc(100%/4)] md:w-1/2 w-full transition-all duration-300 ease-out",
            hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}>
        <img
            src={card.src}
            alt={card.title}
            className="object-cover inset-0" />
        <div
            className={cn(
                "absolute inset-0 bg-gradient-to-b from-transparent from-[50%] to-100% to-sky-700 flex items-end py-8 px-4 transition-opacity duration-300",
                hovered === index ? "opacity-100" : "opacity-0"
            )}>
            <div
                className="text-xl flex flex-col lg:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                <h2 className="font-bold">{card.name}</h2>
                <span className="text-base text-neutral-200  font-normal">{card.title}</span>
                <div className="social-links flex items-center gap-2 mt-2 flex-wrap max-lg:text-sm">
                    {
                        card.socials?.map((social, index) => (
                            <a key={index} href={social.src} target="_blank" className="w-8 h-8 text-white rounded-full grid place-items-center border transition-all ease-in-out hover:bg-sky-400 hover:border-sky-400 hover:text-white">
                                <Icon icon={social.icon} fontSize={20}></Icon>
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    </motion.div>
));

Card.displayName = "Card";

export function FocusCards({
    cards
}) {
    const [hovered, setHovered] = useState(null);

    return (
        (<div
            className="flex flex-wrap justify-center gap-10 mx-auto md:px-8 w-full items-center">
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered} />
            ))}
        </div>)
    );
}
