package backjoon.ex_1373;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 28..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[] str = sc.next().split("");
        int[] arr = new int[str.length];
        int decNum = 0;

        reverse(str, arr);

        for(int i =0; i<arr.length; i++){
            int power = (int)Math.pow(2,i);
            decNum += arr[i]*power;
        }

        System.out.printf("%o", decNum);



    }

    public static void reverse(String[] string, int[] array){
        for(int i = string.length-1; i>=0; i--){
            array[string.length-1-i] = Integer.parseInt(string[i]);
        }
    }
}