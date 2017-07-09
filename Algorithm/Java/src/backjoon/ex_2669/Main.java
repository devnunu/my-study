package backjoon.ex_2669;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 8..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        boolean[][] arr = new boolean[101][101];
        int x1, y1, x2, y2;
        int total = 0;

        for(int i=0; i<4; i++){
            x1 = sc.nextInt();
            y1 = sc.nextInt();
            x2 = sc.nextInt();
            y2 = sc.nextInt();


            for(int j = y1; j<y2; j++){
                for(int k = x1; k<x2; k++){
                    arr[j][k] = true;
                }
            }

        }

        for(int j = 0; j<101; j++){
            for(int k = 0; k<101; k++){
                if(arr[j][k]==true){
                    total++;
                }
            }
        }

        System.out.println(total);
    }
}
