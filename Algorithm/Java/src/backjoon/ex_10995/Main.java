package backjoon.ex_10995;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        for(int i = 0; i<num; i++){
            if(i%2==1){
                System.out.print(" ");
            }
            for(int j=0; j<num; j++){
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
