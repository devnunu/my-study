package backjoon.ex_2605;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 28..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        int[] arr = new int[size];

        for(int i = 0; i<size; i++){
            arr[i] = i+1;
        }

        for(int i = 0; i<size; i++){
            swap(arr, i, sc.nextInt());
        }

        for(int i = 0; i<size; i++){
            System.out.print(arr[i] +" ");
        }

    }

    public static void swap(int[] arr, int index1, int index2){
        int temp = arr[index1];
        for(int i = index1; i>index1-index2; i--){
            arr[i] = arr[i-1];
        }
        arr[index1-index2] = temp;
    }
}
