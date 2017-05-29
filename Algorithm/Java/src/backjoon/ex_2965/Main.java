package backjoon.ex_2965;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 28..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int size = 3;
        int[] arr = new int[size];
        int count = 0;

        for(int i =0; i<arr.length; i++){
            arr[i] = sc.nextInt();
        }

        while(!((arr[2]-arr[1]==1)&&(arr[1]-arr[0]==1))){
            int temp = arr[1];
            if(arr[2]-arr[1]>arr[1]-arr[0]){
                arr[1] = arr[2]-1;
                arr[0] = temp;
            }else{
                arr[1] = arr[0]+1;
                arr[2] = temp;
            }
            count++;
        }

        System.out.print(count);
    }
}
