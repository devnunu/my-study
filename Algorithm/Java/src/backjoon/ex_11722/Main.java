package backjoon.ex_11722;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 6..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        int[] arr = new int[size];
        int num = 0;


        for(int i =0; i<size; i++){
            int input = sc.nextInt();

            for(int j=0; j<=num; j++){
                if(j==num){
                    arr[num++] = input;
                    break;
                }
                if(arr[j]<=input){
                    arr[j] = input;
                    break;
                }
            }
        }


        int count = 0;
        while(arr[count]!=0){
            count++;
        }

        System.out.println(count);

    }
}
