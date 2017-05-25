package backjoon.ex_2475;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int sum = 0;

        while(sc.hasNext()){
            int num = sc.nextInt();
            sum += Math.pow(num ,2);
        }

        System.out.print(sum%10);
    }
}
