package backjoon.ex_10992;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 5..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        for(int i=1; i<=num; i++){
            for(int j=num-i; j>0; j--){
                System.out.print(" ");
            }
            if(i!=num){
                for(int j=0; j<i*2-1; j++){
                    if(j==0||j==(i*2-2)) {
                        System.out.print("*");
                    }else{
                        System.out.print(" ");
                    }
                }
            }else{
                for(int j=0; j<i*2-1; j++){
                    System.out.print("*");
                }
            }

            System.out.println();
        }
    }
}
