package backjoon.ex_2581;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 11..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        ArrayList<Integer> arr = new ArrayList<Integer>();
        int M = sc.nextInt();
        int N = sc.nextInt();
        int sum = 0;

        for(int i=M; i<=N; i++){
            for(int j=1; j<i; j++){
                if(j!=1&&i%j==0){
                    break;
                }else if(j==i-1){
                    arr.add(i);
                }
            }
        }

        if(arr.size()==0){
            System.out.println(-1);
            return;
        }

        Collections.sort(arr);
        for(int i =0; i<arr.size(); i++){
            sum += arr.get(i);
        }

        System.out.println(sum);
        System.out.println(arr.get(0));
    }
}
