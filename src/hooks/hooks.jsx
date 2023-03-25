import { useEffect, useRef } from 'react';
//Get previos state
export function usePreviousData(value){
    const ref = useRef();
    useEffect(()=>{
      ref.current = value;
    }, [value]);
    return ref.current;
  }