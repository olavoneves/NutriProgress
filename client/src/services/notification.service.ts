
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
}

let notificationId = 0;

const generateId = (): string => {
    notificationId += 1;
    return `notification-${notificationId}`;
};

/**
 * Serviço de notificação simplificado.
 * Quando um componente Toast for implementado, este serviço
 * será conectado a ele via Context/EventEmitter.
 * 
 * Por ora, usa console para logging.
 */
export const NotificationService = {
    success(message: string): Notification {
        const notification: Notification = {
            id: generateId(),
            type: 'success',
            message,
            duration: 3000,
        };
        if (import.meta.env.DEV) {
            console.log(`✅ [Success] ${message}`);
        }
        return notification;
    },

    error(message: string): Notification {
        const notification: Notification = {
            id: generateId(),
            type: 'error',
            message,
            duration: 5000,
        };
        if (import.meta.env.DEV) {
            console.error(`❌ [Error] ${message}`);
        }
        return notification;
    },

    warning(message: string): Notification {
        const notification: Notification = {
            id: generateId(),
            type: 'warning',
            message,
            duration: 4000,
        };
        if (import.meta.env.DEV) {
            console.warn(`⚠️ [Warning] ${message}`);
        }
        return notification;
    },

    info(message: string): Notification {
        const notification: Notification = {
            id: generateId(),
            type: 'info',
            message,
            duration: 3000,
        };
        if (import.meta.env.DEV) {
            console.info(`ℹ️ [Info] ${message}`);
        }
        return notification;
    },
};
