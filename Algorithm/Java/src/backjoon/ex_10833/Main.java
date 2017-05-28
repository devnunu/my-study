package backjoon.ex_10833;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int totalRemain = 0;

        while(num!=0){
            int studentNum = sc.nextInt();
            int appleNum = sc.nextInt();

            totalRemain += appleNum%studentNum;
            num--;
        }

        System.out.println(totalRemain);
    }
}
