package backjoon.ex_2576;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 4..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        ArrayList<Integer> list = new ArrayList<Integer>();
        int sum = 0;

        while(sc.hasNext()){
            int num = sc.nextInt();

            if(num%2==0){
                continue;
            }

            list.add(num);
            sum += num;

        }

        if(list.size()==0){
            System.out.println(-1);
            return;
        }

        Collections.sort(list);

        System.out.println(sum);
        System.out.println(list.get(0));

    }
}
