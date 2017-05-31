package backjoon.ex_10103;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 31..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int totalPointCY = 100;
        int totalPointSD = 100;

        while(num!=0){
            int pointCY = sc.nextInt();
            int pointSD = sc.nextInt();

            if(pointCY>pointSD){
                totalPointSD -= pointCY;
            }else if(pointCY<pointSD){
                totalPointCY -= pointSD;
            }
            num--;
        }

        System.out.println(totalPointCY);
        System.out.println(totalPointSD);

    }
}
