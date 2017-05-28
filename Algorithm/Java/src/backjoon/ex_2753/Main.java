package backjoon.ex_2753;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        if(num%400==0){
            System.out.println(1);
            return;
        }
        if((num%4==0)&&(num%100!=0)){
            System.out.println(1);
            return;
        }
        System.out.println(0);
    }
}
