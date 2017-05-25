package backjoon.ex_3046;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 24..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        int R1 = sc.nextInt();
        int S = sc.nextInt();
        int result = S*2-R1;

        System.out.print(result);
    }
}