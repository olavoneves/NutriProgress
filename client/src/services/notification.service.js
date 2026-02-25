/**
 * Tipos e helpers para o sistema de notificação.
 * Será expandido quando um componente Toast/Snackbar for criado.
 */
let notificationId = 0;
const generateId = () => {
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
    success(message) {
        const notification = {
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
    error(message) {
        const notification = {
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
    warning(message) {
        const notification = {
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
    info(message) {
        const notification = {
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
