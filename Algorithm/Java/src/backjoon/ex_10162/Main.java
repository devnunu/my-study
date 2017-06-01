package backjoon.ex_10162;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 1..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int goal =  sc.nextInt();
        int[] count = new int[3];
        Arrays.fill(count,0);

        while(true){
            if(goal==0){
                System.out.print(count[0]+" "+count[1]+" "+count[2]);
                return;
            }else if(goal<0){
                System.out.print(-1);
                return;
            }

            if(goal>=300){
                goal-=300;
                count[0]++;
            }else if(goal>=60){
                goal-=60;
                count[1]++;
            }else{
                goal-=10;
                count[2]++;
            }
        }
    }
}
