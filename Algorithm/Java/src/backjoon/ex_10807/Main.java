package backjoon.ex_10807;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 13..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        int[] arr = new int[size];
        int count = 0;

        for(int i=0; i<arr.length; i++){
            arr[i] = sc.nextInt();
        }

        int target = sc.nextInt();

        for(int i=0; i<arr.length; i++){
            if(arr[i] == target){
                count++;
            }
        }

        System.out.println(count);

    }
}
