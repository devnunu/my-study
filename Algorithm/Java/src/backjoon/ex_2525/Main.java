package backjoon.ex_2525;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int hour = sc.nextInt();
        int min = sc.nextInt();
        int time = sc.nextInt();

        min += time;

        while(min>=60){
            min = min-60;
            hour += 1;

            if(hour>=24){
                hour = 0;
            }
        }

        System.out.print(hour+" "+min);
    }
}
