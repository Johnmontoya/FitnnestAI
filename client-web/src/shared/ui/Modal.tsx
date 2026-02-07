import { useEffect } from 'react';
import { Button } from './Button';
import { BiX } from 'react-icons/bi';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

const MiModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {

    useEffect(() => {
        if (isOpen) {
            // opcional: bloquea scroll del body
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null; // Ahora está bien porque está después de los hooks

    const handleClose = () => {
        onClose();
    };

    return (
        <div
            className="h-screen fixed inset-0 bg-slate-900/50 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleClose}
        >
            <div
                className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 max-w-md w-full mx-4 backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()} // evita cerrar al clickear dentro
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-100">{title}</h2>
                    <Button variant="secondary" onClick={handleClose} text=''><BiX size={20} /></Button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default MiModal;