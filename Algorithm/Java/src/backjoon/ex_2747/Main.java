package backjoon.ex_2747;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 4..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int[] arr = new int[num+1];

        if(num<2){
            System.out.println(num);
            return;
        }

        arr[0] = 0;
        arr[1] = 1;

        for(int i=2; i<=num; i++){
            arr[i] = arr[i-1] + arr[i-2];
        }

        System.out.println(arr[num]);

    }
}
//19 14 5 2 4