package backjoon.ex_10872;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.println(factorial(sc.nextInt()));
    }

    public static int factorial(int num){
        if(num==0){
            return 1;
        }
        return num*factorial(num-1);
    }
}
