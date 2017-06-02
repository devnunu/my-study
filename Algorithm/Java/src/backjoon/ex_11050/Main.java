package backjoon.ex_11050;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 2..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int K = sc.nextInt();

        int upper = factorial(N,0);
        int lower = factorial(K, 0)*factorial(N-K, 0);

        System.out.println(upper/lower);
    }

    public static int factorial(int num, int limit){
        if(num==limit){
            return 1;
        }
        return num * factorial(num-1, limit);
    }

}
