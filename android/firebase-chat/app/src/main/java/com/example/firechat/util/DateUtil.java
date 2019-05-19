package com.example.firechat.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

    public static String getTimenow() {
        Date today = new Date();
        SimpleDateFormat timeNow = new SimpleDateFormat("a K:mm");
        return timeNow.format(today);
    }

}
