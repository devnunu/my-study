package backjoon.ex_5554;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 29..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[4];

        for(int i =0; i<arr.length; i++){
            arr[i] = sc.nextInt();
        }

        int min = Arrays.stream(arr).sum();
        int hour =0;

        while(min>=60){
            min -= 60;
            hour += 1;
        }

        System.out.println(hour);
        System.out.println(min);
    }
}
