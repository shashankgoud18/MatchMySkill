import React from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { UI_CONFIG } from '../../constants/config';

const Toast = ({ toasts = [], onClose }) => {
  const getIconAndColor = (type) => {
    switch (type) {
      case 'error':
        return { icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
      case 'success':
        return { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
      case 'info':
      default:
        return { icon: Info, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => {
        const { icon: Icon, color, bgColor, borderColor } = getIconAndColor(toast.type);

        return (
          <div
            key={toast.id}
            className={`${bgColor} ${borderColor} border rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top duration-300`}
          >
            <Icon className={`${color} flex-shrink-0 mt-0.5`} size={20} />
            <p className="text-gray-800 text-sm flex-1">{toast.message}</p>
            <button
              onClick={() => onClose?.(toast.id)}
              className="text-gray-500 hover:text-gray-700 flex-shrink-0"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
