package backjoon.ex_1076;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 28..
 */
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String first = sc.nextLine();
        String second = sc.nextLine();
        String mul = sc.nextLine();

        String head = getRegidantNumber(first, true);

        if (head.equals("0")) {
            head = getRegidantNumber(second, true);
        } else {
            head += getRegidantNumber(second, true);
        }

        if (Integer.parseInt(head) == 0) {
            System.out.println(0);
        } else {
            System.out.println(head + getRegidantNumber(mul, false));
        }
    }

    private static String getRegidantNumber(String color, boolean isNotLast) {
        switch (color) {
            case "black":
                return isNotLast ? "0" : "";
            case "brown":
                return isNotLast ? "1" : "0";
            case "red":
                return isNotLast ? "2" : "00";
            case "orange":
                return isNotLast ? "3" : "000";
            case "yellow":
                return isNotLast ? "4" : "0000";
            case "green":
                return isNotLast ? "5" : "00000";
            case "blue":
                return isNotLast ? "6" : "000000";
            case "violet":
                return isNotLast ? "7" : "0000000";
            case "grey":
                return isNotLast ? "8" : "00000000";
            case "white":
                return isNotLast ? "9" : "000000000";
            default:
                return null;
        }
    }
}
