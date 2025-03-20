"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import messages from "@/data/messages.json";
import { Skeleton } from "@/components/ui/skeleton";
import { FaCopyright } from "react-icons/fa";

export function Home() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));

    // Ensure api has the next() function before calling it
    if (api && typeof api.next === "function") {
      const interval = setInterval(() => {
        api.next();
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [api]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
      {loading ? (
        <Skeleton className="w-32 h-6 rounded-full mb-6" />
      ) : (
        <h1 className="text-2xl font-bold dark:text-white">Welcome to AIMESSAGE</h1>
      )}

      {!loading && (
        <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="flex justify-center">
                  <Card className="w-full shadow-lg dark:bg-gray-800">
                    <CardHeader className="text-lg font-semibold dark:text-white">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-6 text-center">
                      <span className="text-2xl font-semibold dark:text-gray-200">
                        {message.content}
                      </span>
                    </CardContent>
                    <CardFooter className="text-sm text-gray-500 dark:text-gray-400">
                      {message.received_at}
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Slide {current} of {count}
          </div>
        </div>
      )}

      <footer className="mt-12 w-full bg-gray-100 dark:bg-gray-900 text-center p-4 text-gray-700 dark:text-gray-300">
        <p className="flex items-center justify-center gap-1">
          <FaCopyright /> 2025 AIMESSAGE. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
