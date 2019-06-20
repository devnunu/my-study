package backjoon.ex_1284;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 3..
 */
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int result = 0;

        while (num != 0) {
            String[] strArray = String.valueOf(num).split("");
            for (String str : strArray) {
                if (str.equals("0")) {
                    result += 4;
                } else if (str.equals("1")) {
                    result += 2;
                } else {
                    result += 3;
                }
            }
            System.out.println(result + strArray.length + 1);
            result = 0;
            num = sc.nextInt();
        }
        return;
    }
}
