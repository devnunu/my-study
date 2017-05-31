package backjoon.ex_2167;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 31..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int row = sc.nextInt();
        int col =  sc.nextInt();

        int[][] arr = new int[row][col];

        for(int i=0; i<row; i++){
            for(int j=0; j<col; j++){
                arr[i][j] = sc.nextInt();
            }
        }

        int T = sc.nextInt();

        while(T!=0){
            int x1=sc.nextInt()-1;
            int y1=sc.nextInt()-1;
            int x2=sc.nextInt()-1;
            int y2=sc.nextInt()-1;
            int total = 0;

            for(int i=x1; i<=x2; i++){
                for(int j=y1; j<=y2; j++){
                    total += arr[i][j];
                }
            }

            System.out.println(total);

            T--;
        }

    }
}
