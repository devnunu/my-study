package backjoon.ex_16673;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 3..
 */
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int C = sc.nextInt();
        int K = sc.nextInt();
        int P = sc.nextInt();
        int sum = 0;

        while (C != 0) {
            sum += (K * C) + (P * Math.pow(C, 2));
            --C;
        }

        System.out.println(sum);
    }
}

