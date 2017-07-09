package backjoon.ex_2822;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 8..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
        int[] arr = new int[8];
        int result = 0;
        int[] rank = new int [5];

        for(int i=0; i<8; i++){
            arr[i] = sc.nextInt();
            map.put(arr[i], i+1);
        }

        Arrays.sort(arr);

        for(int i=3; i<arr.length; i++){
            result += arr[i];
            rank[i-3] = map.get(arr[i]);
        }

        Arrays.sort(rank);

        System.out.println(result);

        for(int i=0; i<rank.length; i++){
            System.out.print(rank[i]+" ");
        }
    }
}
