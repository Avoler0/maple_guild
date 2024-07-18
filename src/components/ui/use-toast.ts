import * as React from 'react';

const TOAST_LIMIT = 1;

type Toast = {
    id:string;
    action: string;
    type: 'ALERT' | 'CONFIRM' | 'INPUT' | 'WARNING';
    message: string;
    callback?: () => void;
}

type MemoryToast = {
    toasts: Toast[],
    onClose?: () => void;
    onInput?: () => string;
    onAction?: () => boolean;
}

type ToastToaster = {

}

let count = 0;
let memoryState: MemoryToast = { toasts:[] };
const listeners: Array<(state: any) => void> = [];
let confirm = {};


function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}

let confirmCallback;

const removeToast = (id:string) => {
    dispatch({ type: 'DISMISS_TOAST', toastId: id })
}

const handleConfirm = (id:string,result:boolean) => {
    confirmCallback(result);

    removeToast(id);
}

export const reducer = (state: State, action: Action): State => {
    console.log('액션',action)
    switch (action.type) {
        case 'ADD_TOAST':
            if(action.toast.type === 'CONFIRM'){
                confirmCallback = action.toast.onConfirm;

                return {
                    ...state,
                    toasts: [{ ...action.toast, onConfirm:handleConfirm }, ...state.toasts].slice(0, TOAST_LIMIT),
                };
            }else{
                return {
                    ...state,
                    toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
                };
            }
            

        case 'UPDATE_TOAST':
            return {
                ...state,
                toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
            };
        case 'DISMISS_TOAST':
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: [],
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.toastId),
            };
    }
};

function dispatch(action: any) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener) => {
        listener(memoryState);
    });
}

// function removeToast(type,toastId) {
//     dispatch({
//         type: 'REMOVE_TOAST',
//         toastId: id,
//     });
// }

function toast({ ...props }:Toast) {
    const id = genId();

    const update = (props: any) =>
        dispatch({
            type: 'UPDATE_TOAST',
            toast: { ...props, id },
        });

    const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...props,
            id
        },
    });

    return {
        id: id,
        update,
        dismiss,
    };
}

function useToast() {
    const [state, setState] = React.useState<any>(memoryState);

    React.useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]);

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
    };
}

export { useToast, toast };