package backjoon.ex_2501;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 9..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int k = sc.nextInt();
        int count = 0;

        for(int i=1; i<=N; i++){
            if(N%i==0){
                count++;
            }
            if(count==k){
                System.out.print(i);
                return;
            }
        }

        System.out.print(0);
    }
}
