package backjoon.ex_3058;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 14..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            ArrayList<Integer> evenList = new ArrayList<Integer>();
            int sum=0;
            for(int i = 0; i<7; i++){
                int num  = sc.nextInt();
                if(num%2==0){
                    sum+=num;
                    evenList.add(num);
                }
            }

            Collections.sort(evenList);
            System.out.println(sum+" " + evenList.get(0));

            T--;
        }


    }
}
