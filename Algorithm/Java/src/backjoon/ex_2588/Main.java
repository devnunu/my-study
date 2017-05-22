package backjoon.ex_2588;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 22..
 */
public class Main {
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        int num1, num2;
        num1 = in.nextInt();
        num2 = in.nextInt();

        String[] splitNum = Integer.toString(num2).split("");

        for(int i =splitNum.length-1; i>=0; i--){
            int mulOperand = Integer.parseInt(splitNum[i]);
            System.out.println(num1 * mulOperand);
        }

        System.out.println(num1*num2);

    }

}
