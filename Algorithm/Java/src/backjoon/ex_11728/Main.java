package backjoon.ex_11728;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 1..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt()+sc.nextInt();
        long[] arr = new long[size];

        for(int i=0; i<size; i++){
            arr[i] = sc.nextInt();
        }

        Arrays.sort(arr);

        for(int i=0; i<size; i++){
            System.out.print(arr[i]+" ");
        }
    }
}
