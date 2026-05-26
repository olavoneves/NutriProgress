package com.nutriprogress.modules.notification.repository;

import com.nutriprogress.modules.notification.entity.Notification;
import com.nutriprogress.modules.notification.entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    List<Notification> findByStatus(Notification.NotificationStatus status);

    List<Notification> findByRecipientEmailAndType(String email, NotificationType type);

    List<Notification> findByStatusAndCreatedAtBefore(Notification.NotificationStatus status, LocalDateTime date);
}
