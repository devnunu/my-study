package backjoon.ex_10870;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 28..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        System.out.print(fibo(num));
    }

    public static int fibo(int num){
        if(num==0){
            return 0;
        }else if(num<=2){
            return 1;
        }
        return fibo(num-1)+fibo(num-2);
    }
}
