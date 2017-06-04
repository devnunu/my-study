package backjoon.ex_11653;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 3..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        while(num!=1){
            for(int i=2; i<=num; i++){
                if(num%i==0){
                    num /= i;
                    System.out.println(i);
                    break;
                }
            }
        }
    }
}