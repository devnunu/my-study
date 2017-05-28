package backjoon.ex_10156;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int K = sc.nextInt();
        int N = sc.nextInt();
        int M = sc.nextInt();

        int result = K*N-M;
        if(result<0){
            System.out.print(0);
        }else{
            System.out.print(K*N-M);
        }
    }
}
