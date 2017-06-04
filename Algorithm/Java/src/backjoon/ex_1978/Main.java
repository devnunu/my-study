package backjoon.ex_1978;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 4..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int count = 0;

        for(int i =0; i<num; i++){
            int goal = sc.nextInt();

            if(goal==1){
                count++;
                continue;
            }

            for(int j = 2; j<goal; j++){
                if(goal%j==0){
                    count++;
                    break;
                }
            }
        }

        System.out.print(num-count);

    }
}
