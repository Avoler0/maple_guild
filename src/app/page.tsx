'use client'

import { confirmToast } from "@/components/ui/use-confirm-toast";
import { toast, useToastConfirm } from "@/components/ui/use-toast";
import Image from "next/image";

export default function Home() {

  function confirmFunc(result){
    console.log('확인', result)
  }

  function handle(){
    const d = toast({
      type: 'CONFIRM',
      message:'하이',
      onConfirm: confirmFunc
    })

    console.log('토스트 실행',d)
  }

  return (
    <div>
      1234
      <button onClick={handle}>
        12345
      </button>
    </div>
  );
}
