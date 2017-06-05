package backjoon.ex_4101;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 4..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        while(true){
            int num1 = sc.nextInt();
            int num2 = sc.nextInt();

            if(num1==0&&num2==0){
                return;
            }

            if(num1>num2){
                System.out.println("Yes");
            }else{
                System.out.println("No");
            }
        }

    }
}
