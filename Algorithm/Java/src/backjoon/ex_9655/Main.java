package backjoon.ex_9655;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 29..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        if(num%2==1){
            System.out.print("SK");
        }else{
            System.out.print("CY");
        }
    }
}