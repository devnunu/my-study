package backjoon.ex_3040;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 8..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[9];
        int[] exept = new int[2];

        for(int i =0; i<arr.length; i++){
            arr[i] = sc.nextInt();
        }

        for(int i =0; i<arr.length; i++){
            int result = Arrays.stream(arr).sum()-arr[i];

            for(int j=0; j<arr.length; j++){
                if(i==j){
                    continue;
                }
                if(result-arr[j]==100){
                    exept[0] = i;
                    exept[1] = j;
                    break;
                }
            }
        }

        for(int i =0; i<arr.length; i++){
            if(i==exept[0]||i==exept[1]){
                continue;
            }
            System.out.println(arr[i]);
        }

    }
}
