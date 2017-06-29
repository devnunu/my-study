package backjoon.ex_2738;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 29..
 */
public class Main {
    public  static Scanner sc = new Scanner(System.in);
    public  static int N = sc.nextInt();
    public  static int M = sc.nextInt();

    public static void main(String[] args){
        int[][] arr1 = new int[N][M];
        int[][] arr2 = new int[N][M];

        makeArray(arr1);
        makeArray(arr2);

        for(int i=0; i<N; i++){
            for(int j=0; j<M; j++){
                System.out.print(arr1[i][j]+arr2[i][j]+" ");
            }
            System.out.println();
        }


    }

    public static void makeArray(int[][] array){
        for(int i=0; i<N; i++){
            for(int j=0; j<M; j++){
                array[i][j] = sc.nextInt();
            }
        }
    }
}
