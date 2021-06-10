import { useEffect } from 'react'

export const checkImage = async (imageSrc, good, bad) => {
    const img = new Image();
    img.src = await imageSrc;
    img.onload = good;
    img.onerror = bad;
}


export const useOnClickOutside = (ref, handler) => {
    useEffect(
        () => {
            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        }, [ref, handler])
}