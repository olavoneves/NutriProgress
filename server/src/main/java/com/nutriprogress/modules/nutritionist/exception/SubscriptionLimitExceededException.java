package com.nutriprogress.modules.nutritionist.exception;

public class SubscriptionLimitExceededException extends RuntimeException {

    public SubscriptionLimitExceededException(String message) {
        super(message);
    }
}
