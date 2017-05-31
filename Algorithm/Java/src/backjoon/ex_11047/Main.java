package backjoon.ex_11047;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 1..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int kindNum = sc.nextInt();
        int goal = sc.nextInt();
        int count = 0;
        int[] arr = new int[kindNum];

        for(int i=0; i<kindNum; i++){
            arr[i] = sc.nextInt();
        }

        while(goal>0){
            for(int i=0; i<kindNum; i++){
                if(i==kindNum-1){
                    goal -= arr[i];
                    break;
                }
                if(arr[i+1]>goal){
                    goal -= arr[i];
                    break;
                }
            }
            count++;
        }

        System.out.print(count);
    }
}
