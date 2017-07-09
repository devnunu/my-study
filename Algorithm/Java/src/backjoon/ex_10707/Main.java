package backjoon.ex_10707;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 8..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] costArr = new int[5];
        int xCost = 0;
        int yCost = 0;

        for(int i=0; i<costArr.length; i++){
            costArr[i] = sc.nextInt();
        }

        xCost = costArr[0]*costArr[4];

        if(costArr[4]<costArr[2]){
            yCost = costArr[1];
        }else{
            yCost = costArr[1] + (costArr[4]-costArr[2])*costArr[3];
        }


        if(xCost< yCost){
            System.out.println(xCost);
        }else {
            System.out.println(yCost);
        }

    }
}
