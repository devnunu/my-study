package backjoon.ex_9610;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 29..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        int[] arr = new int[5];
        Arrays.fill(arr, 0);

        while(T!=0){
            int x = sc.nextInt();
            int y = sc.nextInt();

            if(x>0&&y>0){
                arr[0]++;
            }else if(x<0&&y>0){
                arr[1]++;
            }else if(x<0&&y<0){
                arr[2]++;
            }else if(x>0&&y<0){
                arr[3]++;
            }else{
                arr[4]++;
            }

            T--;
        }

        System.out.println("Q1: " + arr[0]);
        System.out.println("Q2: " + arr[1]);
        System.out.println("Q3: " + arr[2]);
        System.out.println("Q4: " + arr[3]);
        System.out.println("AXIS: " + arr[4]);
    }
}
