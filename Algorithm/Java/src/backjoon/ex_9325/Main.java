package backjoon.ex_9325;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            int total = sc.nextInt();
            int optionNum = sc.nextInt();


            while(optionNum!=0){
                total += sc.nextInt()*sc.nextInt();
                optionNum--;
            }

            System.out.println(total);
            T--;
        }
    }
}
