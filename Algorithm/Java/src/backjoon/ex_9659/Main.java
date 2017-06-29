package backjoon.ex_9659;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 29..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        if(num%2==0){
            System.out.println("CY");
        }else{
            System.out.println("SK");
        }
    }
}
