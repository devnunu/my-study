package backjoon.ex_11966;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 3..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        while(num!=1){
            if(num%2==1){
                System.out.println(0);
                return;
            }
            num /= 2;
        }

        System.out.println(1);
    }
}
