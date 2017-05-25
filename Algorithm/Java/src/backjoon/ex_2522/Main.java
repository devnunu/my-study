package backjoon.ex_2522;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int j,k;

        for(int i = 1; i<=num*2-1; i++){
            if(i<num){
                for(j=0; j<num-i; j++){
                    System.out.print(" ");
                }
                for(j=0; j<i; j++){
                    System.out.print("*");
                }
            }
            else if(i==num){
                for(j = 0; j<num; j++){
                    System.out.print("*");
                }
            }
            else{
                for(j=0; j<i%num; j++){
                    System.out.print(" ");
                }
                for(j=0; j<num-i%num; j++) {
                    System.out.print("*");
                }
            }
            System.out.println("");
        }
    }
}
