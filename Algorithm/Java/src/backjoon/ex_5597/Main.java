package backjoon.ex_5597;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 30..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        boolean[] arr = new boolean[31];
        Arrays.fill(arr, false);

        for(int i =0; i<28; i++){
            arr[sc.nextInt()] = true;
        }

        for(int i=1; i<=30; i++){
            if(arr[i]==false){
                System.out.println(i);
            }
        }

    }
}
