package backjoon.ex_2693;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 13..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T= sc.nextInt();

        while(T!=0){
            int[] arr = new int[10];
            for(int i=0; i<arr.length; i++){
                arr[i] = sc.nextInt();
            }
            Arrays.sort(arr);
            System.out.println(arr[7]);
            T--;
        }
    }
}
