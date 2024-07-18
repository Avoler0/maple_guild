'use client'
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from 'lucide-react';
import { Check } from 'lucide-react';
import { useToast } from './use-toast';
import { useConfirmToast } from './use-confirm-toast';

const useToastClose = (toastId) => {
    const { dismiss } = useToast();

    dismiss(toastId);
}

const ConfirmToast = React.forwardRef(({ toast },ref) => {
    console.log('콘펌은?',toast)
    return (
        <div className="border toast h-fit rounded-md w-96">
            <i className='absolute left-0 top-0 h-full w-4 bg-yellow-500'></i>
            <div className='relative px-4 py-2 ml-4'>
                <div className='inline-block relative align-middle'>
                    <div className='leading-none'>
                        <strong className='text-xl font-semibold'>Confirm</strong>
                        <p className='text-teal-500 text-lg font-medium'>삭제 하시겠습니까?</p>
                    </div>
                </div>
                <div className='w-fit ml-auto text-base font-medium'>
                    <button type='button' className='mr-6 hover:text-gray-300' onClick={() => toast.onConfirm(toast.id,false)}>취소</button>
                    <button type='button' className='hover:text-gray-300' onClick={() => toast.onConfirm(toast.id, true)}>확인</button>
                </div>
            </div>
        </div>
    )
})

ConfirmToast.displayName = 'ConfirmToast';

const AlertToast = React.forwardRef(({toast,dismiss}, ref) => {
    return (
        <div className="border toast h-fit rounded-md">
            <i className='absolute left-0 top-0 h-full w-4 bg-yellow-500'></i>
            <button type='button' className='absolute right-4 top-2' onClick={() => dismiss(toast.id)}>
                <X className='h-auto w-5'/>
            </button>
            <div className='px-4 py-2 ml-4'>
                <strong className='text-xl font-semibold'>Alert</strong>
                <p className='text-teal-500 text-lg font-medium'>{toast.message}</p>
            </div>
        </div>
    )
})

AlertToast.displayName = 'AlertToast';

const Toast = () => {
    const { toasts, dismiss, confirm } = useToast();

    // console.log('콘펌 토스트')
    /**
     * type : ADD_TOAST, UPDATE_TOAST, REMOVE_TOAST
     * type : alert, confirm, warning;
     * action: {
     *      alert: ADD,
     *      confirm: OK, CANCEL,
     *      warning: ADD
     * }
     * message : string;
     * return boolean;
     */

    function RenderToast(toast){
        console.log('렌더 토스트',toast)
        switch(toast.type){
            case 'ALERT': return <AlertToast toast={toast} dismiss={dismiss} />;
            case 'CONFIRM': return <ConfirmToast toast={toast} confirm={confirm} />
        }
            
    }

    return (
        <div className='toast-provider'>
            <div className='relative'>
                {toasts && toasts.map((toast) => (<li key={toast.id}>{RenderToast(toast)}</li>))}
            </div>
        </div>
            
    )
}

export default Toast;