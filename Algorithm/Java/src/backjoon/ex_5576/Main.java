package backjoon.ex_5576;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 26..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arr1 = new int[10];
        int[] arr2 = new int[10];

        for(int i=0; i<10; i++){
            arr1[i] = sc.nextInt();
        }
        for(int i=0; i<10; i++){
            arr2[i] = sc.nextInt();
        }

        Arrays.sort(arr1);
        Arrays.sort(arr2);

        System.out.print(arr1[9]+arr1[8]+arr1[7]+" ");
        System.out.print(arr2[9]+arr2[8]+arr2[7]);

    }
}
