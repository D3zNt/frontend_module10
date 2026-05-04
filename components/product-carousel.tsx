"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


export const ProductCarousel = () => {
    const[api, setApi] = useState<any>(null);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };
        api.on("select", onSelect);

    

        const interval = setInterval(() => {
        api.scrollNext();
        }, 5000); 

    return () => {
        clearInterval(interval);
        api.off("select", onSelect); 
    };
}, [api]);

  return (
    <div>
        <Carousel className = "w-[300px] mx-auto" opts={{loop: true, duration:80}} setApi={setApi}>  
            <CarouselContent>  
                <CarouselItem>
                    <img src="https://portal.chatime.com/wp-content/uploads/2023/04/Ecomm-drinks-all_0000s_0002_009-2-Premium-Pearl-2.png" alt="Chatime drinks" className="w-full h-auto rotate-[10deg]" />
                </CarouselItem>
                <CarouselItem>
                    <img src="https://portal.chatime.com/wp-content/uploads/2023/05/Premium-Milky_0000s_0007_087-Taro.png" alt="Chatime drinks" className="w-full h-auto rotate-[-10deg]" />
                </CarouselItem>
                <CarouselItem>
                    <img src="https://portal.chatime.com/wp-content/uploads/2023/05/Ecomm-drinks-all_0000s_0001_058-Pop-it-like-it_s-peach.png" alt="Chatime drinks" className="w-full h-auto rotate-[10deg]" />
                </CarouselItem>  
                <CarouselItem>
                    <img src="https://portal.chatime.com/wp-content/uploads/2023/05/Ecomm-drinks-all_0000s_0004_001-3-Brown-Sugar.png" alt="Chatime drinks" className="w-full h-auto rotate-[-10deg]" />
                </CarouselItem> 
                <CarouselItem>
                    <img src="https://portal.chatime.com/wp-content/uploads/2023/08/230731_USA-Website_Boba-Balance.png" alt="Chatime drinks" className="w-full h-auto rotate-[10deg]" />
                </CarouselItem> 
                <CarouselItem>
                    <img src="https://portal.chatime.com/wp-content/uploads/2023/05/Ecomm-drinks-all_0000s_0003_004-2-Oreo-2.png" alt="Chatime drinks" className="w-full h-auto rotate-[-10deg]" />
                </CarouselItem> 

            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />   

        </Carousel>  

        <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: count }).map((_, i) => (
                <button key={i} onClick={() => api?.scrollTo(i)} className={`w-3 h-3 rounded-full transition-all ${ i === current ? "bg-purple-500 scale-125" : "bg-gray-300" }`} />
            ))}
        </div>
    </div>
  );
};
