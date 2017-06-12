package backjoon.ex_11726;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 12..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        int[] arr = new int[size];

        if(size==1){
            System.out.println(1);
            return;
        }

        arr[0] = 1;
        arr[1] = 2;

        for(int i = 2; i<size; i++){
            arr[i] = (arr[i-2]+arr[i-1])%10007;
        }

        System.out.println(arr[size-1]);
    }
}
