package backjoon.ex_2953;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[][] arr = new int[5][4];
        int winnerPoint = 0;
        int winner = 0;

        for(int i =0; i<5; i++){
            int point = 0;
            for(int j=0; j<4; j++){
                point += sc.nextInt();
            }
            if(winnerPoint<point){
                winner = i+1;
                winnerPoint = point;
            }
        }

        System.out.print(winner + " " + winnerPoint);

    }
}
