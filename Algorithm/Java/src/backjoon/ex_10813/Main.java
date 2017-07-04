package backjoon.ex_10813;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 4..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        int T = sc.nextInt();
        int[] arr = new int[size];

        for(int i = 0; i<size; i++){
            arr[i] = i+1;
        }

        while(T!=0){
            swap(arr, sc.nextInt()-1, sc.nextInt()-1);
            T--;
        }

        for(int i = 0; i<size; i++){
            System.out.print(arr[i]+" ");
        }

    }

    public static void swap(int[] array, int idx1, int idx2){
        int temp = array[idx1];
        array[idx1] = array[idx2];
        array[idx2] = temp;
    }
}
