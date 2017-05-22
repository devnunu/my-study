package backjoon.ex_2748;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 22..
 */
public class Main {

    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        int num;
        long[] arr = new long[91];
        arr[0] = 0;
        arr[1] = 1;
        arr[2] = 1;

        num = in.nextInt();

        for(int i=3; i<=num; i++){
            arr[i] = arr[i-1] + arr[i-2];
        }

        System.out.print(arr[num]);
        return;
    }
}