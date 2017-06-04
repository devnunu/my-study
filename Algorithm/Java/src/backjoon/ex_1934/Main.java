package backjoon.ex_1934;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 3..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        while(num!=0){
            int num1 = sc.nextInt();
            int num2 = sc.nextInt();
            int gcd=1;
            int range = num1>num2 ? num1 : num2;

            if(num1==1||num2==1){
                System.out.println(num1*num2);
                num--;
                continue;
            }

            for(int i=2; i<=range; i++){
                if(num1%i==0&&num2%i==0){
                    gcd = i;
                }
            }

            System.out.println(num1/gcd*num2/gcd*gcd);

            num--;
        }
    }
}
