package backjoon.ex_5543;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] burgerCost = new int[3];
        int[] drinkCost = new int[2];

        for(int i = 0; i<3; i++){
            burgerCost[i] = sc.nextInt();
        }
        for(int i = 0; i<2; i++){
            drinkCost[i] = sc.nextInt();
        }

        Arrays.sort(burgerCost);
        Arrays.sort(drinkCost);

        System.out.print(burgerCost[0]+drinkCost[0]-50);
    }
}
