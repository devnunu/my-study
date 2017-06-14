package backjoon.ex_3003;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 14..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arr = {1,1,2,2,2,8};

        for(int i =0; i<arr.length; i++){
            arr[i] = arr[i] - sc.nextInt();
            System.out.print(arr[i] + " ");
        }
    }
}
