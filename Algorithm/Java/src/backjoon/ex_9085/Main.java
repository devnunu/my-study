package backjoon.ex_9085;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();

        while(t!=0){
            int count = sc.nextInt();
            int sum = 0;

            while(count!=0){
                int num = sc.nextInt();
                sum += num;
                count--;
            }
            System.out.println(sum);

            t--;
        }
    }
}
