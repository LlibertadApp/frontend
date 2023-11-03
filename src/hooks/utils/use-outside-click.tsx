import { Ref, useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref: Ref<any>  = useRef(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }    
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [ref, callback]);

  return ref;
};

export default useOutsideClick