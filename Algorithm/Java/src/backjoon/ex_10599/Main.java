package backjoon.ex_10599;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 5..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[4];

        while(true){
            for(int i=0; i<arr.length; i++){
                arr[i] = sc.nextInt();
            }

            if(arr[0]==0&&arr[1]==0&&arr[2]==0&&arr[3]==0){
                return;
            }

            int max=arr[3]-arr[0];
            int min=arr[2]-arr[1];

            System.out.println(min+" "+max);
        }
    }
}
