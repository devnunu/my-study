package backjoon.ex_5565;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int totalCost = sc.nextInt();
        int cost = 0;

        while(sc.hasNext()){
            cost += sc.nextInt();
        }

        System.out.println(totalCost-cost);
    }
}
