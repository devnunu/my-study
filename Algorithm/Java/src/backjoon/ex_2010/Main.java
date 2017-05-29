package backjoon.ex_2010;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 29..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        int[] arr = new int[size];
        int result = 0;

        for(int i = 0; i<size; i++){
            arr[i] = sc.nextInt();
        }

        Arrays.sort(arr);

        for(int i = 0; i<size; i++){
            if(i==size-1){
                result += arr[i];
            }else{
                result += arr[i] - 1;
            }
        }
        System.out.print(result);
    }
}