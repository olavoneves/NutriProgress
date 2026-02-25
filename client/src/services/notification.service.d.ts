/**
 * Tipos e helpers para o sistema de notificação.
 * Será expandido quando um componente Toast/Snackbar for criado.
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
}
/**
 * Serviço de notificação simplificado.
 * Quando um componente Toast for implementado, este serviço
 * será conectado a ele via Context/EventEmitter.
 *
 * Por ora, usa console para logging.
 */
export declare const NotificationService: {
    success(message: string): Notification;
    error(message: string): Notification;
    warning(message: string): Notification;
    info(message: string): Notification;
};
//# sourceMappingURL=notification.service.d.ts.map