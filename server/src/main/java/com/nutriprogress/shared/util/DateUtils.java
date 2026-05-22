package com.nutriprogress.shared.util;

import java.time.LocalDate;
import java.time.Period;

public final class DateUtils {

    private DateUtils() {}

    public static Integer calculateAge(LocalDate birthDate) {
        if (birthDate == null) return null;
        return Period.between(birthDate, LocalDate.now()).getYears();
    }
}
