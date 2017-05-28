package backjoon.ex_2592;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[10];
        int[] arrFrequency = new int[1001];
        Arrays.fill(arrFrequency,0);

        int max = 0;
        int result = 0;
        int avr = 0;


        for(int i =0; i<arr.length; i++){
            arr[i] = sc.nextInt();
            arrFrequency[arr[i]]++;
            avr += arr[i];
        }

        Arrays.sort(arr);

        for(int i =0; i<arrFrequency.length; i++){
            if((arrFrequency[i]!=0)&&(max<arrFrequency[i])){
                max = arrFrequency[i];
                result = i;
            }
        }

        System.out.println(avr/10);
        System.out.println(result);

    }
}
