package backjoon.ex_5054;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 30..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            int num = sc.nextInt();
            int[] arr = new int[num];
            int result = 0;

            for(int i =0; i<num; i++){
                arr[i] = sc.nextInt();
            }

            Arrays.sort(arr);

            for(int i =0; i<num-1; i++){
                result += arr[i+1] - arr[i];
            }
            result += arr[num-1]-arr[0];

            System.out.println(result);

            T--;
        }
    }

}
