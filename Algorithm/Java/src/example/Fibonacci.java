package example;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 23..
 */
public class Fibonacci {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num1, num2, range;
        num1 = 1;
        num2 = 0;
        range = sc.nextInt();

        System.out.println(num2);
        System.out.println(num1);

        while(range!=0){
            int temp = num1 + num2;
            num2 = num1;
            num1 = temp;
            System.out.println(temp);
            range--;
        }

    }
}
