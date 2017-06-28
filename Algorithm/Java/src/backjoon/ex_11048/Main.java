package backjoon.ex_11048;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 27..
 */
public class Main {


    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int M = sc.nextInt();
        int[][] arr = new int[N][M];
        int[][] comp = new int[N][M];

        for(int i =0; i<N; i++){
            for(int j =0; j<M; j++){
                arr[i][j] = sc.nextInt();
            }
        }

        for(int i=0; i<N; i++){
            for(int j =0; j<M; j++){
                if(i==0&&j==0){
                    comp[i][j]=arr[i][j];
                }else if(i==0){
                    comp[i][j]=arr[i][j]+comp[i][j-1];
                }else if(j==0){
                    comp[i][j]=arr[i][j]+comp[i-1][j];
                }else{
                    int candy1 = comp[i-1][j];
                    int candy2 = comp[i][j-1];
                    comp[i][j] = candy1>candy2 ? arr[i][j]+candy1 : arr[i][j]+candy2;
                }
            }
        }

        System.out.println(comp[N-1][M-1]);

    }

}
