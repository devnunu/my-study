package backjoon.ex_9507;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 31..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        while(num!=0){
            int goal = sc.nextInt();
            long[] arr = new long[69];
            arr[0] = 1;
            arr[1] = 1;
            arr[2] = 2;
            arr[3] = 4;

            if(goal<4){
                System.out.println(arr[goal]);
                num--;
                continue;
            }

            for(int i=4; i<=goal; i++){
                arr[i] = arr[i - 1] + arr[i - 2] + arr[i - 3] + arr[i - 4];

                if(i==goal){
                    System.out.println(arr[i]);
                }
            }

            num--;
        }

    }
}
