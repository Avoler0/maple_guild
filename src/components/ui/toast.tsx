'use client'
import { X } from 'lucide-react';
import { Badge } from 'lucide-react';
import { Check } from 'lucide-react';

const Toast = () => {
    const handleToastClose = () => {
        console.log('닫기')
    }

    /**
     * action : alert, confir, warning;
     * message : string;
     * return boolean;
     */

    return (
        <div className="border h-fit rounded-md overflow-hidden left-1/2 fixed top-0 -translate-x-1/2">
            <i className='absolute left-0 top-0 h-full w-4 bg-yellow-500'></i>
            <div className='flex items-center gap-6 px-4 py-6 ml-4'>
                <div>
                    <Badge />
                </div>
                <div>
                    <strong className='text-xl font-semibold'>Alert</strong>
                    <p className='text-teal-500 text-lg font-medium'>알람이 도착했습니다 !</p>
                </div>
                <div className='align-middle'>
                    <Check className='inline-block align-middle' />
                    <X className='inline-block align-middle' />
                </div>
            </div>
            {/* <div>
                <div className='relative'>
                    <strong className='text-xl font-semibold'>알림!</strong>
                    <button type='button' onClick={handleToastClose}>
                        <X className='absolute h-8 w-auto top-1/2 -translate-y-1/2 right-0' />
                    </button>
                </div>
                <div className='mt-3'>
                    <p className='text-teal-500 text-lg font-medium'>결과를 찾았습니다.</p>
                </div>
                <div className='w-fit mx-auto pt-6'>
                    <button type='button' className='text-white bg-gray-300 px-12 py-3'>확인</button>
                    <button type='button' className='text-white bg-sky-400 px-12 py-3 ml-6'>취소</button>
                </div>
            </div> */}
        </div>
    )
}

export default Toast;