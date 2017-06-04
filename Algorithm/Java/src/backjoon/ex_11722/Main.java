package backjoon.ex_11722;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 3..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int len = sc.nextInt();
        int[] arr = new int[len];
        int count = 1;

        for(int i=0; i<len; i++){
            arr[i] = sc.nextInt();
        }

        Arrays.sort(arr);

        for(int i=1; i<len; i++){
            if(arr[i]!=arr[i-1]){
                count++;
            }
        }

        System.out.println(count);

    }
}
