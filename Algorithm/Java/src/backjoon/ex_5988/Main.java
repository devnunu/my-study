package backjoon.ex_5988;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 22..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            String[] str = sc.next().split("");
            int num = Integer.parseInt(str[str.length-1]);

            if(num%2==0){
                System.out.println("even");
            }else{
                System.out.println("odd");
            }
            T--;
        }
    }
}
