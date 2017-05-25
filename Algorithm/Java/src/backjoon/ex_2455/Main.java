package backjoon.ex_2455;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 24..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int total = 0;
        int max = 0;

        while(sc.hasNext()){
            int peopleOut = sc.nextInt();
            int peopleIn = sc.nextInt();

            total += (peopleIn - peopleOut);

            if(total >= max){
                max = total;
            }
        }

        System.out.print(max);
    }
}
