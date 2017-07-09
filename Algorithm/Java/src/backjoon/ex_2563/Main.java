package backjoon.ex_2563;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 8..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        boolean[][] arr = new boolean[101][101];
        int num = sc.nextInt();
        int total =0;

        while(num!=0){
            int X=sc.nextInt();
            int Y=sc.nextInt();

            for(int i=X; i<X+10; i++){
                for(int j=Y; j<Y+10; j++){
                    arr[i][j] = true;
                }
            }

            num--;
        }

        for(int i=0; i<101; i++){
            for(int j=0; j<101; j++){
                if(arr[i][j] == true){
                    total++;
                }
            }
        }

        System.out.println(total);
    }
}
