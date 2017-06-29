package backjoon.ex_9076;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 29..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            int[] arr = new int[5];

            for(int i =0; i<5; i++){
                arr[i] = sc.nextInt();
            }

            Arrays.sort(arr);
            int comp = arr[0] + arr[4];
            int result = arr[1]+arr[2]+arr[3];

            if(Math.abs(arr[1]-arr[3])>=4){
                System.out.println("KIN");
            }else{
                System.out.println(result);
            }

            T--;
        }
    }
}
