package backjoon.ex_2587;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[5];
        int avr = 0;

        for(int i =0; i<5; i++){
            arr[i] = sc.nextInt();
            avr += arr[i];
        }

        Arrays.sort(arr);

        System.out.println(avr/5);
        System.out.println(arr[2]);
    }
}
