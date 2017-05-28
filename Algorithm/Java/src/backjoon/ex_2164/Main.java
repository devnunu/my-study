package backjoon.ex_2164;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num1 = sc.nextInt();
        int num2 = sc.nextInt();

        int result = num1>num2 ? calc(num1,num2) : calc(num2, num1);

        System.out.println(result);
    }

    public static int calc(int max, int min){
        return (min-1)+(min*(max-1));
    }
}
