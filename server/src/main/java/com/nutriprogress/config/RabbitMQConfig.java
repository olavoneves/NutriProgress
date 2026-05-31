package com.nutriprogress.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.amqp.autoconfigure.SimpleRabbitListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitMQConfig {

    // ========================================================================
    // EXCHANGES
    // ========================================================================

    public static final String EVENTS_EXCHANGE = "nutriprogress.events";
    public static final String DLX_EXCHANGE = "nutriprogress.dlx";

    @Bean
    public TopicExchange eventsExchange() {
        return new TopicExchange(EVENTS_EXCHANGE, true, false);
    }

    @Bean
    public DirectExchange deadLetterExchange() {
        return new DirectExchange(DLX_EXCHANGE, true, false);
    }

    // ========================================================================
    // QUEUES - NOTIFICATIONS
    // ========================================================================

    public static final String NOTIFICATION_QUEUE = "nutriprogress.notifications";
    public static final String NOTIFICATION_DLQ = "nutriprogress.notifications.dlq";

    @Bean
    public Queue notificationQueue() {
        return QueueBuilder.durable(NOTIFICATION_QUEUE)
                .withArgument("x-dead-letter-exchange", DLX_EXCHANGE)
                .withArgument("x-dead-letter-routing-key", "notification.dead")
                .build();
    }

    @Bean
    public Queue notificationDeadLetterQueue() {
        return QueueBuilder.durable(NOTIFICATION_DLQ).build();
    }

    // ========================================================================
    // QUEUES + DLQ — USER EVENTS
    // ========================================================================

    public static final String USER_EVENTS_QUEUE = "nutriprogress.events.user";
    public static final String USER_EVENTS_DLQ   = "nutriprogress.events.user.dlq";

    @Bean
    public Queue userEventsQueue() {
        return QueueBuilder.durable(USER_EVENTS_QUEUE)
                .withArgument("x-dead-letter-exchange",    DLX_EXCHANGE)
                .withArgument("x-dead-letter-routing-key", "user.events.dead")
                .build();
    }

    @Bean
    public Queue userEventsDLQ() {
        return QueueBuilder.durable(USER_EVENTS_DLQ).build();
    }

    // ========================================================================
    // QUEUES + DLQ — PATIENT EVENTS
    // ========================================================================

    public static final String PATIENT_EVENTS_QUEUE = "nutriprogress.events.patient";
    public static final String PATIENT_EVENTS_DLQ   = "nutriprogress.events.patient.dlq";

    @Bean
    public Queue patientEventsQueue() {
        return QueueBuilder.durable(PATIENT_EVENTS_QUEUE)
                .withArgument("x-dead-letter-exchange",    DLX_EXCHANGE)
                .withArgument("x-dead-letter-routing-key", "patient.events.dead")
                .build();
    }

    @Bean
    public Queue patientEventsDLQ() {
        return QueueBuilder.durable(PATIENT_EVENTS_DLQ).build();
    }

    // ========================================================================
    // QUEUES + DLQ — EVALUATION EVENTS
    // ========================================================================

    public static final String EVALUATION_EVENTS_QUEUE = "nutriprogress.events.evaluation";
    public static final String EVALUATION_EVENTS_DLQ   = "nutriprogress.events.evaluation.dlq";

    @Bean
    public Queue evaluationEventsQueue() {
        return QueueBuilder.durable(EVALUATION_EVENTS_QUEUE)
                .withArgument("x-dead-letter-exchange",    DLX_EXCHANGE)
                .withArgument("x-dead-letter-routing-key", "evaluation.events.dead")
                .build();
    }

    @Bean
    public Queue evaluationEventsDLQ() {
        return QueueBuilder.durable(EVALUATION_EVENTS_DLQ).build();
    }

    // ========================================================================
    // QUEUES + DLQ — ANALYTICS (consumidor independente das notificacoes)
    // ========================================================================
    // Filas dedicadas para analytics. Como o exchange de eventos e topic, cada
    // fila ligada a mesma routing key recebe sua propria copia da mensagem — por
    // isso analytics NAO pode reaproveitar as filas de notificacao (consumidores
    // concorrentes dividiriam as mensagens entre os modulos).

    public static final String ANALYTICS_USER_QUEUE         = "nutriprogress.analytics.user";
    public static final String ANALYTICS_PATIENT_QUEUE      = "nutriprogress.analytics.patient";
    public static final String ANALYTICS_EVALUATION_QUEUE   = "nutriprogress.analytics.evaluation";
    public static final String ANALYTICS_SUBSCRIPTION_QUEUE = "nutriprogress.analytics.subscription";
    public static final String ANALYTICS_DLQ                = "nutriprogress.analytics.dlq";

    private Queue analyticsQueue(String name) {
        return QueueBuilder.durable(name)
                .withArgument("x-dead-letter-exchange",    DLX_EXCHANGE)
                .withArgument("x-dead-letter-routing-key", "analytics.dead")
                .build();
    }

    @Bean
    public Queue analyticsUserQueue() {
        return analyticsQueue(ANALYTICS_USER_QUEUE);
    }

    @Bean
    public Queue analyticsPatientQueue() {
        return analyticsQueue(ANALYTICS_PATIENT_QUEUE);
    }

    @Bean
    public Queue analyticsEvaluationQueue() {
        return analyticsQueue(ANALYTICS_EVALUATION_QUEUE);
    }

    @Bean
    public Queue analyticsSubscriptionQueue() {
        return analyticsQueue(ANALYTICS_SUBSCRIPTION_QUEUE);
    }

    @Bean
    public Queue analyticsDeadLetterQueue() {
        return QueueBuilder.durable(ANALYTICS_DLQ).build();
    }

    // ========================================================================
    // BINDINGS — MAIN QUEUES → EVENTS EXCHANGE
    // ========================================================================

    @Bean
    public Binding notificationBinding(Queue notificationQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(notificationQueue).to(eventsExchange).with("notification.#");
    }

    @Bean
    public Binding userEventsBinding(Queue userEventsQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(userEventsQueue).to(eventsExchange).with("user.#");
    }

    @Bean
    public Binding patientEventsBinding(Queue patientEventsQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(patientEventsQueue).to(eventsExchange).with("patient.#");
    }

    @Bean
    public Binding evaluationEventsBinding(Queue evaluationEventsQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(evaluationEventsQueue).to(eventsExchange).with("evaluation.#");
    }

    // ========================================================================
    // BINDINGS — ANALYTICS QUEUES → EVENTS EXCHANGE
    // ========================================================================

    @Bean
    public Binding analyticsUserBinding(Queue analyticsUserQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(analyticsUserQueue).to(eventsExchange).with("user.#");
    }

    @Bean
    public Binding analyticsPatientBinding(Queue analyticsPatientQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(analyticsPatientQueue).to(eventsExchange).with("patient.#");
    }

    @Bean
    public Binding analyticsEvaluationBinding(Queue analyticsEvaluationQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(analyticsEvaluationQueue).to(eventsExchange).with("evaluation.#");
    }

    @Bean
    public Binding analyticsSubscriptionBinding(Queue analyticsSubscriptionQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(analyticsSubscriptionQueue).to(eventsExchange).with("subscription.#");
    }

    // ========================================================================
    // BINDINGS — DLQ → DLX EXCHANGE
    // ========================================================================

    @Bean
    public Binding analyticsDlqBinding(Queue analyticsDeadLetterQueue, DirectExchange deadLetterExchange) {
        return BindingBuilder.bind(analyticsDeadLetterQueue).to(deadLetterExchange).with("analytics.dead");
    }

    @Bean
    public Binding notificationDlqBinding(Queue notificationDeadLetterQueue, DirectExchange deadLetterExchange) {
        return BindingBuilder.bind(notificationDeadLetterQueue).to(deadLetterExchange).with("notification.dead");
    }

    @Bean
    public Binding userEventsDlqBinding(Queue userEventsDLQ, DirectExchange deadLetterExchange) {
        return BindingBuilder.bind(userEventsDLQ).to(deadLetterExchange).with("user.events.dead");
    }

    @Bean
    public Binding patientEventsDlqBinding(Queue patientEventsDLQ, DirectExchange deadLetterExchange) {
        return BindingBuilder.bind(patientEventsDLQ).to(deadLetterExchange).with("patient.events.dead");
    }

    @Bean
    public Binding evaluationEventsDlqBinding(Queue evaluationEventsDLQ, DirectExchange deadLetterExchange) {
        return BindingBuilder.bind(evaluationEventsDLQ).to(deadLetterExchange).with("evaluation.events.dead");
    }

    // ========================================================================
    // MESSAGE CONVERTER / TEMPLATE / LISTENER FACTORY
    // ========================================================================

    @Bean
    public MessageConverter messageConverter() {
        return new JacksonJsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter);
        return template;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            SimpleRabbitListenerContainerFactoryConfigurer configurer,
            ConnectionFactory connectionFactory,
            MessageConverter messageConverter
    ) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        // Aplica as properties spring.rabbitmq.listener.* (retry, default-requeue-rejected, auto-startup).
        configurer.configure(factory, connectionFactory);
        factory.setMessageConverter(messageConverter);
        return factory;
    }
}
