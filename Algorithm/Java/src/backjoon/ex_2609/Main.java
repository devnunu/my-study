package backjoon.ex_2609;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num1 = sc.nextInt();
        int num2 = sc.nextInt();

        System.out.println(div(num1,num2));
        System.out.println(mul(num1,num2));
    }

    public static int mul(int a, int b){
        int gcd = div(a,b);

        return (a/gcd)*(b/gcd)*gcd;
    }

    public static int div(int a, int b){
        int range = (a<b) ? a : b;
        int gcd = 1;

        for(int i = 1; i<=range; i++){
            if(a%i==0&&b%i==0){
                gcd = i;
            }
        }

        return gcd;
    }
}
