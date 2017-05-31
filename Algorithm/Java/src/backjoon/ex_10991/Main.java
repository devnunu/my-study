package backjoon.ex_10991;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 31..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        for(int i =0; i<num; i++){
            for(int j = num-i; j>1; j--){
                System.out.print(" ");
            }
            for(int j = 0; j<=i; j++){
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
