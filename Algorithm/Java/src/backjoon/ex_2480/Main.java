package backjoon.ex_2480;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 3..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[3];

        for(int i =0; i<3; i++){
            arr[i] = sc.nextInt();
        }

        Arrays.sort(arr);

        if((arr[0]==arr[1])&&(arr[1]==arr[2])&&(arr[0]==arr[2])){
            System.out.println(10000+arr[0]*1000);
        }else if((arr[0]!=arr[1])&&(arr[1]!=arr[2])&&(arr[0]!=arr[2])){
            System.out.println(arr[2]*100);
        }else{
            System.out.println(1000+arr[1]*100);
        }
    }
}
