package backjoon.ex_1476;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 28..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        int E =sc.nextInt();
        int S =sc.nextInt();
        int M =sc.nextInt();
        int num1=1, num2=1, num3=1;
        int result=1;

        while(true){
            if((num1==E)&&(num2==S)&&(num3==M)){
                break;
            }

            num1 = num1>14 ? 1 : num1+1;
            num2 = num2>27 ? 1 : num2+1;
            num3 = num3>18 ? 1 : num3+1;
            result++;

        }
        System.out.print(result);
    }
}
