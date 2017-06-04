package backjoon.ex_1292;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 3..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int start = sc.nextInt();
        int end = sc.nextInt();
        int result = 0;

        // 1 3 6 10
        //(n(n+1))/2
        // 1 2 2 3 3 3 4 4 4 4
        for(int i=start; i<=end; i++){
            int comp = Math.round((i*(i+1))/2);
            System.out.println(comp);
        }
    }
}
