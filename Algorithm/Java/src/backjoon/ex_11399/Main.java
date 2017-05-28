package backjoon.ex_11399;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 26..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int[] arr = new int[num];
        int result=0;

        for(int i =0; i<num; i++){
            arr[i] = sc.nextInt();
        }

        Arrays.sort(arr);

        result = arr[0];
        for(int i=0; i<num-1; i++){
            arr[i+1] += arr[i];
            result += arr[i+1];
        }

        System.out.print(result);
    }
}
