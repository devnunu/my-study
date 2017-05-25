package backjoon.ex_2506;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int extraPoint = 0;
        int sum = 0;

        while(num!=0){
            int point = sc.nextInt();

            if(point==1){
                sum += point + extraPoint;
                extraPoint++;
            }else{
                extraPoint = 0;
            }

            num--;
        }

        System.out.print(sum);
    }
}
